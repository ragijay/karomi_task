var userName = document.getElementById("username");
var designation = document.getElementById("designation");

var firstName = document.getElementById("fname");
var dateOfBirth = document.getElementById("dob");
var dateOfJoining = document.getElementById("doj");
var designationInput = document.getElementById("designationInput");
var mailId = document.getElementById("mailId");
var reportingTo = document.getElementById("reportingTo");
var team = document.getElementById("team");
var contact = document.getElementById("contact");

// var createBtn = document.getElementById("createBtn");
var createBtn = document.createElement('div'); // Unnecessay element
var profileBtn = document.getElementById("profileBtn");
var teamBtn = document.getElementById("teamBtn");
var employeeBtn = document.getElementById("employeeBtn");

var profileArea = document.getElementById("myProfile");
var teamArea = document.getElementById("myTeam");
var employeeArea = document.getElementById("allEmployee");
var createArea = document.getElementById("myProfile");

var editIcon = document.getElementById("editIcon");
var closeIcon = document.getElementById("closeIcon");
var checkIcon = document.getElementById("checkIcon");

var userCard = document.getElementById("user-card");
var employeeList = document.getElementById("employee-list");
var userRowElements = document.getElementById("user-row");

var logoutBtn = document.getElementById("logout");
var searchBox = document.getElementById("search-box");
var searchBtn = document.getElementById("search");
var resetBtn = document.getElementById("reset");

var inputTags = document.querySelectorAll("input");
inputTags.forEach((inp) => {
	inp.setAttribute("disabled", true);
});

var employeeData = {};
var teamDetails = [];
var allEmployees = [];
var filteredList = [];

const userAction = async () => {
	let userId = localStorage.getItem("id");
	if (!userId) {
		let url = window.location.href.replace("index.html", "login.html");
		window.location.href = url;
	}
	const response = await fetch(`http://localhost:8081/api/employee/${userId}`);
	const myJson = await response.json();

debugger
	employeeData = myJson.data;
	if (employeeData.empType == "developer") {
		hide(teamBtn);
		hide(employeeBtn);
	}
	else if (employeeData.empType == "productManager") {
		hide(employeeBtn);
	}
	else if (employeeData.empType == "teamLead") {
		hide(employeeBtn);
	}
	else {
		show(employeeBtn);
		show(profileBtn);
		hide(teamBtn);

	}
	fillDetails();
};

userAction();

const logoutAction = async () => {
	await localStorage.removeItem("id");
	let url = window.location.href.replace("index.html", "login.html");
	window.location.href = url;
};

const fillDetails = () => {
	userName.innerText = employeeData.employeeName;
	designation.innerText = employeeData.designation;
	firstName.value = employeeData.employeeName;
	dateOfBirth.value = employeeData.dateOfBirth;
	dateOfJoining.value = employeeData.dateOfJoining;
	designationInput.value = employeeData.designation;
	mailId.value = employeeData.mailId;
	team.value = employeeData.team ? employeeData.team : "";
	contact.value = employeeData.contactNumber;
};

const emptyDetails = () => {
	userName.innerText = "";
	designation.innerText = "";
	firstName.value = "";
	dateOfBirth.value = "";
	dateOfJoining.value = "";
	designationInput.value = "";
	mailId.value = "";
	team.value = "";
	contact.value = "";
};

const fetchTeam = async () => {
	let userId = localStorage.getItem("id");

	const response = await fetch(
		`http://localhost:8081/api/employee/${userId}/team`
	);
	const myJson = await response.json();
	teamDetails = [];
	teamDetails = myJson.data;

	console.log(myJson);
};

const updateUser = async () => {
	let userId = localStorage.getItem("id");
	if (userId != undefined) {
		const response = await fetch(
			`http://localhost:8081/api/employee/${userId}/update?dateOfBirth=${encodeURIComponent(dateOfBirth.value)}&dateOfJoining=${encodeURIComponent(dateOfJoining.value)}&contactNumber=${encodeURIComponent(contact.value)}`
		);
		await userAction();
		debugger;
		profileBtn.click();
		hide(closeIcon);
		hide(checkIcon);
	}
};

checkIcon.addEventListener('click', () => {
	updateUser();
});

const fetchAll = async () => {
	const response = await fetch(`http://localhost:8081/api/employee/all`);
	const myJson = await response.json();
	allEmployees = [];
	allEmployees = myJson.data;
	console.log(myJson);
};

const searchUser = async () => {
	let searchWord = searchBox.value;
	const response = await fetch(
		`http://localhost:8081/api/employee/${searchWord}/find`
	);
	const myJson = await response.json();
	filteredList = myJson.data;

	employeeList.innerHTML = "";
	for (let i in filteredList) {
		var para = document.createElement("tr");

		let teamInfo = `
			<td>${filteredList[i].employeeName}</td>
			<td>${filteredList[i].dateOfBirth}</td>
			<td>${filteredList[i].dateOfJoining}</td>
			<td>${filteredList[i].designation}</td>
			<td>${filteredList[i].mailId}</td>
			<td>${filteredList[i].team}</td>
			<td>${filteredList[i].contactNumber}</td>
		`;
		para.innerHTML = teamInfo;
		employeeList.append(para);
	}
};

