$(function () {
    $.ajax("/api/menu", {
        type: "GET"
    }).then(function (data) {
        $(document).on("click", "#menu-changes", function (event) {
            // console.log(data.menu);
            var menuElem = $(".modal-body");
            var items = data.menu;
            var len = data.menu.length;
            for (var i = 0; i < len; i++) {
                var new_elem = `
                <ul> ${items[i].id}. ${items[i].item_name}   $${items[i].price}
                <button class='delete-item' data-id=${items[i].id}>DELETE</button>
                <h4 class="panel-title"><a data-toggle="collapse" href="#collapse${i}"data-id=${items[i].id}>Edit</a></h4>
                <div id="collapse${i}" class="panel-collapse collapse">
                  <div class="panel-body">
                  <form class="create-form">
                  <div class="modal-body">
                      <div class="form-group">
                          <label for="">Item Name</label>
                          <input type="text" class="form-control" id="item-name">
                      </div>
                      <div class="form-group">
                          <label for="exampleFormControlSelect1">Category</label>
                          <select class="form-control" id="category-name">
                              <option>Chicken</option>
                              <option>Beef</option>
                              <option>Seafood</option>
                              <option>Vegetables</option>
                              <option>Appetizers</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <label for="">Price</label>
                          <input type="text" class="form-control" id="item-price">
                      </div>
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary submit">Edit</button>
                  </div>
              </form>
                  </div>
                </div></ul>`
                menuElem.append(new_elem);
            };
        });
        $(document).on("click", "#create-items", function (event) {
            // console.log(data.menu);
            $(".create-form").on("submit", function (event) {
                event.preventDefault();
                var itemName = $("#item-name").val().trim();
                var categoryName = $("#category-name").val().trim();
                var itemPrice = $("#item-price").val().trim();
                var newItem = {
                    item_name: itemName,
                    category: categoryName,
                    selected: 0,
                    price: itemPrice
                }
                // console.log(newItem);
                $.ajax("/api/menu", {
                    type: "POST",
                    data: JSON.stringify(newItem),
                    dataType: 'json',
                    contentType: "application/json"
                }).then(function () {
                    location.reload();
                    $("#exampleModalLong1").show();
                })
            })
        });
    });
    $(document).on("click", ".delete-item", function (event) {
        var id = $(this).data("id");
        // console.log(id);
        $.ajax("/api/menu/" + id, {
            type: "DELETE"
        }).then(function () {
            // console.log("Item has been deleted!");
            location.reload();
        });
    });
    //exampleModalLong2 Close button
    $(document).on("click", "#modal2", function (event) {
        $(".modal-body").empty();
    });
});