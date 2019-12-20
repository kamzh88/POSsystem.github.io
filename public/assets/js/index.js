$(document).ready(function () {
	var operator;
	var operatorSelected = false;
	$(".btn").on("click", function () {
		if ($(this).hasClass("btn-primary") && operatorSelected === false) {
			$(".employeeID").append($(this).attr("value"));
		}
		else if ($(this).hasClass("operator") && operatorSelected === false) {
			$("#operator").append($(this).text());
			operator = $(this).val();
			operatorSelected = true;
		}
		else if ($(this).hasClass("btn-primary") && ($('#result').text() === '')) {
			$(".employeeID").append($(this).attr("value"));
		}
		else if ($(this).hasClass("equal") && ($('#result').text() === '')) {
			var num1 = parseInt($('#first-number').text());
			var num2 = parseInt($('#second-number').text());
			if (operator === "plus") {
				$('#result').append(num1 + num2);
			}
			else if (operator === "minus") {
				$('#result').append(num1 - num2);
			}
			else if (operator === "divide") {
				$('#result').append(num1 / num2);
			}
			else if (operator === "times") {
				$('#result').append(num1 * num2);
			}
			else if (operator === "power") {
				$('#result').append(Math.pow(num1, num2));
			}
		}
		else if ($(this).hasClass("clear")) {
			operatorSelected = false;
			$('#first-number').empty();
			$('#operator').empty();
			$('#second-number').empty();
			$('#result').empty();
		}
	});
});