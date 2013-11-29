'use strict';

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    // configurable paths
    yeoman: {
      src: 'src',
      app: '<%= yeoman.src %>/app',
      dist: 'dist',
      test: '<%= yeoman.src %>/test',
      tmp: '.tmp'
    },
    watch: {
      options: {
        nospawn: true,
        livereload: '<%= connect.options.livereload %>'
      },
      stylus: {
        files: '<%= yeoman.app %>/views/styles/**/*.styl',
        tasks: ['stylus:server', 'concat:styles']
      },
      js: {
        files: '<%= yeoman.app %>/**/*.js'
      },
      jade: {
        files: '<%= yeoman.app %>/**/*.jade'
      }
    },
    connect: {
      options: {
        port: 9001,
        livereload: 9002,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: false,
          base: [
            '<%= yeoman.tmp %>',
            '<%= yeoman.src %>'
          ]
        }
      },
      dist: {
        options: {
          livereload: false,
          open: false,
          base: '<%= yeoman.dist %>'
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    stylus: {
      server: {
        files: {
          '<%= yeoman.tmp %>/styles/main.css':
            '<%= yeoman.app %>/views/styles/application.styl'
        }
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css':
            '<%= yeoman.app %>/views/styles/application.styl'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>'
          ]
        }]
      },
      server: '<%= yeoman.tmp %>'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/**/*.js',
        '<%= yeoman.test %>/**/*.js'
      ]
    },
    requirejs: {
      dist: {
        // Options: 
        // https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          name: 'main',
          mainConfigFile: '<%= yeoman.app %>/main.js',
          baseUrl: '<%= yeoman.app %>',
          optimize: 'uglify2',
          out: '<%= yeoman.dist %>/scripts/build.js',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          useStrict: true,
          pragmasOnSave: {
            excludeJade: true
          },
          // wrap: true,
          include: '../bower_components/requirejs/require'
          //uglify2: {} // https://github.com/mishoo/UglifyJS2
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            // '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: '<%= yeoman.dist %>/index.html'
    },
    usemin: {
      options: {
        dirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    processhtml: {
      dist: {
        files: {
          '<%= yeoman.dist %>/index.html': ['<%= yeoman.src %>/index.html']
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css':
            '<%= yeoman.dist %>/styles/{,*/}*.css'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          dest: '<%= yeoman.dist %>/fonts',
          cwd: 'src/components/fonts',
          expand: true,
          flatten: true,
          filter: 'isFile',
          src: ['**/*']
        }, {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/assets/images',
          dest: '<%= yeoman.dist %>/images/',
          src: '{,*/}*.{png,jpg,jpeg,gif}'
        }]
      },
      fonts: {
        dest: '<%= yeoman.tmp %>/fonts',
        cwd: 'src/components/fonts',
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: ['**/*']
      },
      images: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>/assets/images',
        dest: '<%= yeoman.tmp %>/images/',
        src: '{,*/}*.{png,jpg,jpeg,gif}'
      }
    },
    concat: {
      server: {
        files: {
          '<%= yeoman.tmp %>/styles/main.css': [
            '<%= yeoman.src %>/components/styles/**/*.css',
            '<%= yeoman.tmp %>/styles/main.css'
          ]
        }
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '<%= yeoman.src %>/components/styles/**/*.css',
            '<%= yeoman.dist %>/styles/main.css'
          ]
        }
      }
    },
    concurrent: {
      server: [
        'stylus:server',
        'copy:fonts',
        'copy:images'
      ],
      dist: [
        'stylus:dist',
        'imagemin',
        'htmlmin'
      ]
    },
    bower: {
      require: {
        rjsConfig: '<%= yeoman.app %>/main.js'
      },
      install: {
        options: {
          targetDir: './src/components',
          install: true
        }
      }
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%%= connect.options.port %>/index.html']
        }
      }
    }
  });

  grunt.registerTask('default', [
    'jshint',
    'mocha'
  ]);

  grunt.registerTask('prepare', [
    'bower:install'
  ]);

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'concat:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    // 'mocha'
  ]);

  grunt.registerTask('build', function(target, environment) {
    if (environment === 'production') {
      grunt.config('requirejs.dist.options.generateSourceMaps', false);
      grunt.config('requirejs.dist.options.preserveLicenseComments', true);
    }
    
    grunt.task.run([
      'jshint',
      'prepare',
      'clean:dist',
      'processhtml:dist',
      'useminPrepare',
      'concurrent:dist',
      'concat:dist',
      'requirejs',
      'cssmin',
      // 'uglify',
      'copy:dist',
      // 'rev',
      'usemin'
    ]);
  });

  grunt.registerTask('lint', [
    'jshint'
  ]);

};