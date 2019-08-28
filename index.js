const express = require("express");
const expressHbs = require("express-handlebars");

const app = express();
const hbs = expressHbs.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials"
});

app.use(express.static(__dirname + "/public"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// routes

const productRouter = require("./routes/productRouter");
const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);
app.use("/products", productRouter);

app.get("/sync", (req, res) => {
  const models = require("./models");
  models.sequelize.sync().then(() => res.send("database synced"));
});

app.listen(process.env.PORT || 3000);
