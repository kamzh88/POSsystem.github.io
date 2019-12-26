$(function () {
    $.ajax("/api/menu", {
        type: "GET"
    }).then(function (data) {
        // console.log(data.menu[0].category);
        //append category onto the page
        var categoryElem = $('#category-div');
        var category = ["Chicken", "Beef", "Appetizers", "Vegetables", "Seafood"];
        var len = category.length;
        for (var i = 0; i < len; i++) {
            var new_elem = `<button class='categorybtn' data-id=${data.menu} data-category=${category[i]}>${category[i]}</button>`
            categoryElem.append(new_elem);
        }
        //categorybtn data
        $(document).on("click", ".categorybtn", function (event) {
            // console.log(data.menu);
            // console.log($(this).data("category"));
            var itemsDiv = $('#items-div');
            var categorybtn = $(this).data("category");
            var len = data.menu.length;
            // console.log(len);
            // console.log(data.menu[0].category)
            for (var i = 0; i < len; i++) {
                if (categorybtn === data.menu[i].category) {
                    console.log(data.menu[i].item_name);
                    var itemName = data.menu[i].item_name
                    var new_elem =`<button class='.itembtn' data-item=${itemName}>${itemName}</button>`
                    itemsDiv.append(new_elem);
                }
            };
        })





        //Edit Menu Button
        $(document).on("click", "#menu-changes", function (event) {
            // console.log(data.menu);
            var menuElem = $(".modal-body");
            var items = data.menu;
            var len = data.menu.length;
            for (var i = 0; i < len; i++) {
                var new_elem = `
                <ul class="edit-heading"> ${items[i].id}. ${items[i].item_name}   $${items[i].price}
                <button class='delete-item' data-id=${items[i].id}>DELETE</button>
                <h4 class="panel-title"><a data-toggle="collapse" href="#collapse${i}">Edit</a></h4>
                <div id="collapse${i}" class="panel-collapse collapse">
                  <div class="panel-body">
                  <form class="edit-form" data-id="${items[i].id}">
                      <div class="form-group">
                          <label for="new-name${i}">Item Name</label>
                          <input type="text" class="item-name" >
                      </div>
                      <div class="form-group">
                          <label for="exampleFormControlSelect1">Category</label>
                          <select class="form-control" class="new-name${i}">
                              <option>Chicken</option>
                              <option>Beef</option>
                              <option>Seafood</option>
                              <option>Vegetables</option>
                              <option>Appetizers</option>
                          </select>
                      </div>
                      <div class="form-group">
                          <label for="">Price</label>
                          <input type="text" class="form-control" class="new-item-price${i}">
                      </div>
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-primary submit">Edit</button>
              </form>
                  </div>
                </div></ul>`
                menuElem.append(new_elem);
            };
            $(".edit-form").on("submit", function (event) {
                event.preventDefault();
                var id = $(this).data("id");
                var itemName = $(event.target).closest("item-name").context[0].value;
                var categoryName = $(event.target).closest("item-name").context[1].value;
                var itemPrice = $(event.target).closest("item-name").context[2].value;
                var editItem = {
                    item_name: itemName,
                    category: categoryName,
                    selected: 0,
                    price: itemPrice
                };
                console.log(editItem);
                $.ajax("/api/menu/" + id, {
                    type: "PUT",
                    data: JSON.stringify(editItem),
                    dataType: 'json',
                    contentType: 'application/json'
                }).then(function (data) {
                    console.log("menu item changed", id);
                    // location.reload();
                    console.log(data);
                    $(event.target).closest(".edit-heading").html(`
                    <ul class="edit-heading"> ${id}. ${data.item_name}   $${data.price}
                    <button class='delete-item' data-id=${id}>DELETE</button>
                    <h4 class="panel-title"><a data-toggle="collapse" href="#collapse${i}">Edit</a></h4>
                    <div id="collapse${i}" class="panel-collapse collapse">
                      <div class="panel-body">
                      <form class="edit-form" data-id="${id}">
                          <div class="form-group">
                              <label for="new-name${i}">Item Name</label>
                              <input type="text" class="item-name" >
                          </div>
                          <div class="form-group">
                              <label for="exampleFormControlSelect1">Category</label>
                              <select class="form-control" class="new-name${i}">
                                  <option>Chicken</option>
                                  <option>Beef</option>
                                  <option>Seafood</option>
                                  <option>Vegetables</option>
                                  <option>Appetizers</option>
                              </select>
                          </div>
                          <div class="form-group">
                              <label for="">Price</label>
                              <input type="text" class="form-control" class="new-item-price${i}">
                          </div>
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="submit" class="btn btn-primary submit">Edit</button>
                  </form>
                      </div>
                    </div></ul>`);
                    // item_name = $(event.target).closest(".edit-heading").prevObject.context[0]
                    // var editHeadingdiv = $(".edit-heading");
                    // var new_elem = `hi`;
                    
                    
                })
            })
        });
        //add items button
        $(document).on("click", "#create-items", function (event) {
            console.log(data.menu);
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
                };
                // console.log(newItem);
                $.ajax("/api/menu", {
                    type: "POST",
                    data: JSON.stringify(newItem),
                    dataType: 'json',
                    contentType: "application/json"
                }).then(function () {
                    location.reload();
                })
            })
        });
    });
    //delete item button
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
})