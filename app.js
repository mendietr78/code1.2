const path = require("path");
const express = require("express");
const session = require('express-session');
const morgan = require("morgan");
require('dotenv').config();


// Configuración de la aplicación Express
const app = express();
const indexRoutes = require("./src/routes/index");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
// const mongoose = require("mongoose");
// const URI = process.env.MONGODB_URI;
// mongoose.connect(URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log("Conexión exitosa a la base de datos");
//   })
//   .catch(error => {
//     console.log("Error al conectar a la base de datos:", error);
//   });

  // Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: MONGODB_URI }),
//   })
// );

// Routes
app.use("/", indexRoutes);


// Start server (type: npm run dev)
app.listen(app.get("port"), () =>
{
    console.log("Server on port " + app.get("port"));
});

const bodyParser = require('body-parser');

// ...

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// const URI = require('../Rapqp/src/routes/index');
// console.log(URI)

// const mongoose = require("mongoose");
//   async function connectToDatabase()
//     {mongoose
//       .connect(URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then(() => {
//         console.log("Conexión exitosa a la base de datos");
//       })
//       .catch((error) => {
//         console.log("Error al conectar a la base de datos:", error);
//       });
//   }
//     connectToDatabase();