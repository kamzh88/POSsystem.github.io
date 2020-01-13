import { updateTime, orderButton } from './utils.js';
var inputArray = [];
$(document).ready(function () {
	$.ajax("/api/employee", {
		type: "GET"
	}).then(function (data) {
		console.log(data);

		//Create new employee button
		// if (userInput === "") {
		// $('#exampleModalLong1').modal(hide);


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
		// })

		// }


		$(document).on("click", "#button-submit", function (event) {

			var userInput = inputArray.join('');
			var len = data.employee.length;
			for (var i = 0; i < len; i++) {
				var dataEmployeeID = data.employee[i].employee_id;
				var employeePosition = data.employee[i].employee_position;
				var id = data.employee[i].id
				console.log(employeePosition)
				if (userInput == dataEmployeeID) {
					if (employeePosition.indexOf("Manager") > -1) {
						window.location.assign("/admin");
					}
					if (employeePosition.indexOf("Cashier") > -1) {
						window.location.assign("/cashier");
					}
				}
			}
		})
		$(document).on("click", "#create-employee", function (event) {
			var userInput = inputArray.join('');
			var len = data.employee.length;
			for (var i = 0; i < len; i++) {
				var dataEmployeeID = data.employee[i].employee_id;
				var employeePosition = data.employee[i].employee_position;
				var id = data.employee[i].id
				console.log(employeePosition)
				console.log(userInput);
				if (userInput == dataEmployeeID) {
					if (employeePosition.indexOf("Manager") > -1) {
						$('#exampleModalLong1').modal("show");
					}
				}
			}

		})
	})
	// keypad number buttons
	$(".number").on("click", function (event) {
		var value = $(this).data("value");
		var employeeID = $(".employeeID");
		inputArray.push(value);
		employeeID.append(value);
	})

	orderButton();
	setInterval(updateTime, 1000);
	updateTime();

})