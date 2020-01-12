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

function orderButton() {
    $.ajax("/api/menu", {
        type: "GET"
    }).then(function (data) {
        $(document).on("click", "#order-list", function (event) {
            $.ajax("/api/orders", {
                type: "GET"
            }).then(function (result) {
                var dateArray = [];
                var subtotalArray = [];
                var taxArray = [];
                var totalArray = [];
                var order_div = $(".body3");
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
                                    </div>`
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
        })
    })
}
var password = [];
//keypad OK button
function menuLoginButton(inputArray) {
    $("#button-submit").on("click", function (event) {
        $.ajax("/api/employee", {
            type: "GET"
        }).then(function (data) {
            var userInput = inputArray.join('')
            var len = data.employee.length;
            for (var i = 0; i < len; i++) {
                var dataEmployeeID = data.employee[i].employee_id;
                var employeePosition = data.employee[i].employee_position;
                password.push(employeePosition);
                if (userInput == dataEmployeeID) {
                    if (employeePosition.indexOf("Orders") > -1) {
                        window.location.assign("/admin"); 
                    }
                };
            };
        })
    })
    // $('#menu-changes').show();
}
console.log(password);

export { updateTime, orderButton, menuLoginButton};