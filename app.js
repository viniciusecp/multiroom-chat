var app = require('./config/server');

var rotaIndex = require('./app/routes/index')(app);
var rotaChat = require('./app/routes/chat')(app);


var server = app.listen(process.env.PORT || 5000, function(){
    console.log("Servidor Online");
});

var io = require('socket.io').listen(server);

// cria variavel globla
app.set('io', io);

// criar conexão por websocket
io.on('connection', function(socket){
    console.log('Usuário conectou');

    socket.on('disconnect', function(){
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', function(data){
        // atualiza mensagens
        // emit envia só pra mim mesmo, broadcast envia para todos conectados ao socket exceto eu
        socket.emit(
            'msgParaClient',
            {apelido : data.apelido, mensagem : data.mensagem}
        );
        socket.broadcast.emit(
            'msgParaClient',
            {apelido : data.apelido, mensagem : data.mensagem}
        );
        //atualiza participantes
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit(
                'participantesParaCliente',
                {apelido : data.apelido}
            );
            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido : data.apelido}
            );
        }

    });
});
