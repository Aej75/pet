const express = require("express");

const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv/config");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//IMPORT routes

const postRoute = require("./routes/posts");

const userRoute = require("./routes/auth/register");

const petRegisterRoute = require("./routes/pets/pet");


const loginRoute = require("./routes/auth/login");

const profileRoute = require("./routes/user_profile");

const promotionRoute = require("./routes/promotions/promotion");


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/auth", loginRoute);
app.use("/profile", profileRoute);
app.use("/auth", userRoute);
// app.use("/", postRoute);
app.use("/pet", petRegisterRoute);
app.use("/promotion", promotionRoute);
//connection to DATabase


mongoose
  .connect('mongodb+srv://Hydrush:Ajayasth75@cluster0.hqfa4nj.mongodb.net/pet', { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB!!");
  });

//Listen
app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));
