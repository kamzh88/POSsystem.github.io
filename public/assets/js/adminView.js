$(document).ready(function () {
    $(function () {
        $.ajax("/api/menu", {
            type: "GET"
        }).then(function (data) {
            $.ajax("/api/moment", {
                type: "GET"
            }).then(function (time, date) {
                var timeData = time.time;
                var dateData = time.date;
                // console.log(day);
                // console.log(data);
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
                    console.log(data);
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
                            <div><span class="item-name" data-id=${id}>${itemName}</span><span class="boldCSS">$${itemPrice}</span></div>
                            </div>`;
                        orderDiv.append(new_elem);
                        priceArray.push(parseFloat(itemPrice));
                        subTotal = priceArray.reduce((a, b) => a + b, 0)
                        totals(subTotal);
                        itemID.push(id);



                    }
                }
                })
                var itemize = [];
                $(".form-orderlist").on("submit", function (event) {
                    event.preventDefault();
                    // console.log("time: " + timeData);
                    // console.log("date: " + dateData);
                    var len = data.menu.length;
                    for (var i = 0; i < len; i++) {
                        for (var j = 0; j < len; j++) {
                            if (itemID[j] === data.menu[i].id) {
                                var idItem = data.menu[i].id;
                                itemize.push(idItem);
                            };
                        };
                    };
                    var customerOrder = {
                        itemize_id: itemize,
                        subtotal: subTotal,
                        taxes: tax,
                        total: total,
                        time: timeData,
                        date: dateData,
                    }
                    $.ajax("/api/orders", {
                        type: "POST",
                        data: JSON.stringify(customerOrder),
                        dataType: 'json',
                        contentType: "application/json"
                    }).then(function (result) {
                        // location.reload();
                        console.log(result);
                        // id = result.itemize_id;
                        // var len = data.menu.length;
                        // for (var i = 0; i < len; i++) {
                        //     for (var j = 0; j < len; j++) {
                        //         if (id[j] === data.menu[i].id) {
                        //             var itemName = data.menu[i].item_name;
                        //             var categoryName = data.menu[i].category;
                        //             var itemPrice = data.menu[i].price;
                        //             // console.log(data.menu[i].id);
                        //             // console.log(data.menu[i].item_name);
                        //         }
                        //     }
                        // }
                    })
                })

                $(document).on("click", "#order-list", function (event) {
                    $.ajax("/api/orders", {
                        type: "GET"
                    }).then(function (result) {
                        var dateArray = [];
                        var subtotalArray = [];
                        var taxArray = [];
                        var totalArray = [];
                        var order_div = $(".body3");
                        // order_div.empty();
                        for (var i = 0; i < result.orders.length; i++) {
                            // console.log("Ticket Number: " + result.orders[i].id);
                            var ticketNumber = result.orders[i].id;
                            var date = result.orders[i].date;
                            var time = result.orders[i].time;
                            var ticketNumber_elem = `
                    <div class= "order"
                    <h4 class="panel-title"><a data-toggle="collapse" href="#collapse${i}">${ticketNumber} ${date} ${time}</a></h4></div>`;
                            order_div.append(ticketNumber_elem);
                            var subtotal = result.orders[i].subtotal;
                            var tax = result.orders[i].taxes;
                            var total = result.orders[i].total;
                            subtotalArray.push(subtotal);
                            taxArray.push(tax);
                            totalArray.push(total);
                            // console.log(date);
                            // ticketNumberArray.push(ticketNumber);
                            for (var j = 0; j < result.orders[i].itemize_id.length; j++) {
                                for (var k = 0; k < data.menu.length; k++) {
                                    var itemID = parseFloat(result.orders[i].itemize_id[j]);
                                    if (itemID === data.menu[k].id) {
                                        var item_name = data.menu[k].item_name;
                                        var item_price = data.menu[k].price;
                                        // console.log(result.orders[i].subtotal);
                                        var order_elem = `
                                <div id="collapse${i}" class="panel-collapse collapse">
                                <div class="panel-body">
                                <p>${item_name} $${item_price}</p>
                                </div>
                                </div>
                             `
                                        order_div.append(order_elem);
                                    }
                                }
                            }
                            // console.log("subtotal: " + subtotalArray);
                            // console.log("tax: " + taxArray);
                            // console.log("total: " + totalArray);
                            var order_elem = `
                    <div id="collapse${i}" class="panel-collapse collapse">
                    <div class="panel-body">
                    <p>Subtotal: ${subtotalArray[i]}</p>
                    <p>Taxes: ${taxArray[i]}</p>
                    <p>Total: ${totalArray[i]}</p>
                    </div>
                    </div>
                    `
                     order_div.append(order_elem);
                        }

                    })
                });


            function totals(subTotal) {
                var totalDiv = $("#total");
                totalDiv.empty();
                tax = (subTotal * .06625).toFixed(2);
                total = (subTotal * 1.06625).toFixed(2);
                // console.log("subtotal " + subTotal);
                // console.log("taxes " + tax);
                // console.log("Total: " + total);
                var total_elem = `
                <div class="totalGrid">
                    <div class="subtotalCSS">
                        Subtotal: <span class="boldCSS">$${subTotal.toFixed(2)}</span>
                    </div>
                    <div class="taxCSS">
                        Tax: <span class="boldCSS">$${tax}</span>
                    </div>
                    <div class ="totalCSS">
                        Total: <span class="boldCSS">$${total}</span>
                    </div>
                </div>`;
                totalDiv.append(total_elem);
            }

//                 function totals(subTotal) {
//                     var totalDiv = $("#total");
//                     totalDiv.empty();
//                     tax = (subTotal * .06625).toFixed(2);
//                     total = (subTotal * 1.06625).toFixed(2);
//                     // console.log("subtotal " + subTotal);
//                     // console.log("taxes " + tax);
//                     // console.log("Total: " + total);
//                     var total_elem = `
//             <p>Subtotal: $${subTotal.toFixed(2)}<br>
//             Taxes: $${tax}<br>
//             Total: $${total}</p> `;
//                     totalDiv.append(total_elem);
//                 }


                //Edit Menu Button on main page
                $(document).on("click", "#menu-changes", function (event) {
                    // console.log(data.menu);
                    var menuElem = $(".modal-body");
                    var items = data.menu;
                    var len = data.menu.length;
                    for (var i = 0; i < len; i++) {
                        var new_elem = `
                <ul class="edit-heading"> ${items[i].id}. ${items[i].item_name}   $${items[i].price}
                <button class='delete-item' data-id=${items[i].id}><i class="fas fa-window-close"></i></button>
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
                        }).then(function (result) {
                            location.reload();
                            console.log(result);
                        })
                    })
                });


            });

//         });
//         //exampleModalLong2 Close button
//         $(document).on("click", "#modal2", function (event) {
//             $(".edit-heading").remove();
//         });
//         //exampleModalLong3 Close button
//         $(document).on("click", "#modal3", function (event) {
//             $(".order").remove();
//         });

        // var time = [];


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
                $(".edit-heading").remove();
            });
            //exampleModalLong3 Close button
            $(document).on("click", "#modal3", function (event) {
                $(".order").remove();
                
            });

            // var time = [];



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
            // time.push(timeData);
            // console.log(time.date);
        })
    }

    setInterval(updateTime, 1000);
    updateTime();
})
//                 $(document).on("click", ".itembtn", function (event) {
//                     // console.log(data);
//                     id = $(this).data("id");
//                     // console.log(id);
//                     var orderDiv = $('#order-div');
//                     var len = data.menu.length;
//                     for (var i = 0; i < len; i++) {
//                         if (id === data.menu[i].id) {
//                             var itemName = data.menu[i].item_name;
//                             var itemPrice = data.menu[i].price;
//                             // console.log("Item Name: " + itemName);
//                             // console.log("Item Price: " + itemPrice);
//                             var new_elem = `
//                     <div>Item Name:<span class="item-name" data-id=${id} > ${itemName}</span></div>
//                     <div class="item-price">Price: $${itemPrice}</div><br>`;
//                             orderDiv.append(new_elem);
//                             priceArray.push(parseFloat(itemPrice));
//                             subTotal = priceArray.reduce((a, b) => a + b, 0)
//                             totals(subTotal);
//                             itemID.push(id);
//                         }