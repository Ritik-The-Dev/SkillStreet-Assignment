const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database.js");
const router = require("./route.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json"); // Adjust the path as needed

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

// Serve Swagger UI with your separate Swagger JSON file
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("This is a SkillStreet Api Assignment");
});
