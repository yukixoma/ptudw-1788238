const express = require("express");
const expressHbs = require("express-handlebars");

const app = express();

// Body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Session
const session = require("express-session");
app.use(
  session({
    cookie: { httpOnly: true, maxAge: 30 * 24 * 60 * 1000 },
    secret: "s3cret",
    resave: false,
    saveUninitialized: false
  })
);

// Cart controller
const Cart = require("./controllers/cartController");
app.use((req, res, next) => {
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  req.session.cart = cart;
  res.locals.totalQuantity = cart.totalQuantity;
  next();
});

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
    createPagination: hbsPaginate.createPagination,
    roundNumber: helper.roudNumber
  }
});

app.use(express.static(__dirname + "/public"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// routes

const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);
const productRouter = require("./routes/productRouter");
app.use("/products", productRouter);
const cartRouter = require("./routes/cartRouter");
app.use("/cart", cartRouter);
const commentRouter = require("./routes/commentRouter");
app.use("/comments", commentRouter);
const reviewRouter = require("./routes/reviewRouter");
app.use("/reviews", reviewRouter);

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
