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
            itemsDiv.empty();
            // console.log(len);
            // console.log(data.menu[0].category)
            for (var i = 0; i < len; i++) {
                if (categorybtn === data.menu[i].category) {
                    // console.log(data.menu[i].item_name);
                    var itemName = data.menu[i].item_name
                    var new_elem = `<button class='itembtn' data-id=${data.menu[i].id} data-item=${itemName}>${itemName}</button>`
                    itemsDiv.append(new_elem);
                }
            };
        })

        var priceArray = [];
        //itemID is the ID of the on click function
        var itemID = [];
        var subTotal;
        var tax;
        var total;

        $(document).on("click", ".itembtn", function (event) {
            // console.log(data);
            id = $(this).data("id");
            // console.log(id);
            var orderDiv = $('#order-div');
            var len = data.menu.length;
            for (var i = 0; i < len; i++) {
                if (id === data.menu[i].id) {

                    var itemName = data.menu[i].item_name;
                    var itemPrice = data.menu[i].price;
                    // console.log("Item Name: " + itemName);
                    // console.log("Item Price: " + itemPrice);
                    var new_elem = `
                    <div>Item Name:<span class="item-name" data-id=${id} > ${itemName}</span></div>
                    <div class="item-price">Price: $${itemPrice}</div><br>`;
                    orderDiv.append(new_elem);
                    priceArray.push(parseInt(itemPrice));
                    subTotal = priceArray.reduce((a, b) => a + b, 0)
                    totals(subTotal);
                    itemID.push(id);

                }
            }

        })


        $(".form-orderlist").on("submit", function (event) {
            event.preventDefault();
            // var itemName = $('.item-name')
            // var len = itemName.length
            // for (var j = 0; j < len; j++) {
            //     console.log($(".item-name")[j].innerText);

            // };
            // console.log(itemID);
            // console.log(itemID[0]);
            var itemize = [];
            var len = data.menu.length;
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < len; j++) {
                    if (itemID[j] === data.menu[i].id) {
                        var itemName = data.menu[i].item_name;
                        var categoryName = data.menu[i].category;
                        var itemPrice = data.menu[i].price;
                        var idItem = data.menu[i].id;
                        // var item = {
                        //     // item_name: itemName,
                        //     // category: categoryName,
                        //     // price: itemPrice,
                        //     id: idItem 
                        // }

                        itemize.push(idItem);
                        // console.log(data.menu[i].id);
                    };
                };
            };
            var customerOrder = {
                itemize_order: itemize,
                subtotal: subTotal,
                taxes: tax,
                total: total,
                
            }
            // console.log(itemize);
            console.log(customerOrder);
            console.log(JSON.stringify(customerOrder));
            // console.log(`subtotal ${subTotal}`);
            // console.log(`tax ${tax}`);
            // console.log(`total ${total}`);

        })

        function totals(subTotal) {
            var totalDiv = $("#total");
            totalDiv.empty();
            tax = (subTotal * .06625).toFixed(2);
            total = (subTotal * 1.06625).toFixed(2);
            // console.log("subtotal " + subTotal);
            // console.log("taxes " + tax);
            // console.log("Total: " + total);
            var total_elem = `
            <p>Subtotal: $${subTotal.toFixed(2)}<br>
            Taxes: $${tax}<br>
            Total: $${total}</p> `;
            totalDiv.append(total_elem);
        }

        //Edit Menu Button on main page
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
                      <button type="submit" class="btn btn-primary submit">Save</button>
                  </form>
                  </div>
                </div></ul>`
                menuElem.append(new_elem);
            };
            //Save button in edit button modal
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
                          <button type="submit" class="btn btn-primary submit">Save</button>
                  </form>
                      </div>
                    </div></ul>`);
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
        console.log(id);
        $.ajax("/api/menu/" + id, {
            type: "DELETE"
        }).then(function () {
            // console.log("Item has been deleted!");
            location.reload();
        });
    });
    //exampleModalLong2 Close button
    $(document).on("click", "#modal2", function (event) {
        // $(".modal-body").empty();
        $(".edit-heading").empty();
    });
})