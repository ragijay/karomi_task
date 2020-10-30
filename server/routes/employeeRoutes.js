let router = require("express").Router();
let userEndPoint = require("../controllers/employeeController");

router.get("/add", userEndPoint.registerUser);
router.get("/login", userEndPoint.loginUser);
router.get("/:employeeId/update", userEndPoint.updateUser);
router.get("/:name/find", userEndPoint.findUser);
router.get("/:employeeId/team", userEndPoint.fetchTeam);
router.get("/all", userEndPoint.fetchAll);
router.get("/:employeeId", userEndPoint.getUser);

module.exports = router;
