$(document).ready(function () {
	$(function () {
		$.ajax("/api/menu", {
			type: "GET"
		}).then(function (data) {
			console.log(data);
			$("#createEmployee").on("click", function () {
				
			})
		});
	})
})