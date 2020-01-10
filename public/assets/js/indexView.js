$(document).ready(function () {
	$(function () {
		$.ajax("/api/employee", {
			type: "GET"
		}).then(function (data) {
			// console.log(data);
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
						});
					}
					console.log(position);
					var newEmployee = {
						employee_position: position,
						employee_firstName: firstName,
						employee_lastName: lastName,
						employee_id: employeeID
					};
					// console.log(result);
					$.ajax("/api/employee", {
						type: "POST",
						data: JSON.stringify(newEmployee),
						contentType: "application/json"
					}).then(function (result) {
						location.reload();
						console.log(result);
					})
				})
			})

			var inputArray = [];

			$(".number").on("click", function (event) {
				var value = $(this).data("value");
				var employeeID = $(".employeeID");
				// console.log(value);
				inputArray.push(value);
				// console.log(inputArray);
				employeeID.append(value);

			})

			var dataEmployeeIDArray = [];
			$("#button-submit").on("click", function (event) {
				userInput = inputArray.join('')

				leni = data.employee.length;
				for (var i = 0; i < leni; i++) {
					var dataEmployeeID = data.employee[i].employee_id;
					
					// console.log(userInput);
					dataEmployeeIDArray.push(dataEmployeeID);
					if (userInput == dataEmployeeIDArray[i]) {
						window.location.assign(href = "/admin")
						// console.log("database ID:" + dataEmployeeIDArray[i]);
						// console.log(userInput)
					} else {
						console.log("wrongid")
					}
				}

				// console.log(dataEmployeeIDArray);
			})

		});
	})
})