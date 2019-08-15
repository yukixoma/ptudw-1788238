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

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/:page", (req, res) => {
  const { page } = req.params;
  res.render(`${page}`, {
    banner: `${page}`
  });
});



app.listen(3000 || process.env.PORT);
