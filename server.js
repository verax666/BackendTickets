const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();
const app = express();
const botAlta = require("./config/bot_alta.config");
const bot = botAlta.bot;
const db = require("./models");
const Vendedor = db.dbAltCte.vendedor;

db.dbpreAlta.dbpreAlta.sync({ force: false }).then(() => {
  //console.log("Drop and re-sync db.");
  bot.onText(/\/lista (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    Vendedor.findAll({
      attributes: ['id_vendedor', 'nombre'],
      paranoid: false,
    }).then(r => {
      const chatId = msg.chat.id;
      const resp = match[1]; // the captured "whatever"
      // send back the matched "whatever" to the chat
      console.log(JSON.stringify(r, null, 2));
      let s = JSON.stringify(r, null, 2);
      console.log(r.get({ plain: true }));
      bot.sendMessage(chatId, "Id: " + JSON.stringify(s.id_vendedor, null, 2) + "Nombre: " + JSON.stringify(s.nombre, null, 2) + "\n Porvafor Escriba /alta su id:\n Ejemplo /alta 3")

    });
  });
  bot.onText(/\/alta (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });

});
// db.dbAltCte.dbAltCte.sync({ force: false }).then(() => {

// });
var whitelist = ['http://localhost:8000', 'http://localhost', 'localhost']

let local = "";
// origin: ""

var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)

  }
};

app.use(cors(corsOptions));


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
})

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application in DOCKER." });
});
//routes
require("./routes/client.routes")(app)
require("./routes/vendedor.routes")(app)



// require('./routes/auth.routes')(app);
// require('./routes/order.routes')(app);
// require("./routes/restaurant.routes")(app);
// require("./routes/menu.routes")(app);
// User.destroy({ truncate: { cascade: true } });
// Group.destroy({ truncate: { cascade: true } });
// Restaurant.destroy({ truncate: { cascade: true } });
// Product.destroy({ truncate: { cascade: true } });
// User.create({
//   email: "graa@bit.com",
//   userId: "O0DSH9Uj74VYLrhaw5zcK4xUfwi2"
// });
// User.create({
//   email: "r@h.com",
//   userId: "NlpztduCRvSXjhMZh6U48j5e9za2"
// });
// User.create({
//   email: "maya2@maya2",
//   userId: "qwerty"
// });
// // Group.create({
// //   name: "Los Chidos",
// //   userId: 1,
// //   ownerId: 1
// // });

// Section.create({ id: 1, name: "Pizzas", order: 1 });
// Section.create({ id: 2, name: "Espaguetis", order: 2 });
// Section.create({ id: 3, name: "Papas", order: 3 });

