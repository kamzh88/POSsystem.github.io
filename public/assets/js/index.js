$(document).ready(function () {
	$(".btn").on("click", function () {
		if ($(this).hasClass("btn-primary")) {
			$(".employeeID").append($(this).attr("value"));
		}
	});
});