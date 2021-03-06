var faker = require('Faker'),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    
    log = require('./lib/log')(module),
    env = 'development',
    config = require('./config/environment')[env],
    
    User = require('./app/models/user');

require('./config/mongoose')(config);

User.remove({}, function(err) {
  var user = new User({
    email: 'email@email.com',
    password: 'password'
  });

  user.save(function(err, user) {
      if (err) {
        return log.error(err);
      } else {
        log.info('New user - %s:%s', user.email, user.password);
      }
  });

  _.forEach(_.range(10), function() {
    var user = new User({
      email: faker.Internet.email(),
      password: faker.Lorem.words(1)[0]
    });

    user.save(function(err, user) {
        if (err) {
          return log.error(err);
        } else {
          log.info('New user - %s:%s', user.email, user.password);
        }
    });
  });
});

_.delay(function() {
    mongoose.disconnect();
}, 3000);