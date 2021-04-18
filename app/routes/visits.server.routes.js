const users = require('../controllers/users.server.controller');
const visits = require('../controllers/visits.server.controller');

module.exports = function (app) {
        app.route('/api/visits')
            .get(visits.list)
            .post(users.requiresLogin, visits.create);
        
        app.route('/api/visits/:visitId')
            .get(visits.read)
            .put(users.requiresLogin, visits.hasAuthorization, visits.update)
            .delete(users.requiresLogin, visits.hasAuthorization, visits.delete);
        
        app.param('visitId', visits.visitByID);
};