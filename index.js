const express = require("express");
const expressHbs = require("express-handlebars");

const app = express();

// View engine
const helper = require("./controllers/helper");
const hbsPaginate = require("express-handlebars-paginate");

const hbs = expressHbs.create({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views/layouts",
  partialsDir: __dirname + "/views/partials",
  helpers: {
    createStarList: helper.createStarList,
    createStars: helper.createStars,
    createPagination: hbsPaginate.createPagination
  }
});

app.use(express.static(__dirname + "/public"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// routes
const productRouter = require("./routes/productRouter");
const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);
app.use("/products", productRouter);

app.get("/:page", (req, res) => {
  const { page } = req.params;
  res.render(`${page}`);
});

// Sync database
app.get("/sync", (req, res) => {
  const models = require("./models");
  models.sequelize.sync().then(() => res.send("database synced"));
});

app.listen(process.env.PORT || 3000);
