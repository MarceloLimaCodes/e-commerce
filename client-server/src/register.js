let senha = document.querySelector('#password')
let labelSenha = document.querySelector('#label-senha')

let confirmSenha = document.querySelector('#confirm-password')
let labelConfirmSenha = document.querySelector('#label-confirm-password')
let validConfirmSenha = false

let nome = document.querySelector("#name")
let email = document.querySelector("#email")

const url = "http://localhost:3000"

confirmSenha.addEventListener('keyup', () => {
    if(senha.value != confirmSenha.value){
        labelConfirmSenha.setAttribute('style', 'color:red')
        labelConfirmSenha.innerHTML = 'Senhas não conferem'
        confirmSenha.setAttribute('style', 'border-color: red')

        labelSenha.setAttribute('style', 'color:red')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: red')

        validConfirmSenha = false
    } else {

        labelConfirmSenha.setAttribute('style', 'color: green')
        labelConfirmSenha.innerHTML = 'Confirmar Senha'
        confirmSenha.setAttribute('style', 'border-color: green')

        labelSenha.setAttribute('style', 'color: green')
        labelSenha.innerHTML = 'Senha'
        senha.setAttribute('style', 'border-color: green')
        validConfirmSenha = true
    }
    
})

function registrar() {
    if(validConfirmSenha) {
        axios.post(`${url}/register`, {
            name: nome.value,
            email: email.value,
            password: senha.value
        })
        .then(() => {
            var sucess = document.getElementById("sucess");

            sucess.innerHTML = `
            <h3>Cadastrado com sucesso! Retornando para tela de login.</h3>
            `
            sucess.setAttribute('style', 'display: block');

            setTimeout(()=> {
                location = "/login.html" 
            }, 3000)
        })
        .catch(err => {
            var error = document.getElementById("error");

            error.innerHTML = `
            <h3>${err.response.data}</h3>
            `
            error.setAttribute('style', 'display: block');
        })
    } else {
        alert("Senhas não conferem")
    }
}