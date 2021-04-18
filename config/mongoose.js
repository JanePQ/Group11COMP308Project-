var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {

    const db = mongoose.connect(config.db, {
        useUnifiedTopology: true,
        useNewUrlParser: true, useCreateIndex: true 
      }).then(() => console.log('DB Connected!'))
      .catch(err => {
        console.log('Error');
		  });

    require('../app/models/alert.server.model');
    require('../app/models/article.server.model');
    require('../app/models/assessment.server.model');
    require('../app/models/tip.server.model');
    require('../app/models/user.server.model');
    require('../app/models/visit.server.model');

    return db;
};