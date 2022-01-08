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
Route.post("/singup", "UserController.singup");

Route.group(() => {

  //Usuario
  Route.put("/users/:id", "UserController.update");
  Route.get("/user", "UserController.index");
  Route.get("/me", "UserController.me");
  Route.put("/updateUser", "UserController.updateProfile");
  Route.delete("/deleteUser/:id", "UserController.destroy");
  Route.get("/indexOfUser/:id", "UserController.showUser");

  //Pessoa
  Route.post("/createPeople", "PersonController.create");
  Route.get("/people", "PersonController.index");
  Route.put("/updatePeople/:id", "PersonController.updateProfile");
  Route.delete("/deletePeople/:id", "PersonController.destroy");
  Route.get("/indexOfPeople/:id", "PersonController.showPeople");

  //Funcionario
  Route.post("/createEmployee", "EmployeeController.create");
  Route.get("/employee", "EmployeeController.index");
  Route.put("/updateEmployee/:id", "EmployeeController.updateProfile");
  Route.delete("/deleteEmployee/:id", "EmployeeController.destroy");
  Route.get("/indexOfEmployee/:id", "EmployeeController.showEmployee");

  //Cargo Funcionario 
  Route.post("/createEmployeeFunction", "EmploymentFunctionController.create");
  Route.get("/employeeFunction", "EmploymentFunctionController.index");
  Route.put("/updateEmployeeFunction/:id", "EmploymentFunctionController.update");
  Route.delete("/deleteEmployeeFunction/:id", "EmploymentFunctionController.destroy");
  Route.get("/indexOfEmployeeFunction/:id", "EmploymentFunctionController.showEmploymentfunctions");
  
  //Cliente
  Route.post("/createClient", "ClientController.create");
  Route.get("/client", "ClientController.index");
  Route.put("/updateClient/:id", "ClientController.update");
  Route.delete("/deleteClient/:id", "ClientController.destroy");
  Route.get("/indexOfClient/:id", "ClientController.showClient");

  //Imobiliario
  Route.post("/createProperty", "PropertyController.create");
  Route.get("/property", "PropertyController.index");
  Route.put("/updateProperty/:id", "PropertyController.update");
  Route.delete("/deleteProperty/:id", "PropertyController.destroy");
  Route.get("/indexOfProperty/:id", "PropertyController.showProperty");
  Route.get("/propertyData/:id", "PropertyController.show");

  //Terreno
  Route.post("/createTerrain", "PropertyTerrainController.create");
  Route.get("/terrain", "PropertyTerrainController.index");
  Route.put("/updateTerrain/:id", "PropertyTerrainController.update");
  Route.delete("/deleteTerrain/:id", "PropertyTerrainController.destroy");
  Route.get("/indexOfTerrain/:id", "PropertyTerrainController.showTerrain");

  //Casa
  Route.post("/createHouse", "PropertyHouseController.create");
  Route.get("/house", "PropertyHouseController.index");
  Route.put("/updateHouse/:id", "PropertyHouseController.update");
  Route.delete("/deleteHouse/:id", "PropertyHouseController.destroy");
  Route.get("/indexOfHouse/:id", "PropertyHouseController.showHouse");

  //Apartamento
  Route.post("/createApartment", "PropertyHouseApartmentController.create");
  Route.get("/apartment", "PropertyHouseApartmentController.index");
  Route.put("/updateApartment/:id", "PropertyHouseApartmentController.update");
  Route.delete("/deleteApartment/:id", "PropertyHouseApartmentController.destroy");
  Route.get("/indexOfApartment/:id", "PropertyHouseApartmentController.showApartment");

  //Sala Comercial
  Route.post("/createComercial", "PropertyComercialRoomController.create");
  Route.get("/comercial", "PropertyComercialRoomController.index");
  Route.put("/updateComercial/:id", "PropertyComercialRoomController.update");
  Route.delete("/deleteComercial/:id", "PropertyComercialRoomController.destroy");
  Route.get("/indexOfComercial/:id", "PropertyComercialRoomController.showComercialRoom");

  Route.post("/createPhoto/:id/photo", "PropertyPhotoController.create");
  Route.get("/photo", "PropertyPhotoController.index");
  Route.put("/updatePhoto/:id", "PropertyPhotoController.update");
  Route.delete("/deletePhoto/:id", "PropertyPhotoController.destroy");
  Route.get("/indexOfPhoto/:id", "PropertyPhotoController.showPhoto");

  Route.post("/createPayment", "PaymentMethodController.create");
  Route.get("/Payment", "PaymentMethodController.index");
  Route.put("/updatePayment/:id", "PaymentMethodController.update");
  Route.delete("/deletePayment/:id", "PaymentMethodController.destroy");
  Route.get("/indexOfPayment/:id", "PaymentMethodController.show");

  Route.post("/createIndication", "IndicationController.create");
  Route.get("/Indication", "IndicationController.index");
  Route.put("/updateIndication/:id", "IndicationController.update");
  Route.delete("/deleteIndication/:id", "IndicationController.destroy");
  Route.get("/indexOfIndication/:id", "IndicationController.show");

  Route.post("/createSale", "TransactionController.createSale");
  Route.post("/createRent", "TransactionController.createRent");
  Route.get("/transaction", "TransactionController.index");
  Route.put("/updateTransaction/:id", "TransactionController.update");
  Route.delete("/deleteTransaction/:id", "TransactionController.destroy");
  Route.get("/indexOfTransaction/:id", "TransactionController.show");



}).middleware(["auth:jwt"]);






