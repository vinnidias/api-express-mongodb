//config inicial 

require('dotenv/config');
import express from "express";
import mongoose from "mongoose";

const customerRoutes = require("./routes/customerRoutes")


const app = express();

const dbKey = process.env.DB_KEY
const dbUser = process.env.DB_USER

const port = process.env.PORT || 3000;

//Lendo JSON / middlewares

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

app.use("/customer", customerRoutes)


// rota inicial/enpoint



app.get("/", (req, res) => {
  res.json({ message: "Hello world" })

})

//mogo db conection 

//

//eviar a porta
mongoose.connect(`mongodb+srv://${dbUser}:${dbKey}@cluster0.nbr0s.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(port);
    console.log("mongodb is connected")
  })
  .catch((err) => console.log("mongodb connect fail:", err))

