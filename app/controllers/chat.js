module.exports.iniciaChat = function(application, req, res){

    var dadosForm = req.body;
    req.assert('apelido', 'Apelido não pode ser vazio').notEmpty();
    req.assert('apelido', 'O apelido deve conter entre 3 e 15 caracteres').len(3, 15);

    var erros = req.validationErrors();

    if(erros){
        res.render("index", {validacao : erros});
        return;
    }

    // pega a variave global io e utiliza a funçao emit dela.
    // trabalhando junto com a função on() do socket cliente, on é ouvir, emit é pedir para executar algo
    application.get('io').emit(
        'msgParaClient',
        {apelido : dadosForm.apelido, mensagem : ' acabou de entrar no chat'}
    );

    res.render('chat', {dadosForm : dadosForm});
}