// KindOfFood.create({ category: "American" });
// KindOfFood.create({ category: "Argentinian" });
// KindOfFood.create({ category: "Asian" });
// KindOfFood.create({ category: "Austrian" });
// KindOfFood.create({ category: "Bakery" });
// KindOfFood.create({ category: "Brazilian" });
// KindOfFood.create({ category: "Breakfast" });
// KindOfFood.create({ category: "British" });
// KindOfFood.create({ category: "Buffet" });
// KindOfFood.create({ category: "Burgers" });
// KindOfFood.create({ category: "Burritos" });
// KindOfFood.create({ category: "Caribbean" });
// KindOfFood.create({ category: "Chicken" });
// KindOfFood.create({ category: "Chilean" });
// KindOfFood.create({ category: "Chinese" });
// KindOfFood.create({ category: "Coffee" });
// KindOfFood.create({ category: "Colombian" });
// KindOfFood.create({ category: "Crepes" });
// KindOfFood.create({ category: "Cuban" });
// KindOfFood.create({ category: "Dessert" });
// KindOfFood.create({ category: "European" });
// KindOfFood.create({ category: "Fast Food" });
// KindOfFood.create({ category: "Fondue" });
// KindOfFood.create({ category: "French" });
// KindOfFood.create({ category: "Fusion" });
// KindOfFood.create({ category: "German" });
// KindOfFood.create({ category: "Gourmet" });
// KindOfFood.create({ category: "Greek" });
// KindOfFood.create({ category: "Hawaiian" });
// KindOfFood.create({ category: "Healthy" });
// KindOfFood.create({ category: "Indian" });
// KindOfFood.create({ category: "International" });
// KindOfFood.create({ category: "Italian" });
// KindOfFood.create({ category: "Japanese" });
// KindOfFood.create({ category: "Juices" });
// KindOfFood.create({ category: "Korean" });
// KindOfFood.create({ category: "Mexican" });
// KindOfFood.create({ category: "Middle Eastern" });
// KindOfFood.create({ category: "Molecular Gastronomy" });
// KindOfFood.create({ category: "Moroccan" });
// KindOfFood.create({ category: "Pasta" });
// KindOfFood.create({ category: "Peruvian" });
// KindOfFood.create({ category: "Pizza" });
// KindOfFood.create({ category: "Portuguese" });
// KindOfFood.create({ category: "Salads" });
// KindOfFood.create({ category: "Sandwiches" });
// KindOfFood.create({ category: "Seafood" });
// KindOfFood.create({ category: "Skewers" });
// KindOfFood.create({ category: "Soups" });
// KindOfFood.create({ category: "South American" });
// KindOfFood.create({ category: "Spanish" });
// KindOfFood.create({ category: "Steakhouse" });
// KindOfFood.create({ category: "Swiss" });
// KindOfFood.create({ category: "Tacos" });
// KindOfFood.create({ category: "Tea" });
// KindOfFood.create({ category: "Teppanyaki" });
// KindOfFood.create({ category: "Thai" });
// KindOfFood.create({ category: "Vegan" });
// KindOfFood.create({ category: "Vegeterian" });
// KindOfFood.create({ category: "Venezuelan" });
// KindOfFood.create({ category: "Vietnamese" });
// KindOfFood.create({ category: "Winery" });
// KindOfFood.create({ category: "Wings" });

