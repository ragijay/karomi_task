let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let moment = require("moment");
let mongoose = require("mongoose");
let employeeRoue = require("./routes/employeeRoutes");

let app = express();
let router = express.Router();

let mongo_url =
	"mongodb+srv://user1:karomipassword@cluster0.qtuoi.mongodb.net/hrdb?retryWrites=true&w=majority";

mongoose
	.connect(mongo_url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(console.log("mongo started!!"))
	.catch((err) => console.log(err));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use("/api", router);
app.use("/api/employee", employeeRoue);

app.listen(8081);
