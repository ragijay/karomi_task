var userName = document.getElementById("userName");
var password = document.getElementById("password");
var errorText = document.getElementById("errorText");
var submitButton = document.getElementById("submitBtn");

const userAction = async () => {
	var userInput = userName.value;
	var passwordInput = password.value;

	const response = await fetch(
		`http://localhost:8081/api/employee/login?employeeName=${userInput}&employeePassword=${passwordInput}`
	);
	const myJson = await response.json();
	if (myJson.key) {
		localStorage.setItem("id", myJson.key);
		let url = window.location.href.replace("login.html", "index.html");
		window.location.href = url;
	} else {
		errorText.innerHTML = "user not found";
	}
};

submitButton.addEventListener("click", userAction);
