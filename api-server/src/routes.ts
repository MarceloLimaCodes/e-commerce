import { Router } from "express"
import { CreateUserController, GetUserController, UpdateUserController, DeleteUserController } from "./controller/UserController"
import { CreateCategoryController, ReadCategoriesController, UpdateCategoryController, DeleteCategoryController } from "./controller/CategoryController"
import { CreateProductController, ReadProductsController, UpdateProductController, DeleteProductController } from "./controller/ProductController"
import { CreateVendaController, ReadVendasController, DeleteVendaController } from "./controller/VendaController"
import { CreateItensVendasController, ReadAllItensVendasController, DeleteItensVendasController } from "./controller/ItensVendasController"
import { AuthController } from "./controller/AuthController"

const routes = Router()

// User Routes:
routes.get('/user', new GetUserController().handle)
routes.post('/register', new CreateUserController().handle)
routes.put('/user/:id', new UpdateUserController().handle)
routes.delete('/user/:id', new DeleteUserController().handle)

// Category Routes:
routes.post('/register-category', new CreateCategoryController().handle)
routes.get('/categories', new ReadCategoriesController().handle)
routes.put('/categories/:id', new UpdateCategoryController().handle)
routes.delete('/categories/:id', new DeleteCategoryController().handle)

// Product Routes:
routes.post('/register-product', new CreateProductController().handle)
routes.get('/product', new ReadProductsController().handle)
routes.put('/product/:id', new UpdateProductController().handle)
routes.delete('/product/:id', new DeleteProductController().handle)

// Venda Routes:
routes.post('/register-venda', new CreateVendaController().handle)
routes.get('/venda', new ReadVendasController().handle)
routes.delete('/venda/:id', new DeleteVendaController().handle)

// ItensVendas Routes:
routes.post('/register-itens-vendas', new CreateItensVendasController().handle)
routes.get('/itens-vendas', new ReadAllItensVendasController().handle)
routes.delete('/itens-vendas/:venda_id', new DeleteItensVendasController().handle)

// Auth:
routes.post('/auth', new AuthController().handle)

export { routes }


// response.header("Access-Control-Allow-Origin", "*")