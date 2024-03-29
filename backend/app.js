const express =  require('express')
const PORT = process.env.PORT || 5050;
const app = express();


const propertyRoutes = require('./routes/propertyRoutes')
const cors=require('cors')

require('dotenv').config()
app.use(cors());
app.use(express.json());

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.ATLAS_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use("/api/properties", propertyRoutes);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});