const urlBase = window.location.href.replace(/\/[^\/]*$/,'')+'/api'

document.getElementById('formUsuario').addEventListener('submit', function(event){
    event.preventDefault() //Evita o recarregamento
    const msgModal = new bootstrap.Modal(document.getElementById('modalMensagem'))
    //Obtendo os dados do formulário
    const nome = document.getElementById('nome').value
    const email = document.getElementById('login').value
    const senha = document.getElementById('senha').value
    //Criando o objeto de inclusão
    const dadosUsuario = {nome: nome, email:email, senha:senha}
    //Efetuar o POST para o endpoint
    fetch(`${urlBase}/usuarios`, {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(dadosUsuario)
    })
    .then(response => response.json())
    .then(data => {
        //Verifica se o usuário foi cadastrado
        if(data.acknowledged){
            document.getElementById('mensagem').innerHTML = `<span class='text-success'>Usuário criado com sucesso! 
            <br> por favor efetue o login. </span>`
            msgModal.show()
            setTimeout(()=>{
                window.location.href = 'index.html'
            }, 4000)
        }else if(data.errors){
            //Vamos pegar os erros da API
            const errorMessages = data.errors.map(error => error.msg).join('<br>')
            //Alteramos a mensagem no modal
            document.getElementById('mensagem').innerHTML = `<span class='text-danger'>${errorMessages}</span>`
            msgModal.show()
        }
    })
})