const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
let EmployeeModel = require("../models/EmployeeModel");
exports.registerUser = async (req, res) => {
	let {
		employeeName,
		employeePassword,
		dateOfBirth,
		dateOfJoining,
		designation,
		mailId,
		reportingTo,
		team,
		contactNumber,
		empType,
	} = req.query;

	let employeeId = "emp-" + uuidv4();

	let newEmployee = new EmployeeModel();
	newEmployee.employeePassword = employeePassword;
	newEmployee.employeeId = employeeId;
	newEmployee.employeeName = employeeName;
	newEmployee.dateOfBirth = dateOfBirth;
	newEmployee.dateOfJoining = dateOfJoining;
	newEmployee.designation = designation;
	newEmployee.mailId = mailId;
	newEmployee.reportingTo = reportingTo;
	newEmployee.team = team;
	newEmployee.contactNumber = contactNumber;
	newEmployee.empType = empType;

	let user = await newEmployee.save();
	console.log(user);
	res.status(200).send({ data: user });
};

exports.loginUser = async (req, res) => {
	let { employeeName, employeePassword } = req.query;

	let user = await EmployeeModel.findOne({ employeeName, employeePassword });

	if (!user) {
		res.status(400).json({ message: "No user found" });
	} else {
		res.status(200).json({ key: user.employeeId });
	}
};

exports.updateUser = async (req, res) => {
	let {
		employeeName,
		dateOfBirth,
		dateOfJoining,
		designation,
		mailId,
		reportingTo,
		team,
		contactNumber,
		empType,
	} = req.query;

	let { employeeId } = req.params;


	let user = await EmployeeModel.updateOne(
		{ employeeId },
		{ dateOfBirth, dateOfJoining, contactNumber }
	);
	res.status(200).send({ data: user ,update:employeeId});
};

exports.getUser = async (req, res) => {
	let { employeeId } = req.params;
	let user = await EmployeeModel.findOne({ employeeId });
	res.status(200).send({ data: user });
};

exports.findUser = async (req, res) => {
	let { name } = req.params;
	let users = await EmployeeModel.find({
		employeeName: { $regex: name, $options: "i" },
	});
	res.status(200).send({ data: users });
};

exports.fetchTeam = async (req, res) => {
	let { employeeId } = req.params;
	let fetchUserData = await EmployeeModel.findOne({
		employeeId,
	});

	let { empType } = fetchUserData;

	let teamMembers = [];

	if (empType === "productManager") {
		let teamLeads = await EmployeeModel.find({ reportingTo: employeeId });
		let teamLeadIds = teamLeads.map((t) => t.employeeId);

		let developers = await EmployeeModel.find({
			reportingTo: { $in: teamLeadIds },
		});
		teamMembers = teamLeads.concat(...developers);
	}
	if (empType === "teamLead") {
		let developers = await EmployeeModel.find({ reportingTo: employeeId });

		teamMembers = developers;
	}

	res.status(200).send({ data: teamMembers });
};

exports.fetchAll = async (req, res) => {
	let fetchUserData = await EmployeeModel.find();
	res.status(200).send({ data: fetchUserData });
};
