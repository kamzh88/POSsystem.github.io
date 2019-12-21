$(function () {
    $.ajax("/api/menu", {
        type: "GET"
    }).then(function (data) {

        $(document).on("click", "#menu-changes", function (event) {
            console.log(data.menu);

            var menuElem = $(".modal-body");

            var items = data.menu;
            var len = data.menu.length;

            for (var i = 0; i < len; i++) {
                var new_elem = `<ul> ${items[i].id}. ${items[i].item_name}   $${items[i].price} <button class='edit-item' data-id=${items[i].id}>EDIT </button> <button class='delete-item' data-id=${items[i].id}>DELETE</button></ul>`
                menuElem.append(new_elem);
            };
        });
    });

    $(document).on("click", ".delete-item", function (event) {
        var id = $(this).data("id");
        // console.log(id);

        $.ajax("/api/menu/" + id, {
            type: "DELETE"
        }).then(function () {
            console.log("Item has been deleted!");
            location.reload();
        });
    });


});

