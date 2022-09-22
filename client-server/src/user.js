var isAuth = localStorage.getItem('token')
var userLogado = JSON.parse(localStorage.getItem('user'))
var home = document.getElementById("home")
var userSection = document.getElementById("user-section")

const url = "http://localhost:3000"

if(localStorage.getItem('token') == null) {
    alert('Você precisa estar logado para acessar essa página')
    window.location.href = '/login.html'
}

home.setAttribute('style', isAuth ? 'display: inline-block': 'display:none')

axios.get(`${url}/user`)
.then((response) => {
    const data = response.data
    for(let i = 0; i < data.length; i++) {
        if(data[i].id == userLogado.id) {
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(data[i]))
        }
    }
})
.catch(err => {
    console.log(err)
})

var userLogadoAtualizado = JSON.parse(localStorage.getItem('user'))

axios.get(`${url}/itens-vendas`)
.then((response) => {
    const data = response.data
    let itensVendasUser = []
    // let filterVenda = []
    let stringItensVendas = ''

    
    for(let i = 0; i < data.length; i++) {
        if(data[i].venda.user_id == userLogadoAtualizado.id) { 
            itensVendasUser.push(data[i])
        }
    }

    // for(let i = 0; i < data.length; i++) {
    //     for(let j = 0; j < itensVendasUser.length; j++) {
    //         if(itensVendasUser[i].venda_id == data[j].venda.id) {
    //             filterVenda.push(itensVendasUser[i].venda_id)
    //         }
    //     }
    // }

    // console.log(filterVenda)
    
    for(let i = 0; i < itensVendasUser.length; i++) {
        stringItensVendas = stringItensVendas + `<p><strong>Venda</strong> ${itensVendasUser[i].venda_id}</p>`
        + `<strong>Produto</strong> ${itensVendasUser[i].product.name}`
        + `<strong> Valor</strong> ${itensVendasUser[i].product.price}` 
        + `${JSON.stringify(itensVendasUser[i], ['qnt_product', 'desconto', 'end_price_product'])}` 
        + '<hr>'
        
        let replaceChar = stringItensVendas.replace(/[\[\].,:"{}]/gi, "")
        let replaceQuantidade = replaceChar.replace(/qnt_product/gi, " <strong> Quantidade:</strong> ")
        let replaceDesconto = replaceQuantidade.replace(/desconto/gi, " <strong> Desconto:</strong> ")
        var replaceValorTotal = replaceDesconto.replace(/end_price_product/gi, "<strong> Total:</strong> ")
    }
    
    userSection.innerHTML = `
        <h1 class='h1-user'>Olá, ${userLogadoAtualizado.name}</h1>
        <p><strong>Minha Carteira: </strong>$${userLogadoAtualizado.carteira}</p><br>
        <p>${replaceValorTotal}</p> <br>
    `
    console.log(itensVendasUser)
})
.catch((err) => {console.log(err)})

function sair() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('cartAtualizado')
    localStorage.removeItem('id-produto')
    location = '/login.html'
}