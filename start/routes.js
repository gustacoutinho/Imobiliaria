'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Tá funcinando a bagaça' }
})
Route.post("/login", "UserController.login");
Route.post("/users", "UserController.singup");

Route.group(() => {
  Route.put("/users/:id", "UserController.update");
  Route.put("/profile", "UserController.updateProfile");
  Route.get("/users", "UserController.index");
}).middleware(["auth:jwt"]);