// Restaurant.create({
//   id: 2,
//   name: "Tacos Don Pancho",
//   userId: "O0DSH9Uj74VYLrhaw5zcK4xUfwi2",
//   type: "Restaurante",
//   logo: 'https://app.tacoguru.com/wp-content/uploads/2016/10/Tacos-Don-Pancho.jpg',
//   category: 'Tacos',
//   preparationTime: 15,
//   priceRange: 1,
//   isFavorite: false
// }).then(function (restaurant) {
//   Product.create({
//     name: "Tacos de Chile",
//     price: "15.00",
//     description: "el taco mas rico de PANCHOO",
//     restaurantId: 1
//   });
//   Product.create({
//     name: "Tacos de Deshebrada",
//     price: "12.00",
//     description: "el taco mas rico de PANCHOO",
//     restaurantId: 1
//   });
// });
// Restaurant.create({
//   id: 1,
//   userId: "O0DSH9Uj74VYLrhaw5zcK4xUfwi2",
//   name: "MP Mutcha Pizza",
//   type: "Restaurante",
//   mobile_phone: "8122877828",
//   email: "contacto@mutchapizza.com.mx",
//   logo: "http://mutchapizza.com.mx/ftparturog/images/logo.png",
//   category: 'Pizzas',
//   preparationTime: 20,
//   priceRange: 3,
//   isFavorite: true,
//   restaurant_menu: [
//     {
//       name: "Pizza Rellena Mediana",
//       price: 149,
//       description: "Pizza en forma de pay, rellena de carme boloñesa, jamon, queso gouda importado, salami, champiñones, pimientos y cebolla. Horneada a la perfeccion, bañada en salsa italiana y queso mozzarrella.",
//       photo: "https://d1ralsognjng37.cloudfront.net/493bda39-5ecb-450b-9134-7a44f17834fb.jpeg",
//       sectionId: 1,
//       order: 1
//     },
//     {
//       name: "Pizza Rellena Grande",
//       price: 299,
//       description: "Pizza en forma de pay, rellena de carme boloñesa, jamon, queso gouda importado, salami, champiñones, pimientos y cebolla. Horneada a la perfeccion, bañada en salsa italiana y queso mozzarrella.",
//       photo: "https://d1ralsognjng37.cloudfront.net/493bda39-5ecb-450b-9134-7a44f17834fb.jpeg",
//       sectionId: 1,
//       order: 2
//     },
//     {
//       name: "Pizza Original Chica",
//       price: 39,
//       description: "1 Ingrediente",
//       photo: "https://d1ralsognjng37.cloudfront.net/e82950db-2433-4ff4-b2e9-c2df28773602.jpeg",
//       sectionId: 1,
//       order: 3
//     },
//     {
//       name: "Pizza Original X-Grande",
//       price: 99,
//       description: "1 Ingrediente",
//       photo: "https://d1ralsognjng37.cloudfront.net/e82950db-2433-4ff4-b2e9-c2df28773602.jpeg",
//       sectionId: 1,
//       order: 4
//     },
//     {
//       name: "Pizza Original X-Grande Especialidad",
//       price: 149,
//       description: "Especialidad",
//       photo: "https://d1ralsognjng37.cloudfront.net/e82950db-2433-4ff4-b2e9-c2df28773602.jpeg",
//       sectionId: 1,
//       order: 5
//     },
//     {
//       name: "Pizza Chicago Style X-Grande",
//       price: 169,
//       description: "1 Ingrediente",
//       photo: "https://d1ralsognjng37.cloudfront.net/11f21c14-2456-451d-a44e-a30875e6f9f3.jpeg",
//       sectionId: 1,
//       order: 6
//     },
//     {
//       name: "Espaguetis Italiano",
//       price: 35,
//       description: "Bañado de salsa italiana roja",
//       photo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png",
//       sectionId: 2,
//       order: 7
//     },
//     {
//       name: "Espaguetis Boloñesa",
//       price: 49,
//       description: "Con salsa y carne boloñesa",
//       photo: "https://d1ralsognjng37.cloudfront.net/26946b4d-f4a3-4588-b39c-fcd75368ae64.jpeg",
//       sectionId: 2,
//       order: 8
//     },
//     {
//       name: "Espaguetis Gratinado",
//       price: 49,
//       description: "Con salsa y queso Gouda importado",
//       photo: "https://d1ralsognjng37.cloudfront.net/26946b4d-f4a3-4588-b39c-fcd75368ae64.jpeg",
//       sectionId: 2,
//       order: 9
//     },
//     {
//       name: "Espaguetis Mutcha",
//       price: 55,
//       description: "Con salsa roja, champiñones, carne y queso.",
//       photo: "https://d1ralsognjng37.cloudfront.net/26946b4d-f4a3-4588-b39c-fcd75368ae64.jpeg",
//       sectionId: 2,
//       order: 10
//     },
//     {
//       name: "Papasolas",
//       price: 39,
//       description: "Papasolas",
//       photo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png",
//       sectionId: 3,
//       order: 11
//     },
//     {
//       name: "PapaNachos",
//       price: 55,
//       description: "PapaNachos",
//       photo: "https://d1ralsognjng37.cloudfront.net/93d652ab-c793-4bbf-b001-63d5066bf092.jpeg",
//       sectionId: 3,
//       order: 12
//     }
//   ],
//   branches: [
//     {
//       id: 1,
//       name: "MP Mutcha Pizza Lincon",
//       phone: "81105363",
//       manager: "Pancho Juarez",
//       latitude: "25.725697156471217",
//       longitude: "-100.36752328248943",
//       preparationTime: 20,
//       score: 4.1,
//       distance: 2.5,
//       branch_addresses: [{
//         street: "Av Lincoln",
//         number_internal: "7e",
//         number_external: "5252",
//         building: "HEB Lincoln",
//         suburb: "Ampliación San Jorge",
//         postal_code: 64330,
//         city: "Monterrey"
//       }],
//       branch_business_hours: [
//         {
//           dayofweek: "Monday",
//           numdayofweek: 1,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Tuesday",
//           numdayofweek: 2,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Wednesday",
//           numdayofweek: 3,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Thursday",
//           numdayofweek: 4,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Friday",
//           numdayofweek: 5,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Saturday",
//           numdayofweek: 6,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Sunday",
//           numdayofweek: 0,
//           openTime: '12:00',
//           closeTime: "22:00"
//         }
//       ]
//     },
//     {
//       id: 2,
//       name: "MP Mutcha Acapulco",
//       phone: "8183414434",
//       manager: "Alex Montoya",
//       latitude: "25.72375637953416",
//       longitude: "-100.19574902082144",
//       preparationTime: 20,
//       score: 4.5,
//       distance: 2.5,
//       branch_addresses: [{
//         street: "Blvd. Acapulco",
//         number_external: "402",
//         building: "Plaza Platino",
//         suburb: "Arboledas de Acapulco",
//         postal_code: 64330,
//         city: "Guadalupe"
//       }],
//       branch_business_hours: [
//         {
//           dayofweek: "Monday",
//           numdayofweek: 1,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Tuesday",
//           numdayofweek: 2,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Wednesday",
//           numdayofweek: 3,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Thursday",
//           numdayofweek: 4,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Friday",
//           numdayofweek: 5,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Saturday",
//           numdayofweek: 6,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Sunday",
//           numdayofweek: 0,
//           openTime: '12:00',
//           closeTime: "22:00"
//         }
//       ]
//     },
//     {
//       id: 3,
//       name: "MP Mutcha Escobedo",
//       phone: "8183072520",
//       manager: "Karen Higadera",
//       latitude: "25.7925715436008",
//       longitude: "-100.33505160235624",
//       preparationTime: 18,
//       score: 3.9,
//       distance: 7.4,
//       branch_addresses: [{
//         street: "Raúl Salinas",
//         number_external: "800",
//         suburb: "Paseo Real 1er. Sector",
//         postal_code: 65330,
//         city: "Escobedo"
//       }],
//       branch_business_hours: [
//         {
//           dayofweek: "Monday",
//           numdayofweek: 1,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Tuesday",
//           numdayofweek: 2,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Wednesday",
//           numdayofweek: 3,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Thursday",
//           numdayofweek: 4,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Friday",
//           numdayofweek: 5,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Saturday",
//           numdayofweek: 6,
//           openTime: '12:00',
//           closeTime: "22:00"
//         },
//         {
//           dayofweek: "Sunday",
//           numdayofweek: 0,
//           openTime: '12:00',
//           closeTime: "22:00"
//         }
//       ]
//     }
//   ]
// }, {
//   include: [
//     { model: Product, as: "restaurant_menu" },
//     {
//       model: Branch, as: "branches",
//       include: [
//         { model: Branch_address, as: "branch_addresses" },
//         { model: Branch_business_hour, as: "branch_business_hours" }
//       ]
//     }
//   ]
// }
// ).then(function (restaurant) {
//   restaurant.setKindoffoods([33, 43]);
//   Section.update({ restaurantId: 1 },
//     { where: { restaurantId: null } }
//   );
//   Branch.findByPk(1)
//     .then(branch => {
//       Branches_products.bulkCreate([
//         {
//           branchId: 1,
//           productId: 1,
//           isActive: true
//         },
//         {
//           branchId: 1,
//           productId: 2,
//           isActive: true
//         },
//         {
//           branchId: 1,
//           productId: 3,
//           isActive: false
//         },
//         {
//           branchId: 1,
//           productId: 4,
//           isActive: false
//         },
//         {
//           branchId: 1,
//           productId: 5,
//           isActive: true
//         },
//         {
//           branchId: 1,
//           productId: 6,
//           isActive: true
//         },
//         {
//           branchId: 1,
//           productId: 7,
//           isActive: false
//         },
//         {
//           branchId: 1,
//           productId: 8,
//           isActive: false
//         },
//         {
//           branchId: 1,
//           productId: 9,
//           isActive: true
//         },
//         {
//           branchId: 1,
//           productId: 10,
//           isActive: false
//         },
//         {
//           branchId: 1,
//           productId: 11,
//           isActive: true
//         },
//         {
//           branchId: 1,
//           productId: 12,
//           isActive: true
//         },]
//       );
//     });
//   //Branches_products.create({ productId: 1, branchId: 1, isActive: true });
// });

