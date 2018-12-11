module.exports = function(application){
    application.post('/chat', function(req, res){
        var controllerChat = require('../controllers/chat.js');
        controllerChat.iniciaChat(application, req, res);
    });

    application.get('/chat', function(req, res){
        var controllerChat = require('../controllers/chat.js');
        controllerChat.iniciaChat(application, req, res);
    });
}
