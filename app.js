const express = require("express");

const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv/config");

app.use(bodyParser.json());

//IMPORT routes

const postRoute = require("./routes/posts");

const userRoute = require("./routes/auth/register");

const petRegisterRoute = require("./routes/pets/pet");


const loginRoute = require("./routes/auth/login");

const profileRoute = require("./routes/user_profile");

app.use("/auth", loginRoute);
app.use("/profile", profileRoute);
app.use("/auth", userRoute);
app.use("/", postRoute);
app.use("/pet", petRegisterRoute);

//connection to DATabase

mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB!!");
  });

//Listen
app.listen(3000);
