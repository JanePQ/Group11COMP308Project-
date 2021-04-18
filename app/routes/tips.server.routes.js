const users = require('../controllers/users.server.controller');
const tips = require('../controllers/tips.server.controller');

module.exports = function (app) {
        app.route('/api/tips')
            .get(tips.list)
            .post(users.requiresLogin, tips.create);
        
        app.route('/api/tips/:tipId')
            .get(tips.read)
            .put(users.requiresLogin, tips.hasAuthorization, tips.update)
            .delete(users.requiresLogin, tips.hasAuthorization, tips.delete);
        
        app.param('tipId', tips.tipByID);
};