function show(dom, display) {
	dom.style.display = display;
}

function hide(dom) {
	dom.style.display = "none";
}

function addActive(dom, rdom) {
	dom.classList.add("active");
	rdom.forEach((d) => {
		d.classList.remove("active");
	});
}

createBtn.addEventListener("click", () => {
	emptyDetails();
	show(profileArea, "block");
	hide(teamArea);
	hide(employeeArea);
	addActive(createBtn, [teamBtn, employeeBtn, profileBtn]);
	hide(editIcon);
	show(closeIcon, "block");
	show(checkIcon, "block");
	inputTags.forEach((inp) => {
		inp.removeAttribute("disabled");
	});
});

profileBtn.addEventListener("click", () => {
	fillDetails();
	show(profileArea, "block");
	hide(teamArea);
	hide(employeeArea);
	show(editIcon, "block");
	inputTags.forEach((inp) => {
		inp.setAttribute("disabled", true);
	});
	addActive(profileBtn, [teamBtn, employeeBtn, createBtn]);
});

closeIcon.addEventListener('click', () => {
	fillDetails();
	inputTags.forEach((inp) => {
		inp.setAttribute("disabled", true);
	});
	show(editIcon, "block");
	hide(closeIcon);
	hide(checkIcon);
});

teamBtn.addEventListener("click", async () => {
	await fetchTeam();
	userRowElements.innerHTML = '';

	if (teamDetails.length > 0) {
		for (let i in teamDetails) {
			var para = document.createElement("div");
			para.className = "col-2";

			let teamInfo = `
			<div class="flip-card">
				<div class="flip-card-inner">
					<div class="flip-card-front">
						<img src="images/profileImage.png" alt="Avatar" style="width:190px;height:190px;">
						<div class="card-text">
							<div class="name">${teamDetails[i].employeeName}</div>
							<div class="designation">${teamDetails[i].designation}</div>
							<div>${teamDetails[i].team}</div>



						</div>
					</div>
					<div class="flip-card-back">
						<h4>Contact</h4>
						<p>${teamDetails[i].contactNumber}</p>
						<p>${teamDetails[i].mailId}</p>
					</div>
				</div>
			</div>
		`;
			para.innerHTML = teamInfo;
			userRowElements.append(para);
		}
	}
	show(teamArea, "flex");
	hide(profileArea);
	hide(employeeArea);
	hide(editIcon);
	hide(checkIcon);
	hide(closeIcon);
	addActive(teamBtn, [employeeBtn, profileBtn, createBtn]);
});

fetchEmployeeDetails = () => {
	if (allEmployees.length > 0) {
		employeeList.innerHTML = "";


		employeeList.innerHTML = `
			<tr>
				<th>Employee Name</th>
				<th>Date of birth</th>
				<th>Date of Joining</th>
				<th>Designation</th>
				<th>Mail</th>
				<th>Team</th>
				<th>Phone Number</th>
			</tr>
		`
		var fr = document.createDocumentFragment();
		for (let i in allEmployees) {
			var para = document.createElement("tr");

			let teamInfo = `

			<td>${allEmployees[i].employeeName}</td>
			<td>${allEmployees[i].dateOfBirth}</td>
			<td>${allEmployees[i].dateOfJoining}</td>
			<td>${allEmployees[i].designation}</td>
			<td>${allEmployees[i].mailId}</td>
			<td>${allEmployees[i].team}</td>
			<td>${allEmployees[i].contactNumber}</td>
		`;
			para.innerHTML = teamInfo;
			employeeList.append(para);
		}
	}
};

employeeBtn.addEventListener("click", async () => {
	await fetchAll();
	fetchEmployeeDetails();
	show(employeeArea, "block");
	searchBox.removeAttribute("disabled");
	hide(teamArea);
	hide(profileArea);
	hide(editIcon);
	hide(checkIcon);
	hide(closeIcon);
	addActive(employeeBtn, [teamBtn, profileBtn, createBtn]);
});

editIcon.addEventListener("click", () => {
	hide(editIcon);
	show(closeIcon, "block");
	show(checkIcon, "block");
	inputTags.forEach((inp) => {
		inp.removeAttribute("disabled");
	});
});
profileBtn.click();

logoutBtn.addEventListener("click", logoutAction);

searchBtn.addEventListener("click", searchUser);
resetBtn.addEventListener("click", fetchEmployeeDetails);

// const updateUser = async () => {
// 	let userId = localStorage.getItem("id");
// 	if (userId != undefined) {
// 		const response = await fetch(
// 			`http://localhost:8081/api/employee/${userId}/update?dateOfBirth=${encodeURIComponent(dateOfBirth.value)}&dateOfJoining=${encodeURIComponent(dateOfJoining.value)}&contactNumber=${encodeURIComponent(contact.value)}`
// 		);
// 	}
// };

// checkIcon.addEventListener('click', () => {
// 	updateUser();
// 	userAction();
// 	profileBtn.click();
// 	hide(closeIcon);
// 	hide(checkIcon);
// });