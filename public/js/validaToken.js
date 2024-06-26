document.addEventListener("DOMContentLoaded", function(){
    const token = localStorage.getItem('token')
    if(!token){//Não existe o token, enviamos para o login
        window.location.href = 'index.html'
    }else{
        //token existe, Verificar se é válido
        const tokenData = parseJwt(token)
        if(tokenData && tokenData.exp && tokenData.exp * 1000 > Date.now()){
            //Token existe e não expirou. Não faremos nada
        } else{
            window.location.href = 'index.html' //Se estiver expirado
        }
    }
})

function parseJwt(token){
    try{
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace('-','+').replace('_','/')
        return JSON.parse(atob(base64))
    }catch(e){
        return null
    }
}

//Captura o botão logout pelo ID
const btnLogout = document.getElementById('logout')
//Adicionamos o listener no click
btnLogout.addEventListener('click', function(){
    //Removemos o localStorage
    localStorage.removeItem('token')
    //Redirecionamos para o login
    window.location.href = 'index.html'
})