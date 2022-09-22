const url = "http://localhost:3000"

let carrinhos = []
let cartAtualizado = JSON.parse(localStorage.getItem('cartAtualizado')) || []
let idProduto = JSON.parse(localStorage.getItem('id-produto'))

console.log(cartAtualizado)

// Classe do carrinho
class Cart {
    productId = '';
    productName = '';
    qntEstoque = 0;

    constructor(idProduto, nameProduct, quantidadeEstoque) {
        this.productId = idProduto
        this.productName = nameProduct
        this.qntEstoque = quantidadeEstoque
    }

    getEstoque() {
        return this.qntEstoque
    }

    setEstoque(estoque) {
        this.qntEstoque = estoque 
    }
}

// precisa existir um cartAtualizado para poder funcionar corretamente!
if(carrinhos.length <= 0 && cartAtualizado.length > 0) {
    let carrinhoDiv = document.querySelector('.carrinho-div')
    carrinhoDiv.setAttribute('style', 'display: block')

    for(let i = 0; i < cartAtualizado.length; i++) {
        carrinhos.push(new Cart(cartAtualizado[i].productId, cartAtualizado[i].productName, cartAtualizado[i].qntEstoque))
    }
    console.log(carrinhos)

    let produtosEspecialChars = JSON.stringify(carrinhos, ['productName', 'qntEstoque'])
    let produtosName1 = produtosEspecialChars.replace(/[\[\].,:"{}]/gi, "")
    let produtosName2 = produtosName1.replace(/productName/gi, " <br><strong>Produto:</strong> ")  
    let produtosName3 = produtosName2.replace(/qntEstoque/gi, ` <input class="set-button" type="button" value=" + " onclick="addEstoqueButton()" > <input class="set-button" type="button" value=" - " onclick="removeEstoqueButton()" > `)

    carrinhoDiv.innerHTML = `
        <h3 class="carrinho-title">Meu Carrinho</h3>
        <p class="carrinho-p">${produtosName3}</p>
        <input class="comprar-todos-button" type="button" value="Comprar todos" onclick="confirm()">
    `
}   


// Autenticação:
function isAuth() {
    var isAuth = localStorage.getItem('token')
    var userLogado = JSON.parse(localStorage.getItem('user'))
    var home = document.getElementById("home")
    var login = document.getElementById("login")

    if(localStorage.getItem('token') == null) {
        alert('Você precisa estar logado para acessar essa página')
        window.location.href = '/login.html'
    }

    login.setAttribute('style', isAuth ? 'display: inline-block' : 'display:none')
    home.setAttribute('style', isAuth ? 'display: inline-block': 'display:none')

    login.innerHTML = `
        <p class='p-user'>Olá, ${userLogado.name}</p>
        <img src="./src/assets/avatar.png" id="avatar" alt="avatar">
    `
}

function pesquisar() {
    axios.get(`${url}/product`)
    .then(response => {
        const product = document.getElementById('pesquisar-text').value
        const data = response.data  
        const pesquisaDiv = document.querySelector('#result-pesquisa')

        pesquisaDiv.innerHTML = ''

        for(let i = 0; i < data.length; i++) {
            if(product.toLowerCase() == data[i].name.toLowerCase()) {
                let productItem = document.createElement('div')
                productItem.classList.add("product-div")

                productItem.innerHTML = `
                    <h3>${data[i].name}</h3>
                    <p>${data[i].description}</p> 
                    <strong class="category">${data[i].category.name}</strong>
                    <strong class="price">$${data[i].price},00</strong>
                    <strong>estoque: ${data[i].qtd_estoque}</strong>
                    <input class="product-button" type="button" value="Mais Detalhes" onclick="comprar('${data[i].id}')">
                    <input class="product-button" type="button" value="Adicionar ao Carrinho" onclick="addCart('${data[i].id}', '${data[i].name}')" >
                    <input class="product-button" type="button" value="Comprar" onclick="comprar('${data[i].id}')" >
                `

                pesquisaDiv.appendChild(productItem)
            }
        }
    })
    .catch(err => console.log(err))
}

function getOneProduct() {
    axios.get(`${url}/product`)
    .then(response => {
        const data = response.data
        var oneProduct = document.querySelector('#one-product')

        for(let i = 0; i < data.length; i++) {    
            if(idProduto == data[i].id) {
                let productItem = document.createElement('div')
                productItem.classList.add("product-div")
                
                productItem.innerHTML = `
                    <h3>${data[i].name}</h3>
                    <p>${data[i].description}</p> 
                    <strong class="category">${data[i].category.name}</strong>
                    <strong class="price">$${data[i].price},00</strong>
                    <strong>estoque: ${data[i].qtd_estoque}</strong>
                    <input class="product-button" type="button" value="Mais Detalhes" onclick="comprar('${data[i].id}')">
                    <input class="product-button" type="button" value="Adicionar ao Carrinho" onclick="addCart('${data[i].id}', '${data[i].name}')" >
                    <input class="product-button" type="button" value="Comprar" onclick="comprar('${data[i].id}')" >
                `
                oneProduct.appendChild(productItem)
            } 
        }
    })
    .catch(err => console.log(err))
}


// Botão "Adicionar ao Carrinho"
function addCart(idProduct, nameProduct) {
    let carrinhoDiv = document.querySelector('.carrinho-div')
    let encontrado = false

    // cartAtualizado

    carrinhoDiv.setAttribute('style', 'display: block')
    
    if(carrinhos.length <= 0) {
        carrinhos.push(new Cart(idProduct, nameProduct))
    }
    
    for(let i = 0; i < carrinhos.length; i++) {
        if(carrinhos[i].productId == idProduct) {
            carrinhos[i].setEstoque(carrinhos[i].qntEstoque + 1)
            encontrado = true
        }
    }

    if(!encontrado) {
        carrinhos.push(new Cart(idProduct, nameProduct))
        let ultimoIndice = carrinhos.length - 1
        carrinhos[ultimoIndice].setEstoque(carrinhos[ultimoIndice].qntEstoque + 1)
    }
    
    // Atualização dos dados sempre que clicarmos no botão de "Adicionar ao Carrinho"
    let produtosEspecialChars = JSON.stringify(carrinhos, ['productName', 'qntEstoque'])
    let produtosName1 = produtosEspecialChars.replace(/[\[\].,:"{}]/gi, "")
    let produtosName2 = produtosName1.replace(/productName/gi, " <br><strong>Produto:</strong> ")  
    let produtosName3 = produtosName2.replace(/qntEstoque/gi, ` <input class="set-button" type="button" value=" + " onclick="addEstoqueButton('${idProduct}')" > <input class="set-button" type="button" value=" - " onclick="removeEstoqueButton('${idProduct}')" > `)

    carrinhoDiv.innerHTML = `
        <h3 class="carrinho-title">Meu Carrinho</h3>
        <p class="carrinho-p">${produtosName3}</p>
        <input class="comprar-todos-button" type="button" value="Comprar todos" onclick="confirm()">
    `

    
    localStorage.removeItem('cartAtualizado')
    localStorage.setItem('cartAtualizado', JSON.stringify(carrinhos))

}

// Botão "+" dentro do carrinho:
function addEstoqueButton(idProduct) {
    let carrinhoDiv = document.querySelector('.carrinho-div')
    let dataAtualizacao = []            // Vetor que irá salvar o id do produto sempre que clicado
    let endString = ''

    for(let i = 0; i < carrinhos.length; i++) {
        if(carrinhos[i].productId == idProduct) {
            carrinhos[i].setEstoque(carrinhos[i].qntEstoque + 1)
        }

        let produtosEspecialChars = JSON.stringify(carrinhos[i], ['productName', 'qntEstoque'])
        let produtosName1 = produtosEspecialChars.replace(/[\[\].,:"{}]/gi, "")
        let produtosName2 = produtosName1.replace(/productName/gi, " <br><strong>Produto:</strong> ") 

        dataAtualizacao[i] = produtosName2.replace(/qntEstoque/gi, ` <input class="set-button" type="button" value=" + " onclick="addEstoqueButton('${carrinhos[i].productId}')" > <input class="set-button" type="button" value=" - " onclick="removeEstoqueButton('${carrinhos[i].productId}')"> `)

        endString = endString + dataAtualizacao[i]
    }
    
    // Atualização dos dados na tela:
    carrinhoDiv.innerHTML = `
        <h3 class="carrinho-title">Meu Carrinho</h3>
        <p class="carrinho-p">${endString}</p>
        <input class="comprar-todos-button" type="button" value="Comprar todos" onclick="confirm()">
    `

    localStorage.removeItem('cartAtualizado')
    localStorage.setItem('cartAtualizado', JSON.stringify(carrinhos))
}

// Botão "-" dentro do carrinho:
function removeEstoqueButton(idProduct) {
    let carrinhoDiv = document.querySelector('.carrinho-div')
    let dataAtualizacao = []
    let endString = ''
    
    for(let i = 0; i < carrinhos.length; i++) {
        if(carrinhos[i].productId == idProduct) {
            carrinhos[i].setEstoque(carrinhos[i].qntEstoque - 1)
            
            if(carrinhos[i].qntEstoque <= 0) {
                carrinhos[i].setEstoque(0)
                carrinhos[i] = ''
            }
        }

        let produtosEspecialChars = JSON.stringify(carrinhos[i], ['productName', 'qntEstoque'])
        let produtosName1 = produtosEspecialChars.replace(/[\[\].,:"{}]/gi, "")
        let produtosName2 = produtosName1.replace(/productName/gi, " <br><strong>Produto:</strong> ")
    
        dataAtualizacao[i] = produtosName2.replace(/qntEstoque/gi, ` <input class="set-button" type="button" value=" + " onclick="addEstoqueButton('${carrinhos[i].productId}')" > <input class="set-button" type="button" value=" - " onclick="removeEstoqueButton('${carrinhos[i].productId}')" > `)

        endString = endString + dataAtualizacao[i]
    }
    
    // Atualização dos dados na tela
    carrinhoDiv.innerHTML = `
        <h3 class="carrinho-title" >Meu Carrinho</h3>
        <p class="carrinho-p">${endString}</p>
        <input class="comprar-todos-button" type="button" value="Comprar todos" onclick="confirm()">
    `

    localStorage.removeItem('cartAtualizado')
    localStorage.setItem('cartAtualizado', JSON.stringify(carrinhos))
}


// Confirmando compra do carrinho:
let html = document.querySelector('*')
let confirmDiv = document.createElement('div')
confirmDiv.classList.add("confirm-div")
let confirmBox = document.createElement('div')
confirmBox.classList.add("confirm-box")

function fechar() {
    confirmDiv.setAttribute('style', 'display: none')
}

// Botão "Ok" confirmando compra e gerando uma nota fiscal através do registro na tabela 'itens-vendas'
function ok() {
    alert("ok")

    // Gerar antes do for um id de venda, sempre que clicado no 'ok', um id de venda novo é gerado
    var userLogado = JSON.parse(localStorage.getItem('user'))

    axios.post(`${url}/register-venda`, {
        user_id: userLogado.id
    })
    .then((response) => {
        let dataVenda = response.data

        for(let i = 0; i < carrinhos.length; i++) {
            if(carrinhos[i] != '') {
                axios.post(`${url}/register-itens-vendas`, {
                    venda_id: dataVenda.id,
                    product_id: carrinhos[i].productId,
                    qnt_product: carrinhos[i].qntEstoque,
                    desconto: 0,
                })
                .then(response => {
                    // Mostrar nota fiscal na tela (valor retornado do response com o registro)
                    let string = ''
                    console.log(response)
                    let dataItensVendas = response.data

                    for(let i = 0; i < dataItensVendas; i++) {
                        string = string + JSON.stringify(dataItensVendas[i])
                    }

                    confirmBox.innerHTML = `
                    <p class='p-logo' >E-COMMERCE</p>
                    <p>Itens comprados com sucesso!</p>
                    <p>${string}</p>
                    <input type='button' value="Fechar" onclick="fechar()">
                    `

                    html.appendChild(confirmDiv)
                    confirmDiv.appendChild(confirmBox)
                
                    confirmDiv.setAttribute('style', 'display: flex')
                })
                .catch(err => {
                    console.log('erro itens vendas')
                    console.log(err)
                })
            }
        }
    })
    .catch((err) => {
        console.log('erro da venda')
        console.log(err)
    })
}

// Caixa de confirmação após clicar em 'Comprar todos'
function confirm() {
    confirmBox.innerHTML = `
    <p class='p-logo' >E-COMMERCE</p>
    <p>Comprar todos os itens do carrinho?</p>
    <input class='confirm-button' type='button' value="Ok" onclick="ok()">
    <input class='cancel-button' type='button' value="Cancelar" onclick="fechar()">
    `
    html.appendChild(confirmDiv)
    confirmDiv.appendChild(confirmBox)

    confirmDiv.setAttribute('style', 'display: flex')
}

function comprar(idProduct) {
    localStorage.removeItem('id-produto')
    localStorage.setItem('id-produto', JSON.stringify(idProduct))
    window.open('/produto.html', '_blank')
}

let main = document.querySelector('#main')
let userMenu = document.createElement('div')

function menu() {
    userMenu.setAttribute('style', 'display: flex')

    userMenu.innerHTML = `
        <div class="user-menu">
            <a id="minha-conta" href="/user.html">minha conta</a>
            <input id="sair-button" type="button" value="sair" onclick="sair()"></input>
        </div>
    `

    main.appendChild(userMenu)

}

function outMenu() {
    userMenu.setAttribute('style', 'display: none')
}

function sair() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('cartAtualizado')
    localStorage.removeItem('id-produto')
    location = '/login.html'
}




    // for(let i = 0; i < carrinhos.length; i++) {
    //     for(let j = 0; j < cartAtualizado.length; j++) {
    //         if(carrinhos[i].productId == cartAtualizado[j].productId) {
    //             carrinhos[i].setEstoque(cartAtualizado[j].qntEstoque)

    //         } else if(carrinhos.length < cartAtualizado.length) {
    //             let ultimoIndice = cartAtualizado.length - 1
    //             let ultimoIndice2 = carrinhos.length - 1

    //             carrinhos.push(new Cart(cartAtualizado[ultimoIndice].productId, cartAtualizado[ultimoIndice].productName))

    //             carrinhos[ultimoIndice2].setEstoque(cartAtualizado[ultimoIndice].qntEstoque)
    //         }
    //     }
    // }


isAuth()
getOneProduct()
