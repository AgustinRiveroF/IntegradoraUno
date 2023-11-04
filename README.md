----------------------------------------------------- GUIA ------------------------------------                                       

// Ruta para crear un carrito (solicitud POST):

http://localhost:8080/api/carts 

// Ruta para agregar un producto a la coleccion products por body (solicitud POST) :

http://localhost:8080/api/products 

{
  "product_name": "Jabon",
  "product_description": "Rexona",
  "product_price": 310
}

// Ruta para agregar un producto a un carrito con (solicitud POST):

http://localhost:8080/api/carts/6541c7fc56446540e44ade05/products/6541c75e56446540e44ade03

                               |  Aca va el id del carrito  ||   |  Aca id del producto  |


// Ruta para eliminar un producto de un carrito (solicitud DELETE) :

http://localhost:8080/api/carts/6541c7fc56446540e44ade05/products/6541c75e56446540e44ade03

                               |  Aca va el id del carrito  ||   |  Aca id del producto  |


// Ruta para eliminar todo lo que tenga un carrito (solicitud DELETE)

http://localhost:8080/api/carts/6541c7fc56446540e44ade05 <------------- : cid

                               | Aca va el id del carrito|


// Ruta para obtener todos los productos de la coleccion products (solicitud GET) con paginate :

limit=number,
page=number,
sort=asc || sort=desc,
query = none

http://localhost:8080/api/products?limit=4&page=2&order=asc


// Ruta para obtener un producto con sus caracteristicas (solicitud GET) :

http://localhost:8080/api/products/65383ec1e365fbf2611b3dd9

// Ruta para obtener todos los carritos que contienen o no productos (solicitud GET) :

http://localhost:8080/api/carts/

// Ruta para obtener los carrittos poblados por su ID (solicitud GET) : 

http://localhost:8080/api/carts/populated/6539aab0ba88a8c5ab103ec5  <--------- :cid



// Hay algunas funciones mas pero basicamente esto era lo que se pedia.