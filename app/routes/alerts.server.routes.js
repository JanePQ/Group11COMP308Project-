const users = require('../controllers/users.server.controller');
const alerts = require('../controllers/alerts.server.controller');

module.exports = function (app) {
        app.route('/api/alerts')
            .get(alerts.list)
            .post(users.requiresLogin, alerts.create);
        
        app.route('/api/alerts/:alertId')
            .get(alerts.read)
            .put(users.requiresLogin, alerts.hasAuthorization, alerts.update)
            .delete(users.requiresLogin, alerts.hasAuthorization, alerts.delete);
        
        app.param('alertId', alerts.alertByID);
};