// Restaurant.create({
//   id: 3,
//   userId: "O0DSH9Uj74VYLrhaw5zcK4xUfwi2",
//   name: "MP Mutcha Pizza v2",
//   type: "Restaurante",
//   mobile_phone: "8122877828",
//   email: "contacto@mutchapizza.com.mx",
//   logo: "http://mutchapizza.com.mx/ftparturog/images/logo.png",
//   category: 'Pizzas',
//   preparationTime: 30,
//   priceRange: 2,
//   isFavorite: false
// });
// Restaurant.create({
//   id: 4,
//   userId: "O0DSH9Uj74VYLrhaw5zcK4xUfwi2",
//   name: "Las matonas",
//   type: "Restaurante",
//   mobile_phone: "8122877828",
//   email: "contacto@mutchapizza.com.mx",
//   logo: "https://image.freepik.com/vector-gratis/plantilla-logo-comida-organica_23-2147492558.jpg",
//   category: 'Burgers',
//   preparationTime: 20,
//   priceRange: 0,
//   isFavorite: true
// });
// Product.create({
//   name: "Pizza Tradicional X-Grande",
//   price: "99.00",
//   description: "Con Italianisima salsa y queso mozarella"
// });





// Product.create({ name: "Pizza Rellena Mediana", price: 149, description: "Pizza en forma de pay, rellena de carme boloñesa, jamon, queso gouda importado, salami, champiñones, pimientos y cebolla. Horneada a la perfeccion, bañada en salsa italiana y queso mozzarrella.", photo: "https://d1ralsognjng37.cloudfront.net/493bda39-5ecb-450b-9134-7a44f17834fb.jpeg", restaurantId: 2 });
// Product.create({ name: "Pizza Rellena Grande", price: 299, description: "Pizza en forma de pay, rellena de carme boloñesa, jamon, queso gouda importado, salami, champiñones, pimientos y cebolla. Horneada a la perfeccion, bañada en salsa italiana y queso mozzarrella.", photo: "https://d1ralsognjng37.cloudfront.net/493bda39-5ecb-450b-9134-7a44f17834fb.jpeg", restaurantId: 2 });
// Product.create({ name: "Pizza Original Chica", price: 39, description: "1 Ingrediente", photo: "https://d1ralsognjng37.cloudfront.net/e82950db-2433-4ff4-b2e9-c2df28773602.jpeg", restaurantId: 2 });
// Product.create({ name: "Pizza Original X-Grande", price: 99, description: "1 Ingrediente", photo: "https://d1ralsognjng37.cloudfront.net/e82950db-2433-4ff4-b2e9-c2df28773602.jpeg", restaurantId: 2 });
// Product.create({ name: "Pizza Original X-Grande Especialidad", price: 149, description: "Especialidad", photo: "https://d1ralsognjng37.cloudfront.net/e82950db-2433-4ff4-b2e9-c2df28773602.jpeg", restaurantId: 2 });
// Product.create({ name: "Pizza Chicago Style X-Grande", price: 169, description: "1 Ingrediente", photo: "https://d1ralsognjng37.cloudfront.net/11f21c14-2456-451d-a44e-a30875e6f9f3.jpeg", restaurantId: 2 });
// Product.create({ name: "Espaguetis Italiano", price: 35, description: "Bañado de salsa italiana roja", photo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png", restaurantId: 2 });
// Product.create({ name: "Espaguetis Boloñesa", price: 49, description: "Con salsa y carne boloñesa", photo: "https://d1ralsognjng37.cloudfront.net/26946b4d-f4a3-4588-b39c-fcd75368ae64.jpeg", restaurantId: 2 });
// Product.create({ name: "Espaguetis Gratinado", price: 49, description: "Con salsa y queso Gouda importado", photo: "https://d1ralsognjng37.cloudfront.net/26946b4d-f4a3-4588-b39c-fcd75368ae64.jpeg", restaurantId: 2 });
// Product.create({ name: "Espaguetis Mutcha", price: 55, description: "Con salsa roja, champiñones, carne y queso.", photo: "https://d1ralsognjng37.cloudfront.net/26946b4d-f4a3-4588-b39c-fcd75368ae64.jpeg", restaurantId: 2 });
// Product.create({ name: "Papasolas", price: 39, description: "Papasolas", photo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png", restaurantId: 2 });
// Product.create({ name: "PapaNachos", price: 55, description: "PapaNachos", photo: "https://d1ralsognjng37.cloudfront.net/93d652ab-c793-4bbf-b001-63d5066bf092.jpeg", restaurantId: 2 });


// models.User.find({ where: { first_name: 'john' } }).on('success', function (user) {
//   models.City.find({ where: { id: 10 } }).on('success', function (city) {
//     user.setCities([city]);
//   });
// });
// }

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});