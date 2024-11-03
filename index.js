const express = require("express");
const cors = require("cors");
const db = require("./models");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const templateRoutes = require("./routes/templateRoutes");
const formRoutes = require("./routes/formRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/forms", formRoutes);

db.sequelize
  .sync({ force: false })
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((err) => console.log("Faild to connect DB: ", err));
