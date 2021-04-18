const users = require('../controllers/users.server.controller');
const assessments = require('../controllers/assessments.server.controller');

module.exports = function (app) {
        app.route('/api/assessments')
            .get(assessments.list)
            .post(users.requiresLogin, assessments.create);
        
        app.route('/api/assessments/:assessmentId')
            .get(assessments.read)
            .put(users.requiresLogin, assessments.hasAuthorization, assessments.update)
            .delete(users.requiresLogin, assessments.hasAuthorization, assessments.delete);
        
        app.param('assessmentId', assessments.assessmentByID);
};