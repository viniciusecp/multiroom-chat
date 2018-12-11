module.exports = function(application){
    application.get('/', function(req, res){
        var controllerIndex = require('../controllers/index.js');
        controllerIndex.index(application, req, res);
    });
}
