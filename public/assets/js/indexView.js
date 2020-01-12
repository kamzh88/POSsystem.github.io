import { updateTime, orderButton, menuLoginButton} from './utils.js';

$(document).ready(function () {
	$.ajax("/api/employee", {
		type: "GET"
	}).then(function (data) {

		//Create new employee button
		$("#create-employee").on("click", function () {
			$(".create-form").on("submit", function (event) {
				event.preventDefault();
				var firstName = $("#first-name").val().trim();
				var lastName = $("#last-name").val().trim();
				var employeeID = $("#employee-id").val().trim();
				var checkResult = $('input[name="level"]:checked');
				var position = [];
				if (checkResult.length > 0) {
					checkResult.each(function () {
						var resultString = $(this).val();
						position.push(resultString);
					})
				};
				var newEmployee = {
					employee_position: position,
					employee_firstName: firstName,
					employee_lastName: lastName,
					employee_id: employeeID
				};
				$.ajax("/api/employee", {
					type: "POST",
					data: JSON.stringify(newEmployee),
					contentType: "application/json"
				}).then(function (result) {
					location.reload();
				})
			})
		})
	})

	var inputArray = [];
	// keypad number buttons
	$(".number").on("click", function (event) {
		var value = $(this).data("value");
		var employeeID = $(".employeeID");
		inputArray.push(value);
		employeeID.append(value);
	})

	function cb(employeePosition) {
		console.log("hi");
	}

	menuLoginButton(inputArray, cb);
	orderButton();
	setInterval(updateTime, 1000);
	updateTime();

})