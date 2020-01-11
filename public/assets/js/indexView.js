$(document).ready(function () {
	var inputArray = [];
	$(function () {
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
			//keypad number bottons
			$(".number").on("click", function (event) {
				var value = $(this).data("value");
				var employeeID = $(".employeeID");
				inputArray.push(value);
				employeeID.append(value);
			})
			//keypad OK button
			$("#button-submit").on("click", function (event) {
				userInput = inputArray.join('')
				len = data.employee.length;
				for (var i = 0; i < len; i++) {
					var dataEmployeeID = data.employee[i].employee_id;
					var employeePosition = data.employee[i].employee_position;				
					if (userInput == dataEmployeeID) {
						if (employeePosition.indexOf("Orders")>-1) {
							window.location.assign(href = "/admin")
						};
					};
				};
			})
		})
	})
	function updateTime() {
		$.ajax("/api/moment", {
			type: "GET"
		}).then(function (time, date) {
			var dateData = time.date;
			var timeData = time.time;
			var timeDiv = $('.time');
			timeDiv.text(dateData + "   " + timeData);
		})
	}
	
	
	setInterval(updateTime, 1000);
	updateTime();
})