const url = "http://localhost:3000"

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(email != null && password != null) {
        axios.post(`${url}/auth`, {
            email,
            password
        })
        .then(response => {
            console.log(response)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            location = "/index.html"
        })
        .catch(err => {
            var error = document.getElementById("error");

            error.innerHTML = `
            <h3>${err.response.data}</h3>
            `
            error.setAttribute('style', 'display: block');
        });
    }
}