$(document).ready(function () {
	$(function () {
		$.ajax("/api/employee", {
			type: "GET"
		}).then(function (data) {
			console.log(data);
			
			$("#create-employee").on("click", function () {
				$(".create-form").on("submit", function (event) {
					event.preventDefault();
					var firstName = $("#first-name").val().trim();
                    var lastName = $("#last-name").val().trim();
					var positionName = $("#position-name").val().trim();
					var employeeID = $("#employee-id").val().trim();
                    var newEmployee = {
                        employee_firstName: firstName,
                        employee_lastName: lastName,
                        employee_position: positionName,
                        employee_id: employeeID
					};
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
		});
	})
})