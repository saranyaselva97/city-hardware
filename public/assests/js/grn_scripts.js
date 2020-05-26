function getSimilarItemList() {
    var itemName = document.getElementById("item_name").value;

    $.ajax({
        type: "POST",
        url: 'a_get_similar_item_list_by_name.php',
        data: { item_name: itemName },
        success: function(data) {
            //var arr = JSON.parse(data);

            document.getElementById("item_list").innerHTML = data;
        }
    });
}

function getStockDetailsByItem(element) {
    $.ajax({
        type: "POST",
        url: 'a_get_stock_details_by_id.php',
        data: { item_id: element.value },
        success: function(data) {
            var arr = JSON.parse(data);

            document.getElementById("available_qty").value = arr.Available_Stock;

            document.getElementById("item_name").value = element.options[element.selectedIndex].text;

            document.getElementById("line_item_name").value = element.options[element.selectedIndex].text;
            document.getElementById("item_id").value = element.value;

            document.getElementById("unit_price").value = arr.Label_Price;
            document.getElementById("line_net_amount").value = "";
            document.getElementById("qty").value = "";
            document.getElementById("discount").value = "0";
            console.log(item_id);
        }
    });
}

$(function() {
    $("#supplier_name").autocomplete({
        source: function(request, response) {
            $.ajax({
                type: "POST",
                url: "a_get_supplier_list.php",
                data: {
                    supplier_name: request.term
                },
                success: function(data) {
                    response(JSON.parse(data));
                }
            });
        },
        minLength: 1,
        select: function(event, ui) {
            $(this).val(ui.item.label);
            $("#supplier_due").val(ui.item.due);
            $("#supplier_id").val(ui.item.value);

            return false;
        }
    });
});

function calculateGrnLineAmounts() {
    var quantityField = document.getElementById("qty");
    var unitPriceField = document.getElementById("unit_price");
    var grossAmountField = document.getElementById("line_gross_amount");
    var discountField = document.getElementById("discount");
    var netAmountField = document.getElementById("line_net_amount");

    var quantity = parseFloat((quantityField.value === "" ? "0" : quantityField.value));
    var unitPrice = parseFloat((unitPriceField.value === "" ? "0" : unitPriceField.value));

    var discountRate = parseFloat((discountField.value === "" ? "0" : discountField.value));

    var grossAmount = (quantity * unitPrice);
    var discount = ((grossAmount * discountRate) / 100);
    var netAmount = grossAmount - discount;

    grossAmountField.value = grossAmount.toFixed(2);
    netAmountField.value = netAmount.toFixed(2);
}

function addGrnRow() {
    var validateFields = validateGrnDetailFields(); //create a new function to validate required fields
    var isValid = new Boolean(validateFields);

    if (isValid == true) {
        addGrnDetailRow(); //create a new function to calculate average price and add new grn detail row 
        calculateGrnTotals(); //create a new function to calculate grn header total amounts
        cleargrnDetailFields(); //create a new function to clear detail fields 
    } else {
        return false;
    }

}

function validateGrnDetailFields() {
    var itemIdField = document.getElementById("item_id");
    var itemNameField = document.getElementById("line_item_name");
    var quantityField = document.getElementById("qty");
    var unitPriceField = document.getElementById("unit_price");
    var netAmountField = document.getElementById("line_net_amount");

    var errorAlert = document.getElementById("item_error_msg");

    if (itemIdField.value === "") {
        itemNameField.style.border = "1px solid #ed5565";
        document.getElementById("line_item_name").focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Select an Item";

        return false;
    } else {
        itemNameField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (quantityField.value === "") {
        quantityField.style.border = "1px solid #ed5565";
        quantityField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Enter Buying Quantity";

        return false;
    } else {
        quantityField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (unitPriceField.value === "") {
        unitPriceField.style.border = "1px solid #ed5565";
        unitPriceField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Enter Unit Price";

        return false;
    } else {
        unitPriceField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (parseFloat(netAmountField.value) < 0) {
        netAmountField.style.border = "1px solid #ed5565";

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Net Amount can't be Minus(-)";

        return false;
    } else {
        netAmountField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    return true;
}

function addGrnDetailRow() {
    var itemIdField = document.getElementById("item_id");
    var itemNameField = document.getElementById("line_item_name");
    var quantityField = document.getElementById("qty");
    var unitPriceField = document.getElementById("unit_price");
    var netAmountField = document.getElementById("line_net_amount");
    var grossAmountField = document.getElementById("line_gross_amount");
    var discountField = document.getElementById("discount");

    var oldAveragePrice = 0; //variable to store average price of current stock
    var availableStock = 0; //variable to store current available stock

    $.ajax({ //get stock details to calculate average price
        type: "POST",
        url: 'route{{""}}',
        data: { item_id: itemIdField.value },
        success: function(data) {
            var arr = JSON.parse(data);

            availableStock = parseFloat(arr.Avg_Price);
            oldAveragePrice = parseFloat(arr.Available_Stock);
        }
    });

    var tbody = document.getElementById("grn_details_tbody");

    var currentRoeCount = tbody.rows.length;

    var buyingQuantity = 0; //variable to store total buying quantity
    var totalAmount = 0; //variable to store net amount

    for (i = 0; i < currentRoeCount; i++) {
        var currentItemIdField = tbody.rows[i].cells[0].children[0];

        //if selected item already exists in grn details list then increment quantity and net amount
        if (currentItemIdField.value === itemIdField.value) {
            var lineQuantityField = tbody.rows[i].cells[1].children[0]; //get quantity text field of each line
            var lineNetAmountField = tbody.rows[i].cells[5].children[0]; //get net amount field of each line

            var lineQuantity = parseFloat(lineQuantityField.value);
            var lineNetAmount = parseFloat(lineNetAmountField.value);

            buyingQuantity += lineQuantity;
            totalAmount += lineNetAmount;
        }
    }

    buyingQuantity += parseFloat((quantityField.value === "" ? "0" : quantityField.value)); // add new quantity to already added quantity
    totalAmount += parseFloat((netAmountField.value === "" ? "0" : netAmountField.value)); //add new net amlount to already added net amount

    var totalQuantity = availableStock + buyingQuantity; //add current total quantity to available stock
    var currentAveragePrice = availableStock * oldAveragePrice; //calculate total price for current available stock

    /*********************************************************/
    // formula to calculate new average price
    //(currentAveragePrice + totalAmount) = total cost
    //totalQuantity = total quantity
    //((currentAveragePrice + totalAmount)/ totalQuantity = total quantity) = cost per an item
    /*********************************************************/

    var newAveragePrice = ((currentAveragePrice + totalAmount) / totalQuantity); //calculate new average price

    var itemIdText = "<input type='hidden' name='Item_Id" + currentRoeCount + "' value='" + itemIdField.value + "'/>";
    var itemNameText = "<input type='text' name='Item_Name" + currentRoeCount + "' value='" + itemNameField.value + "' class='hdnfield' readonly/>";
    var quantityText = "<input type='text' name='Quantity" + currentRoeCount + "' value='" + quantityField.value + "' class='hdnfield' readonly/>";
    var unitPriceText = "<input type='text' name='Unit_Price" + currentRoeCount + "' value='" + unitPriceField.value + "' class='hdnfield' readonly/>";
    var grossAmountText = "<input type='text' name='Gross_Amount" + currentRoeCount + "' value='" + grossAmountField.value + "' class='hdnfield' readonly/>";
    var discountText = "<input type='text' name='Discount" + currentRoeCount + "' value='" + discountField.value + "' class='hdnfield' readonly/>";
    var netAmountText = "<input type='text' name='Net_Amount" + currentRoeCount + "' value='" + netAmountField.value + "' class='hdnfield' readonly/>";
    var averagePriceText = "<input type='hidden' name='Average_Price" + currentRoeCount + "' value='" + newAveragePrice + "'/>";
    var averagePriceText = "<input type='hidden' name='Average_Price" + currentRoeCount + "' value='" + newAveragePrice + "'/>";
    // var remove = "<a  class='btn btn-danger"++"' ><i class='glyphicon glyphicon-remove'></i></a>";

    var rowText = "<tr><td>" + itemIdText + itemNameText + "</td><td>" + quantityText + "</td><td>" + unitPriceText + "</td><td>" + grossAmountText + "</td><td>" + discountText + "</td><td>" + netAmountText + averagePriceText + "</td></tr>";

    var currentRows = tbody.innerHTML;
    currentRows += rowText;

    tbody.innerHTML = currentRows;

    var rowCountField = document.getElementById("row_count");
    rowCountField.value = currentRoeCount;
}

function calculateGrnTotals() {

    var finalGrossAmountField = document.getElementById("gross_amount");
    var totalDiscountField = document.getElementById("total_discount");
    var finalNetAmountField = document.getElementById("net_amount");
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");



    var lineNetAmountField = document.getElementById("line_net_amount");

    var grossAmount = parseFloat((finalGrossAmountField.value === "" ? "0" : finalGrossAmountField.value));
    var discountRate = parseFloat((totalDiscountField.value === "" ? "0" : totalDiscountField.value));

    grossAmount += parseFloat((lineNetAmountField.value === "" ? "0" : lineNetAmountField.value));

    var discount = ((grossAmount * discountRate) / 100);

    var netAmount = grossAmount - discount;

    finalGrossAmountField.value = grossAmount.toFixed(2);
    totalDiscountField.value = 0;
    finalNetAmountField.value = netAmount.toFixed(2);
    paymentField.value = "0.00";
    balanceField.value = netAmount.toFixed(2);
}


function cleargrnDetailFields() {
    var itemIdField = document.getElementById("item_id");
    var itemNameField = document.getElementById("line_item_name");
    var unitPriceField = document.getElementById("unit_price");
    var quantityField = document.getElementById("qty");
    var netAmountField = document.getElementById("line_net_amount");
    var grossAmountField = document.getElementById("line_gross_amount");
    var discountField = document.getElementById("discount");
    var availableQtyField = document.getElementById("available_qty");

    itemIdField.value = "";
    itemNameField.value = "";
    unitPriceField.value = "";
    quantityField.value = "";
    netAmountField.value = "";
    grossAmountField.value = "";
    discountField.value = "0";
    availableQtyField.value = "";

    var searchitemNameField = document.getElementById("item_name");
    searchitemNameField.value = "";
    searchitemNameField.focus();

}


function calculateGrnHeaderTotals() {
    var grossAmountField = document.getElementById("gross_amount");
    var discountField = document.getElementById("total_discount");
    var netAmountField = document.getElementById("net_amount");
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");

    var grossAmount = parseFloat((grossAmountField.value === "" ? "0" : grossAmountField.value));
    var discountRate = parseFloat((discountField.value === "" ? "0" : discountField.value));

    var discountPrice = ((grossAmount * discountRate) / 100);
    var netAmount = grossAmount - discountPrice;
    var payment = parseFloat((paymentField.value === "" ? "0" : paymentField.value));
    var balance = netAmount - payment;

    netAmountField.value = netAmount.toFixed(2);
    balanceField.value = balance.toFixed(2);
}

function validateGrnForm() {
    var grnCodeField = document.getElementById("grn_code");
    var supplierIdField = document.getElementById("supplier_id");
    var supplierNameField = document.getElementById("supplier_name");
    //var supplierInvCodeField = document.getElementById("grn_invoice_code");
    var dueDateField = document.getElementById("due_date");
    var detailTBody = document.getElementById("grn_details_tbody");
    var itemNameField = document.getElementById("item_name");
    var paymentTypeField = document.getElementById("payment_type");
    var grossAmountField = document.getElementById("gross_amount");
    var netAmountField = document.getElementById("net_amount");

    var errorAlert = document.getElementById("item_error_msg");

    if (grnCodeField.value === "") {
        grnCodeField.style.border = "1px solid #ed5565";
        grnCodeField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "GRN Code is Invalid";

        return false;
    } else {
        grnCodeField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (supplierIdField.value === "") {
        supplierNameField.style.border = "1px solid #ed5565";
        supplierNameField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Select a Supplier";

        return false;
    } else {
        supplierNameField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (dueDateField.value === "") {
        dueDateField.style.border = "1px solid #ed5565";
        dueDateField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Due Date is Required";

        return false;
    } else {
        dueDateField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (detailTBody.rows.length === 0) {
        itemNameField.style.border = "1px solid #ed5565";
        itemNameField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Add GRN Details to List";

        return false;
    } else {
        itemNameField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (paymentTypeField.value === "") {
        paymentTypeField.style.border = "1px solid #ed5565";
        paymentTypeField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Select a Payment Type";

        return false;
    } else {
        paymentTypeField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (grossAmountField.value === "") {
        grossAmountField.style.border = "1px solid #ed5565";
        grossAmountField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Gross Amount is Invalid";

        return false;
    } else {
        grossAmountField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (netAmountField.value === "") {
        netAmountField.style.border = "1px solid #ed5565";
        netAmountField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Net Amount is Invalid";

        return false;
    } else {
        netAmountField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
}

function showChequeDetailsModal(paymentTypeField) {
    if (paymentTypeField.value === "CH") {
        var grnDetailsTBody = document.getElementById("grn_details_tbody");

        if (grnDetailsTBody.rows.length === 0) {
            //var errorAlert = document.getElementById("item_error_msg");

            //errorAlert.style.display = "block";
            //errorAlert.children[1].innerHTML = "Add GRN Details First";

            paymentTypeField.selectedIndex = 0;

            return false;
        }

        var bankField = document.getElementById("bank");

        var banks = [
            "Bank of Ceylon", "Cargills Bank Ltd.", "Citibank N.A.", "Commercial Bank of Ceylon PLC", "Deutsche Bank AG",
            "DFCC Vardhana Bank PLC", "Habib Bank Ltd.", "Hatton National Bank PLC", "ICICI Bank Ltd.", "Indian Bank", "Indian Overseas Bank",
            "MCB Bank Ltd.", "National Development Bank PLC", "Nations Trust Bank PLC", "Pan Asia Banking Corporation PLC", "Peoples Bank",
            "Sampath Bank PLC", "Seylan Bank PLC", "Standard Chartered Bank", "State Bank of India",
            "The Hongkong and Shanghai Banking Corporation Ltd.", "Union Bank of Colombo PLC"
        ];

        for (i = 0; i < banks.length; i++) {
            bankField.innerHTML += "<option value='" + banks[i] + "'>" + banks[i] + "</option>";
        }

        var chequeAmountField = document.getElementById("amount");
        var netAmountField = document.getElementById("net_amount");

        chequeAmountField.value = netAmountField.value;

        $("#myModal").modal({
            backdrop: 'static',
            keyboard: false
        });

        var chequeNoField = document.getElementById("chq_number");
        chequeNoField.focus();
    }
}

function addChequeDetails() {
    var chqNoField = document.getElementById("chq_number");
    var chqDateField = document.getElementById("chq_date");
    var bankField = document.getElementById("bank");
    var amountField = document.getElementById("amount");

    var errorAlert = document.getElementById("modal_error_msg");

    if (chqNoField.value === "") {
        chqNoField.style.border = "1px solid #ed5565";
        chqNoField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Enter a Cheque Number";

        return false;
    } else {
        chqNoField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (chqDateField.value === "") {
        chqDateField.style.border = "1px solid #ed5565";
        chqDateField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select a Cheque Date";

        return false;
    } else {
        chqDateField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (bankField.value === "") {
        bankField.style.border = "1px solid #ed5565";
        bankField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select a Bank";

        return false;
    } else {
        bankField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (amountField.value === "") {
        amountField.style.border = "1px solid #ed5565";
        amountField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Enter Amount";

        return false;
    } else {
        amountField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    var form = document.forms[0];
    var chqNumberHiddenField = document.createElement("input");
    chqNumberHiddenField.setAttribute("type", "hidden");
    chqNumberHiddenField.setAttribute("name", "Cheque_No");
    chqNumberHiddenField.setAttribute("value", chqNoField.value);

    var chqDateHiddenField = document.createElement("input");
    chqDateHiddenField.setAttribute("type", "hidden");
    chqDateHiddenField.setAttribute("name", "Cheque_Date");
    chqDateHiddenField.setAttribute("value", chqDateField.value);

    var bankHiddenField = document.createElement("input");
    bankHiddenField.setAttribute("type", "hidden");
    bankHiddenField.setAttribute("name", "Bank");
    bankHiddenField.setAttribute("value", bankField.value);

    var amountHiddenField = document.createElement("input");
    amountHiddenField.setAttribute("type", "hidden");
    amountHiddenField.setAttribute("name", "Cheque_Amount");
    amountHiddenField.setAttribute("value", amountField.value);

    form.appendChild(chqNumberHiddenField);
    form.appendChild(chqDateHiddenField);
    form.appendChild(bankHiddenField);
    form.appendChild(amountHiddenField);

    var netAmountField = document.getElementById("net_amount");
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");

    var netAmount = parseFloat((netAmountField.value === "" ? "0" : netAmountField.value));
    var chequeAmount = parseFloat((amountField.value === "" ? "0" : amountField.value));

    var balance = netAmount - chequeAmount;

    balanceField.value = balance.toFixed(2);
    paymentField.value = chequeAmount;
    paymentField.readOnly = true;

    $("#myModal").modal('hide');
}

function addInvoiceRow() {
    var itemIdField = document.getElementById("item_id");
    var itemNameField = document.getElementById("line_item_name");
    var quantityField = document.getElementById("qty");
    var availabelQtyFieled = document.getElementById("available_qty");
    var unitPriceField = document.getElementById("unit_price");
    var netAmountField = document.getElementById("line_net_amount");
    var grossAmountField = document.getElementById("line_gross_amount");
    var discountField = document.getElementById("discount");

    var errorAlert = document.getElementById("item_error_msg");

    if (itemIdField.value === "") {
        itemNameField.style.border = "1px solid #ed5565";
        itemNameField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select an item";

        return false;
    } else {
        itemNameField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (unitPriceField.value === "") {
        unitPriceField.style.border = "1px solid #ed5565";
        unitPriceField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Enter Unit Price";

        return false;
    } else {
        unitPriceField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (quantityField.value === "") {
        quantityField.style.border = "1px solid #ed5565";
        quantityField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Enter Quantity";

        return false;
    } else {
        var quantity = parseFloat(quantityField.value === "" ? "0" : quantityField.value);
        var avbQuantity = parseFloat(availabelQtyFieled.value === "" ? "0" : availabelQtyFieled.value);

        if (quantity > avbQuantity) {
            quantityField.style.border = "1px solid #ed5565";
            quantityField.focus();

            errorAlert.style.display = "block";
            errorAlert.children[1].innerHTML = "Quantity cannot be Greater Than Available Quantity";

            return false;
        } else {
            itemNameField.style.border = "1px solid #ccc";

            errorAlert.style.display = "none";
            errorAlert.children[1].innerHTML = "";
        }
    }

    var tbody = document.getElementById("invoice_details_tbody");

    var currentRoeCount = tbody.rows.length;


    var itemIdText = "<input type='hidden' name='Item_Id" + currentRoeCount + "' value='" + itemIdField.value + "'/>";
    var itemNameText = "<input type='text' name='Item_Name" + currentRoeCount + "' id='Item_Name" + currentRoeCount + "' value='" + itemNameField.value + "' class='hdnfield' readonly/>";
    var quantityText = "<input type='text' name='Quantity" + currentRoeCount + "' id='Quantity" + currentRoeCount + "' value='" + quantityField.value + "' class='hdnfield' readonly/>";
    var unitPriceText = "<input type='text' name='Unit_Price" + currentRoeCount + "' value='" + unitPriceField.value + "' class='hdnfield' readonly/>";
    var grossAmountText = "<input type='text' name='Gross_Amount" + currentRoeCount + "' value='" + grossAmountField.value + "' class='hdnfield' readonly/>";
    var discountText = "<input type='text' name='Discount" + currentRoeCount + "' value='" + discountField.value + "' class='hdnfield' readonly/>";
    var netAmountText = "<input type='text' name='Net_Amount" + currentRoeCount + "' value='" + netAmountField.value + "' class='hdnfield' readonly/>";

    var rowText = "<tr><td>" + itemIdText + itemNameText + "</td><td>" + quantityText + "</td><td>" + unitPriceText + "</td><td>" + grossAmountText + "</td><td>" + discountText + "</td><td>" + netAmountText + "</td></tr>";

    var currentRows = tbody.innerHTML;
    currentRows += rowText;

    tbody.innerHTML = currentRows;

    var rowCountField = document.getElementById("row_count");
    rowCountField.value = currentRoeCount;

    var totalGrossAmountField = document.getElementById("gross_amount");
    var totalDiscountField = document.getElementById("total_discount");
    var totalNetAmountField = document.getElementById("net_amount");
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");

    var lineNetAmount = parseFloat((netAmountField.value === "" ? "0" : netAmountField.value));

    var grossAmount = parseFloat((totalGrossAmountField.value === "" ? "0" : totalGrossAmountField.value));
    var totalDiscount = parseFloat((totalDiscountField.value === "" ? "0" : totalDiscountField.value));

    grossAmount += lineNetAmount;

    var netAmount = (grossAmount - (grossAmount * totalDiscount) / 100);

    var payment = parseFloat((paymentField.value === "" ? "0" : paymentField.value));

    var balance = netAmount - payment;

    totalGrossAmountField.value = grossAmount.toFixed(2);
    totalNetAmountField.value = netAmount.toFixed(2);
    balanceField.value = balance.toFixed(2);

    $('#sale_location').attr("style", "pointer-events: none;");
    clearInvoiceDetailFields();
}


function calculateInvoiceTotals() {
    var grossAmountField = document.getElementById("gross_amount");
    var totalDiscountField = document.getElementById("total_discount");
    var netAmountField = document.getElementById("net_amount");
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");

    var grossAmount = parseFloat((grossAmountField.value === "" ? "0" : grossAmountField.value));
    var discount = parseFloat((totalDiscountField.value === "" ? "0" : totalDiscountField.value));
    var netAmount = (grossAmount - (grossAmount * discount) / 100);
    var payment = parseFloat((paymentField.value === "" ? "0" : paymentField.value));
    var balance = netAmount - payment;

    netAmountField.value = netAmount.toFixed(2);
    balanceField.value = balance.toFixed(2);
}

function calculateBalance() {
    var netAmountField = document.getElementById("net_amount");
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");

    var netAmount = parseFloat((netAmountField.value === "" ? "0" : netAmountField.value));
    var payment = parseFloat((paymentField.value === "" ? "0" : paymentField.value));

    var balance = netAmount - payment;

    balanceField.value = balance.toFixed(2);
}

function clearInvoiceDetailFields() {
    var itemNameField = document.getElementById("line_item_name");
    var itemIdField = document.getElementById("item_id");
    var untiPriceField = document.getElementById("unit_price");
    var quantityField = document.getElementById("qty");
    var grossAmountField = document.getElementById("line_gross_amount");
    var discountField = document.getElementById("discount");
    var netAmountField = document.getElementById("line_net_amount");
    var searchItemField = document.getElementById("item_name");
    var availableStockField = document.getElementById("available_qty");
    var itemListField = document.getElementById("item_list");

    itemNameField.value = "";
    itemIdField.value = "";
    untiPriceField.value = "";
    quantityField.value = "";
    grossAmountField.value = "";
    discountField.value = 0;
    netAmountField.value = "";
    searchItemField.value = "";
    availableStockField.value = "";
    itemListField.value = "";

    searchItemField.focus();
}

function checkPaymentType(paymentTypeField) {
    if (paymentTypeField.value === "CH") {
        showInvoiceChequeModal(paymentTypeField);
    } else if (paymentTypeField.value === "CR") {
        changeInvoiceCreditFields();
    } else if (paymentTypeField.value === "FR") {
        changeFreeOfChargeFields();
    } else if (paymentTypeField.value === "CA") {
        changeInvoiceCashFields();
    }

}

function checkGrnPaymentType(paymentTypeField) {
    if (paymentTypeField.value === "CH") {
        showChequeDetailsModal(paymentTypeField);
    } else if (paymentTypeField.value === "CR") {
        changeGrnCreditFields();
    } else if (paymentTypeField.value === "FR") {
        //changeGrnFreeOfChargeFields();
    } else if (paymentTypeField.value === "CA") {
        changeGrnCashFields();
    }

}

function changeInvoiceCashFields() {
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");
    var netAmountField = document.getElementById("net_amount");
    var discountField = document.getElementById("total_discount");
    var grossAmountField = document.getElementById("gross_amount");
    var invoiceNumberField = document.getElementById("invoice_no");
    var locationTypeField = document.getElementById("sale_location");

    paymentField.value = "0.00";
    discountField.value = "0";
    netAmountField.value = grossAmountField.value;
    balanceField.value = netAmountField.value;

    var invoiceValue = invoiceNumberField.value;
    if (invoiceValue.includes("FOC")) {
        updateInvoiceNumber(locationTypeField);
    }

    discountField.readOnly = false;
    paymentField.readOnly = false;

}

function changeGrnCashFields() {
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");
    var netAmountField = document.getElementById("net_amount");
    var discountField = document.getElementById("total_discount");
    var grossAmountField = document.getElementById("gross_amount");

    paymentField.value = "0.00";
    discountField.value = "0";
    netAmountField.value = grossAmountField.value;
    balanceField.value = netAmountField.value;

    discountField.readOnly = false;
    paymentField.readOnly = false;

}

function changeInvoiceCreditFields() {
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");
    var netAmountField = document.getElementById("net_amount");
    var discountField = document.getElementById("total_discount");
    var grossAmountField = document.getElementById("gross_amount");
    var invoiceNumberField = document.getElementById("invoice_no");
    var locationTypeField = document.getElementById("sale_location");

    paymentField.value = "0.00";
    discountField.value = "0";
    netAmountField.value = grossAmountField.value;
    balanceField.value = netAmountField.value;
    var invoiceValue = invoiceNumberField.value;
    if (invoiceValue.includes("FOC")) {
        updateInvoiceNumber(locationTypeField);
    }

    discountField.readOnly = false;
    paymentField.readOnly = true;

}

function changeGrnCreditFields() {
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");
    var netAmountField = document.getElementById("net_amount");
    var discountField = document.getElementById("total_discount");
    var grossAmountField = document.getElementById("gross_amount");

    paymentField.value = "0.00";
    discountField.value = "0";
    netAmountField.value = grossAmountField.value;
    balanceField.value = netAmountField.value;

    discountField.readOnly = false;
    paymentField.readOnly = true;

}

function changeFreeOfChargeFields() {
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");
    var discountField = document.getElementById("total_discount");
    var netAmountField = document.getElementById("net_amount");
    var prefix = "FOC";

    discountField.value = "100";
    netAmountField.value = "0.00";
    paymentField.value = "0.00";
    balanceField.value = "0.00";

    paymentField.readOnly = true;
    discountField.readOnly = true;

    $.ajax({
        type: "POST",
        url: 'a_get_the_prefix.php',
        data: { prefix: prefix },
        success: function(data) {
            var nmbr = JSON.parse(data);
            document.getElementById("invoice_no").value = nmbr;
        }
    });
}



function showInvoiceChequeModal(paymentTypeField) {
    var grnDetailsTBody = document.getElementById("invoice_details_tbody");
    var invoiceNumberField = document.getElementById("invoice_no");
    var locationTypeField = document.getElementById("sale_location");
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");
    var netAmountField = document.getElementById("net_amount");
    var discountField = document.getElementById("total_discount");
    var grossAmountField = document.getElementById("gross_amount");

    paymentField.value = "0.00";
    discountField.value = "0";
    netAmountField.value = grossAmountField.value;
    balanceField.value = netAmountField.value;

    discountField.readOnly = false;
    paymentField.readOnly = false;




    if (grnDetailsTBody.rows.length === 0) {


        paymentTypeField.selectedIndex = 0;

        return false;
    }

    var bankField = document.getElementById("bank");

    var banks = [
        "Axis Bank Ltd.", "Bank of Ceylon", "Cargills Bank Ltd.", "Citibank N.A.", "Commercial Bank of Ceylon PLC", "Deutsche Bank AG",
        "DFCC Vardhana Bank PLC", "Habib Bank Ltd.", "Hatton National Bank PLC", "ICICI Bank Ltd.", "Indian Bank", "Indian Overseas Bank",
        "MCB Bank Ltd.", "National Development Bank PLC", "Nations Trust Bank PLC", "Pan Asia Banking Corporation PLC", "Peoples Bank",
        "Sampath Bank PLC", "Seylan Bank PLC", "Standard Chartered Bank", "State Bank of India",
        "The Hongkong and Shanghai Banking Corporation Ltd.", "Union Bank of Colombo PLC"
    ];

    for (i = 0; i < banks.length; i++) {
        bankField.innerHTML += "<option value='" + banks[i] + "'>" + banks[i] + "</option>";
    }

    var chequeAmountField = document.getElementById("amount");
    //var netAmountField = document.getElementById("net_amount");
    var paymentField = document.getElementById("net_amount");

    chequeAmountField.value = paymentField.value;

    $("#myModal").modal({
        backdrop: 'static',
        keyboard: false
    });

    var chequeNoField = document.getElementById("chq_number");
    chequeNoField.focus();

    var invoiceValue = invoiceNumberField.value;
    if (invoiceValue.includes("FOC")) {
        updateInvoiceNumber(locationTypeField);
    }
}

function addInvoiceChequeDetails() {
    var chqNoField = document.getElementById("chq_number");
    var chqDateField = document.getElementById("chq_date");
    var bankField = document.getElementById("bank");
    var amountField = document.getElementById("amount");

    var errorAlert = document.getElementById("modal_error_msg");

    if (chqNoField.value === "") {
        chqNoField.style.border = "1px solid #ed5565";
        chqNoField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Enter a Cheque Number";

        return false;
    } else {
        chqNoField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (chqDateField.value === "") {
        chqDateField.style.border = "1px solid #ed5565";
        chqDateField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select a Cheque Date";

        return false;
    } else {
        chqDateField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (bankField.value === "") {
        bankField.style.border = "1px solid #ed5565";
        bankField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select a Bank";

        return false;
    } else {
        bankField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (amountField.value === "") {
        amountField.style.border = "1px solid #ed5565";
        amountField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select a Bank";

        return false;
    } else {
        amountField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    var form = document.forms[0];



    var chqNumberHiddenField = document.createElement("input");
    chqNumberHiddenField.setAttribute("type", "hidden");
    chqNumberHiddenField.setAttribute("name", "Cheque_No");
    chqNumberHiddenField.setAttribute("value", chqNoField.value);

    var chqDateHiddenField = document.createElement("input");
    chqDateHiddenField.setAttribute("type", "hidden");
    chqDateHiddenField.setAttribute("name", "Cheque_Date");
    chqDateHiddenField.setAttribute("value", chqDateField.value);

    var bankHiddenField = document.createElement("input");
    bankHiddenField.setAttribute("type", "hidden");
    bankHiddenField.setAttribute("name", "Bank");
    bankHiddenField.setAttribute("value", bankField.value);

    var amountHiddenField = document.createElement("input");
    amountHiddenField.setAttribute("type", "hidden");
    amountHiddenField.setAttribute("id", "cheque_amount");
    amountHiddenField.setAttribute("name", "Cheque_Amount");
    amountHiddenField.setAttribute("value", amountField.value);

    form.appendChild(chqNumberHiddenField);
    form.appendChild(chqDateHiddenField);
    form.appendChild(bankHiddenField);
    form.appendChild(amountHiddenField);



    var netAmountField = document.getElementById("net_amount");
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");

    var netAmount = parseFloat((netAmountField.value === "" ? "0" : netAmountField.value));
    var chequeAmount = parseFloat((amountField.value === "" ? "0" : amountField.value));

    var balance = netAmount - chequeAmount;

    balanceField.value = balance.toFixed(2);
    paymentField.value = chequeAmount;
    paymentField.readOnly = true;

    $("#myModal").modal('hide');
}

function validateInvoiceForm() {
    var invoiceNoField = document.getElementById("invoice_no");
    var saleLocationField = document.getElementById("sale_location");
    var invoiceDateField = document.getElementById("invoice_date");
    var customerIdField = document.getElementById("customer_id");
    var customerNameField = document.getElementById("customer_name");
    //var supplierInvCodeField = document.getElementById("grn_invoice_code");
    var detailTBody = document.getElementById("invoice_details_tbody");
    var itemNameField = document.getElementById("item_name");
    var paymentTypeField = document.getElementById("payment_type");
    var grossAmountField = document.getElementById("gross_amount");
    var netAmountField = document.getElementById("net_amount");
    var paymentField = document.getElementById("payment");

    var errorAlert = document.getElementById("item_error_msg");

    if (invoiceNoField.value === "") {
        invoiceNoField.style.border = "1px solid #ed5565";
        invoiceNoField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Invoice Number is Invalid";

        return false;
    } else {
        invoiceNoField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (saleLocationField.value === "") {
        saleLocationField.style.border = "1px solid #ed5565";
        saleLocationField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select a Sale Location";

        return false;
    } else {
        saleLocationField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (invoiceDateField.value === "") {
        invoiceDateField.style.border = "1px solid #ed5565";
        invoiceDateField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select an Invoice Date";

        return false;
    } else {
        invoiceDateField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (customerIdField.value === "") {
        customerNameField.style.border = "1px solid #ed5565";
        customerNameField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select a Customer";

        return false;
    } else {
        customerNameField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (detailTBody.rows.length === 0) {
        itemNameField.style.border = "1px solid #ed5565";
        itemNameField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Add Invoice Details to Save";

        return false;
    } else {
        itemNameField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (grossAmountField.value === "") {
        grossAmountField.style.border = "1px solid #ed5565";
        grossAmountField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Gross Amount is Invalid";

        return false;
    } else {
        grossAmountField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (netAmountField.value === "") {
        netAmountField.style.border = "1px solid #ed5565";
        netAmountField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Net Amount is Invalid";

        return false;
    } else {
        netAmountField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (paymentTypeField.value === "") {
        paymentTypeField.style.border = "1px solid #ed5565";
        paymentTypeField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select a Payment Type";

        return false;
    } else {
        if (paymentTypeField.value === "CA" && (paymentField.value === "" || paymentField.value === "0.00")) {
            paymentField.style.border = "1px solid #ed5565";
            paymentField.focus();

            errorAlert.style.display = "block";
            errorAlert.children[1].innerHTML = "Invalid Payment Amount";

            return false;
        } else if (paymentTypeField.value === "CH" && (document.getElementById("cheque_amount") === null)) {
            paymentTypeField.style.border = "1px solid #ed5565";
            paymentTypeField.selectedIndex = 0;
            paymentField.focus();

            errorAlert.style.display = "block";
            errorAlert.children[1].innerHTML = "Enter Cheque Details";

            return false;
        } else {
            paymentTypeField.style.border = "1px solid #ccc";
            paymentField.style.border = "1px solid #ccc";

            errorAlert.style.display = "none";
            errorAlert.children[1].innerHTML = "";
        }
    }

    return true;
}

function calculateSaleOrderInvoiceLineDiscount(row) {
    var grossAmountFieldCell = row.cells[3];
    var discountFieldCell = row.cells[4];
    var netAmountFieldCell = row.cells[5];

    var grossAmountField = grossAmountFieldCell.children[0];
    var discountField = discountFieldCell.children[0];
    var netAmountField = netAmountFieldCell.children[0];

    var grossAmount = parseFloat(grossAmountField.value === "" ? "0" : grossAmountField.value);
    var discount = parseFloat(discountField.value === "" ? "0" : discountField.value);
    var netAmount = (grossAmount - (grossAmount * discount) / 100);

    netAmountField.value = netAmount.toFixed(2);
}

function tableToJSON(tableId) {
    var table = $("#" + tableId);

    var colsLength = $(table.find('tbody tr')[0]).find('td').length;
    var rowsLength = $(table.find('tr')).length;

    var details = [];

    for (var i = 0; i < rowsLength; i++) {
        var tableRow = $(table.find('tr')[i]);
        var rowData = [];
        for (var j = 0; j < colsLength; j++) {
            var textAlign = 'left';

            if (($(tableRow).find('td').eq(j).attr('class') === "align-right") || ($(tableRow).find('td').eq(j).css('textAlign') === 'right')) {
                textAlign = 'right';
            }

            var colspan = (tableRow.find('td').eq(j).attr('colspan') == null ? 0 : tableRow.find('td').eq(j).attr('colspan'));

            if (i === 0) {
                if ($(tableRow).find('td').eq(j).attr('class') !== "no-print") {
                    rowData.push({ text: tableRow.find('td').eq(j).text(), fontSize: 9, margin: [0, 0, 0, 0], bold: true, alignment: 'center', colSpan: tableRow.find('td').eq(j).attr('colspan'), fillColor: '#ddd' });

                    //j += (colspan === 0 ? colspan : (colspan-1));
                }
            } else if ($(tableRow).attr('class') === "mark-name") {
                if ($(tableRow).find('td').eq(j).attr('class') !== "no-print") {
                    rowData.push({ text: tableRow.find('td').eq(j).text(), bold: true, colSpan: tableRow.find('td').eq(j).attr('colspan'), fontSize: 9 });

                    //j += (colspan === 0 ? colspan : (colspan-1));
                }
            } else if ($(tableRow).attr('class') === "sum-row") {
                if ($(tableRow).find('td').eq(j).attr('class') !== "no-print") {
                    rowData.push({ text: tableRow.find('td').eq(j).text(), bold: true, fillColor: '#ccc', fontSize: 9, alignment: textAlign, colSpan: tableRow.find('td').eq(j).attr('colspan') });

                    // j += (colspan === 0 ? colspan : (colspan-1));
                }
            } else {
                if ($(tableRow).find('td').eq(j).attr('class') !== "no-print") {
                    rowData.push({ text: tableRow.find('td').eq(j).text(), fontSize: 9, margin: [0, 0, 0, 0], alignment: textAlign, colSpan: colspan });
                }
            }
        }
        details.push(rowData);
    }

    return details;
}

function exportSaleInvoiceToPDF(table) {

    var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [10, 15, 10, 10],
        content: [{
            table: {
                widths: ['25%', '75%'],
                body: [
                    [{
                            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaEAAAFACAYAAAAVsMPlAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAR5xSURBVHja7L3nliNHkiVsDhnQKpGZJUh295zdebZ5g32HfcD9ZraHTbJECmgVAe3fD6b5GizNRQSAYrGKOIeHlZlAIIS7iWvXrimtNfz1+uv11+uv11+vv15/xCv31y346/XX66/XX6+/Xn/Uq+D64//+3/8blFInv8PMCX+fNZNSSp18lh+Hfy//GT9Dz4e+B39/PB5PPs/fJx1XOid83/F4NMfQWpv/a60hl8uB1tp8Jz8+vp+eA/17Lpc7uS/8++l3hNx3pRTkcjnrs8P/02PiZ1zP43g8ntwHej3S86B/4/cRr5l/9ng8ntwvfkzf9dueKz+m7ZlL50zvDz4PfNb8upVScDgcTs4Hrymfz5+cR5IkMJvN4Pn5WW82G2i32/D3v/9dVSoV2O12J8ek94Wu73w+f3JOuFb4PaNrlt+nNPdX+rxrP7vWJd1Dvu+l6wb/LdmCNHYp5L3Se/g94LaGn5fLjvH7Q+2L9F78rv/4j//4tp3Q1/iSFv8ljnfJY0rGkDomm2GkRsK1kUKdEDeitoVON7MUJEh/s90r7nhc320LHPh1cid0znNK81kpGAhdS1IAwZ+z1hqSJIGnpyd4enrS2+0WcrkcbLdbaLVa8ObNGzHooAaKXw86IOk5u9Y7dz6h+yzEyIYadslJ2tYODZ5CHKjNmGdZB1KgJu1h6XnZAlPbeuPH/e4yIWmR2yLkLDfIZehCF7QtYpAyLd+5Shs91NDwLMl3T0IWF1/Q9L1pjIQtM0nrYLI47ZAoUTIqWQOIawQn3OBLGSk/F4zUqVOgxkspBXEcw+Pjo14sFnA8HqFSqUA+n4f9fg/r9fpV1i2ty7SIgiswybJ3bc8LMx2XQ0izfnzOw+W0QpAY199sNibk+2z7y5dxSw7w0gH4n8YJ+aCcUAN/yYhVirZtiyrLA7vUQ+YRq88pUdhGuvcc6gvdBNJCd8FPkqOzQZ8hTlCCQLkRl6JIei8utb7SPFsJqvIZO+pQeWZCnex2u4XxeAyPj4+/b8TC71sR4bf9fg+73Q6KxaLV6blgypDo+ZyMISQbznq/Q/Z+KBwduj/5PuBOVAqeJAgWj0eDrpAgORSOC/n8NwnHufD+NFGVDzMOdTwctnJFMLZFey3oLY2zCcmWJEdkMwDSc7n0dfqOGbppXFke/xytH9iecxYHJNVKfFg8/nu32726z9Rw8ffn83nI5/NwOBxgu93CcDiEwWCg9/u9qeccj0fY7XZQKBRgt9vp7XarSqWSMWi0HuSC3K4dBF5rH6U9f1s92JXN2OA+CdaU7F6oLcvn8yI0agsUbKiNLyj6bpzQuZCZ7yFmMR4SROIy7q7I5hIb4pysy1aY9C1eV+RqCxJsGa0rk0wDXdDvoaQD/n6e0bnOS3Ku144CXcFVCAyIpASe4W63W5jNZvD582c9n8+hVCpBoVAwRq9QKBhSA95DGlXjPaXkEJolccMcUouw1SN88BI6Vw5Fp62hUcJFmv3nM9ZSBupCeUJtXBYH7YLa+PHoM/8eXoVrbuK0xjeNYeesL6nIGVIDyXI9x+NRLEyGQm9ZMoxrR6FpMPqQ66NsPt9GlzamreZySdjVlrXQ8/YFQfTc9vu9cQrohPDnXC4HSZLAdDqFx8dHfTgcIIoiOB6Ppg50PB6hUCgYB0ShIfwP/4bfiU4LnZLvnoRAaGnQiXPqS7Z9GYJgSPubrxHpGUprz5Uh0585NJxlX9sCSQ49+57Ht0RSKGR1FJe4CVlgnWtDapc06NdYKDa2U8jivAQDz0bttb0Oh8MrzNx1XtyI4Mak5y2RHKTj+KJ/GoVnXU/0u5B6zR1ULpeDzWYDs9kMHh4e9Hg8hlKpZIzk4XAwDoifN3VI1NnkcjkoFAoG9kHnxYMjydidgwhkram51pevbSIEmqK09EsF0DSb520XaQk0tkzIdvxv0dlcNBNKQ/nMmjVlufm2VNeFy4YsRNu1SfUoF63Zl/VI/R+u83V9l21DhkAzIQ7sXIhLql1JG5T2Xvm+OwtszM8plGXFM3HaG4SOE7McAIDJZALPz896uVwa58E/T3t+CoXCCSyz3+9PzmO73cJisQCtNRQKBWi322LvTCiBIO0zDDHEadeK9BxC1qVt74cGaL4sPQ0UbPtOW8+b7fi275BqVd+0E3J5cBvlNstiD2ngCvlMGiNyCUjxEtFWSK+MCyqybWBKBZb6Fuiitm2wczNNG/GAF/F5JEh/x5tWj8cjHA4Hk3VkWV+uje5aizZYhUIpNFNBmG02m8HHjx/1YrEApRREUQS73Q601lAsFqFWqxlHhdeKWQ2F53DfxXEMT09Pej6fw36/h3q9DofDQTUaDfN5dHK+zPOcfWGr4bjqHmmJOGlthc1RZKlT2QKlrJmQ6x7ZnJIv8P0u4Dhfipw1ysra8Z62BuFiz2U5v5BCqGvzcyzdhmuf4wD5cSUmlS1zCynGX6LPxPeiER8aVapCQO8XDYhsmV5a6CjEsVHHSc+Lnsd0OoVPnz7p5XIJpVIJDocDbDYb2O12UKlU4ObmRrXbbcxu9GazMZmQ1hq22y0cj0fz2clkAoPBQE8mE9jtdnA4HGC/30MURdBoNE6csy/Sv8QzzLpPLxHY0HXCVT/SrOsQG+YK5HzwpZRd2Ry1DzH5FhtXC6GLzIZZutLYkIV6TiezC7N2UbnPzVxsUEcojOCjW4duDB9s4KodXQpCOdd4ueRjKMRF6x0IZ9HsIKR2EWpssr7y+bwhD6zXa0NCmM1m5m/b7RYAABqNBtzd3an7+3tDUFgul2o4HOrtdmtqacVi0WR/q9UKRqORHo/HAAAQRZF5xkmS6MPhoKhUj0QF5jJJlyLDpPm9zWmkrQO7DD5nmNmcVBoUKCSgdZEtpD4vqWZnU1xIC4d+M06I34jQxZa1JygNfpsmpU9L/7RlfD5jTmGwkOvIChucE7FKHfyhMEkoJTyNHpeNTICUZVo/oc7I1ScSukZ8VHUb1INwGj03JAms12sYj8cwHA51kiSQz+ehXC7D4XCAUqkElUoFut2uurm5Mc2oqJiAx16v14CfPR6PMJvNYDwem5oSZmJI78b+I7xnaTPmcyH1cyF4WwCXNSiikK+EMmSxAT5KuIvg4nKYNkIND1LPIdD8qZ0QN5a2dFcSCr1WHSVLZpTFOGWF9GyOy1VjCIEAQr7L9x34nFwU5EtBLz64zXZvXrIC2O/3xtBHUQTlctkU+/l1UDaZT3KJwrZZo0oKF2LN5nA4QJIkMBwO4enpScdxfLI/jscj1Ot1uLm5UTc3N8bp4HOOosg4tTiO4V//+pculUoAALDZbGC1WsHhcIBisQi5XM6QFbTWUCqVYL/fQ7PZfCUV5MqUsxpcH/TtW6c+LcUsKEqIPciSSdiUKv6o1yUg+z+NEwpt2MsCcZzTW2Bju/n+JuH5tvTZVrOxOaJzKOWSBAvtRZJS9rQMGZuWnhSNncuCOzdj2+/38PDwoEejEWitIYoiKJVKUKvVIJ/PK8wsCoUCRFEEhUIBisUiFAqFk8xAui6EozCjwowGmXjcGXIaLd5DrFEBAJTLZaMF9/T0BMPhUMdx/CpzyuVyEEURdDodKJfLMJ/P8ZpOnCpCejTrwWPh9eH6wGs9Ho+A6gvonADA1JayNlxmreVIzbDXbvlIa6QlmOscaNql8RcCUfp0Ob+1DCjYCYU6mbS1ndCOf9vvJCkXm1F3wRBpm2ZDna8v5fcteJtygAt7lr5TYkIdj0coFosnn6EGljPmbM9DYrxx7S2ebdjOkR77xVir/X6v0WGsVitYrVZwPB41Ms/y+bxxPqVSCarVqiqVSqCUgnK5DPl8Hkqlksku0Fgj64wbId6DQ39HrxGvc7PZGIexWq3g06dPejgcwna7Nc6CZlztdhv6/b6qVCowHo9hOp1Cr9eDTqdjNZ60T4oHTnh8/Pt+vzeZoC3TPFdw2LdP+bMOyeyzQtJZ6PqhdHxXO0Ga7/M5KpvNuoQ23jfhhFzpuK/PQ5pjY4tWfB6fY6a2Hg26YbMsUCkjkWjGtmtzOR6XtLtNQiUkygyFCn1svHMx+FD4zQZx0HPK5XJwe3sLx+MRBoMBxHFsCvuYUUjq1IVCQaNRrtVqJlMqlUqqVCpBuVyGKIoA4Pe+G3RgtDZG+3Kos6LXgf8VCgXYbrcwGo3g6elJT6dTQx/H80Kn0Gq14P7+XhUKBfj8+TOMRiMdxzEUi0XVarVgv98b1QTaX0Sdie3Z4P1AJh1VbPAFZJeq6ZxjINO0BvjGNWQV/bSNILEx7UL6dXzkBZ+wsKtullZx/k8Px0mRgU+Kwhfh2MQjQyO2UFbNOUP30hz3Sy+ItFEcNdYYNbsCAJvgI/4OC+pSg6kL87cx9mjWAABQKpXgzZs3aLQNxZl+L2fRUWFR/P9L5qKVUubzePxisXjioIrFIhSLRZNl0b4fCo/iz+v1GgaDgR6NRrBerw2VnPZpEfq0KhQKMBqN4MOHD5rDfrzW4ouGJdFUdEISMeGagpeuvpasx7iEKG2owwt1TD5bk4aQk6bOLCnLfzdw3LlG0pd2+hzMJZyE5OxcmYkvIrJx/M+BNrJEqi5IK+Q4EuTmak7OopTuy/LodXOxU4QM7+7uoFgsqt9++03HcXwS/fP6lRQkUTgNHS+SCF4K/DqXy0GpVDLkh2KxqMrlsvkdZky0BjOdTmEymejxeGyyJkoLxpEMxWIRCRX66ekJ5vO5qe0g6QDrUzi+gUJ4IYYd37fdbvXhcFDohM6RsAlxgjaE40sMHUzTauBDWNLuuzSOKE2ZIo0DDhnr8s04Ide0v2tBOJec5xOKB9vS7nONfQi0eY6iuO/3nGxA1ZdtDl1Sv7YFF76Nw0UfbfI3+HssqiOklM/nccKo+vTpk14sFgZKszlWqf+CEw8w28FsZb/fQ5Ik+FktNfjSEdqYdeD1UdXrYrEI+/0eyuUyAPwusTMYDGCz2fy+6Qi5AD+DNSjKeJN06KSZNXhdu93OOtrbBs2lbZ/IShO2KSekGbqXZv6Rr34Tauiv1RzqGmPi6338lnqEgpxQiLNx1TvOea/LCPpGD7hmHoUOmLI5qjTaVrbvlGRqsjgwfr5SD40tE/ySDDhf4MKzTCrKqZSC+/t7KBQK6sOHD3o4HJqahy3Dws/Rv6OjQGfHmWechEAdFlewpv041AEppcxMIGT6ISECqdQUeqxUKuZ3SLTYbrfOrNs2nZM6sC+psJ4m+g+BsV3tEaHZmyuQCjkmR0f4qArfQEHXtUn1c75neaDoKnt8t3BcSPFcqvXY4J9QVlkWeCokG+ILX8oWLqmrFkqZtRUsXQKHPCLkmZDNwEn1Hxv0id9DnQGlLXMZpZApuJzBh4Zku91CPp+HVqsFm81GJUmi1+u1aOB4/w/+ngqA0r+hg6BkAoTRqAPhzwRJBJLhQ/YeKh9EUWScIDbflstlqNfrql6vmyyGZzhpdNbQkCVJArVazcCB0vtDptqGOhkqm8NZfDT7/JLzuWyO7Fyqc4hzDyWCZKG8Xwsx+tM7oRBjH/L7UFjpUucXAsVxo3tOH42v8dV3vtI8o1C4DA2DjdZ+juBjls3Kjy01OvNzwlHX3W4XZrMZPD09WZ+hTc7H1bjLa2SckMCfGydIYJ8OrQ1hJodZ2QuN3NC0G42GOWYURaZZ1aYGwYMkWhvA963X61eOP+0zTbO2szSMXsP4h37nNbP/L5mdfEs9Q4VrPwRfP5APNrr0ObmiPR/2yjOISy06m8Chi7Ydgs1z+RtqTLmxo6w2NKbSaAn8LBb2KfSE0T42X3LHwHXL8P02RXbqRPE7KavPdZ9sPUkhWSXPGiQdPrpuEUYrl8uAhAa8XswUd7sdtFot1e12odVqGYkddFiYPdGaURr4RRJ0dTlp1+f/yJHdf5ZX6EiH78GJfFVOyOZk0mCmaXDnEKpjmkjNV9SkkIOkEccnMLrgAJtig00ihL+P10QkjNp1DrQ+IkFmdBidLUhAA4z9O3gsdGLoNLjCNM1SMFOQGmXRuaGxRk211Wr1CloMybSl4Xou3F6CIum5oAJCpVKBer1u4LVqtWpqQ5vNxtzPZrNp6j9aa9hsNiYDwnuHCtp4P31ZNV93Ng2yaxg+m+KATZ3j3MwmjTK/zUmcAw/6oL+sKtuXcHrfrBOy9e3wAh0v3PGbxmfH+EgAXPH2e0xZfdpmNvFDF/wUqjjBlQ9ckCrWThaLhand4HN7McIaRw7QKB2jfcxs8Pe0xkCHtOXzeWOYkyRxEhNsayG0IVgiTHCn+/btWyiVSqper0OlUjGZmtYa4jg2jDeUHKIyQfhCuR90aKiRN5lMDFvO5VAlCJbDr/z3l5g8GrLPbEPdbM7RNRDy0pDhtQ16KOknjdbetzxhtfClDbvtAaWJctIUbC+t/nuJxRAiIOn6rGtomC27k6AaPj6bZiL8/2h80SlhloLzcT5//qyHw+HJWG7MdLjcDTWOkjOhQ9nQsCNrjCoY2DICn+CkSzrIV5NEIx7HMWw2GyNSyp9psVhULwQGjQ2xCNu1222oVqugtYb1en2SWZfLZQUAmj9DmuVQ5W6bYw2h0UsZ4SWzJonmnlZdIBRlCXE8l3JEtqzHNbfpEsSMc8fe/OkzIRv27hsf7GJhuTZ5Vj78OYvrmrRWn1G0fX8ow8f2XZTlR+sMtIiOToaeG2Yq+JJYd+hUqOIANn4izZg+T06ucN1zCndytQI+xlqSBLI5Jkn6yQYbc+NJa1jPz88n9084B43K1kopjedbrVbh7u5OtdttaLVaUC6XDdMun89Do9GAarVqYLw0hjEkmwhZa6Hvz7JnQghGaR1SSGPtJR1QWvtxKejvEk3yf+pMKK1nD6V72gruvmYzHsFniRZCcdxzHZWLHGFTtpZqMNTQYI8KhV+k43N5Fw65UUIBqgFgM+aLrI0o2U8zp1wuB7VaTZVKJY3sLJrh8GBEcho2Y0XvA6WAS88lDd7PI3+bFhd3pDQzlGpFtHEU62HYGJvP5yFJEvjll190r9eD3W6n3rx5Y2pnuVwOyuUydDodeHh4eHU9vnHtfJDbH1FjuMRxz50qbEMLXA3qvnPndVweING9EEKnlvqAQmZ1fSlI8auF484dDRxSMHctRn7jpf4N1/eGjN71fTZt1BXi/ELkTzCLwf+/RNhWuSE0SFRGhrLLNpsNHA4HTTcokgQ2mw3s93tot9vQ6/UU1jyog8TzwDpQvV6HRqMBm83GSO5QEU2bMZCIAtT44mgCzBTwPH21Dd6sGiLzJGVPNoNB6ziuviM8zm63M45ov9/DaDSC2Wym4zhWt7e3UKlUzPe/f/9exXGsX1TDX2V+CIPSuhFmty5hWGpM+ZrjmaaUBdro4pRsQuFWqfeOwon82LZasEsf7lLUbZt9cNk/6e+hDbVSJu5Dn3jd9ruQ7XHJjmdxQLaOY5fBDxHss9UDXOO30zirrNlQyLwSX08Ih7M4A4/WXqjTeSneG1IARuYIk2HWwyN4quZcKpUAp39SI4f/xqI6wkzNZlMtl0tNGy/xfdL1up4JrRnR+4bZBVLOpREHrnUVokIsGV0+3p5K+EjPkH8X0tZR1gcZcB8+fNCbzQZardbJqO+///3v6vHxUY9GI3OPKaUbiRBUNBXPE6es4tA8nDOE10zffy34+Y94nTv22qXC4qr32PQmz5lSa1OWuRa55Kt1Ql+CQeJ6MJfWkEszHfFS/RK+63TVRCjERDXKqOPZbDaw2+00Zi/obJCFJWUjnH3GCQSlUsnUJPBvPEtByA0bMguFAvR6PdhsNvDp0yfY7/dQrVZPnBB+l0SEsAU+1AnRSJo6YCpbQw1+1gZcH7nFF03bKMn02lBde7/fw8ePH+Hh4UEfDgd1d3cHlUoF60VKa60/f/5sHBfqzyHTDucnoYNbrVZ6v98rpIJTh+maOvu1vdKwwr6ma7Kx/tK0iriGVn6LbLlgOO4Swnm2iMFWA5DkS1zUYlskKn0n7YOhUbFtcik/JsJNtCbD5UukaJsPfeNwBI/Yt9st7HY72G63sN1uYb1ea8xojscjbDYbkaIrZYGSeCitDdH7UalUTCRN+3jonJtSqWQIDIT5pfb7vR6Px7Ber42TQgdhM/KuMcw0wufQEc9yeG0sDRMz1GnZggpfzxF9D2ZCeB+11vD4+Kg3m426u7uDRqMBURTBDz/8oI7Ho14sFq/mGKFzQdag1hpGoxEMh0N4//69yaBo8zCdKhs63iEkQMyqA3lOdnWpwXySXFVW5MdW73b1SvlqWNJ5fjdOKGRTuja6lDryhc+pwJIxdaXcrig1ywyVkKFZFJqivSN0k1N9MW68+WhmivEi3IQZzWaz0ev1Gtbrtfk9VWDmMBGvidDzo+fIR2KTwXAnowyQWoyOCA0brc3guRQKBajX65DP59Vut9Pz+fykPkAbWW2wpE3/jQYPFOLCuhSKg9pULngQY4MGbY7Rpuhha9L00Xj5FNfD4QDz+RziONbj8Rj+/ve/q5ubGxwFrh4eHuDjx4+aZj18dDc+i8FgoKvVqup2u5DL5cxQQNqv9KWRjy8J6Z3ToH4tuSqb87sErP/N14SkdDdUTM+X+biOZ9O/ohsuDWWR/50P/pJqLS6nx4vFNHvjBoYvnnw+bwr4+F0vmY5OksTAaXT4HLKsqECmlAFQh4OFcKRQv4hnKvwdDnCjAQOeM70OScaG1qEoUwz10Q6Hg1qv13q5XJpzQQjJpX3Hm2RphkkL2ujAUbUAHRBVKZAixpARzbZ/S82+tqiUZh5SMESNCiU5AAAsl0v47//+b71YLNS7d++g1WrBu3fvYL/fqxfY7lWNANdAqVSCOI7hl19+0cViUbXbbfNc8T2c0HAOvPUtdPyH6lmmVbt3ZYfnBsffzWRVSVAyZJSBb2ztpaIuCX+9BM06RP3WN0qAF84pfRON92azgdVqpZMkgSRJYLvdnjDBJLViStFGiRd0JuhYisWiwu9Hp8LZbdTo8eeC9GzudGgmJG1cdJi73Q7K5TJ0u11YLpfmmorF4iu6uGsOkdTgSmVtyuUytNttaDabSmut5/M5zGYzK2HAln35MqFzIBAfps/FU/GakySB//7v/9ZJksA//vEPFUUR/Pjjj9BqtdRvv/2mx+PxSa0HHTzeqziO4eHhAQAAWq0WAMBJFvu1OgMfBOojBYS+KDIhZawusovPuaQZamc7lm1sxyUzxj9lTSitcQ+dFZ9WpcBW8Ms6ZI4bGKp1ZsNqKbZPtdxokR8NM/57t9vBcrmEOI5NXWe1WpkxA2hg+YLHLKhQKEC5XDYO58XpqCiKjKPhsBt3XrSWQrMcGi0D/K4IQB0qdV48c6IsLcxGyuUy3N3dqel0qlHSh1O8XYaHjyLHcywWi8jEg1qtpqrVKmy3WxiPx7BarU5m8diec4iKgg3PlyjlvjlT0vrFeUYIUXJ9PYDfZX2m0yn885//1L1eT93e3sLNzQ3sdjsFABo19Gg2i8cuFoswHo/1druF9+/fq2azKdbbvnSv0Ll9dqGjEny1QJeqvUTJt0GqEv1dqkvb7FSI2retneW7yIR82LjLidgK5FkdjwvT9cF9IQtb6ptwHYvCYZjp4O9oBoQMtvV6reM4htlsZjB6PreIZkCY4VAHE0WRQjIA/kedDm02xXOgTkMyEJTtRu8FwltSLweF/aRREZhNUSo1hYA4xOfbiKjBVqlUoFqtQrvdVvV6Hfb7PUynUxgMBno6nUKSJK+gytAapm99hvZ2UWkdm/FE2Ayp1HiNmEnSZwcA8PT0BJPJRG+3W9Xv9+H+/h7q9br65z//qefzufkuDFTo1NfBYAAAoN++fatubm5OSCY+AV7JadnqXbZgzdeUHTqG22VzXL2Df8aa1qWSgm8uE8oKXWWVskiDo/rSYlc0YnO0UrMo/Rz239BrpHRqFLJcrVY6jmNIksSQC9BYSDUGlL+p1+tQLpcV1juoSgKvM9hUu7kDoo4Eqb5YN+LGgdYd6Nwd/DuF3rC3aLvdGsFSdETT6fRVr4+t0Y5ez36/N/WlZrMJnU5H1Wo149TW6zU8PT3p5+dnwDoa3h+anYUWiV3imq4hjFKG5YrU8T0IoVGYk9LmMUMC+J2JeTwe4fPnz3q1WsEPP/ygbm9vAQDUv/71Lz2dTuF4PBoJIOqUlFKwWCzg+flZt1ot5Zo4msUI/lHwnk+i6Es4g7/GMXwBJyQVjy+lIeXLsLiR5dGhjzThghts3c6+yM4GzaDh2Gw2xvG8wG6wWq1OsgZKmcUJm1EUQa1Wg0qlYpwOGiRaR6LPg0a0LikXfv20V0TCv3kzKr3f1KmtVitIkgSWy6XGWhbCSlSZgTIB6bXQLI1+L2ZMqKHWbrfVC/QGhUIBFosFPD4+6iRJYDabnThTrhJhywCzqC/bmKJpVBl8NSl+XDpn6HA4wHK5hO12CwCglVLq5uYGAED9/PPPejKZmPteLpfNfUDHNJ1OYblcQqPROAkCLm1IJajv0lOJpT35Z3IM3yLD7WpOyNUBnKa4b0u3peNKvSSucQIUg/XpybmaxyQcl/PyqaoANnUiBJYkCSwWC71YLGC9XptNXqlUTpwGOpZqtQovs2cUHYhGoRwpwqaZCRf25NInLmOKxh7ZUnhdmI3Re3s8HmG32726RjR63ADT+hCtidHvR8OK0BSedxRF0Gq1oNPpqEqlAlEUmcxmOp3CcDjUnz9/hvV6bWAsLmmUZkCibS1KzE66DnhLQdp2AMp4lGBT7AOiNSOEYieTCaxWK/1v//Zv6u7uDv7xj3+o//zP/9QY8NC1hmtkt9vBeDyGWq3m7bg/d3yKbQ9eO2NKMyoibRNyVnjsL2dzphOio415Y2DWsb6hxbVQ1p2rJuXC7n3ngpsfNzPtyUA8f7fbQRzHsFwu9Ww2g+VyaTKNKIoMzIKQSq1WMzBbvV43BlbC3CXRUkrF5hkKjWxtCtOcmYbHo06VZl37/R6WyyUsl0u9Xq+xtnWi2iBFePR8uBYZrWFRh4XZYLvdVq1W68QxrddrGI/HMBwO9Wq1Mt+PzpPrtV3D4IWIX7oMbuhgN+qkEdLE+iAlwCwWC/j06ZMul8uq1WrB3d2d+vjxo5FpohBrqVSC3W5n1BRoe0LWqNwmK+MaGf9HQmHXPJ8/Gpr87mtC14yoskQXobIWNGuSutqpA6bFZpr5LJdLPR6PDZOM0qA3m42R5seCerVaNXNlpAjNx1qi76Xfxcdm2xhcHJbD2hRG2ujAjscjTKdTmM/nej6fQ5IkJ/eA17N4xiYxtmzPAxtcb25uVLfbhSiKzDUdDgdYr9cwm80M+YD2X+Hz4MGSJA8UGvGGMpdC4TkbhOvLVHkGjCxBZAhqrWE+n8Pj4yNUKhW4vb2F1WoFg8HAPB/uqDFwwkxXarTN2r8iIQb4HX+U1lnI5OVrQGp/OaULO6FrSUT4akuusdchQpU+R8UzO2kjUYgHX/P5HIbDoY7j2BTj6XExaq1UKlCr1aBWqymkVXOVYFtGR+EZn4GgNRZpRLY0KgOjY8zUCoUC4Oyb2WwG0+lUr1YrIxeE10WPKTHcbGoVtv9jn0+321U4Ehvv5/F4hCRJYDQa6dlsBqgoTfXzqMOTpoheIrrNkvVnmYFlc0ZUkYLCscViETabDcxmM50kiWo2m9BoNNRkMtG87kdJNEga+RZqIl9jbeVLw45/ZUKBD8M1t+PavQo+gVCaFXHYip7jarWC2WymX+CpE9keSiVuNBoIuxnnY6tF0QjeV1eQsjWbE5B097iTo7Wc9XoN0+lUj8djWC6XxjHxniKXseVBAmUO0meMDqPb7UKv11OtVsuwv/CebLdbGA6Hejwew3Q6faU7J9F6aX+WiyzA6eRZNrwUENn6hVwQlrQuOCzLlRfwHuF9xGwR62eU6k1HouO/Q0RMzxkq59MBvKQDCnVQLi1FKeO0EVgotM2byaWBidKx6d99AYyr1+lb0o9L3awa2qEcMg8kZNNLhWPaLCmNhgjZRNKClBbhdruFxWIBT09PejabGQiJZiylUsl07tdqNUNYQBgEFx5dfLxRlGdgfHFzmaDQorttsaLRXq1WMB6P9Ww2gyRJQCllnAKd/SJpntEaEG30owQM7vSr1SrUajW4u7tTzWbzZAAeDn0bDof6+fnZkA8QfqIjrqWJpjgGHA2vbW5V1hqITTfOJzCZpX5KiSZS3RLnE+G/8d5Wq1XAJlY+ukEaGOkT/HVB3BKc7HJQEjXfBWll0X68BBLjC/iu4TT/guO+UDaUFS89V75cKgqHyPHHcQzj8VhPp1PTYEo3NDK5ms2mqlarxngnSWJkb+hGpI4H/y5tzhBFXd/GtWUISARYLpcwHA71aDSCzWZzMuMGsyR0opJck43ia6upFItFaDabcHt7q/r9/iuSBdKIn56e9GQyORlZgJkbd8KcDUf7m1zQGh8QZ4MTbYaV3k9b46TUo0UDJ2kWEo+U6f2hsBweA9cbrRVFUaS01lrKoEIy7mvDcFmDABvz1bbPQ+TCzrkHl3RKaQbtfddOKG0amFXT6ZK4qC3959EfNU7484sk/sl0S7zucrlsZGMajYaJ1HnGgNE91amiToeTH1zwm+2+Sj02aIi5CCuypJ6fn/VwODRNntwJIq2aj7rgBX8uYopZDc65oYzCfr8Pt7e3ql6vm/fgZ7CpFR0Q3hd8H+2X4k7d5iBc65TDoL6s/9IGIVRt2SUPRJ0PrZFhTZIGEi5o8pL7M/R+2hy37377BkCe4zguQdJIEwT/9fpCmVBamM6VIfFFQh0GjfB5hM6PR4VHeRNpsViE5XIJz8/Pejwem+5zhDwAfheDvL+/N/I5AGCK9xQSooaQG3VbJOQbhCYpLND6C2eLoTPCrGu1WsFkMtHPz88Qx/HJtfPsxsZ+49pY9BzQ8CEDUGsNnU4Hbm9vVbPZNL9br9cm84rjGIbDoR4Oh4Z8QOFKmzaXLXNMa4DOMWC2++UzuFnm7kiMM2kEBso5Sffnj8qALmUzfExLTk5xNSifU05IW74ImSR8ifrcN+mEbE2qWRdzaC2IGjpbCs0LzFK/DK+9UMkZOrIai7Y0++Eihe12GzqdDnQ6HVUul40+F619+DaJbfZM2nuFET9GwlQKhg/ew++Zz+fw/PysJ5OJyS541z4lD0jzingNiNdJqCBnPp+HZrMJ/X5fNZtNM7b6eDyaBt44juH5+VkPBgNDc6eRfZrhcecYiWvALjZ6sG+Amit6thEuqINCJ0RZm7as4ksFmRwStI08CFHQlnrqJLtkk4UKHUNzaeeZtmyRtXTxXWVCWbTfLgW1UfkbzvjiTZ1cbYBGTIijbzYbmE6nMJlM9Gq1Ms4Ju9RbrRZ0u11Vr9ehVCq9ykRC2D82McesRlJqXKXZIZVvGY/H8PDwoOfzuREVdQ1/o8fhmxzhRZqpUIkhJGp0u124vb1V7Xb7hI2H5z2ZTOD5+VmPRiMjPMprH7YN6VPiDp0h5IKMQ+HkEJkol0NyZZ7SzzTooTAo7eOi+8LFELN936WMr21MQtogTMqGpSzIlhW5kIdzFL99jj10suo1HeE364RsVMNrvVz9QRJDR5K64ZE8LuT1eg2DwUCPx+OTTnOU0en1eqrb7UK5XDYNf77o7ty5RiFQgQQF0d9h0XqxWMBgMNDL5dJkR3xUhW3UsGsT0XMol8smg8nn83B3dwe9Xk8VCgVYr9cnDn+/38NisYDxeKzn87nRN6ND9Phzp8+fj5KwRYwhzaS2fq1rrN8s6EHIOuLHpS0Baddcmt6okGDLtidcs3POCVZtBBFXPekaQfQlAu2/nNAFYIxLbdy0m1LSiJJ06EqlEqxWK3h+ftaz2czUVRDSarfbcHNzY4gHdOYPLfpKdFcpks8aaYdkU9R4UKhsuVzC4+OjoZZznTkarUrRsARtcBo2QoPIfkPlg3w+byBLzKDQ4U8mE5jNZuKo77SOXIJrQ0Y1++YB+V50lpLLEEq6iGlgOP6d6KipYjhmQyFrxUbKudYelka1X8og+7Jf6T64gg2JQMHrb74xE1nO1we92z7zRylR/CFOyDUETBIcvbSTSvugpeiePzBKUcaxAYipI/xWqVRMl7mEO4fgzGkUm0PeS7MdNER8BDbSy4fDoYHgqBAmZdFxZy05VUr44Kw7ZGPV63W4u7tTrVbL3DM6EG+z2cDz87N+fHyEJEnMvabnwRuEXZEzrxv61o1LNPfadZIQSMal9m5T3OaSTdLEWtrrxXu+JBFgCslKmabvfkmNq1z+ynUcH4Eg1BGEZoMhQTWVkbIFK1nru2kzvS+VBPwpakKuxXeJl+TcbMVp6mTo56hRoyy39XoNk8lELxYLc1wezWMhHQ041Y2TmHi8D+QSEaYEkdFjUzYcjYaPxyPM53MYj8em4ZMaLLqZbBRxWxTJjXmxWIR+vw93d3eqVqudUIexFrTZbGAwGOiHhwfTk0SdCXdwkmiuLbtwseRc2D+Hn7j+niuT5k6Cy+pIMGJo/YA7HT48Ec8RoU9JP5A/L6kx1UcwSgMnX0p9Ou1kZNeQPR6whbBybedkk5061/GEqlZ86/TuwqUcy7U8dCiswhcNj16oIjOyxHjj383NDfR6PYUq2bR+hEPlUBY/ZHGEFiJtcJhEeODRJVcUyOfzEMcxDAYDjQV/qa7i63RHB4fD4riKwm63g2KxCK1WC/r9vsK5NfRaCoWCYeWNx+NXrDw++4cbUxt5IkQVQ5L1kWpctvpXyHwmzsS0KQrQrJWOKg/ZWxI7kQ8b5Np5lLDCadwueClk5InPAaUNvkLGaF+rvuKreZ5j9K+RGX2rDLnCuTfAZSSy4MehxVGb5hPfSCj2mMvlYD6fw2Qy0ahHhlTWKIqg1+tBp9NRKPvCR1lL3+mKvrgx4HCgDVLg3fg+uI7376zXaxiNRgaG40y2EAePNHYkE1AnjPBZuVyG29tbePPmjULKNaVVa61hOp3C4+PjKwUEruBgq+e5nDzPPrjRd11nmvEfvtH10udxHWPGh+Mv+DgG6ZlKUJkrUKHrC1UlpFEgtjWQJngMlYw6BwXwySuFKKOH6MrZMlDbOgjJxkLtXFqFhBCi0DfrhFzjsTk04ZuSGrrobZCG9D4+yI1G0jRqR6M6nU7109OTEejEyaYoplmpVF41b7r6EXzNcCEb3AeDSXRUbpwoaeLF0QYJaUq9OPg3vG+YrdDaWKVSgU6nA/1+39TNuCQO1qRQEBXXC4UQbR3xLthVGnXAszxeG3QxtnwRqsSgs7EKOSSGmSEGQZSkkUVpm2f5vn0UagBtsGVIXdMGP6ZFOWyQV4h9CUEifOfgc6o+3TzOWE2TdaV5/ueotf9p4bjQh2rDo7M89NCaEe1R4dpsFAbZbremRpIkCURRZIr0Nzc30Gw2FY4yoGKafKPbtL3SLpoQVouP7MCbcDHink6nerlcvioG+wqqUqYmOaRKpQLv3r2Dm5sbhdE3rccVCgUYj8fw6dMnPZlMTp4R1X/j2YBtrpKNuebKIqS6jQ0mk4ybpPnGaeH8bxQepS+cmns4HE70B0NGKrjaAHhzN4fizqm32IxlKOPTt9d9dO00GVCa0kGooG2I3ZMcLgYXEhQsnZ8UxHPoXeoFTFsq+WadkNTM6MqCsqoYu/B2KRqkcATCW7PZDD5//qzn87npaUEW3M3NjdEz4xMpXdBFlgXgMyguFpd0zzhVejabwWw2MxRe3nTK6cS+oW10oiw2v97e3sLNzY1x2vS8j8fjCQ17u90aeR4qx4PPhW6u0MidM8Fc8IbkTEICpRCj7dL74wSVRqMBURQBShPtdrugcRJSr4sE+9GWAZtKtatZ89K1i2tF6mm0/qSGZl+2IjlC19qyKTf47ocrMJKCj79qQgG4rU3inkectnQ/zc218f+lYXFKKUiSBBaLhVFCwMyoWq3C7e2tajQaYsQhKRKk2ZghrCoeTUtsML7gpcJ4Lpc7gb948Z8bfG6spO/E7AWhtHK5DP1+H96+fauq1eoJxIbHHY/H8PnzZ9P4i7R3OiYd4UM+nkJaL2nHh0jBUUgNMw10w42aRKPGehAVan379q1qNBrw8PCgF4uFqZG5oCfJUaLzok4dZY5s7RKh2brNsUpZ1bkG0WVcs8JVtnpZFuhTuie2wDEN89EXHEi1cSnz/pYcUtBk1XPVhG3RvavBLKS46GPv7Pd7mEwmejweG+bY4XCAKIrg/v5eNRoNE5XjhuSD0Vxjs7NAGxK11MVUkyArXvt6kR3SdI4MH3PtqoNIzpxCcMViEdrtNvR6PYVNqLQnCeB3HTicgspJDBL9mPc4ueALOp+IX58Ea+AztK1Bm6OyGWAbTdxGnkDyBUoYrddr2G638P79e7i9vVWfPn2C3377Tcdx/MrouNYDdwRcYQLvC95z2k6Az8o1eoKvNVo7pPR+fB9lkPqyLWmwoCu4sGWBvKZp2x/nvny9S+c6AlswndUJf7NOyKf0HJoduCRTskRQXJ0aDR6F6bBBcrFYvKpbNJtNaLfbBiZC2Ikzi6TowzZV0+d8Q7rlpUyAw07oTCkct1wuYTAYwGazMc2hUs2IGwBbfYM6h0qlYhpRu90u7Pd7c9/RCK7Xa/j8+bN+fHw02DhmANRR0e+lLDlbp3qa6DhELVnKyKXBa6G1DklElDvx7XYL2+3WGO8oiuDHH3+EYrGofvnlF71cLk9YnNTQ02uTana4BzATok7YBSGHEH+o8wEAQ6/HdgAKxXIEgrcAZHEQl4j2bWoJoc7mXFvly3Sv+Z3fZE3I1TRoY5DZFoONaXIu5ky/f7fbGX0yhEa01tBqtaDT6SjKqOOwmYQbu6AOF4whGTa6WWlkKeH9NOKTfj4cDidZEM9opLlC1GlL18rx806nA81m00TVu93O9AnhfKLRaPSqgC+x1zgzz9ZQKKmh+9aKpA0obWj6szTtM4thtMHROORws9mYLAX19arVqnp4eNC//vqrcd40E/cNOsRsf7PZ6MPhoOj10zUkZRxSKwN3sNQB4vnwUSjokPDcaUuAVLPi7L7Qeso1XzYn73Ne15zH9FcmFJDpcIUAbigvETnYcFOpCRUATiLJJElgPp+fjENGQdJGoyHWflw0UTpiwBYt25g+NuaLlKHg+zDb4UVn7swXiwWgECif1mmrTUlZAB/JjX0tvV4Pms2mQiOD9HaA3+cTDYdDPRgMjBQPZYlJjsNF57XRcLmUjI3I4ctMJWfjwth9unK2uhXNZvL5PGbkerPZKAwAcrkctNttAAC13+8NkcNGXZeuDZ8JDieMosjZT5Yme+DNxHQ4Ix2aKEGb0s+XQkIumS1JjEwJ5nONX8lCDbcd53sVNXXSc9Ao8SIs1RSjESV9Pzd63FhL/3ED7WLv0KmeNLrCYvpkMtFJkhhjmMvloF6vQ7VafaU0zJtJfYyYS6TkIQZQov/Sc0iSBEajkY7j2Dlu25XFcoUCfJVKJeh0OnBzc2P6pyjLLo5jmEwmejQaAdY2cAMjZEcNGTdaPoNgew7SMXw1NR8sIqkK+P4W2nSIa41OscXgYrfbQaPRgH/84x+q1+uJ0JbtOqiDwJpTsVg8gWqlmVBSDcV17lpreHh4gJ9//hnm87kJ9rARl7NU6X98f/r+y+I8/uzZh6vx/a9M6MwoRDKw59SBpPSZFrfR+SBTbDqdmvoJQkeNRuMEipIaDH0GMtTBpClMSlAg/Z0USaKjHY1GsN1uxdpL6H2VitDVahV6vR5Uq1XjeHBgGsoC0QwIIU9eLLdFexJcxhlerozG11keOlKZOxTXDBzbd0n9ZLRJWmsN2+0W4jg2a5Zm9JVKBXq9nppOp3qxWJzAcvweUQeC8BeOx+j1eicBCyUm2FAGXxCqtYbJZKIHgwFMp1Podruq3W5Du902wRtVlufj1f8sSs8SJOnLds4ZjOhqH/je6kNnCZimjV6y3mBXTwYXwHxpTNXL5dJQhHHKZ6PRUJQllOV60vQ7+SI8G6WUR6lUtQAx9+12C9PpFDabzSvmUojSMBff5IPRoiiCWq2meP1ov9/DbDYzNGNKGcZI3ybuyutZkpOwORJbjYn+LUSENYT1FGKwOVFFMrb0WnCGEkKbWEfBZ9tqtaBWq8FkMrFmp7bXSy+cXq/Xio54oNR8G3QmwaC0lnM8HiGKIlWr1fR+v4fn52c9n89htVqpVqsFlUoFarWaOcZ2u32VwdvUvX0Z6jUdTug022uegw2S+9bHeV/UCWV1Wpdim3DlaMyGVqvVySjvQqEAjUZDIbOHR5pS4fwSC8HVo2DDzWmNjfaCYAMqXtNisdCz2ewV/dZXZOXXy3uscrkc1Go1UzujNNzD4QDz+Rw+ffoEi8XiZEKrK4r09eP42Fo+g5wl277kfBvJuVHFDnTQ6/XaZOe4BtFB7Ha7V82/rvPgs6Hm8znEcWzYa1wMlveX0exIMoKY5bzILmk6w2g+n8N8PtelUgnevHmjfvzxR9MbRenpfORGFmXpc9ETV9O8j3QgrT9eapB6e6SevxAdyJDGVxo8fhfaceeMvj3HkNsyH6lvBCNB3Oir1QqWy+WJYa5Wq9BsNk82vi+CvsRk1JBeJxf0wxc8nv9yuYTJZGJgRtvmdaX63PGgUy8UClCr1Ux0i04IDeVisdBIv+ZFXe4MXaysLPfL5VR9RuUc2ZqsvXKUyKKUgtVqBePxGDqdDlQqFaOcsNvtYDqdwmq1MuQaF72YBiyY4azXa/jw4YOuVCqKjhyhBovSt6XxE/T7aIaMjcmFQsFkcHiMT58+6dFoBN1uV/V6PajVakDJF0i2wOvi1yRBqyEEH1/tMI198WksXiLLutR4l28RmvtimVDoQ0jzPm5kt9stLBYLTXFpHDdQLpcNZIVGNGSx+URKfc4pJBOyzXuRoB+sBY3HYyPCiqrf3DCF4PEIDeF3lstlaDabql6vmywSALDOpj99+gSr1QoajcYJAYGrgFNILuQ5hjh0SaHAlt34oDTJoNNMwfY7/D2t7UhUc1q3xHuyWq1gMBhoVGvHjB2VJqhzp7ClCyai5/j8/AyFQkHj+fL6Ez9uSI2EZuO73e5E3gqvbbFYwGKx0KPRCPr9vup2u2ZkO+1bw2OVSiWgavU2hQhbXeZcQ2yDvVxkjUsiQZcsc3y3Tig0cnWlxD74JYQIwBsyd7sdxHF8EgGWSiWo1+umhwIXPzUOUnaQJgJJ46hcM4O4c+Kw2YsyAsznc+tcIGpouMGxKUHTRt1arQYoy0Np4svlUo9GIzgej1Aul18JcEpGOE02GEIOoXAlN8CX3OAuA2Ub8ic591wuB+v12rDWjscjjMdj+OWXX/T79+/VS0AB4/FYLxaLV5I8oddAEQGsEdIgy4dmuEZTbDabk1EUFAJHIhDOkprNZrDZbPR2u1W9Xg/a7fbJmHcMBLHBlhI6QhpL0ziZSzgK39j3EKX6EHtme881ZhJ9V5lQVjXc0EFaFBPFmTfr9dpoclGjin1BVKuMDmALcRq+KEnqt+HTMSlFVxqjQOs//Ni5XA4WiwU8Pz9rFBPFTIQW7V0NjpITQtYbwO/6cI1GAyqVygnjablcwng8RiNzYohCnm2INlkaA5JV3iRUtNKWSaVpVuVkEnztdjsYDoew2+00jt5AI4+ORKoxSM6divTyCbm2cRFpdRoxSEGSAl4TDnjEoK9SqUCpVILtdgu//vqr/vjxI9zd3UG/31etVutkLpWU8fv081znF9IX5ZPDkuptlxw+lyYwC3VO35WKdhqhx5CI1lcoD822KKa83+8hjmNNnUupVIJKpXIS6fMI+txa1TlRVigEiDDifD7Xs9nsRAGCQ0WSU3SNJ6YZYhRFUK1WjZoENlrGcayTJDGacdLETqlG44LNbGvFd49pfUPKsl33IJT5JAmopsX0pSwTDXeSJAaKw/tMtfbSrCes/+D0WxrI8PtEG08lWScufYU1ne12a2pBGJzg2HhskKXOE2n9s9kMttut3u/36vb2FqIoMsEYDX5oY6+0Zi7RfHtulhQ6dTUkiHY5Kt85fvc1oUs2amZZGDbtL6zzID2UMpAqlYriIouXfoiSIoJvEUuzYvjGw416OBxgNBrBeDw2GRzNpnzjNEKeXxRF0G63zawlfP9kMtFPT0/GaNKueR59h0alIfNZ0hqLa29OF2vL1iiM9wrhXyrbQ2s19PPSdGFX8CJpEtKeK75PqEyUzxGjY+S6hdLwSJr106b12WwGcRzr6XSqer0e3NzcGFiOO0rpnG2SV2mefdo5SGnWbRq7GKpEnmY8xDfvhHwd1T6MP7RmlMaR2aLb7XYLqJBgLq5QMAoJnOl1rlMN1RtzOSffxsENuFqt4Pn5WSMFl0r0uFiEIfNXaH0F+4K2260ZebFYLCCOY9MQK2UjLmdiu6ZQCEP6N//+0Dkz12An2Y6H64NSpvm0X1yjnM0Weh402KL3hVLnuRPhdSfbmsRj93o9AAA1GAz0dDo1gRH24FHmHGY59Pmgw5lMJno2m8F0OlU//PADNBoNU3eUMmvpGX/N8NO1z+9S7Lo/pROS8Nm0HtqWEktEhbQ3GTfUZrN5lSUgzIF1E/xdGgfii8CkRcgjupA5Qba/7fd7GAwGRoKIy6GERHy+iDefz0OtVgMc1Y33ajKZ6MViccK+wwyINkNKAUiae5p1nlSWbCht1u163vw581HzmPVQ+AuVtel95veNZwmuOiV9Hq5s0iYk64I9AQBqtRpEUQTNZlM9Pz/DYrHQ6/XaZMucJUgzIaR3I9y73+/h4eFBL5dL6Pf76vb21hyDz0jigQvtN3LZE7ovbOK8vnpSWnKRTUE8pO/QVnMOmWn0XcFxrimAWeoeWQgLtiwNjWGSJJouVISYJKeTBvJJc15p32s7H0o5n8/nMBwOze9w83OJG9fxbJRXNBjFYtH0UeG9ehmSZ8YQUOdHo3laD5AK6KEbM80AuyyEBFddM0SvLe2LytnQvjR05KVS6dW946QVH4SEfy+Xy+Y5URUG/Dd3jNIa5DOaMMvBBtQXxRFYrVbq48ePejgcnkBxmH1xmJiyGXHK7mazgY8fP+rlcmlYdFjPolAmdcQ88+fN0XQ/4Oc4YsB17vhgx3OCItuz8Tkym70MCRT+LJJIZzkhn/RLFgeUBXN1GZZcLody9q/w7Hq9rqgB5dlHmiKw6/y53pkLx+bZko3BdjweYTabwdPTk95sNidNqbQekwYXl+5hsViEWq0G2LuCvSDT6VRPJpMT/D9k7LELRvCxetIqVthqUXwMATVsGJnz6Dpt7Y8bMknBnDaG8rUpqbFLM7Gk50evq1AoQKfTgcViAbPZ7EQqh4+2oKK/LkVwPAeE3KijbDQa8Pe//129ffsWZrMZjMdjPZvNTqBFCUGhWSNmRc/Pz3o2m0Gr1VL9fh9arZb5TgpnIu0cX7hOXc6U1uQ4hGnbm76aatrgUtovPvatr8TxLdaKUmVCPkMUUqC/1JhgCg+hIjF9YIVCAaIoOokIbbTVa75chVRpBAb+e71ew3Q61bPZzESokh6bax49HxvO6xJolFCMEhlQi8UC0AHxz9FIl+vw2SJ5PiPJ9nMaurwL2nPRqrOMe/Zl8CH7hjvZSxgQMnhQlctlmM1mmtZD6RgQGkhQWr+UgdP3SVkask5LpRJEUaTK5bJeLBYnMCPPZPg9QQj4eDzCfD7XL4Gk6na7UK/XDTMT+9FwYGOpVEI9O4jjWMwGqIirTXGdrt+sTufaTsDnmL4rOC4N5JQ2Gg8x3hJDiC6c7XZrIniMfhCrxsIwxZ1DnZ8Uxbua03iWQ6myUkRDP4NFWpT9f3x81NPpVGRhcehEwsJds3no5qxWq1CpVBT+nCQJDAYDjQ2x53SQhzbfUXJE1r4fW18Pz0IwCs/ikEIFa23QYhpGaEhti9blut0uPD09wXq9dkKOnKHnQiUkmj/NJlC8tNvtquFwCJPJRK9WK0PBprCkNAYDg0VsdF0sFno6ncKbN29Uv98/+Rw2yqJTClGh9g3PxOuwDZYMLStI5+KaQeXK3kN//m5qQlyEUIqybQrFPr0n25gHFz1VOjeM4DkpATH3c1Jr39wYW5TnM8gcLuKwxWw208/Pzyb6k0QhabGbF3SlKZmUHUjnL9XrdahUKubccBggdsNLGQhnM7ky49DaThpqt81g+mpNaMxobe1SkWoIrOdjlaYVX8V1sdlsdKVSUe12Gz5//myCFLpeeHNrmuCCZk8U6kP4rVAowO3tLVSrVTUYDGAymWhK85eyQergULV9u93CaDSCJEn0dDpV9/f30Gq1TpwF7V8LbXSWbJeUfactJ4T2DmWtZYY4wO8iE+JS7K6o01dUc9WYuBQLj9hpkZNurBd8WCN1FP9WLpdfDa87p9PYpqrLMXrX2AleE0A6K0aL2+0WcfYTuRfamIoGxjZvRnIE9NwoVFGtVqHb7Spsfl2v1zAajfR6vX7V0OiCo1xsLBcDyTZsLyvr0pWtc+V1qi8YWgOSoC3Xd4UwKrMENLw2uF6vIZfLwc3NjRoMBhoza0QBKD2bDrtz3TM6ttsGm9L3F4tFI8zaarXUC7FF8wZcvq8pbRzX+3a7haenJx3H8YkWHX5mu90axRDbs/exJznE7BoxkWZukKt0EUJY4Fn8X07I4eX5WG++UF03+1L9Ghj1U20rfJVKJcVrQFzaJu0cI1sR09aVb3OqdOMh7q61hvl8Dk9PT2ZEA1VG4DRQzPxcEI+rlwejz2q1at67Wq30bDY7ySq5I5Oy0bTZocswp+0lCjEKfE1WKhUDW2Xd2JIh9jVS8vdy2nHa86BsuP1+D41GA9rtNszn81eQI/633+/1brdTURR5m2ERTcBzpXRwpRSs12uIosj0lAH8ztTr9XpQr9fhcDio5XKpUV2BZuSoaIJBljSFdblcQpIkOo5j1e12zVBKCqFJz1qCwOm18gzfFTSeE6SG2ME0Wc81xVX/VDWh0IeRpUPZZ2w4zIRREzXUGO3S0QIhmmWuLFCScLHBXvj90qLB92MGRB3NcrmEwWCgcVQ2ZnXYJIoSKlLE53KqNgOIk2bx+/f7PUwmE1gsFkEbx9es6tP8yip94lpPEvNJCgJqtRosl0tTSPf1cUl9KRIUnSbjc40TCJV0QgO+3+8hSRJot9vQ7/dVHMcaaye0kRWNN64/Vz2LO0o+mwjXKHdMmOkXi0X4xz/+AYPBQL1M/9V88i4lFFFtR1pL2u128Ouvv+rRaAQ3Nzfq7u4OHdyrGhWnhHOHI8HrrnptGtsk3TtJHslVnpD22PdQGyqkcSyuSDAN1OUa/S3pj/EUm/6eNqnSTAENN28ozIL726BIG3HCZoSosaOyPDgum1KiEQ7h50DVh0PrDHRT0CiXjrdAVQReM/KNOfb9PRS68MFa0vFtEa3NuOP1lMvloB6LtErIITUD6R6kFUvlawtlqwAAWq0W9Ho99a9//UvjDB8MeLB5VBLvtQl5+mBJfFEVCAp13t/fQ6PRgMfHRzUejzVmoMhcpVJAfAQJHgdnLz08POjFYgG3t7eq2WxCtVo9IUBQ58zp99I6lfQNfer+abNlF0nhr1egE8pqWNJ072et0WBUJ21mCs1RCCtLNuaKRiRGlBSRSQ71eDzCcrmE4XCo5/P5q7kvdC6PNJjMR53nTEBqNKIogkqlYsRKZ7OZxmGAtMHSRUjhtQWfE3E5FRdcGyoF5TL0CFmhnmClUtFYS6GGlNKXeSe+TwXDJhgr9SPR86LipVSBwCf0isPiqG5ipVKBfr8PT09PInkEB+llbawOJZ9QJl6j0TC9aI+PjzCfz7VrzDhljJZKJSgUCrDb7WCz2cBkMoHNZqOjKIL3798rzOY5AYcrYUuwI38uPPM9R/bpHHr19zZPKBdyM/l/dKop/XfIGF+bkCclJtBj2mA+milw6IVu7HMaYm33wZYZSWk/hSAoFIHnPxwO9dPTE8Rx/ApekDIavsglJyFBdtwx4dwgjKKXyyUgFMjFKW1ZnUQzle6T72eXUZPgRgkGC9GPo5F2pVJ5NY/IlQW6CuBZNBal9ZI2w6T9PEmSaCzuV6tVuL+/V1J9ZLPZvJr9ZHtmLogaB/ZR8gMdeJfP56Fer0MulzNMttvbW/if//N/wps3bxStDdG1RCWIEG7EsehRFJ3MLvq///f/ahw1z9cHDxKoTeHKEDZBYQox8udlU653ZU+X7BH7rjIhCQ7jjZZ0o7hGZodAFL56Bv87RnZ0cWE0idEtPzdXhJkmK0PYDzXeeMTJ1YApRLjb7WA8HuvxeGw2KVVxkKJxiQbvMlg2ptCLoVI4qXU6nRpxVDQiIWyeSxZKs8J6rhdCPfx+HA4HqNVqUCwWTQYhwZdpswFJUiak1mTLZKWInP+MhjqOYzMJt1gsQq/Xg9lsBkmSnHz3y8iTV4oNlxAK5deK9Uw8x+PxCNVqFX788UdoNBrq+fkZZrOZRiYorj+6n2m9iT8jHGm+Wq3U27dvoV6vm2nD1FnQGV9ctsf3LM7RcHPBrN+LQvbZTkgaqkWZXb46hGsuC++RyZTGkR4h+t0UNkmrr5QFprAJKlKVY3rd8/kcRqORHgwGpg6DGLjkfEMyI5dR5BFhoVAwmQBOa0VoCh2ijfXFi/0+I52290LKekOzJtsa4Y282+1W1+t1FUWRRrIHV+m2Hd8G0UiOzDb4zyXcm6XmgKKoSMtWSkG9Xkett5Pg66UGqQ+Hg+KKF9wBugrkFIngAqoUMqYySegEC4WCkeg5Ho/qZebQK+fBsxCamb/Aqrh+9WazgXq9rvr9PnQ6nVeZED5TrnHnq3VL6ymN/UhLcPjLCWWMeK7x/lC6MWXTcFiPG83QAmOoI6Jq0hJrDv+GGw/ACIPqwWBgoBHJwPMGwyz3lTpkel8qlYohJSyXSz2ZTIwTpI2xXMlZmt7q21S+2mDWgWO8qCxlbJLAK6pCdDodqFarsFqtXgVVrqmfEsRpM1y2c5PgsJD17tKuw5pJrVYzz7nT6ajJZKJxvDZm46vVCtbrtdFpy2oDQka3U8UEOswOobUXcVSFo0po4CAJ39J7SZl1SZLACytQHY9HaDabJiuisC5l1dno8aFjRVysSldAmLYf7hL1+j9tTegcTSUfhTfkGNyA8s+/ZGWaOqHQiMVn0NNO0OSGCKE3ShVfrVYwGAz0cDgEOpqBY9AUL+dO0yVsyTcXx7LRueD47hf1cQObUCiOZmG4eTnEEVKLcd0r3308l6HEe8Lw3LFvBce+Sw7DV9+k/V5SLY47Kz78zXaMNGxTCi1tt9uTuqLWGhqNBvR6PcWv43g8QpIkopSO9B+XiOLEFAy0sCbEs6jD4QDoCDHYwfMtFArw5s0b+PHHH1W73VYYBPGarlSvoQSaQqEA5XIZ5vO5/te//qU/f/78qv7Fm3ZdkKutVuaDbX1ZVZp+sO9Fyserop2moSoLjJXGw0sRBc1C6CgCSaeKLzBbRB+K9/IeAMpow82Egouz2QyGw6EejUbAVbH5OUnCoyFZgeSIaMR2PB6hUqlAo9FQOH55MpmcUFopC8zm3GzrwFUryaKqfok6kvR8sLm52WyqQqFgIDnXnCtOcXeRXvjzoz9LtHJfD4uv3oAyNvP5XG82G4WQU61Wg/v7e8CxC+gkisUirNfrTEzDtDU5et24J+h92O/3EEURvH37FiqVCnz8+FFNJhPNleJxn+PvJEeFziVJEvj06ZOez+fw9u1b1ev1TmpFVIAXnScOi6THtNG7Jbg1bV8btRESVfxbGdNwdiZ0TjYkeX1XdOGKcl0b04apS+rUabK4UKMpRb00k0mSBJ6fn+HXX3/Vnz9/Nt3sSGbgGYbUeMrZOJy147qv1KnhpNlqtQpxHMNisTDD8rjisvTMbJF92nvrqj+kqXuFrl00gHi/kczSbrdfaQxShpZEMffpkPl+R6Nw+n96P6UoXVqfNLPI5/OwXq+N5h9Vh+h0OifHw0wE64NokOmUVsp+xeGQtA6Ezar4GYnVysdJIEKAn1NKmVlIq9UK6vU6/Pu//zu8e/dOIaUeKdroRHlth7cM5PN5KJfLAACwWCzg559/1r/++qvpj8LPYnCIUDkejzL80tgHVzDx1+sCmVDoSOMQFVpbA6qvuG5LRznMIG3ktLIckrR9qG4azc622y1Mp1N4fn7WWCAul8uvZrpwiEs6hzT6VVL9AYeToQT/eDzWy+XSGCU680USrA0twqYRMQ2VMLERJTi7SypkU1kYrIO9MMR0o9FQ/X7f1FMovIPfh4wtW8SKhpUPVqMwrJQd0GukhBQqmYR1RFvtiH5fqVQyEBdSo7HY3+12FbLQ0JkkSXIi3+PSULtWTULq4SkUCtDv96FSqagPHz5ohItpcysX6qXCqvSZ4P18fHzUcRyrv/3tb1Cv10+cPn4WCTlc5shmv0LuS8j02nMnBX83NaE0NzY0o7lEMZTWXOii5A/4mi/pOvf7PazXa/j8+bN+eHjQk8nEGDjajIpRJr03tC5kW5gS5Mh7H9AZojQQzl4plUrmb4vF4uSznGbMaz9SdiZtWJvaAo/4fRpbUoZJGZCclSV9ltYCqBgn1kTq9bqq1WonU0SpE+FGDb87iiLodDpGQJSqEPjGx4cqb9M6i9Rvht+HzipJEqNgTWt8zWYT6vX6SZa3Xq/NPeBq7DwjPjeydynh02eMTNcoiuDu7g7+9re/KXQadDorz/AlyAyzmiiKIJfLwWKx0P/85z/1w8MDLBYLU8fi7Qi8IdxXy3TVitL0kH3PVO3Cl/7CNIPBbKwnuggpAw1nxWDqXi6XX/UQZRUw5aOD8XtpXw/i0fP5HBaLhX5+fjYTKrEnRxJX5HUgibljyzJ8isGUFfTCSlKoVYd1AamDPkTxIkv0LGVplyrIusZl8O9DhlitVoNmswmDwcDUVqTGRs62LJVK0Gw2zeA1Xq9IUyP1zadyGXGeGUynU1itVsZpoiFut9tqNptpqtu2XC6h1WpZiUQhI8bPyZSk50XroJ1OB2q1mvq///f/wmg00sfjEWq1mrkmOupeypKxjxAdTRzH8PPPP+ubmxv1008/QbFYhFKpBKvVyuxR3gAv3Qef7qG0Py4REIfO5/qmnBDXLuMGT+oXkSIpaUNJsARvHuPd+5ZsSP1+Cv9vwWAEaWsEDK35SJNMaZaBzY54n17qP3o6nRqHEyI5QyN129hxXmAPeVEZmnK5DFEUQRRFsF6vYT6fv2IJ+SbmZnE+LihPoriGSKT4RiTQ2g53IPgc4jiG8Xis379/r16Gshl4UlrvUta5Wq2MGCyKcVKVZ4kiLmV5PqjZdj60sE1FbheLBTSbTfP8saemUCiYfjBka/Kmaj5Ekc7tkuDvSzgjej84465SqcDf/vY3qFQq6uPHj3q73RrhVDodmPevUbQBoTaU/3l+fta73U69e/cOut3uq8AWa1BpjL2PJBMqUPpXJpQx4rnGK7RPR4JKMK3n80Z48Zk3h7qMLFUL5k2km80GZrOZHo/HsFwujYOiRkKK/nHBSzAXnSMksbXSFuexN0NrDYvFQs/nczFDSOuMXI5CYseFMuZCoGDbOHma3UnBC06vnc/nkM/noVqtQrPZNBExdcw2vbjdbgdxHL9yNjxoyTKAj99b173EYBFHI+x2O5hMJvr29lZR/cRisQhRFAEloiwWCx3HsarVapmUy9PWK/mzo2xWqUG7WCzCZrOBarUKP/30EwCAGo1Gmo4/CXEIVBAY/z0ajfRLLVDd3d0Zx0aJRS69v0vYxZD+pGvW5P4UTshGE/zSTVa+SFwyAOv1Wu/3e4VRDc+o0vQw8QwIBSPjOIb1eq1ns5mRTcGIy7d5+WKmUJwrQ3BlAtzQ0yI3jvJGJhKNJLM+r9DJlqERYsg6TEOKcen8HQ4HmE6nEMcxNBoNuLu7U8PhUKPMDW+Y5Jk1jkrAe40UX8rI40GEKwOw1RZ8BpZG8Rh4vYzKNlAbBiGVSkWNx2ONa2yz2ZisyaaQQIVILx2M2jT68LrwHmOrw08//QTValV9/vxZJ0liMk++p7gii9REnsvlYLlcwv/5P/9H73Y71Wq1oNFomAyME3SySjqF1Lb/yoQuVGQM/VxagkNI/weF/XBR0nkqUnNlyCKg2Q91QqvVCpbLpY7jGJIkgSRJTLGawgAUVqOUV1v3ND1P3ifBjZkEF7jw6BdITq3XazNkjLL0pLkrWTdLqNPyZTouVWxXZiZlj/S+FotFKBQKkCQJjMdjXalUVKvVglarZZoqEbqRMjiaJVHaMNcqS7M3XAV2196gcCM6ClSbrtVqhlxRKBQAMx78/GazMYoRNuX1a9oFqWZCYT8e/EVRBPf395DL5dTz8zOMx2NDwqD7TNorSDSRoP5Pnz7pOI5VPp+HRqNhBh4inIn/pjaEjjv31SJd8kwuiS1f9vldNKu6ZNq/dDpou+G0R4E6pfV6baidtBnTVleRroU3baKTexk1rABAoxI1ipJSGBDZb1KxE8+dwjk0M5JUql3FUl+jJd4HFLWUaOycZWdjnoVkQiFFVN9kTx9xwYat0wFpUg0Fx0hj1tBqtaDb7cL9/b1ar9d6sVi8emY2WR1pGFtowymvx9lG0bvUMihUTI3xarXS6/VatVotYzBxii46pfV6DXEc6ziOVb1eF0WIMZCiOoihCt9pM2dpXhFlk+73eyiXy9DpdKBcLkM+n1eTyUTTOo4EEdrGkiBpaLfbwdPTk06SBP72t78pJD8gJIhBLd5/7C0KZUGG/k5ijbqcTWht+E+fCf0RHteV/dAoBiNWzlzDKG+9XkO9Xk8dtfHNSI1YLpczYxA6nY5CLHm325mFi5sbP0ehG3p8qiu32+1gPp/DarUSWXFSP5QvU6D1KBwMtlgsII5jwxri8424I0ybpbpUviXn4SNrSI7PNXyNj2wol8tQKBRMHxBO48WGSYRSq9UqtNttaDabsNvtDOlgvV6b/iLbddDaIl2DHFb1iaS6akI+6RjqNHBQIkKN+N3lctmsA7w/mM1Xq1Xref9RtoDP5DocDoa92G630SGq0WikaeZiY5Xy9USZrvv9HubzOTw/P0O/34d6vX7S+oH1NWnQpM15ZM0Wr6Uw8s3AcaFwQUgK7qu/hKhsI7TCG/9e6NJ6v9+LasEhL1oHkPoHeBc4fketVoN+v6+QLs4H79Fzwcg8SRL48OGDEZvEDE8yOJya64OmSNFaLxaLE9oqfx7c8UqkCdoL5IuGuTPxQT0u5+tyiJQqj4aoVCpBu902Gnno8KmhTZIERqOR7na7qtFoQLvdNpAlwrkolEkL6Wkie9f7XHUr11A2Cc6j9Ov1em3QABQqLZVKUKvVYDQamb2Dtc1ut/uqFsaztWtLyUjSULSmhWgDrv1arXZCWKCQG2/AlmqtdLQ9Xuvnz5/1dDqFv/3tb6rX672C9SmCce2gPVRd5M/+ymW5EbY6RBo4LW1R25YVUWONiw0pszg3RdL9Cq1h8CgVYQ9clEjNxX4R7B2io7LRSZXLZSiXy0aKBBtJq9Uq1Go1E7XjQqeFW3q/aPYXcu/QQGEx12bcfLpwoX1KNvmZUImbkAjZBrtRJ1mr1aDdbhvDLGmGAYCBUbXWJhvCc6GEAz7UURqG5rsOm5SVVLC3OSBJWZr/7sW5aHSghKqv6Fp+gSTN+9LKzlwjM5JEXrkjxOfV7Xbhb3/7G9ze3iokW/AAybbfMeDDNVEqlSCXy5mBeYPBwGSQuM85uYkzX32yS1nug0v66btwQpLyLO+UD5lgmqbXJKQoTiMbLrWBv0OogW9cqdPf5nxCNqDNmNDaEGLJ1OBhVLfb7SBJEgMZUfkcXmynUbw0qIv/h84XnbJrGqqt5uN6zrQZVpJNcjG/pDXAFRX4+VAHJMFHmL1Wq1W4ubmBKIoUDq6jZAx8L0bYuFYqlQrc3d2pbrdrakg0upb629IYY9u9lupbadiGvNiO2R99LngtnMiAVHPKAkSjaqtDXeK/ELVx+lyp1iJC7ji+4scff4S7uzuFsliuSaq0jkaHSaKafLlchiRJ4Oeff9afP3+GJElM4Mc17EIc6SUd8neZCdGNITWs2RbmtYtmVLAQDS0uDlxgL+wf7ZoHY5PhDyFk0GmplCDh6hOh9ww/t9lsYDQaaewxonCClCXQjcihMem54IbF41OmT8hzl8a6+7IZ31A0lxqDz+nZ6neUONLpdAy0ttlsToYL0uZGND6YxSKZ5fb2VlUqlVfqB3SwY6iT8CkiSNcsOXFJnonXzygkjbpr9DxQrBMDk3w+D3Ecw3K5dNY7XDWOa9WJbJAzrkUMIPb7vekluru7U1ij5bCmVNejUDk6Oawl7nY7+Pz5s358fDSyTmmdgW92kG09u5z3t1QP8johl3G2qTdLDyjkgbkgIJc0zUvkYhrz+LnM5/OTaaFpFBPSFgK50cXNTg0lZfwUi0XAkQqj0cjou6FT5Q7GFSHbshY0ZsvlElar1asG3hBnTyFIrjDtEmFMoyoskQ18MIT0HMvlMjQaDej3+wqJBzS6p/1i6IReSCyavufm5gbevn1rGGW0sZhnfSGZcpr1lOZ+SVRfNNxY76GZASonUAP/0sB8Uhv5UiQEmy4hXsdutztBD3Bf0UF5VHH7zZs3cHNzo2ivnq2xltOssb6MCAWybD98+KB/++03SJLEMCs5JJ4WUrM5HA7r2eZVfYka3VfhhHwRkbSA0oxCOCc1pYsLsVxKZkDYZLlcGkiOkgRccFHI5vdRvGnmwPtwqFFcLpfw9PSkF4vFCXxGIzWXUXYtenqeWLOSOvF9sJHtdyEU1BBHJImfhkTJErEiiiJoNptQq9UgjmPTB0PJERIlnmrAYRG/3++rbrd7Mu6B93m5akWSI5KyRBqcuGY2SfUHGulTNhf+O0kSTWG6arUq0qzn87nG8Q6XiLTP0c3DF2aueC8olMgRBdwrlUoF3r9/D91uV1H1ESQh8MyRPw86qgLXARIWBoOBsSGUeSoFmRiwUIFiPvCSO9zQkse3BselGmp3rmBlmugotEBNmWTUuGOW9DJOQTcaDUX7OVzGNs0GstFosbfAJsOPWPxoNNLj8dj0QCCUQHF7jL42m80JJOTLRKQIkBId+DnbZHz4Zk07otjWqOdSQpCai3ntiHfA53I5qNfrOKzOFOYpdVlq4kXjg+vneDxCqVSCfD4Pb9++VavVStMpndLQP6lG5FOTl+4HdzSS85LkfGiHPyVsIFOQnguO1cZ7gGwvStbgpBjqEGh9Ka1UT5o+MNtQR7xuHO+ADgGzolqtBm/evAGllBoMBhqdEx6TOyR+Pvh92+3WZEf7/R4+fPigd7udev/+/athfbxOfa1XWtmuP70T4jWUtNGObaOGdP2GQBi40UqlEpTLZVgul6IzwP4bynri/TE2lpMvGvfBKhj50E2LG2Y+n2tk8FGnQzu80QmhIjhmcrRmxGVJ6DVg1EvHJlMYwhcEuMZNu2jUthlSvumsUve8bS3y4+XzeXRChqZMh5RJ000p+QD7gbCo/yJ1A2/evFFIb9dam2ABaypc4YIHQzzrkabpSoaWn6uNFCI5VVxjSHZBmjbA/5stRY+H6gnNZtPcSwnq/ZIQkG22Ft37dH/RjKnZbOKMJfX09KSp88E9xHUB+fqjg/wQwnx8fNQAoN69e2eyJKpFSTMZhLCxVIDnyPUkv/dXLs2C8A13801OvdZCxSY87G6mFOp8Pg/L5RLm87nmizfNWImQugn/LO0wp1EpKhiPx2Mz04cuYuqsCoUC1Ot1E73iInZNXpXgRklLK6QWITmOtIVZDlm5oltbfYBHnBSeyeVyUCwWodFoQL1eVzjgLUmSk+zFFnnb5iJhY2S/34f379+rVqsFlAZMoRauTWibfuvaL/x5SffJ5QSkrBFJF8wwKroWkNI9n881741zSc5cCqZLM6tHGueNz4JOYT0ejxBFEfz4449we3urcG9RoVLfYE3KMMUgY7/fw7/+9S/966+/Aspf0f7BtNmhCwlwjbL5buA4V2PptaIiG7wlbUosXFYqFWi1WmowGGgOgSGMlSQJrFark14cXxRPGzpp1E8p19RASqk9l5THIv9qtdKr1QooDs+jKgCAdrsNnU4HZrPZq6I8N6ySmjO/f75O/Eul+SFGxZeJ2aAhukmxQFwul6Hb7QIy2rbbLSCERp0FN6q0wI0MKHwPDkQDALi7u4Nisai01nqxWJzUC7COgAZcmk5ruwd8D/HakwSX2uBq/ryx0ZYKcmJkjsenQdJisYDVagXdbtdZc7zU2kir2m37Nx1nQdEE1IJ7+/YtbDYbmE6nUCgUDCGIMxz5/UOGHVVLwMBnOBzqfD6v3rx5A41Gw9ginmXz5m9b07qrzcW2j7+bPiFbVJzWAdkiPenhpBmkhVEPsn5wEVJ8/8Xow3Q61T4ILdSoplGf5hMwF4sFoHIB729BCAA30N3dHeTzeTO9k+pZ0Qic1kUoHTnkvEK1wHx9UecYGd895KOdeRE4iiKo1+sKG1GRmi0pb/DCNI+q+WwqrDPc3d3B27dvodVqnWiVceo6zWRd6ACfocMJDueQBGiXP1e5wPXDoaPD4QDz+dw4Z3p9nOmJ1+j67xLPPoTNapvai4FMo9GAH3/8UaFKNu0XlKj2fK1g4zkGhzi36ddff9UfP340gSR/lpcIyF2KGt9KVvRVcvzSdGsjpRJVrHnjJi6aOI5hPp+nitR5XcJXH5OiGq7wDQCwXC41jhimI6dphFSpVFDDSiVJYhpNXam6D8Lgo5w5hHepoqev+TUtzOmCbDDLxIF9+OL4PHU6FHKijZxUUw2fC9KBsd/m5uZG3d/fQ7VafdUvRunb+Dkpw5EajH3Rb4gRsmUutFkXnRCtkdHm6MlkojebzUm2lHZUwTWhdxsMjXtLugf5fB56vR788MMPqlqtmjoZX198jDrWUFGBhUr1YLA4nU714+Ojaa+gPUwUoqVqKnx0fBZ48rusCdlw2SyOxaeEkObYtOem0WgoyoCiBVYcfbxYLF4REbL2MYVsSknT7mUO0Qn8hn/DSK3RaECv11N43tvt1hzPVtPiVE9XQduH0adxLmnqiFk+Tw0371ECMLRshVRqLhpLyR4uSJKz0SjVFrOFZrMJ79+/V//2b/+m7u/voVKpGEgODRbPkGx1Iak+5uq5kpwzr2tJjDo0gDbIj/4eh/X5miYvleWkdTou5RVex6IM0kKhAPf393B7e6twlDd9PtTx0CAP+5Ro9o0wb6VSgcViAb/99pteLBavqNfXCMZ5L9E3XxOyRWHXzIAkOrOvqQ/fX61WT9hO6ISQYXY8HmE2m+lGo6Fw9o+vOCgZLvp+6uRcBWUqG0OxY+5MEbNvNptQLBZhPB5rnIZpGwct4cS2aaxpoFOeEUqbPg2OH3JOtlHsNudVLBahXq9Do9EwReftdnvi5Llh9kWhaGxoPwhmFOhsbm9voVAoqHw+r/FvWDugmQd3NtRR2Ar+vN7nEw12UfEpTET7g2yMSlRzb7VazvuU1TZcaj6VDZ3g95JKNCml4N27d1AoFNQ///lPvdvtDM2brieqqCEZfdwLu93O1AX/67/+Sx+PR3V3d2fknxDKxXVJ4XauiGI7d5ds17fyKmRZDJe6AZLTcTVl8Z/5DBdkySGGy6O/fD5vhn31+/1XfSpZKONpC6sU9qH9TXgupVLJSM6gQaBSPlzXS/oO26iENA4pBOpLM+X0UoZI6nmJosjAMXifkDRC1wf9XkoikAwyNTZ0siiF6NrtNhSLRVWv12E0Gmlk46EzwgwptK/Idb0uCNiVbb5kQlprrTAgQ3IOwk10Cu9+v4fpdKr7/b5CyBHXp8Te5PeTG8xLPH9fr5UUtEpQJc5U6vf7MJvNYDKZvEJNpIzZxqrEmiG+9/HxUefzedXr9UydCDMnXBNU/if0us8ZC/FNOKGQXpJL4b2cXeYjP9CFjhFHo9EwatHUcNOmvOl0qqvVqmo2myfsGhssIwmq2vB3GwGD1wx4nwJey8v4AVUoFGA2m5leFzwnLrmSxZCHzPPhm+BSdFG6sV1GSpqMKTnVl6zxZFwHYu+2CbZSVoLH4r/nDgnPHUkPlUoF7u/vod1uqxcNNh3HMWw2G5MdYVaDsBgdl0BHUEj0dw4bS3CPpIrOyRWcqs9lbeiaWq/XJpq3NQvbgsmvoZ5s60PE7DaKInj79q3a7XZ6NpsZByQF2VJdkspyUZbsbDYzmTkqb2N2RbUNqUZdFmTIFwR+U07oj5igmuZGU/IBbupKpaKKxaLGbAgXGNWDGo/HUK/XdbPZVKHfZ1N/9hl07pjoSAFOGMjn81CtVqFer2PtSG+32xPtL74wJRjQlubbNplvQ0tOgA+Ps+lzUcPHDa5rrUk0Z66YjmKlSEjB89nv99o3kO8SWD3NCIrFIryMCDcCmvv9Hl5IJXq1WhkDtNlsXilyS7N0QuqhkiHjARyXhMHPcsOLa3C/38NisYBWq2XgKR6oXTMgzZIlcQfu0qNDuPvt27dKa61ns9nJezFYdSl9o/NByBLX9/Pzs97v9/DTTz+pWq1mguOs9vSabRR/SjjuGgsn7YOQakU0iqtUKtBoNE7UE3iviNYahsMhNJtNaDabJg3HWhKF+Ticx+ecSPUZyfnwcckUssHJnyg7Uy6XzWRMPlANHZKvsOvLcNLI7oQY89D6Wtbj8/4LdEJRFJ3UXii7KcT58LYDNMJUkoUzrygRgT5D/A9rRIfDAer1Omy3W5UkCUynUz2fz18xreh64rJK52QDtAeIG1VbzQ4bVyeTie50OqrVagHA/5tHxGuYl0A9LrH+pOyB2wzMTPD/L7OmVJIkOkkSiKLoROBXqt1xrTde89vv9zAcDqHRaECz2TRrEmtHiNDwAYkuu3dJ5uqfzglxqrFv5HPahSNF6LxnwgUHSU6pWCxCrVZTURTp9XotMoByuRysVisYDoe6UqkYRh1CXbQAGDI9NKtRpnh6oVDAwXYKNwoO3aIGUPo+n5iqtPnTNgqm0dezCZ9mcXxSPxmuRRwISKNRvJ98fUlQnu166DoMyXxpZkeL2njd1WoVut0u3N3dqdVqBZPJBD59+mRkgPh38qDJ9gy4sZSgOQx8qBAulw6Ssl1UWuB6gjbFi6y2ICTKDy0J2LJ/CsXTqcRKKbi5uYHlcqk+fPig6ZBDirLYCDacDUdrZ58/f9aVSkVh7RnJKpzI9Fcm9JX2CQWfPKO/4s9RFEGlUhHl0anG12w2g+VyebKg+Ghjn3OmP0ssHcmh0k1Ao/soiow8D7K8OEsnJAu6JjSadkP4pq9mfe4EilO8n8XVMOgTSuVq2NJ1chhYolvjOaF8UJIkkMvloNPpwP39PfT7fajVaq+aPtMqJYe8n8NxtP7FFcYpfI3jHWjPy6VkZC5dz7DV0mxjEuha6fV6cHNzczISnDosWy2RBoq0dlQqlWCz2cCHDx/0fD6HXC4Hu93u5L20VuibHfQl7t+fyglJc2QutXDS3mDboLUoiqDVainMbGgWh9HOi8oyPDw86DiOTyCHtDTINJRyfu94ZIWL83A4aFpD8dV5smaiaa4xNGv21RbTZEPSmGvMWqWmS2p4pbEj0voJhXmkz1JDRxUrKIRLe5e22y2Uy2W4v79X/X7fSMi4nAp3cvy8JSq41I+E9+hF6FVFUfQqa6TrebVa6SRJvAMKL5UJhTSC2yB923uofiPNVPH3h8MBqtUq/PDDD6rRaMButzv5jHRPafZJ1yCl1RcKBZjP5/Dx40e9Wq1MM/V+vz+ZjRQCFX/rjihTs+o1akQhOLEUcdIOd8paqdVqUCqVDCMJoznKUikUCrBYLGAymWiE8ihWm0ajSSIK2IwLrQ9x/TAK67hUlF2bN2TxuqbNhi74EAPCM4gsm4ffV4SWoig66WXh2aUtQubHRSIBklcwIOCjpem4BwwYaN8HHgPXHI2iC4WCEdhEBlW73VbVatVKsZbm1PjIC7yxFxUSkMmF67zZbJqBfbSeQaHo1WoFq9XKqW92TkDk65MJsT826r4NnZCYbgAA9XrdOCKKjFBUhH6GKmLQv6HzQlX22WwGz8/P5nOoZo7OnQrxUr3LLEM+v2knJNVuruWFQ6aISsaJN9ZFUQTtdhtKpdIJuwezCjQm2+0WHh8fYTabmQVEIbu0GV2IMecFTp4dSHI69G+S6vMli7ySQwupM4UanDRQE712nqXiMEOakdCahyvD4HR7dDKUvRiyTiX1DVyPPPChk0JxyilVeeCG1DZ4zRacSc6XBly0doFQJq0HoTwRXl8cxzCdTvVutzNGl2elEpxnU4S2TcrlrD1JWdxGTOIzlVxOiK9nfn9vbm7g3bt3CqXAqJNAJ24LMCUV++PxiPZFPz4+nhBE8HnYaNpp5nT92V+FUMOUxailLUSnST25Iac1Hfy53W6r1Wqlp9Ppq4ItRn3FYhE2mw08Pz/rF3r3q6Kzq5Dtc9BSjwpfPLyplkKInEUVUtC8pNZXSNOkL3BJ+1nXsSj+Tp+55AB4A7LtuaBA7Hq91jjmALMt2yhlyqJyPXNpBAVtH+AO0zfmwhb1099j1oVMy06no1AxBNdWoVAwE2hxWCLPKA+HAyyXS1iv12YWF70XoXvbR4i5JqxksxvSMyuVSnBzcwOj0QiQUk9lmyh70VXj5AFFkiTw9PRkehMpS1YKNnzXcomRGn/qmtA5huxaEB6NhCju22w2odPpGE0xWsCm43cPhwMMBgMYDoea0rR9Bj9kTo6vCM6VlPE7i8WiohRgGwMuFBILyeJcWm8hTopvKL65fCw7W0MpGj5qCCgEy5ls+XxeSZIz0qRWiuXP5/MTg5xV49BHwrBRo+ka4n08ru+gkTc6mE6nA2/fvlXv379X7Xb71WTUfD6PfU0n9HDexIrD7qj8TUjAKAVClxC1vaRN4nv2cDiYRtZOp3MCtdl64qTnLGU8o9EIfv31VyMOK02yzYoy/OWErhS9+KI+CgHwSIt2MXc6HajX6ycijlwFoVwuAwDA8/MzzGazV+KGFMLjBWdccJwhwxcPHbnMB6LhcWh/CkoQcRiAS9Dbpm1+bbhxaF3NplTBmyVfIleFkBe9z7a6iaR0TgOZ1Wr1ii2Jx8Tv4fi9C4K1DTv0Nai66iR8xDbCRrgncrkcNBoNuL29Vbe3t9BsNk3dqlgsGlYcAEC1WoW7uztTB8G1RrP/3W4Hs9nMwHS2+lpamP6SNO9z1h2FStfrNex2O2i323B/f6+wt4frttngWqknEIPafD4P8/kchsOh6f3jDstV45KClu/CCdkmTroWUZq5M6EL1adBJTHa8AFXKhXodrsKHQ2PfChbbrVawcPDg0ZDhMehagtU9cBXK5EWEGLrEvuJOspSqQSVSuVVTcFV2zinSPwl4BBXNmQTK6UCnBSupIQU+ncsxCPL0GWsuMTPer2G2Wxm5hDZpsyGGlOf7hs221J2lST7FBrV5/N5HAGiWq3WSfZI1yzdK91uFzqdjpLqW2g8V6uVXi6X4poPHYnig++ykFV8MlouZ8R7EmkPDwrU3tzcKA7fSQGn7Rpo8IRqGR8/ftSj0cjc22s45m8yE7rWjfHJzIQsPgkX513u9XrdSOHw4/ChcLPZ7GT4HToE7N2h+m1UTodDKbzng8IlVOeMOlLqhHK5HNRqtROxQ16fSMNku0Qmk3XcRdrzsjlWSjrgESllGWJNSDKsksOj2dZ8PjfjPqRGZx4c2aAn2/XzDKtYLCqeXfECu+1ZSCgAMkNROJNOA0UpIXrsYrEI3W4Xms2mQQ/weJhBLZdLmE6n5li2qatf0nbYnJyvjsJ/RwM8tBs4Grzf7wOq7dvGsfscCHViOHb++flZY98YV3IJ3YNZBov+KZ1QlubES0I0ofNGpAdIC/svBUeFQ8/w95TWTZWqHx4eYDwen0TcNDMMKczaZshIjorKilCxyVqtpur1+omz5JJCUn3ha8yCzl0jknGm9SGucoF0e1v2xaN9fE2nU3h+ftbb7dZZkwmtDdmGwuH3UqkfmzKDL8OifUhJksBisTAzq7DGhfRwTj3fbrdQqVSA6yjS79jv9xDHscZjcYgxhJr/NUT5/PsppI5BJiWc9Ho9ePv2rVFUkZiGIUgQnW91PB5hNBrB4+Mj7Pd7E2T6RrTYYL9v4VX4Wk7ENrfG1gXtgp/oezB6wyLs8/PzSdSD6TJmNcViEbbbLYxGI12v1xVmUDSCxYwF8XWfjhYnH0iZEm727XarAUDl83mIoggajYbpM+D3SdIf+5pqPTZR1SxjxykridTQ9PF4fHUw7NGQiAjSM6FTb/f7PSyXS5jP5wYOpbAtHcHhg2Jc94pCsxKtPERsVgp04jiGX375RaOcEY63fvPmjcIMiWblKCvUbrdhPp/Dcrk8qXWilh6y5KhMUmggdu21yXvtQgIaWwBB1e5zuRx0u12YzWYwGAxO4DreyiFR1/G8KDMRG1Zns5leLpeqVqudMDHxfXR8PJdU+tbICsH53KXnx9uMjSuKTgvnUAdRKpVMEZZqPFE8mLLsxuMxfPr0Scdx/ArS4QvNNqdeui5K++Qd9YfDAVarldn8L9poZhJkmg7/ryELsqkz+FQy+LVS5h2dUMsbQ2kWVK1WFWV68fobPSeafSqlTG0QJVdcMk1p62A8oCqVSgbupU4upIbG7yue62q1gtFoBMPhEEajETw9PcGvv/6qp9PpCZRMWZetVgv6/b46HA6w2WxOvrNcLoPWGubzuVnDXOkhZF5SlnVqy/rObYy1BUzUqaCawvv371WtVgPsl0JiQaVSeWVzbCPokQmHn02SBD58+KCXy+VJMIwv16iHb61u9IeCij6JDl9hWRKR5JRj7BbHKKTdbptIxka8oGoKg8FAYzaF78c+DAqPudQSbDUBKh+Cv9tsNqaZEaNUZDhRzJrL9dtov1/ry8Vg80XO0r3Cz+BmrlargEPZqG4gZSLaagTH4xEWiwU8Pz9rVNugz58W9qW6gO0/bpgwm67X6ybj4HVKqcbInTmn8FOoD+fajMdj+PXXX/VkMjmBIOngvXq9bpSfec3ncDhAHMd6vV5/lcYwDV1esjVcy40+z0ajAb1eT9GaI11PtkxXEoelDNvlcgn4PDDQ5Fn6OTXav5xQBoMkRcppdeSkBkUKH3S7XdVut0+KrFyyBA3BS5MZzGYzY+ywCxqzFVuU7DpHdIK8foU00TiOzXlVKhXodDonxWx6XyRtNVuDHka/WeA7W/c6daK8MTNtvUiS2rE1nGqtjRPiY9aJfqBxIFgToSQUHjigMceIFdWuN5sNHI9HKJVKRtyTinq6zt9WG8JreYFcFR4LnRHPevl6sYns8poZVYCYz+cwGAxejYxAJ/QSpClaC6P9Qdvt1ohw/tmGqtn2hqSELtme29tbuL29Nfcqn8+/avK1OSMK4dJprKi2jcPwaBBB4XapLvRdC5heO5qRpPtdRlOS6aCGmm5kjAxvb29VvV6H1Wr1CgLBYiEu2N1uBw8PDyaCRLyWw3m4eOjGlc4DNzvP3nBjv6gXa4o312o1QzGnY5SzjNWQovNz59akKZRy4xbyfslwoIIxwhtUBgUz2Xa7rehQNjrdlGYPdNwBZlJaa4jjGB4fH2EymbxS40AD75rP43Ky+KLKBhIMJ42xkJ4nZ2lSh0zbAkajkR6Px6/64HD9oqYczR7xu9EJhcJbXys0LO0FGwsSHUK5XIZ2u63QJuRyOaMDZ6uD8vvAoWRU6nh6eoLtdmuOx8lL/Lna+s++SSckbYQQVYA0KaOLPpt2kJOvGIzf99I7BJVKxRgVmqVgXxAuwBdjpEejkdGiw7/zHgLJiXIdL2yylIzLbrczTZN47uVyGego8tCBYq4eoksxbCQtO580va1+ZqM8czo9bujNZgNxHGs+wA2P32w24e7uDorFomEnSQ2nUm8SXttqtYJPnz7pyWQC2+3WfJ5Ce7bmYJ+TRyNfqVQA+3psqhrSFFVJZcHGAMNr32w2MJ1OxQF6+XweGo0GNBoNK/uOnveXgNPSOpa02bevD5GKkXa7Xbi9vVWUlOCD/mjvIiVEUcf++Pion5+fTz5D1RZsDu67yISkjXWJEQ5pFmCIPAhtIsNomGcllAjwMmRMdTqdExyeMuYoG2q/3xvqLk5ApZAFX4y2scu05sRnidCsaL1ew2Kx0Pi3crlsoCVaQA2BvtIW1b+UEXF9JrSgjZRk+typg36Rr1H1ev1kwi5msbZ+IeroAH5nnH38+FHjGAbqACQKtgQnS46aGqZWq6X4+ABboJbmfnMmXC6Xg/V6rZMkOTlf2iRdr9cVjcrRmSHt/RJwUBoY+5oZEh9zIc0MIuMvTPCKdkFSubcFwxKJBJtYn5+fdRzHJyQFCWr97pxQViOTpqbjGk+QJiKi7BJuWPiMl5fpq9Dv91Wz2TSCkriwaA2JRr7D4RA+ffqkkW0nOTlOt5Vowbw3ibPBkiQB7FDHz1WrVYUD79JGRaFF20ti7ecGG1Jmwh091tAQm6f1Kby/zWYT3r17B71ezzC6MNhAVhqX7+HK0C8NhvDf//3f+vPnz8aoU+Mecg9sjMEXJ2Rqf+fo/9kGK2I0j04Ua2nUeeM1UXUFyuQsl8uG7HGJ8fAhQe8lgiJXn42rDkTXGg6YfHlOikL4VuPKmlFpgIvPmTbJj0ajV4ouWWHvbw6Ou2YhzEZpTLv5JHhFEgilrJZ6vQ43NzcYHb6KVvkIiN1uB+PxGIbDIWAzI8+IOI7LHRAfE0Exd1rrieMY4jg27yPjv8VsNOQ5pRUnzVpjShNs+IIW38TQOI5huVy+Ur2muoD9fl/hJFOeGbigLfos8/k8PD09wS+//KLn87lI9eaf8zldmiVVKhXo9XoK6dA2iNNVJ5OMFG3q/eGHH9T79+8VivrScQXooJMkgclkoin0hg6+VCqZeuYl6z7XNKo2NXdbCUC6p3SPlkol6Pf7UCgUXlHZOYzGteF4PZfC60op0xZAexO5OgjXsvtuMiGbXMklop40fUI2nN3VkyJtWtoQ1u/31bt3706mMNJFR3sqMEv5+eef9cPDg8HI+fX4IEskSNAMji4urEPNZjONzq1YLEKr1YIoil5NfXU16vmmVaZlyKV1SiHFekkCX5LmsREUlsulps+I02KLxSLc3t6q+/t7c/+okZeGGNIggXbVj0Yj+P/+v/9Pz+fzk2eXZs4Tvw40Qu12GxqNxiv6vW2NSwPsbAVrbH5++/YtvHv3DiqVimHnYR0UiRiLxeKExr3dbiGKInj//r3C/UHXoK1+G+qEXUQZH909JFC2EQ+8xpG1fSB032q1oNvtKsySKc2bwmmSzeH1Q+qQkiQxAqfY4Co90+8KjvM94Kw3I43oZ6hxpGrKXNCS01Zp9IeRMtXO4tgtRsLlctkQE5BlxFWxJQo0OjI6LZVDfvT9OM9msVicLPIoihR+/6XhiWtHsaGzolxSL3x4GsDvbMbJZGLgJcTpaT8P0UhTb9++NZAUFu0p1Z7qzlEWHWbDURRBkiTwn//5n/rx8dEYaVw7tIaAz5x+B3d+eM7b7RZqtRq8efNGYe2FT9ukMlOuwFCah4Uzs8bjMWw2G3NuqAbwyy+/wM8//6xpbxR1jjc3N6pWq/0p+s9ca9WXQfKMmLIuaTZ0c3NjakOU/EGn76bJ6vHYo9FITyYT0yAs2eG07Stf++ss2Z5LpNFZh6bxY9BFQo9Bmwzp+9HYYGPju3fv1D//+U99PB6hXC4DNuXhsdF5YP1oPB7D4XDQURQpLmViS/Ol3iVqLHkUifUObKSj2l88lZe+V6pD0VoUX9Q2jN9Wa+NQIn8/3jdq5CkhQ1IR5pE+vyfSteIE0NvbW4XOgzckYzNmPp9XWms9Ho9hvV6bhlGOweP3I3WbqnIrpSCOY/j06ZPe7XZwd3enkGlJe8mkJlMpOkaHBfC7Xtnt7a2Rl6L3m6tgu1AEXnTHulaSJLpWq0EURQo14WhtDenI2CtVKBSg2+0qhKC4oZako0JrRdeoKYUen6vu+86P9yF2u11YLpfq48ePGtcXOiC+t11BNu4DvI8vah2mqV46R2kC8zfrhGxjdV0pdxbaZAibxPZeDpvwBkeaGvPmv/V6DdvtForFIrTbbfj3f/939V//9V86SRKo1+snES7l9mN2hKypn376SeGCoVgxpubYq0LPBxsfae8AXgvWNzCDogq8XITSdm9cpIjQZ3DtyNQXlLiujUevg8EAms0mtFotWK/XBmKidGrMZm9vb1Uul9NPT0+Gjs+NBGYKxWLR9APRKb673Q6wNqSU0v1+X9EMSxo1zp0SOizqBEulErx7905tNhs9mUxesfBs5AMOJ9I1Rck1s9kMlssl5HI5jVk2/h3PBc8fWwNubm4A5a6ke5X2eV5yrdkcTygcKilZ8HlRuLfxeW02G8OWKxQKsFwuoVqtArUBtN7mO2+qnJ/P52E2m+npdKq63S6sVqtXNPtLkzi+ejhO8uJcm82FRUsPXNK+4huMY87nsOxcEvxIkSyVStDr9QxRIY7jVz0llKyAxx4Oh/Dzzz/r1WploDos4iJEJGVhGFlTSEjqmcJNT2E8yqwJhTglxqAtwgqp5WWNwmx9MDbY13ZOVN1Aaw3T6dSM4KCNwbS2gc6k2WzC/f29+uGHH6DX6wHV5qMFZtrEyUdI4DlPJhP45Zdf4NOnT3qxWJzIAUlK6fx5oUIC/nu320Gr1YKffvpJ9fv9V5AzzSpdY1B4rYo2XlKIkcJ8aBCx1lmr1eDu7k5FUWR+T9djGtaWa/DfJevMaQOrEJklm0xPFEXw5s0bhcEmHg/XpDSyRQqgEELGe7vZbABrzqGK5d88MeGPhOzSNqxKxUXbRqByLmhker2eurm5gd1ud1KPQfiORiL478ViAR8/ftTL5dJEnAht8M58UiRWdGoqT/mpUjSvcWW5F77CZhpWXYiT8kWloTWikO/DLHUymcBisQDK/KIKF/R8oiiCu7s79ebNG1Wv10WmGzYT0syFCoDS8fDD4RAmk4mmUCWfz2O7j1gTwm78w+EA3W4X3r9/rxqNBlBqPjpWFBHlz5XS1PF9VECTr38ekKHxbDab0O/3FdLGsdZFDXxIIPI1GE3XIEKp344HG7y2THvOer0eVKvVk8GXvpqQpJROnXo+n4fpdKqn06kJVr/lgXeFcx9o2v6hNBCdS9b+Es4QNxHCIfv9HtrtNlQqFbXf7/VsNjvJQngUibDa8XiEp6cnOBwO+scffzSRoy36xYmapVLppNmS3wPJkPEpsiHSO6EGPzR6lLTc0jzXkGm5LuiJfj8ayEKhANPpFCaTie71egpraVQjkEK0L3JIKPGjSqWSns/nJ7VACsFQyISuHfx5tVrBb7/9Buv1Wr9580Y1Go0Tei+HXPGFTCjMQtCBFItF6PV6kMvl1GQygclkopMkeSV7RJ2rZKxoCwGtc1GojmaA2A/U7/fVzc3NSd2Hrj2pHpkWYr1GsHsOMcGWsWEGXSqVTCsHdfitVkslSXKi3IH3WVJh584M0RhaI30hkkC73U59nd8VMeFaJIUs8I7txcUWuYNDKiTtMymVStBut1WSJBphOc6yQyYMRtnFYhHm8zk8PDzon376SVWrVTObhf+HC49PqaQEC97FTb9X6tQ/hzWTVUPOh3nbejQu8byl716v1zCfz2G1Wr0qntPoFB0HOohOpwOVSkU9Pz/rh4cHg/lj7wwd9UCNLxpjHMew3+/hpZlVYxZDIRwKu3EyCkI6aNgQiun3+6hurRaLBazXa40it1TJW5I1okrdlGZO4UZkDmJAhZp7CFPitfMJoGiE08CyErHEFyCdY1ds0K4URNmGx9E+QT5cEu9lr9eD0Wh00ojKlc35d0jkHfqdxWIRxuOxHo/HqtPpvOoj/Ja04wrnGPhrp9xSv0RWQylNO5SgEixm39zcmAwHU20afVOBR/z8breDx8dHyOVy+v7+3jQE0tkrNLLkcJxNhJXCA2jIsnbW0w1hY95cQ9JH6nXgG8uWaUt1Q15jw7+9zM/RNzc3itZA0LjTDJLW7F56sFSpVNLD4RDm8/kJQQQpsxSnx1oi9ovg8xwMBnA4HPT9/b2BszjDjZ47ildSTTEK7WDW3Gq1YLPZKGzQ3Ww2Gsk1SLvGwIoei0J5CCmiM8bPoehrq9VSnU7H1Ko4EYHuSU4Gcu3TLKOoL93D5vqciyBls4d0nHq73YbhcHiyvmityKagYrtv6Pyfnp40CqdiwMN7F7/7TOgaDuiSI8V9qtHodNBRkJ4caDabar/f68FgAOv1+sSIUMNH5X6OxyMMBgPY7/f67du3CqdzYrGX0r25DA+HgaizQCl9ij37BDPTOhQb+/DaHe3S5pT+b8PW6bNLkgQeHh6gUCjA7e3tibHg2QedH4SO4O7uTr0wF/Xz87Opq9Bggq4BfK50Hs3hcEAnprXWqtlsmmdN+4jw/FE+iK4njIwpGaBQKECj0TCTUPf7vUJq9XK51JvN5mRMAP6bIgLUGeEaLhQKUKlUoF6vq9vbW9Oxj5Bmlvrd1zZq3mdPKAtRkvWh8CVmsxw5eXx81DQoosGiRJDi58EDNRyuiSPYOaT8FxyXApvN0g/gmsJ5qfPCDUjhF3QYKOtTq9XU4XDQw+Hw1flQqIUaxiRJMIrW//jHP5SEO2NdiEbnXP+OMpiwsLzf708icKnYKY3Tloax+fBx/n5XVCg5QamWI60N7lQlPT3bOqDzd7CxcDqdQqlU0pVKRaECAWYqiL9T8UmMLhGaetGZU6VSSc9mM9hsNq/06Shdm0M3mDEtl0v47//+b/33v/9dNZvNk2yHRrU2oWCpRopQLjqHZrOJ16c2m43Jil6ck8bj00Zsqp+Xy+WgVqupVqsF1WoVqGwQV4nndSVX4PK11i18tVPbYDrbfsHftVotaDQasFgsTuqGPrYn3xPcPm02GxgMBvDu3TtDuPnWXoVrPuxLUC598j0Sxis1N9qyIU6jxvoO/r5cLsP9/b06HA6mb4PqudEIkzaq0W70RqMBtVrN0Fwp7Zv2FUlkDLopqFGxGXppumzaepCNVu/b2Lbm3HPWhg/GwOwCnwfA7woGL/deNxoNRZ8Jdxh0NhA1HC+MOaWU0qPRyLDk+LRMes/pwDNcW4fDAZ6envTxeFS3t7cnzD38TldAIAnjctkcnG1TKBSgXq/T+UiKsgT5OSNsh5I+fOps2prPJff+l3pxApFvnLqNZBBFEfR6PTWbzTS1Jxxm9s1E4z1DpVIJnp+fdafTMaxd3uD+TTuhNGyWEDzVlZ1Ic4ukSNCnR5YmCpMiH15E3263RlGhVCrp5+dnUzhcr9evjA6NIOM4hg8fPujb21tQSinMfDCDiqJIlctlHcfxCTyDixF/h0YhjmPYbDYmgpaYcpToQDHpNLUimyOwFXh97B8p8wp1kj6GJJJD8N9oXHe7HQwGA6hUKvrm5kY1Gg2I4/ik4RfPjYuaonN6GZ+hKpWKHo1GMJ/PT4IIm0HhxJGnpydYrVZ6t9sBNjZzfTsbRGSjd3PlBOqY6NiFSqVycr8pPIQZFZea4Yw6ugZdTuaSclBfCv53rUPbRF/p+RQKBbi5uYEPHz6cOJJQ2EwKPvF5zWYzmE6nZubUt+J8Lp4JnasjRzORkImqGGW4Cp7SwrE5Ptr3QbMc7N+oVqtwd3enttutfqn5vKJtUykgNEbb7RYmkwlorfXNzY2qVCrmmKVSCWq1GoxGoxOsmVNicbGvVitjRHHMMoWDJNzftwlsWWPohvdFkdeKjKXIlKsUJEkCHz58MJE+GlyEtGj2SoUn8dlvNhuIoggIyUTTEQi8tkOdAlfI3mw28OnTJ1PERkeBjlMStqQOgcJoUuBFC9UU3rRlWbTRl641eg5YCzunpvi1v7hwMFc3p3VDDpVyllytVoN6vW6UNELKAvye8VowBjzT6VR3u11Vr9fFJvhv1gmFzNu4RtpN2Wf0wfMFEhK5+ByUVCzkygKI8ddqNfjpp59ULpcz0BxlqnCRSjzGfD6HJEngcDjofr+vsPaUy+WgWq2+GgMujYZYr9ew2+1M5E+hEltmmGYkhut5hygQu9QBLhnc8KAFa0JYz+HnixpvAKDu7++hXC6fDDKk94lCKAi/obPo9/uQz+fVcDjUj4+PRu5J2hdI0+UCqavVCv71r3/pm5sb6PV6qtfrWdcjHwPCEQH+fKXRIVLBm65t2pci0b1pdsRpypIu3p/REUmMVJ+TlVTQd7sdMhjVer3WVC7MN4ZD+g76jAuFAsxmM1gsFlCtVl9J+Hw3TuhaL1/NJ5QpJxXmQyTebRRwOu4bFxkutPv7e3U8HjX2BtBmQ94XggSC3W4HDw8PsN1udb/fV7Va7YSlRA0EbSjE88NxBXzwnm2B8xpAFkPvckYSfOmqL7m61s+BYmgUS6VV8B6+dJ9DPp/XURSpVqt1MtwOgwh0NlQRAR0Wzo7qdDpQKpVUkiQaxx1gpmDr4Tgej5AkiYEJ4ziG4XAIh8NB12o1I3xqM/JUW5BPY+XIAZ47F4i1DWqTInwJDrL11WSBwL+0g3GRcDiDj8sh2QSHeSZF64mNRgN++eUXU6ND+FZSTpHuG6fE7/d7qFQqkCQJzOdz6PV6hlzzXTiha2K4aTIrSUn4ErCgS2+NU6bpBm80GvDu3TuVz+f1dDo1mDqPrGl3fi6XgyRJTH2g0WhAvV43bBpcyNTovEAiar/fw2q1OtGY4nUggFPlB47/hxI8+LPhLC3JmPlIEuc4H9v58wmzVNuNR7gAAC+Zq3737p3qdrvm2aBSNBco5ZN40cG1Wi34+9//rp6envRgMLDO/aFFZszW0PAvFgt40RrUP/74o6JD0OjgQ6r2IF07d0JcSYI6Wpqlc8ahZJBdjEhEBnzj0SVoN6tqwrXGjZzbDkLJSUho6Xa7EMfxCREmrePktqhQKMBoNNJ3d3eqXq+nQjr+1E7o0vOC0kYvrkXiIii4op6QSJ3PkMHPl0olwF4MZMMAgB6NRuLmRkOCn8VBYljbwUI5rWdw6Q8cdoWLmjK9KEGhXC6bXoLVanUiP5M1C3I5ZgkiyhoRh05kdT1rm7oznhdOxdVa6+PxqF7gtROnjv/hGAYMLtAJ4XN5UUJQ+/1ePz8/n9SaOD2XqzRQZ/n4+AiFQgF++OEHKJfLJqvCuh93qLzWx52IpAAtTRK13eOsuoRf68tHskkLHdrWIs1Qy+UytNtthSMybC0OHAZ11VmxmXg2m8FsNjOQ3F/NqoEP39Ur4hrrLMFmaQ1qyIbyQY4IySHdls4najabKERq5tPQjATrBgjvYD0HO+w5uYCzzvD32IhoqwGgoez1erDdbk1jrURR506ez/nB/9OsU6KZcgfNoUBJWki6RhfEE7o2XMejDabb7RaGwyHs93sNAOrm5uZE0oZmrjwIoYEMjv4oFAoKAPR4PIbdbmfm8OA6kabEIuyHzce//fab3m638D/+x/9QCPdisIPriF9nKMzqQhR8CEXIsf4MzspVo8xabrBRsPHfL3OrXqluh5ybFEBRebDJZKJvbm4UNjh/C6+rX0XoOF4pWuNGSJqrIm0wl2Pik0+5YaVRIadIS0yacrkM79+/V61W64Qqi6k6/V7OdKJsJlpspGOj9/u9Rp0wGkVTWZZSqQT1eh06nY6ilFzJgLnGfbuM0tdqcFxyPxSapIXc2WwGHz580A8PD5o0FpsAAenNfHQCrfvhPJn379+rXq9nFBH48EGaVXONQlRq//XXX+G3336DzWZz4uw4e407RInA43I8l0A5vpXXJdYzV9im+5FOZHUF53xf0qZkaisOhwNUKhVYLBawXC6/L2KCFAGcu4AlPSobhsy/91JRzSUiOTx3nCuSz+f1fD6H2Wx2ElHT91LCAx2Yhy9Kqd7v94CSQVw9gR670WhAt9s1Y6sl5ljoxvORPr4GA8E3MNdjo2uLkjjoekMlhDiONeql0ayIZ0G0J4vCbs1mEwqFgsrlchqnoXKlanwWXGsQm5Wxn6xQKJheMlfP3KWMqg+K/RKO6ltShcZnValUoN1uq8VioWkgmvV5UaX49XoN4/FYt9vtbyaKKHwNJxE6c+YcB3iJMRDSeWJxu1qtAtKvkclGX9QZYC1CMvC0loCd/1jUlq6hVqtBp9OBWq2muNOzDb3zNefx//um335pXD/NezkNmbKKkiSBx8dHAABdrVYVGn9KDuGTbPH50MbkKIqg1WqpxWKhcTQHRsS8KZWqMuNxKpUKrFYrGAwGOp/Pm854KnArjfjmk4P/el1+74fYBilDRQV1rpTPkSBb3yIem073xTUxn8+NTfnLCV1pkYRkO2nghUsuQm6QEfvF7vQoimC/38NisYDFYvEq0+NNpa4sjxefMSKija2VSgVqtZpCkgI9T+r46ELnhWgJNv2SG/nS0TSnMvPGYtqgHMcxDAYD2Gw2ularwe3trapWqyeKCrTwTx0IwrEAADc3N1Aul9Xz87MeDAYn4xkoDZw6RXwGGMg8PT1BkiQ6iiIVRZFIGU6rKm+b6HmNoPGaGVHWcSNfQoCXE5KQJYdrw8Ua9AWC+/3eZOhIRsKRJa1W6y8n9KWgGJtIJ25iG63xnBk7rvOSDLnW2hSTsXC43+91kiSvIh2JTcY1rPj8Gt41fzweoVqtQrVahUqlcqK04KNVp+3N8jUsf41ZND93Xs+jzySOY4jjGFlHutfrqUqlAqVS6eR+8rlPtHekVCpBp9OB4/GokiTRy+XSwKZcb44OpMNnj3WoOI7h8+fP+t27dwrVrKWR95eYy/RHGu8v9bIxyELWcKjkFGVWIukkn89DuVyGOI5PaNyc+MOfCa/1UIIDrVE+PT3pfr//TaS/ha/JmEibg89WkRyNdAwXUy5rk6RkjOlCxVepVIKbmxuoVCrq8+fPmtZ0aJot6YJx2Mc2HA6NGI24KAtLUp92DZmTnDpnJH4p5xP6na7iLBWoRYYcUq/pWtJaQ7lcNk2lv/76K4zHY93tduHt27cKjQCqXHCJINTyw59vb29Ba60+f/6sF4vFicK31Awax7FxQKh59/nzZ8jlchp15nA90NqWTS3Dxn7k6gc2lQxOYpFaG/i65WQh3/Rcm5MIGUGfdYbWOWs3jW4mhdzTjMGwNXPz54T3C9XS/3JCXwheob+nEX9ohOda0OcaVtrISBWScQjZ8XhUs9lMoxFEo8S7+3Fx4fVhVEVTfsSE6RjoarWqUIkbP4/Gkn6Xi6V4zvCwL0lWcBlI1+fovZWG6XFiyGw2g/V6DavVSvf7ffUyu+eEFYnPBlmKNCJ+6WpX//rXvzT2d2H9B5lTVMWbfjc6yNFoBPl8Xr9//15hdE3nWNmuyZXVSM8/xOHbFDSuVa+5JPni2sETDwi4Gj8f920LaF3nyqew0uz9W3jlfDeYF8yu9UAvcVyb3Pq1MzhavEZDgY6g3+/D3d2d6na7J3L5Upc5X8RckJOn6TgsDY0XbXal3yFlCxRCkCAn6vwkKNHXf8GpxWnvqU1SRYJDQjaupDBB7wX93X6/hyRJYDqdwq+//qr/67/+Sy+Xy5M6DjYZY72HTsstl8tQr9fh3bt3qlarnRAieKbKnwe+kDSxWCxM0IE1Psqw43IwrmbjrHtKYkdea3/59m4WuacvgeBwx/JSr1WU4i/N/woJvLiWnNYa1us10DX5VyZ0ocXnwm+5thY11PyhSbATNz6+efeuxcK/g445pkPLMPqtVquGwq21hsVi8UoKiOO/CM1QxhZG0EjxrtfrJ7/jdSV6vDS9QZfKhC5B7XYJzdrg29Drk86P9vQkSQK73Q4WiwVsNht9f38P3W5Xlctlk/VyJ09JCLR5eLPZnEx3lXpMqGTQ4XCA9XoNg8FAK6XUzc3Nq6bXNJG0656FGkIXNH1Jht4lj/WlHBYfypjL5SCKItPo7lP28O1NyTljvfmbd0I2yYlQfNZn7KkStWR06HtoV3/aCYlfarHyzAYdRLlcNsyrwWCgXzr3rfUlzqiTYMl8Pq+kiNilPM2fBddg80mT2ByELYC4hITTpXB7znSj506NOma36AiKxSJMp1NYrVbw+Pioe70evH//XmGQgbALNUDoTH744QeltdaPj49meKFtT0kO5vPnzwAvFPJ6vX4yCC/Nus2iNpI2cLsGJO+qmXxJONi2D6SaGj7bcrl8AtdK6zCUJceDsFwuB+v1WgOA+uadkOsBXJJBk0bYME0951Kd4rbPURo1NeyU0UQ74RuNBgCA2u/3ejKZnKgwSxE5j4Sojh2nZUtQliuStTH+shi2rMKU5xqnNEaMMg6pw6CZKwY5tE6HBmW328FsNkMJIP3mzRuFcio8QEKILooiuLu7U+v1Wg+HQzMigmfq+KxoHQ/gd2LFZDIxTEgaNFBYz6ZqfakM+Es+1z9bzxMfgYH7F8ksNudlU/fmx+b9flQP8buD42xw1SUKiaHjuW3vd+mUuWC1NE431NjR41J4DjOYm5sbKJVKqlAo6MfHx5N6AcWQJfo5HgOHtNEUn9aFfE4m5Np8n7GpKF8qQLE19Ukq3zyj46OsJTiEP0MqsUPhVYDf5xLhGO3lcgnz+Rwmk4l+9+4d9Ho9hdAoABgxUxz1gKrrWmv99PRkHI0UTVNpH4DfiS/L5RIeHx91q9VSOF2Tqm1IwwjTOCJXU7gN3r5mbeXaEN2l1qILTcB9atvDIUPvbELBuIZRq/K7cEI+g3IJzNkWpUsGNaQvJCT6P/e6bbAAx33pvcGpqi9KB2oymWhOPeczXrjCN/YgUEkQ6T7yeTFpBEHTZiPnGgjb+pFqQtKIYxtpwZelUao2ZZ9RCjY2jiK7EQAgiiIYDodYJNb9fl91Oh1D98Y6ADYb1ut1uLu7U0mSaMymAF5P0uUvdGRxHMPj46MuFAqq0WikgnTOeVY+GvG1X1mcTxpbFFLTtNkSXstDFiPVnZRUzl37kteWENKn6xLXSujo8G8qE7pEmp4lCs+6IH0bUIKgroExY4SN8Bn+u91uQ6fTMfTqEEgLqZ9IzabOhjOsXLOEQupqIQ7HlgVd4hnxjDAEznBlpTYSg8RKxO+Nosj0F6F8CrLjCoUCLBYL2O12sF6v9X6/V+12+4Qij44ul8tBr9eD1Wql1uu1xkF3FFrjagoU1kFFhUqlYgIQyjyUWKz8miSdRltm6Zo2KkXoPpX8NFB7SG3oj6gJ2RwVDQaoc8BMyMbizKqRSJ/n//pf/0v//e9/V1EUnTQ222qPnE7u6xOTWJxcQkoSk5ZKCXjs//iP/zi1Recai3MjrZDIRyrOXRK3TrsxuDHHyAf/TY0DjYpw3ghGNfV6HdrttsJeIz56WVLgRWZcFEVWtQi6aG1khRBYxtZbZFNmPheSta0vW63MJknDlcqlv0sbhMKmmMVwZhOnyQP8rso9GAxgNBpp1PUqFApA5fbxPLrdLrRaLZMxoaOis40QzqNjyzEre35+1uPx+CQ65vRzaQiea3pnGidwjed8LcdwzXNyDQOk64MHCXQtuNavDUKlbRsAYOabSc+SQsvXzF5d85IukgmF4MuXypJs0NufWZwRVZy5MCYamEqlYiJdKUpBA0KNFDo27pixX4n29tCRD1I0Y4sqbZtBMlI29o/vOfsIJpKihJS52qK5SxhHPjeGyzWhfBIAwNPTE8RxrOM4hna7rfDZopFArb+7uzt1OBx0HMcntQN8Lujc8DswE8vn8zCfz+HTp0+61Wop6lxofxjti+J6d7Y6xaUN0peq7XxN8kJ8zpBrXpaktOK7V9K/d7tdJiHTUKcR8rzOvf+5az6QayxgG/7vG9bl+k6JiRZqyFxpJx6fqmDTzChJkhOjIPWt2OoE0lhpnoVJ1M40WYztGkOeuwQP2UgmX+uLOzqehVHHhGKow+EQnp6eYLPZvNKXw7URRRFUq1Uj90PXPjde3GEfDgeYTqcwGAwMzEezZM6koudM1+BfqtvnBya2mlzoPguBkyWkgo4JwWGZUhb1JRTuL5FxFtI4hhCWh0u12VaDcd200Czsj9pUPnFPF4OMOw3pfnANOWxk5c6TUHaVUkrz+UU23N5FXPANwLMNy3PBprYMRlpzl3RWlxgDYuth2+12pmZ0PB5hMBjAyzNQ3W7X/B6fVxRFcHt7q5Ik0U9PT6+CKi52SZuasX/p48ePulqtqm63ezLriNaAaKNy6LP5VkZ7f4nrcLFBQ2agubIcV6M3RUlQgV0i6oQo42cVv3VJQKV1hLlrP0wb3il57mtCfWnOL2taK+HErqiI/0yhNBtDDHuEeBE7xJFneba+up9tuq1ECriUYci6Xs69XgwYuFoGhc3wb8PhEB4fHzWO88Bx3gidtFotaLVaJhuSVNSlmgGuk+VyCSiSSqn5Enz5JWV3vlUHZKsn8ixW0pFD+I0jLq5Jq7Z9xuvEdJozV4h32aqsdV1X3VgKSkOCv9ylH1IolGNjKqUxVpcc0Zv1PS4Y0BcFSSOcOfVTMkycwcVkY7T08LM6fMmx+CAGl5ROqMO6lOPyZepZ1jXfzLQOgFnR8XiEh4cH+O233/RisTDOg8KzvV5PtVqtV+QCHnFKsk4AAKPRCAaDgUbnx8+TDuM7Zw38kY7ga4cNKcTJ1y4nIHBGWpbeKGlf85qQTSmdnyPXgnQlDdSJ0qBJCn5tdsK2Jv7QIeWhkan00EMN4qWinjTnSc+NRs/SHBLseuaNaNLv6GLiEQj/Dp8hv+TmthFKLs1Q+tISLdKGkuiotDkV/4bst/F4DOPxWKPKOlKr9/s9VCoVaDabRond1i5Ae5nQ6CAsNxgMYDqdmmiYat9Jx5LYhX/VhyA4eLYFmnj/qZ2iQQkVnpWObZu+6oKp6fpwQWIu9CIrAnXJNVP4ox+yr7DnwuK/RBSVhRmS5nf7/f5EQ46qLEtK0cVi0cBxiAkzp6cAQPugunMYj3zzuEgcIXR6F838j1iXUuAjZUG06ZCO10BGJLLZPn78aP6GdGvMfJrNpmo0Gnq73Z4UmymMQ//PlR/m8zmMx2PdbrcVMiGlSay2fg7fM7INh/waWKu2XsIv/f1Sfxbubd5Q6oJJs8w5S5PVXmM6rS9TC8omv0QqfE5E/LU0o/n+Tqm1ts1OI1VcnJjWcsYS7T+iCxyFS10QoGt0As/S0j7vkGcpXb9tfpFv/ECIE7M13tk2nwRX2Br8Quo1vGkPYTN0TLPZDJ6enjQ2JVM4tdlsAiogoNGS+pYkwgr+PJ1OYTKZnEB1Elpgu4ZzFAm+5B6UsoZrZtlp9oPUVsHnB0mDJtOgMLbCv0vs+FLBd5Y1Emr3rw7HuWAzn+RIGu02l9H70s7P1j0sqSZvt1tN5Txs500jW86Got+FETjtI/JRo10sHWk8tu09vDvcleXyn13Zmm3K5zUzXddEWgp9Ss+NY+jH4xGm0yl8/vxZc/g1l8tBo9FQ1WrVjHqgmU5ITQJJCqvV6tWwRB/R4lI02y/hrGzEgC+dfdnsD4c6kYgiUfxdNsoHa7tmbIXa0Evcu0utm9yXWEy24naWpkKJ6iw9XBfcJxn3c5UfpHoPNRTcmGM0zFWVJQiOqyVQzTjp+yQVbcnoSDhyWhzYNa8pi6P3zW+6BpZtG9hnK9b6hHK5hBLK/Dw9PcFwODRTeHENVKtVqNfrVgPD1zj9LoRkJ5MJjEYjvd1uIZ/Pnzi0NPc6bRbwpY3+14aU8HOhBBM67NDX9pAGRpMUMUKQiKyQny04PTeBSJ0JufjqaReRFF3bHIJUbA/hvl9qDs2loiVbvxAWNG1pOL9mVEWgUThvSORkBqnm4mInpllIHCqUsgJbI90lqOOh9UJXQ3PINE9bMzOn3tqmEWutYT6fw2AwMLpxtG+oWq2+Er10Rcb8/Pb7PQyHQ1gulycsPAoJ2dZBFoLQ1wCRX9oBZbVx0jrDES68ZutrCbFlwjbb50JQsiBQl4LYruKELg1rhfaepK05uL4v6yTRUBIEf6/NEVBJFWkUgS3FBwDDsLLBfRI7iv9ng/NcEF2aTFG6F7bf+Z4xp4ZyCCz0WbmyqdD1xu+pT+OLOgjsJ0qSBObzOazX65PrqVarCse/29Y3p8xSem6hUDBOjh47zd78M/YOXapX8Nzv54Hmfr+H7Xard7udtV0iDbriWtdStuMLOr+mV+6PXDwu/bDQfo6QMQ0hLJJLNlK6FGXpiwpkShG91PhaLpfNHCFqGLn4Jb6KxaKhBduiJd5r5DKoIcoV1NnZJIYuEd2GfMaVoWSJeENqNdxRoMpFLpeD0WgEj4+PerVandz7RqMB9XpdVLqWjsnPB2G58XgM8/kcaO8QJTukqZd+DdkPP++v3SHSe05rQhSm89V/Q2wTl2uSmtdtfWeh0BxtgrY14doQDt6a8odnQjaYyQaN0AzB10iVtbaUNqsJea8NouFZDl2kXLiULk4u61MqlaBSqSj6O9op/TKOWqNgJv1ehP0Qp5ZYcq5iti8SC4XabJmJjcV1qV6wNBueZxwh12+DVCjdHjOXxWIBy+XSPIvtdovPVmxctfWAAYARLcXaUpIkMB6P9WazMd/P6xIu9uSfAW6zrZVz9ztXwqdrQGoqp30/OJ5FKQXb7RaWy6URnuWs15C15Ov3ofaBi9LaGJJfq2LGH54JSYuOR32hfPhry7efE8nRc6cOA/tDODRHFxnSfhuNBlQqlZNj0Xv0Mtfm1fAs7NAvl8snvS2UQcfHUNiiqKwZjbQhQkkItppSFiFOX09aWgcXUkfY7/ew2WyMeOlyuTSUbeoY6DhoCZLk945Dufi5yWQCs9nMHJO3DmDgI2XBvCYhievyoYtSXcwFJdngTVugaXt250pu+YJJ37rktHyqgp4kCSRJEiRX5lpbNADh4+gR4qXzxEKQoaxiz5cO4P9wJ5R2U7v+5suG0kBIWYyare9GqgcxzBgQM6aLjEZeuAgLhQLU63UzNgCdCHVEu93OGBg6DqBcLkO1WoVmswmVSsVpvNPU8Hz3RYKP0kZhPkorz/hsOlZSQONiLEnHtVGa6XcgHCppzWE2utvtYDKZwHq9NnDpy/NU6Ijo99K1IGVqdIge1p0mk4lxctxx8VpbFpj5GvWbLErv19CP5Bpwtpoqtz/oGFBRnULt1DZw+RxffVMK0GkfWqlUygxph9akrllzK1zSA9ocQJYCny09vYbnvnRNyGZEeaRJi5bSoqa9KC9NjQoVlen5YxSGmRVd1Ov1GsrlMnQ6HWg2mzCbzWCz2ZzIBVGjyaMuOlqAR962GljIPQmZkOkqynLnJE2V5dGq9MwvMdbCFu1LESxOSj0cDjAcDnWtVlNoRCht29ZgaptNg9E4GsPFYgHT6RTK5bIolMubLKUa5KXnAmU1aPxeXiv4TdsAKzWZH49HWCwWMJvNNL3XIc7TpRXHA3FcJzSIkcbe2zLcUBud9Xn9oXDcpRoI+cgDW3QdQnukRTYONXHMn0YtnN7KIQmOFfNzlY6FxmK328Fms3k1nA6zGDq+OYoi6Ha7UK1WT2A4OiwNaw1I/0UoplKpQKvVgk6no5rNpqpWq4bYwJ8Z31ChtNIQJ3xtJhbvWg+tB7mgSCkaTTNnimYb1HHjaIfRaATz+dxkM6VS6WRiLoe7pP/oWqDKDavVCkajkU6SRHSaLjLKH4V4/NG1Chs9XtoHfL9Q9GE+nwMd304JKlJTqyszpQ3o/HeoqI9yTdz+XiLAvjQdO3Um5ItAXFFwaJFaasy0NWDyC76mxpividWWrYUY281mA0mS6O12ezKPnv6fTl5tNptQq9UUrwXRiZzr9RqwGI2ZQT6fh36/D91uVzUajZMGRvw3ry3xrn+b4bVlMmkIDK6M8RzIwLYROQzigxKllytaTpM9KKVgtVrBYDDQjUZDlctlM7ad7jmuPSbBnTwjwqBnsVjAYrEwECxdG1JDs00d/JqTjr/GGm4IYiLt+3w+D3EcG2IIyjdJzj4LvM0bYfP5PFSrVYUCuCH20DYm5ks9E+n7ClkPQoduXSoDCoU/eJRuKxheIjsLWZS40Gi0wh0oNQ6bzQaWy6VR2MV0mmvQKaWgWq1Cq9VSWAuS8OvFYgHj8Vhvt1uTQeXzeWi329Dr9VSlUjFzazgRgRe9JSPH6Z9pMmDXswmRqk8L89hm6mRpjLVBb1JwRPcBZXZKc36QnXg4HAw82mg0TiA1ydnbelJ4DxoavSRJYDQaaVw/3IBxuPXSiIYN4eASUJeqQ2aF8G1QlXR+9Ply1htmoOiAeNZEn5PUtsD3tjQeAn+33++hVCpBrVYzcLwkVptlP10b+rx4TchlfL4W9sW1Iycby88WIa/X6xMWG6f0YkbUbDah3++rer1upPvpfUB672Qy0fP5HFAgs1gsQrfbhdvbW4XQDzY12mSFOC4uMaakgVquZ237u7S50sJ7rt/Z6mtpNpltrEKaeodEJeb3d7VawXQ61c1mU3GVbS5eyzMyCVajBux4PMJsNoPZbGZgPm6opKw/y7yhawpnZlFlufTe9tkj3Iuz2QziOD6ByKRghjqNEGcqqXBEUXRC6+dCupJSvrRXbAGztFds07JDn7+EJBSyPJgvlUr7usezLNi0G8gHv/CFRaNf2qOhtTYZD52wicw3ynpBRlur1YJms2nSer4oXha9nk6nsF6voVAoQLFYhFqtBr1eT9VqNfM9GGUXCgWVy+U0N8pooOhoCT4a3MU6tEGU5zybUOMijVY4d1RFlo5zF1OTM6SoocAaQqlUMmM6QoIZanToi84uWi6XMBwOdbvdVlhT5KSTr00U9FrHla7TxVrjAR/9N5VGQj3HyWQCi8VC82yWsho5BM4zZV4/tDmVF8arKpfLooK8lAVlUR4PhSe/SCbkKiR+yWzIBkNcc4NQyMJmdEMp4NvtFlarld5utydGAxdIvV6HTqcDtVpN1et1KJVKJ0VLJBXs93uk4sJ4PAatNfR6Peh2u1CpVFQURa9gICQqoDPkDW8I2cxmM1iv1682qA0+keAp7jClDeAzCpdcU666UdqI3DZczKXfRXt1uJEZj8fQ7/fh/v4eCoWCKhQKWmpata156kx43SeXy5nm2Gq1agyoDYYLzfoo64sbWVc2LM0nOmesRJpgNjTYleqgfMItJSUhKWQ0GgGOc6f9ebZgIS1USIPVfD4PlUoFKpUKoPqGRK5KO7PojwhCCteOUNJy/W1sJD6kK4s3T3M9QXITJIqhBoZ2sfPG0+12a5rYsKB4OBxOmGztdltVKpWTxY4MOPy+7XYLi8VCz+dz47za7TZ0Oh2FDYqcMYUbiDLBsFO/Wq1Cv99XhUIBPn36pB8eHk5qG+dGQRIkkHVYmq2JVnoWaY8tOROJAm5jPvkwfu4g8JnO53Pd7/cVlTniDkuqE0mahNgMjZ+P4xien591t9tV+P0SFTzrfg8JUHmd40tmSmn2v+0Z0p/p/i6Xy7DZbGA2m8FyudTUyXPnZSNV8UxeymB4o3sulzPK664szhVsXNpmfnU1oUtEKz5HYLtR18yQsixkXAz7/R5WqxXEcWzGOyOE1mw2odlsKsTuAQC4+CEt6q7Xa1gsFrDdbqFcLsPt7S3c3t6a9JwTSBAiQBVu/FwURdBqtaBarSqkCPd6PZUkiZ7NZsYBYuMdjww5pOBj6XBGVxqJoBBogBvXazx7m6yQLZuzZdEYKWutIY5jWC6XZj1gwOCqbdnuEb+/+/0eptMpxHEMrVbrZOS0bz9xJl2WCFpydrZxIn8EbJfW5vDMd71ew8ePHzXWghAC57BqFsPOg2/8uV6vQ7PZhPV6napkYmthyJoBXaKXs3Cph3OtTW4zNJIBc918HjXaoDQbBuuDBrn+G2LIVOMtjmNYLBY6l8tBrVaDWq0GlUoFarWaKpfLgNkPhedoNzy+9vs9LJdLnSQJRFEEnU7H0LC586I9BgjJlUolKJfL0O124e7uzvQOaa1hs9lApVKBn376SU2nUz0YDCBJkpM6Fx1bTA2lq5ZCf2+bQBtaewuBPS8xyVfKwiUGFTfWdE3w9WEzaqvVCpbLpe50Os4x3fw7XedMo+QkSWAwGECr1TIQMGVVfcnI92uAgCR74VLnp1nmbrczBJLNZmOo8IfDwRCIJL1LW9Bl2wvSM9nv97h3VaFQMHJQ19LR/BIBfOFLLpQQfnponeWP2jCSYXSJDdJId7Va6Xw+Dzc3N1Cv11WlUoEoikwHPRoHTtWmrDh0cLj4Op0O3N/fm6IzhQE5LLDb7WC73UK1WoW7uzu4ublR7XbbbDKqR9VoNKBYLKr9fq9RhoQWvNfrtSnK2noofAadjjm/9CL/UhL/Pn09/j5phLtSCpIkgcViAd1u94SI4mNRhThi/I7JZKKTJFGVSuVEODfrvZBYU2n27h8xJvzcQWwYiOD/x+MxPDw8mBovog0YSKadBuximiK5qdPpQKfTeRVAhNpI23MKRRAuPRKn8CUNtsvL+7IfWz9SGgaVVNhNA/eFjMvFrIWqJuOrVCoprMFEUWSOTTMf3o9CC5F0LECj0UA9ODOHBmtA3AmhVAxK9XQ6HaWUepV5IStvt9vB4XCAarUK7969U1EU6cFgAJPJxETQlNwg1ceyGHHbZ2g2Kb1HggNdDdaXlJtxQUq2ojuH1/AZbbdboIQVW5+SVEuwnR8+VxTVfH5+hr/97W9QLBaNerdtgJoEBUs07qwkobSfydJXZvuMbxyBLXhAR6C1hul0aoYUFotFgxBgrx6/rz5KNq+bSn1G9Xoder2ewueGv+czwi6JXF07oyp8CQdky4CyeF0fCydkIaZpUHTJoNvEMqV/I6efFp6pmjFdqJLxophwoVCAXq+nMOri/QFS/weqdVNVZXRc6OTwM6hltt/vIZ/Pm4bXQqGgn56eYLfbQaFQMAaMjoawaV2lGYUQulHp720wWVZjxzdy2r6hkD3Bn9lyuYTpdKol4gD/nC+ilyb4aq1hMpno29tb1Ww2TVAS8hxC1BMkgoYLJUgjnhpy39Pqotnsiy2zR6SgVCrBZrOBh4cH/fz8fDI763A4GDkt2z3JktXjsavVKiDsLt1/bk9CbR3P2Cjjkc8F4mSY0L1h+/3VnVCWTnp+0lxO/lKLNmQIXtprldguNAris31QMUGaisqjXHofcHYJdSC2jm8pcuWfoeoJmOVwTbNSqaSq1aoejUZG8SG0DiP1uEgbyWU0XNCDzTldIwJ0ZcZ8eBmFHPF5Sxk+AJipq+j8JWaTpG4h/Y7CnphF73Y7bI6Fer1uCCd0Uq+PqiyNdghx5FmCABud21X/CrELtn4aKmUlKZVjHWi328Hj4yOMRqNXs8IkmjQ31vReUgcn9RZRJRasH1PFbqm+eg7JIATp+cMzoSwLKrTo6VPS/lpfrtk4NE3mUSoy1iQjwlN4jGSp88AsiEfNNBqjE1nR8eEALrpBEEagmxBrFpvNxlDKX1QY9NPTEyyXy5PnRBtzJQn7rEXTtLRqW0CTdS25ZKAkYVfaT8LrXrb+Inxuy+XyFUXbJknEI1VbbYie53q9hvl8rjebjaLD2dDY4bpBxQYeLNB1wUdJhNaPpOxegsdcsGQIsuIzzFynUor8cc+h8kiSJPD4+GjYcMhGtZ1bWgFQl15lp9NRWDPkM8OyBFc+PbwvVZcvfGlj7YtoXE1sacX2XI4sDaad5kFI58yhKmnGC2WxScV7jFp5NEcNEDolrA3RegB97263M/RgOr+IZmSFQsEQGehCL5VK0Ov1VBRFMB6P9WQyMXJBvG4gRc0SZBcSlJxTdHUZKhc7kmdtUm+Q5Fio+gU6I+maJLgvjuOTaFjq/7CpzEv1JnRuuL6OxyPM53OI4xiq1erJs00DW1+yZmBzoDaGapreQxtESNcGEgnoKG4eCBwOB5hOp2Y8+2azMXVdm66g695Iz4x+H/4dn0+lUoFGowFRFJk6MzrGrNm97Z5cssUhZJ8X0l6AbXbKOdmUxABy9Y9cioaYVRsrDX7u01aSBo5x2IMqZnMHJT1sKogqQToUbuMTXGmtiEbzFNbJ5/PQarUgn8+rQqFg4DlU/aZEC97Micd1ddm7Ilv6+9C5RiHBSBqjliYosW1CacYPF/aUqLeSaKbLWFOjivdruVzCYrGAWq12kr1RogSXa7IZcleAkXZyqGtv2ERdpSBBus+0EVQiIlCZLXRM1D5Np1P49OmTxmGEpVIJisWiQQnOMcb82mhgiUSkfr+v2u22CSpw9hSeryszPDeYuLYyzdXhuNDsQjouZz35Umq+YH2CjK6HZyMbSAq1vnOUnCqXV+Hfw6nLtLHRlVb7Ri9I7w+VyqEOECe95nI5VavV9Gw2g9FoBDi/hs/lwe/BbM3mIKU14xvBcMlxxaGMtBDGXEjwwh1qaP+VD4aS/o7OBUVvUaEB37/f702jrOR8Qup+WZ5DyIj0tC9JlFN6Fvg3ZLTRycSIDDw+PsJgMNCr1cpkIFjDk/aPS/nfts75LCsaUNZqNWi321AqlU7qijaR0i+Jan0xJ0TZGTyyTRN92gZGUQou3zBpbq6NyeRraPUZClcXvk3aP8SJ23TwXIVnW13AJSBqyyjSZCH0+zBiRLHUer2uqtUqFAoFPR6PYb1em8IpRpS0gY/Cfi7ar5TthTxnPmE1tKE5zUZLOzHYldG7oDY0iC4DL0n38EyXZjjFYtGMHECWXBqIK2S8R6jxDVVFD2lEtzHbaAbEHT/+G/vgkPW53+9hMBjAeDyG4XCod7vdSY0Mv0MikIQwM6WgQsqO6/U63N3dqVqtZv5Os2YbBB0Ca186aHOtc5cdT9Wsaptm6oIqXJROF/2Z/ps/eFufiE1Y0wfDhDgOqU7gM/4u/Ncm3ilNfvXVN7KMJk4DG0hOmH7f4XCAcrkM9/f36mWEuH7R0nql/CAxB10bic7fyQIj+KAPnxF0TWkN0RZ0ZSb0fXytuthlrkDKhgBQQkupVIL5fA7j8RjQuNlGTmSV6smKrpw7n8ynciIFcBhQ4cyt1WqF90cvFgsDv1GWIWZKUrM13+NS24XNPlAH9KKkr7rdrqn18jrgl1C5vvarEJLS2pq3XFmQraCaFt7zFY0lmIRGQBLtMe1mcrF1QjYMX6jcKaGRpfeb/izhvnxAmKt24quJuBrcKMtNKr4jZo1Dtl5gDaWU0oilU3IERnG05uSKks/BokPJD6GRd5ZmTMkwSs+SRtM2urWUGUvaffSZcqYjzWSRJVcul19lDbQeKIlwumblpHVeUjZs268+Kr4EHdv2MO1vQxbodDqFp6cno5tI78N6vTa1WTqYMCQrDHWK+CqXy9Dr9VS/34dSqWTGv9hmP6XJSvm6lDI5mxq+azIvD04lhyg53FSZkG3SYKgQoY9r7konaV2BF3Bd0i/0JtkiarqIQoyPjQJsmxHPs0gOmXBYz1Z74g6I69Rd6iXV1KRGNnwvziAqFotQLBaNmvft7S0MBgM9mUwM/IMOCRcjlahxZRSubJbfS9v8FmmDpXVktg3t2zM2iEI6LwpF2jIDG4zJ2V0c1sR1ViqVII5jM8cInwWKm9IMLevk00up8Nscsq0WTEkxVK2ckmv4fC/qfFASi6qR2zT2KAlIYlTSJlbJWKPtocoVSiloNBrq/v4eKpWKOR8+p4jPL5N0LM/JJr+KTIjeUIoD08iKaiTRG8NZN64MwlcYtxWwbaKDktN0OUAO97m+Q7oWW5ToMny8KMlhPlcGaZP5SROBpqW5cnYRrdtR5h5Ga9jk+jJaQk+nU5jP57DdbkEpdTInyVUjoFCSD2a1FYh9uLxrnITUoBkSOHGCjAuOszWbcqZkyItDgFJLAB5rt9vBbDaDm5sb2G63ZjQBtgLw+g83nLwmYqvZ8YZtG6PLJh7qcux01ha9Tzw7pOeO9+JFoQLm87lerVawWCxOPmtrIA2t9Uhjufkz52ol+XweOp2Oevv2LdRqtVQKCGmdzCWn4Z5DkMjUJ0QX8263M3LiaS6OnjhnAoVkShJjjUfMLgkZady0KxOi0RZvPOVjDvg94o5YkuNBQ44Noy5lXE7ppoX+a0QyLmKEtGlpBPmicac6nQ7M5/MTtQU6K4lHcpSY4hocZ0v/6b2VjBP/OYQkYBOi9M0t4vCQJMki1fhoFhNCtvGN6JaaY18GLCr8mQdElzRSPiqxa93Z9hZv0ub3lA6DxBEmcRzDZrPBgZAatRJ51u1TpXYF2LwWxK8RGXbUkaO6frfbNWrnmMGdk7FcY+L0F8uEbBMQqTHe7/cwmUw0NkhS7NnGonPRp6X/S5EoT0kl6EGiUvOIyVbQlUbxcsiD/40vWsoI49EbdTy4QVDctFwuKyyUIi3TZnj5RE0uFRTi2F2GnG8YDtHQ+g412pTBg9Hnzc2NajQaMB6P9WAwgMViAXRsAXVgXPeMG3sKs0jziSTxTVugxFUdbFmmD14OgfrOmc3jqytIZBK6Rngz9OFwgCRJYL1eQ7VaPRncx+8dfeZpanVS3cBmA6R7IMFgfM3SPUmDF5oprddrSJLEZD7b7dY0bWPPDx1TQms/vhp0GiUY6pzwGVA9yH6/D41G42Qyqw2KTFPv/NIU7otnQrYxzTik7eHh4dWMmZAoKlSdWoLYQorGEsPIxVRx0cldBsOWgfgIDRKOXy6XoVQq6VKpBPV6HarVqhn5gJsCNw6tB2H0R+nudFPajNWlu919UNHLDCXVarVgMplobJxEo4DPCOcb0f4oeq9Dml1D4FUJosTMTKLBShm5jc7uivhDGmddYqWSEw1Vk6aSPHEcw3w+N6PdpT0T2pyblVTig5RDBrOhIgR9brvdziA1k8kEptOpxhEk0rgTrPFgewEnWLmIUWmeOwZlVHW7Wq1Ct9s101JxL9CxEJITO6eOcw2ndHE4Di8U58agzHyhUDAp7efPnzWqM6PhCK3p+Go7od3pvsiRY+OhfSM2DFv6nFTMDx2LTR0HRqY4s75QKOibmxtoNBrQbDZRzVqcV8IJCzY4KS027BIbtRlOCo8izIPRHfY/lMtlFccxDAYD44zwXtMCMh934WIGhuL1aQrrrt4Ln6pH2k2Z9r2283BlGhxKns/n+vb2VuEzcqkThMBUPujNx9Lkn6MwoY31is4ERVpfaNZ6s9mYScYYkNmU53G90t62tPUV1+wgrgNYLBahUqnA27dvVbPZNBkQ2lOaiYUIiPrWWkifWZayTMheu0gmhMYDoZf9fg/D4VBjodmVPaS9wLQe3rZ4KVRlo2yGRJtpZOhD1YWlKI7XmnAjPD8/w3A4hHa7rW9vb9WLUsGrDWUjSFy6RhQypIsueClDww1YqVSg2Wyq1Wpl+osWi4UZM0CvAWFBTiOm0vmha4rT3F3G1PV3m7NKox4gwSwhtN60k2ltGftisTCjv6WAw9YTmDWzCV1ftOaI2QMN2tCx7HY7I0X04oA0BskU7uL3lmY7GPSgPaOCrlJNxke7d6EBuP7b7bbpA6LakOis0CZwRxTaBPpneRVCFjBvLERWDeqF2TZjlgVri6rTLGbX+20Ns66syAWjZelG5t9PFzrfaAhJHY9HeHp6gul0qnu9Htzd3al2u23on7ygGnJOPmiOO+HQ7EIq4FIGEx3AdzweoVwu44RZValUoFQq6TiOYb1em8ZAWzaKDphL2vvYcGmmldKszKXGYFt/0nelCRBczs/XA+Iax4Cw3GazgdVqBa1W6+TecOjaNV/Gdc6+GV2ceszvCzqQw+Fg6jj7/R6wkfRwOMB6vdbYHI2GGz8rQajSeqTXzOuQLqSIX5ek1cjV82u1Gtze3qrb21uzx6kdQE06Gvj77FTaLMaXtdtIFTbnZ6s/+fQEvU6IFjW3262Rmx8MBpp28EpZA4/Qs8AeaaO90JSZEyx8x7Kpe6eZ42FrtJN6CPgcIYojPz8/w3K51Pf399Dr9RRmUjxYwGyJqgP7NtYlMiR+vzFb49kpGhcKk1SrVeh0OiqOY5hMJno+nwNCKtjDQq+V1pHSrBcXpOZyFDaJoTRrx2ZIbNqAFDrKOllYgpXxvm82GxNQUpkgmnW6xi2EZv2S0ZNGmVCSgdYaNpuNIRdgb1OSJBp7z+h4esoutZ1LmuBLql3z50C/VwpgKM0doeh+v28GC+IapixJ2n/nalC1ZdyhI8WzjFl3DRXNMs6iEJpRYLH4cDjAbDbT6KltTDOJo28zyjaKdKhqNsdubQQByemcq8Id0kTpcqhSlEAjfKnZbrfbwWQyge12C8vlUr99+1ZJc4sweKBzfuiwrNCM1dbhL0VRUnGbfr8khIrCkQifFAoFaDQaUKlUVL/fh+FwqBEyotg+fjdCdz4oyzWyw7WpQuSFQhyC9N1St3poFm3bNy5o0camTJJEx3Gsoig6GV9AmzExIsf7TTMUW51IquXg86MECep4DocDbLdb2Gw2ZuT5drvVNAtC2IzCsTRjleq0rswx5N7zBmJ84YBJiUlHP1cul+Hu7k7d3NwYuSR0oiH6cucSAK7xcglRhzq3QugX4UOfzWYwmUxMkRm7rc8peEmRkA0yCe1BsuHnUrE+TT8EpVa6munSLnQJ3uOZC6V2ozN6fn6G1WplsiLKmkP2De+hugSWnCbbcAUaCLfh4D0afaM+1/v37xVCRvP5XE+nU9hsNoD9HZQZRSNQDFBs2m2cQGET5XVlOzZYQlLIcE0lldTYOQvK1vScZRwFN6oIf1YqlVeRtk2+S1pPPi1IdGZ0fg/Cruv1GrbbrV6v18YBcUKKlOlIGbjUnCvdZ9/+lZ4T72ujQVChUDDwG/3uZrMJt7e3qtfrQaFQOGHouUbTu8al+2xslsGRIcrwoajPRWpC/OLjOIbpdKpRooVucBcDy5cO8o5nTibwaaD5nJWti5kPkLKllSEb3bfgXQ/HBiHZZrrzGshoNEKDrLvdrqrVahBFkXFUHLPmOmK+JlfbaAzJidt0/DBalZpwqQOm6guUYv5C7YZ6va5arRas12s9nU5P6pJ8Dg6uT4zo0XigAaC1CFfPD4cSXffDR4SwZY+27+YwXRZqrnR/+HknSQKr1QoajcYrtWb6M92vfP/z9YR/xzW43+/NoETMbPD9mN3gcamaBgYnXJqH1pTS1IZDeudctoTva+4YcX0Vi0WIogjevHmjXtitxmm5INaQMsUl4XNf6eDc0Ry+NRoMx+XzeRiPx3o6ncJ2uzWS55L4ZdYLcMnwhER3NlUCnibzv1HIwZVicqcgyRm5dK1s/U62NF6qP/AubKUUVCoV2G638PHjRxiPx/rt27fq5ubGRGTIuqEMo2upK7ii9JA0nTPRaKFYKYWjI+B4PKp2uw3L5VJPp1NYr9ewWq1OMj+EkKmkECcbUGkWV9NpFvVsGxxmU8Dw0b59gYJvX9naCBDSGo/HWmttoF0+2I7PuxKcjqa/R2eSJMkrMgpnrOIxKJGANozyrDKEBJGWpm9TdvAFiZiN0/Mrl8uGeNBoNE5URfCe22Zqnat36MqQvhQC4itVpILj6Gjb1WoFWmuIosgUhSkMIjkE3s9hG8AmRTi2BWabVWTLIHy9HKFzZdI4SJvAqVRAtxEnJLiS/pvPRSGFWg0Aqt/vn2wSzgyinw2pvV2CrOCbFmp7dnTD4+9qtRpUq1XVbDZRAVknSQKLxeJEhBJVvnnnv5TppWk+dWnJpZ03xGHLkH6sNIGa7T20XvciNKvpd0iN5zb5HNvkVWnNo9Hm64FDz7a6M69xhUb8tvvmCjIkaI8HlwjF4fiFRqMB7XYbarXayXqmwQ86XbqmQ21RKJX/j64XhZybt1n1eDzCYrGAwWCg5/P5K+Ow3W5NXSjEcLtIDLZU2DVUzpdW82hOWnyc2GCbS2Tj6Uub1DZx1UV7TtNhLsnzF4tFUErBcDiE3W6n8/m8arVaJ0PN0PFg9CmNVv8SGZLLoNoMLqfP4qauVqtQr9eh1WqpF2kWPZ/PDaNuu92Ksj30HoZkGL7AwfY+yXD6GqldxWpXdulrh5C67WkUv1qtTo6F9QtpnboyPp8eo+1v3CDb6lPUWfuyBhfL0VfvsNW5uG4cZj/dblf1ej2o1+um3sV7fziTNYTQck6959yaTch5uWqCZ8Nx2IG8XC7N8DKacuKcC5farU/DKJQqa7vxkhPwTaIM2RS26NYWNdlmcFCatI+sYDM8LnFKhBSx2JvL5WC1WsFvv/2m3717p+r1+qvMCftDrtXQart/Nj1C6b7yz0izW7CegO8rlUpwf3+v+v0+xHEMcRzr5XIJ6/UaqGQLYvfUobnGpLsyVVcU7RtJ7iqwhxiQEKKCbf1KiIXkFCmM66pZ2ogdtllJ0uBGaW3QrEmqQ/mMnk86SRI+lsgCtH5MIcv7+3vVarWg0WhAFEWvFBdoDRd7+ujPvkzCN1/KVWsOsX2h75NYxTayDQ9yqLhxKif0QseG4XCoV6vViYwNncvua8aTKNS2aC6UQeQr6rvglrRRgSuCshUu6QOi49HTGJwQXTQqdIg/ow7YYDCA3W6n3717B81mU6FIJYfk0o54uASO7KO2S4xGm9GmRgSLxCgA22q1FPaXLBYLkyFh8ISbxDbpVdpYvsg7RMqH111s9Sib/EsadqdvUCFC7nT2DdY6sYcltBUhpL4WwvDidHI+M8c1Vdg3zoXfS7xWWuelTodClkgqyOfz0O12odfrqU6nA8ViUXQ+NjZumuzQJbdlE4ZNI3B6bUiPavGlrgm9CJTq3W5nuPCcoUL1pmwpNBbIXRvJlsmkbSS1LWSXgbAZH1/mRIurvs9TPNjnVF0ZoaTuTXslsPcA6c2oHPyiRHAihmiDkrIuyDTqzzapGp9IrTTIjrLceG0Ru9NLpRLUajXV6/Ww+VXP53PY7/eQJMnJ8+QZtg3Ks9VDXPfTBr1JhtulySYFbr4agivCtbUx8DXLo2BbQMgHzLnWiC+I9dXEqIOi0DN/nlLNmjo46nx4UzUeL4oiaLfb0G63VbvdhkqlIiqeXBtdOGd/poHLLuGgOBEllRPCniDUjaPpMV2c0jyVtNmLLTK3jQp3ZVZpVAxC0nV+A6VZNDaDQp21JMjom3Xkgxh5xokGebfbGef//PwM9XpddzodxSNxKYr+I4udrmhV0gCk7Cr6Nz7LCSnaOC6j0WioVqtlGn5Rewx7j6hKBRIb6NwXCgvZ2JehZA3K2rMZYd/vXTVPV8RNqdvUIYVci09yy0X2cGVpaeFJyQHyNU6vj49SkEZ5UNmew+EAjUYDbm5uVL1ehyiKoFwum30m2SepMdgHuacZmsiDIV7nTLMW0+hcZoXjXUrvTieEKrS4UWyMNleUZtuAtt4H3ljpaxREOEWinnI6cwi7zUeHlCAENCIh/QjSwski8EqvkWPuPMLdbrewWCxguVyagikaZqRvu0a3h8CGLkcmsaRsa8h2v6RCvkv5gR6DGhr6/3w+D1EUQbPZVJvNBpIkge12q1erFSRJAvv93mSVdB1hLYmKyEo9Vy7iiuvZS/VUV4R9zsAyPrfHZaR8sJCt3uWDh6RMLA2UK0F3Ui2Svh+fqW0MerFYhGq1CtVqVdXrdWg2m4bphqgDHULJM+YsQVyIyvXXzIZzrU+uNxjshBCGq1QqJwPr6EOwOQ0J1vAVNHnG4UvDXRfvKi67Mh8X3i/BEMiAUUqZwVmSs5W6+Xk2laYALUGbksHDYv1qtYLJZKKr1apCmRyb4cli3NI0b14SUvA1JEpRNV1zqMyNRkdrrRCiW61W+kWlAQB+b+gslUonqueoJEL7WngvDP9+/rw52cK3biUY3Ha/fVmIj55ue3/adZKG4ZVWoJPXcDiCwSfrUkdCpXNKpRKUy2V4GaugkGiAz5uLmiK0TZtVuRxSSL01VAUjjS7i1wYDuhITpxN68+aNoh6MFtx44UkiANj6hvhi5ppPLqxYelD8QbuKzK6xzDYlBkk5mS90onWlX5QlYLPZQBRFZvy5LQvKauxDHDEaWBxn3Ol0oFarGXgpTUE07aYI0abzsRh9siUhAQZfRzbmIhqiarUKjUYD9vu9QhKD1hqm06ne7XaQJAlsNpuTLIiPDKf9NZLEU5r5PC7jnLZx1iW9Y4OFXerIaZqRXb/3zYgKuWaprsP7cnDNFwoFKBaLUC6XoVqtqnK5DLVazSi6U6ICJSbwADdkDEyoHbtW4PalM5+0wYjTCeGoANvN55lOCE1VSuFp97AtmvNFZtL439DRu655NNKYACmiLRaL0Gg0IJ/Pq/V6DZ1OB6bTqV4ulyfnRLv3XbL4aeGvkM2wXC5hOp3qSqWi0EDhtfsoyWkWYdqm17RYuC0gcK0Z28hzjJ6pQ6Zq3SiBlMvloFqtKpSXGY/HervdmlECyFKk2QnNVtIMgbM5Dpd0vuveuZowfU7J5tylYCpklEiIWK4NRrM5O0mclbYvUJgOWZMvgYaq1Wonv6fDF/koC07TppJDNigSGcQ25f2shvtbyZK8ToiOyaU331c0DYVT+EKxZVquzWTbRDaYy1b4dsnsu+T3aXRFhV5vbm6g0+mo5XJpxljPZrMTKNNlOGzn7oJqbNEsbqjdbgeLxQLu7u5eUcZDDLwrAg4VgwwtTkuZNC92S0QEG8xpG9YmwcL8WJjtIA231WpBu91WuHZRfHM6nWrMnOgwMlt0byO+SBJPaZyQa69IhttHCAjRf/TJEvlqSBJK4YMU6V7njDYaWKCSQbVaVZjtIPSGxAOuIoK0Ynp8fFEoj+rr2e5BlqzC54hDnVIIm9ilXSihEb5A3waV264laKgd6m9JF5FFiyhkzohU0LY5BeocJaZKSBrvu3Gu4j0dtU3HDCuloFqtQqlUUpVKBQBAj0Yj2Gw2Rt3gGrirTRQTZ0GhysXhcLCOZD83JXct4kul+pRtaFN6poECd0RUk45qzlEtQYx2Eb6h34fGCSPoUqmksGF4vV7rOI6N1BUGWdTg0Qa+0H43G7pg002UiDmhmVeWZ+Wil7sCGAqNuzI7DrPTv6GeZaFQgCiKVLVaNfAaPj90TPSauX3hStm2GpuLjcanI7sCkJDewzSDJdM0odrIMyHIxKVG1zudEK3V0Bvp0nOy3WgJZ+ZUZ4k9FeK0XNG3DTbgAqKuDShFsvSYxWLRqklG0/9ms6nq9bp+enqCOI5P6KI+irbrennEzzcsxccxco+i6IRaHNLkZlvUkr6YrSgp3SOpfmdbCyFOyNUyYMsUpA5wrBFRR4Xni+K91GghDfzl+xXSvXH/4KgCHEOB85OQbUeb+rjKsjQd1aWEEFIfsmW9/H6j4eZEC34Pbfsc4UwqakqflUStpmuTZh0UIken8rLHVLVahUqlYjJWDJ55zZmvVUkJII023bVrLaF6cteC91wDDUOTC1dg45Xtwd6TkGKcL623QS02r2vT4OJGRoo00kjzuAr0UlREIxg+nhubJ7HBDWs/ODX0/v5eHY9H/fj4COv1+pVKcChubhM4taky4znsdjuI41jXajVF+16yRji2+SxpxF5DRmTbDCQ6Qd+0WD59lUMWdC3Ra6BFaRpFS3uBGy26TrHwDQAKj4sEh5c1ol+clFFzQAiV95XZREE5bZ3PMeJO3qdfJxX8+b30BY0cIqXwlwsiRAeCNZUXEoFC0kCpVDL/0SBLquPw8dg+XTsbkUoK+vhICx8h5poO61xl/FAykk/eKi1xIUhF2xY5SicjRdQhaaFtMdh6fFx1IV/064IzQoyslD1QZ0KLlujkttstAICReN/v9/rx8fGErGCb/CplnhLmyxchNVRUWWCxWEC73TYbXRJjtPWnSM6AXqutKc0mRmlzDhLs4sK2beSWENgilM0VMjdIgqewhkAzJaxTkGxYYcByOBxMlvTCutT0vtAMig4u5A3fPHOxwS+010W6F5LRpow/W22RDn3jk08pSkB7rsrlMhSLRYWOBhlseO8Qxqb3ks4fsjmENDBTlizjj2ayZcnWfALMvhpPKEPT5wsKaS6Q6zVJxsM3gE7KiGjkhmKcCFdI4oc22RObQJ6k9CBFrxyjlwp8PMrCDUQ3PafkUueA2m5v375Vy+VSTyYTU2ugsAZmLlTrzWbUbYKU/OHjuaLxot97iU0UGgyEbKAQhhV3aLZ6A2/eDXFKIVppvgI8hWRpg6SNbUUH+mHR/MW4KursMTvCXi8C+Wla90LnwAcbSnvZFdzRIEm6R3jeVNWd6NIpdCaUQIDZDTpA2vhLFQ1oZsNZaJSRSIMR+jy4IoJU33GRM1zG24ewhCiup3UyIXN60joknzxalr6wi9WEuLKu7aH51IZDO/FxoZXLZZjP5/D09KSRbSZ9jyTnzmEK+vAwdccemXq9rtrtNpTLZW9NJEQWxfZenmnkcjloNBpwd3dn1J1dmyQ06rKxXXhGiU4opDs9NN2W5kpJjsB2L9Po//kwbFdEF6qTl9ZgpMmk+b2mDpRq3lGIScpEBRq64rUPXO/UCfNMWvq9q6+Pj2uQxsdT+A3/TscY0GtHJ80dI1c+oc2ntkZdvuddnfqSeovtWYWsg0vUj9LOo8qyX0NsR9b6lMtp2zLmQtbNdYmbIkE9OJtouVzq2Wz2SoGAF5Gl30lRG8IOiLO/bAqNVFvpOyQF3DQGh2eNNDorlUrQ6XTUaDTSOFLBVuvJEkHZxEGRco8wji/qzxrlhDiFS64pH309BDrw3Qf+dw5/2ogXUp1CosFyuMrVO+cqANPvoJm/j0Yf0ndk+5vk4LnzkPYsjcL5+HFppD0P6njriG9khS2DlYrwNoYnL0NQONO1xr72Pp60wz7TXqONhVcIPTlXLciVIrr6PSgxgGuxrddrQ42VahB0QUv9RdKGpHWRFzkiJQ3ks2UTNkeVNiLAhsdKpQLtdhsWi4UhKfCsyRVhuUaIuxbHC4SjAUCFGHubYKp0r6VnTgvSLkFO12L2ydjYnktI0dzX32SDsUI3MGWX+SAOXANU487WAyVBh9IMJlsPEj9vLuTpcuISxGkbxcGRDul+ccVyV2Dnm13ma6b11Tq+VPZxrXqQ1MAfupYlyNomwuzr25Ro9ZkyIdvDCm2uDPGOWFjEC3uR2n8VGfGoxSfNI21UdFjlchkqlUqmiN9FUZSaKPnmRlHRYrEItVpNRVGkkbjgopj7DHRo47BrvkfW7MUXkFx6s0kNpj6o2Ma0TDv4UNqgeCwbcYO3JNim89rIFa46FEbiPDizRfY8g+NSN9yIcc00WxDC/+3quQv5O4fdXc2ULntjez8NklyGXCL6SOdi62Fykbh8Btw3QcCVjdocj2sOmvT8OLpkmxzgqpu6zr/wR3hu/kD4Io/j2Mih8B4FVwFYijb5GGd0dOVy+USa3wUz2L4z1GDy7mLaV/MyVgDiOH4VJZ6DwboG1tF+DZ/yd8j12tQIpIzEVR904eu+AWguCR8XcSCUEm9zyjYleZshlAwxN0y8lsKzGen+u9iMUrMq/Tvtv7E5Fluh3VWg5w2xEtRIR2ZI8l9STSokS/bBitKQOQkCpeQgW4AitXj49o+r/sqDkrTEAEmyyiXJxAlZNtIZd4x0AKDkwDi133Y/ClmMmw0DD5EYcR03l8uZ+S68mOpKgyUtO2lDIeyHmmBI/bTRoNPio646BYUa6aItFotQqVROpljajuGLmmwPWxo66EuRsxRKXaoJriDEZeBCAxnXxqawWKgT9MEuEqxhy2BscKGUNdv2mcsZ8Eg97bP6o6Ak397y9X6F1CVtzoHuAal+hobZJ0BKj2VTU+AEixBEwVfvTBMk8rlGXJx1u92a3kZbb6YP7pN0+3id8+xMyGaMLhG14wbGjv4kSU4wYlth0Ge06N/2+70hJuCUTQ5jcCmXEEhEinalLMg2ujyXy0EURSqfz2uJCBFCyaTOxjUThsKYtPtf2vAcqkk78ZVL5tjqRbROFIL/h9TqpImfGADg3ylL69Id5z4nksbQSg7HR8qQaiMSJGzLeEKbD0PHnbv2ShqKdIj8lm2NSHuTr0Ua1dNp0Glkv2xQ7KUlulzOld5PtKvUQdDfUWdM6e1IbZfq/xS54k5GKp/41tTF4bg0fSGSYOFutzN9DdRQuyJdWw8PPzY2DaKmFBomqWnL1nRrK/pJIqLcuaHED63H4O9oNEuvPyQa9EXznN7qKlyGOjxf3Upy6jxF59M8Q2YbhQQ9/DlyKj99Npfo3fBh4S416NCpqT44NKuIJl/7WXu9rm0zuOPK8nlbRs73hCTr42qAtcHQNkZdqJN3Cfu6YGkejEr1JbxGDMxt0LxE7uLtBDY0ijv2TE7INicoNPKzwQ/8wdObvlqtjLoAHovKpLgK4C7CAB4DobhSqeTUq3MVsy+x4ej1YPc8kjHw+2gjbAgkZeuJ4IYJIx4UML0UMcAmNssHIrrgyks0xtno7rieqSCvb7BfGqeYBSbxrS2b1h53FpRF6sssQtTvbXUvaY+5jJENfuTXIU2klbI3KVjx1cx81yipZfvqsyFU95A6owuqDvmdBLfz41HFDrzv9H5Xq9VXzwTfw0k0HFLExIHXmenkWV82WEgTOWTBzl0RO49G1+s1rFYrjUPEKJQmNaa6JOJti+KFlKAoFdZHafRFpFL/B782myGnZAVe6OSbK7Rh02aofBF7GoPrk3qXfqZj0F21PtuacRk513hpuoHowDnqHG3ZbUg9xcY6c8G050Av0v2VmHm26NvFbLpGX2DIuBWuau3KdlwjSFwOVDo/GrxRbUDa++PTQZTuJVU9oWxUW9Dho8Lbzj1k/0pOn2bQ2Ly+2WyMluF+v9fb7daQw2jC8KJWrnAkBt4zlGGi9ss1qy2VEwrBwNOI2Nm6mlH6XjJ0kvyGb8FLWPrL3HjRwWQhH/gMRJpomNZQQqK70OCAZxsIj9FU3Bc8pL0Om9QT/nu9XsNms9FCLUP5amyCI9ckw1Y2Je6X+huUSiVn9uUyrKEzqqT9w8/bxsrMkoG74DSp6dkmdeUawmfTLKRRdsj+kM7ZJcBpa8mgclwuuNO1JlFJ5Xg8wnK5hDiOT+an2ZTBOZzH6yoorVQqlaDRaJyosriyphAnEzJhgNZ+0FHQsfPb7RZWqxUkSQJJkmgUzcUmdgrx0qZjUgvSeN04JaBUKqkoiiCKIqNwTsek8JFAV6sJhRhCaTMej0eI41jjvHfKTLE1o3JJIWnh0khXKQX1et2kiK65JyHRsC2at/UI8I1sm50iwXbS30IZbrZ7RjevrV8itFDtorByjbHNZgOz2UwPBgOz4YnB0K55OD6pKADQ+He8Pnp+URRBu92GXq+nyuWyaRLmTcuSlpaN3RSyZlxd+zY4xUUUcA2PszlBDpvZDPU12XJpiDYhAU/I0EUOteHft9vtyeyowWAADw8Pms6Nos9cEoTlEDTWfAEAkiSBm5sb6PV6qlQqGS1MdNh0DIpvFAqXbpLEjulMLDrUD5vjX5AmWK/Xer1ew3K5hPV6fQLn0mdByTvc1mKWg1qGL8o2Gu91qVSCdrutOp3OyRyu1BTt0IjPJqDpqoXwyAIbVPHBS8XW0M0pbWb02LVaTeHPdAFmmRIbsmldm4QbB9oc6KtV+LI4W6SPxpkzZi5VlPdN+8RmZIw6pVEZLsjQ1ShHCR8S7RYAzPcCgL65uVFUNPRLBWJS0dflxHhGZ6vN2ZwlNSoc8nIx9lwFdn5dvgK0BG1xw2Zjaobse1uWJcF7NEtAZzEcDuH5+Vm/qJa/gjppJuGaxEyDXjpFWRokyIMCW61bCsYk9Q065RWD9yRJYDabwWKx0Ov1+lU/IrWBPvTCNmGVM4BR8Wa5XOrBYAC9Xk/1ej1DBjsrEwqFhkIIA3wjoZCnCxt1SbD4irBaa6hUKqYnx1bbCHVAthEKIfAJN6CIy/K5MTwKSSMvYmtMk5SGL1Gn4FGhpLO23+9ht9vBdDrVy+USjsfjSdOw5Mxs3emSIeNGndd68OeXkevQ7XahWq0aMVfp2fBahBQUYVQoQR/SuqDfRaEOfDY2aRub8XeJdPoCAlt3/J/xJUkluXq4oiiC4/EIo9EIPn/+rOM4hkKhYIhRfPaRqyZFgzp8hi+j4BX+zHUk6fqlkl1SPxNVIKcZj+RUV6sVLJdLWK1W+gX2NiPnuXp7iPoLDQxsjDza8Ir09t1uB9vt1sB9P/zwg+KNvUE1oXPUXG2ROffih8MB4jg20jV0XLZ0k2xz2F2bh8wqEQ1WyKyiUIgx5L7wlDqEBsofvI0oYOvqRyeXz+ehXC6/imCyBiNclYJjyJQevl6vYTKZwGazMVGYpN4g9R7RAil10K5iPYdRJIHbtM+N90/wKJgaCbw2afNJm1liEnGHfK6jSAu9ZQ1WXMSZSzkbGwTPo3QJOtda///sfWlzI0lybGQTR+EqnCT7mN2VVn9PP1qr3eaJ+z5I1vsgeJpXMDKrwOaMTM+GZmMz0w0CharMjAgPD3fZ7Xby+PiYLZdL0WQlXbHwexeptmRZJp1OR7rd7jtWqA5EFoRvrStrbeN1p9NJFosFUIZssVh4pIH7dZZhY+i+8l4JJXvscsuiyOi/QoBguVzKer2W0Wh0eSUUqxCKlAyKYBseItxutz5a6wPeyhJCh7W1KHD4NhqNnHRPSCJfVyIa8tCwAS9SkApChlE4kPQi4gMWWZUWCSzDOIwxBvGZZ+tj90dkvbyAT6eTrNfrDNYVevbA+g564VvNaet782bXn8XT4XoMwXquvDZYRkofTsDH8Xc88GjBKZwElKH1WozLsvNAZaujX+nVfHZQ+az+s3XA12o1OR6PMh6PZbFY+O+PHmWoIuA+ke7HcCX7+voqrVbLoUeke7Ds2GsFaUtbkD3RkNABblsulxm59HoigDUSoisia2BX7x+dBPEP5hr12YnvW61WZbvdyv39fZamqfvd4Dju41jlPuwK+OK4X6Ojsm78FcFwsbISs0HNZtNBHsfSfLqk/xFapEX3z2omg5ViwXvasfUS6NAKYMziifmyhKoA6wcbg69fmxHCqPDl5cXPaGHTW9CZNfWvszFWftBwAeP3+n7DrbNM1Wnd71D/QhM9LHttK7j+KhpxqeJBaN38XjYbvxqcLnk/Xdlr9icfoovFQu7u7rLD4ZBLTrXHUkyIlNcAM+parZb0+32p1Wo5eDWUQITkbixU4OXlRXa7ncxmM5lMJtlyucxJfllwW0gZQ/ep+LxhKJKTZvYi02aGHAPgfot9MZ/PZblcfqwnVGaYLbZQYqq9ICUgMFiVRmiOISZkqcvXdrst7XY7t2A+MrsRagyzrYSGbkL9DuC7h8MhY/fLmEz/R3pz+vUYjq1UKr4Je+nBVWRpoTfr8XiUyWSSjcdj3z/RbqOh+83wrM7emAHHwU8HC74e9G64KWtBTxoGQV+LDxvelHozsxpHiHp9CfOvzMT+pcEiJsj6mRXKH1FR6TEEnWBhlsU5J8vlUiaTiWw2mxz6oAVLQ7JJVqLCh3az2fQ9J4vmbRFrLLNAndSfe6oyHo8zWMCIiE+qsB7ZtobPIq2NZ83M6SqvjAW6RQrSQetMDHpnIVP5jEWlfUJ0WReStAFeuNlsstBhGNpcocxZ33Acus1m09Xr9VyQsA7TS6qhSza+RZPFZtnv97lMJsYAs4L0JZsTUASgos+G5KwmbqVS8ZArYCq2GQ/NeTB8qbW8tCq5pcphNe4rlQoIKo6zzUt6myL/M1i9Wq1kvV5nh8Mh12/rdruu1+v5QcUiTT+N9ccou0Xkk1+Fry5d6x/tFxVpx1mBusy94OTASkivrq7keDzK3d2dPDw8ZHxesYiwDmhlenr43Gq1Ku1222E2SFcKRXuZoVpGQY7Ho0ynU3l+fs5Wq5XfWyw8qmd7+D3x3Wq1mu/XcNUDGrdzzgfQkD26pV6hgyYnc+gZWT+Vz8pyYrCYJeeCf59Vsz2Hvshiu0zprvFfNOJ5QXF/wIK8Lskwrf6P1W/iBYiHi0ll/u4x0dYiDyfduNTlfaVSkSRJfMb3e8MuX758ke12K09PT9l0OpXT6SRJkpisG82ys3S4QnpWVqWt+0jAp5GlWnqBVi+RD7PT6STb7Vbm83m2XC5lt9v5zBPXDdWP29tbV6/X32XWIQWDIu03fg9dQX5kzuaPhtd+BXEoE0Ct58meS9VqVU6nkzw8PAgcjTWJwZrB0UkO1oVeu/idL1++SLfbzVm2cJXEr8drONBZzOD9fi8PDw/Z/f29nE6nHMvXqvxBRkBQxvdvNBrSarVcq9XKkWhOpxMSq2y5XHqGYAypsJCGIkKK9T6Vjxw+Rf2YkKovHxBcxmG6mF+rYa2iDDUECX358kVarZY0Gg0To/8jNhj3XvhQAykDQch6fWjwTgd3C3ayyv1arSbVavXi+aCiZ8G9O/6ePNCmBVwxxGbZGejDQWeLPN2thwq1NwpXxEhIQKXGuotluvx+YFM9Pj7K4XCQer2e8/7Jskwmk4nsdjtJkkS+fv0atDW2qtmYyjN/BsOCMbmpInO/IvM9DSfHPItCyealqvfWOo6pCejvqaFxvqfz+VweHh6y7XabCy5a8YDPH93ftPqsXH3gvInB41aggZYjr9fX11dZLpfy8PCQPTw8yOl08gk1Q2uaYMM0cwxop2nqOp2OR0KYvYlAmKape3t7yx4fH32gY/X5kOKFZTyoXx9Cbv5QUzvd0AVEwyXwpVBDSLiTVavb7bbTmT8fUr/CLNIMvtPp5KurmPcM/n06nTIWbLWEIIsooWUDCMrier3uPmLUVyZrtbL3q6srSdNUIOlBm8ydN3xmNe8hwWPdx8PhkE2nUxmPx+/mq0JU0+PxKKPRSPr9vmNBW74/OHxYcgTZ7eFwkOfn52wymfg5EGbY4XXNZhPzJtnLy4sLibxaVO8QRZdFNhmm4ez7o8+u6BkWDaDGgksZu4yYFNIlfVs+WzhgY3Zls9nI09OTLBYLr5ZgKQLw4RrL9EOJNaB/C87SFbp+/jwviN7V/f19Np/PPUyGtYxECj0XhoRx9jWbTRkOh24wGPiZPD2Eit4lEtT9fu9Wq1VmoQ9WYhZTDDfOn8vYcWW02fRrudHFcJgFeR0OB1kul9lut8vh50yD1RlqrDS0sGyUoFxd6MzFwj0/O/DqWSBmuTApI8T0CYk2hiidfA8YFjhrPL3ThirTCylShtCECyy8RqMhSZK40IH39vbmrGSAe0VMUT2vFSci2Ww2M/3udaMVmSVnqRp7h7aVJpKI/M8A4Hg8zsbjsT/ArApHKYe7sqoXsT4fV8W8Diwh2EvESEN75rOIBTEfqksCXRkh5ZiTMVQ6fv78KQ8PDxkSRevw5MFjPoOKAiXrqPV6PalWq570E7IgD0HsWLPr9Vru7u6yh4cH/97or1rvhSoqyzJJkkRGo5EMBgPX6XR8wGA2KbPbGFFI01SazabMZjOpVqvCNPMifUzNUsX1cHJ+cSX0EUy4jOcHcM71ep3LKkMQlIXzhjIKzqohWBlizYWmlEOLrkjHiw82K7MFPi0inuOv2VXaOMqq9HDIahZMqH8ES/Nms5nDki9xTr0ErrPeL+Q8Gps/4yAOZhOrC+hNacHA+NxzAHK6IrcEGvUsz2KxyKbTqW/chqzfuTLBNVpT9ww3MtU81NfkTJl7Vjz28JF9HDtULhV2vYTo89m9aB3ENfMSqgi73c6vI2tvaoizTAuA2ZDValVX++8gP13lWqjKdruVx8dHWS6XnuYM4VHNvsRnYC9cXV1Jr9eT0WjkINbMjDkkW1yZc5KcJImkaSrT6dR/J5YEiql9hxAftEWSJPlYENJZjdU8tgY6Q9Iq2ECgJgN3DP1umeuyqoKrqyuv6FrEvPkVplHI4ygEx5Gtrh8w4zKZMVpACTEigaVGzBsE958rks86IGIuj7rpbgVlDigxEgtX06giMXsW0j/T4qntdtv3BjlQ6HXHG22328l8Ps/+9a9/yeFw8NfBmzoEEXO1VGQ1EYO7rNkpqxcU6jlYM3H64P0okaFIjuujyc2lElr6OXKGv9ls5OHhIdtsNv75AX3QSViapnI8HmW1Wr1LKmLVEJr/3W5XAMXFUIyYCszhcJDxeCyPj4/Zfr/PnV/ohepxFKAq9XpdRqOR3N7eumaz+Q6NYmiaP5els87ECtfv9zMuEnSfNdbr5++J3x+NRq7dbr/fq38k00WzjKAVV1ZKhTeg1bjWVclZzdUxhTGWZRbBFbFNwA3uUH+CP5v9O2KsqbLzTHqCXw+S1et1SdPUQ1GWUsAlAafo3oSG8jQTyVKmtqoGhgxeXl5ktVrJbDbLUdtjcCgatLqPw4GfgwaqrDMMJ/C4ColX6rWpqbNaAYQ3qDWXou+VNiSzDoKiRK2M5YQFz1nPvSj5uHQPFbGqLoG++XdQUYzH41zvDJUDqqVKpSJpmkqr1TLPlZDyPa+FRqMh7XbbceDR8zbWvtVMz+VyKePxOOOkRyc2WtMQ67fX68n19bVrt9u5ZIuHRtF30lp7jDJ0u1359u2bY0JX0V62mJ343WazKYPB4B1ho1QQKrOIrLI21BfBxZ9OJ9lsNqbNssbyi3pRfFBxw7nZbEqr1coNoIUORx2UyvZEipR99QZmv5H1ei3H4/HdgYwDEI1Cnvq2XCxDjUCuuur1urTbbafFQj96MHyEjFK0eHVPRTOHeBZtt9tlq9XKs8T4d/Tvoy9Vr9ddTLEbNFkM8Y7HY7m/v88Wi0UuEGKwmPsGugpCBa6Zg5aVtNVX0lWttmfHwWlN1pdJEC5JsKx98Fms0jIeRB9JknDvZrOZ3N/fZ4CVEIT40MXYwF/+8hfXarXcdrt9V+GEyBv873a7LWma5qpOLc9TtN43m408Pj5ms9ksV4G9vb0J5tG0yRyC0GAwkN9++811Op0cBMeupxqG5rWG/g+Tibrdrm+d4LuA7q3PavwZEjBUbZ1OR75//+4qlQosHz6XHRcyHtMPjAfCcEMxYxEbVrykoYoNCf2nZrOZg1+0bL8lxXHJPI7VgMVD1B7rjFW/vb3JbrfL8ED0wRRSSogFD25cM80UQS1JkpyU+mcdJGXUNMpWTtaEuMUse3t7k/1+7wOQVc0xVFar1XyWq+nv/N+n00lqtZq8vr7KbDaTx8fHbL1e51hpHAg17InP1WQYTV3n76zZlBbVHb0Azl4BL6JpHHMbvWTY8yNGj0XEgkvWmdVLCEF+usLjHikC0Hg8zo7HY66vwmfF6+urNBoN6ff7kqapPDw85Nhp+rzgAVGsPxzyzWbT4c/xOtaS1PtAQ6vH41Genp5kOp36c4RdpTUxhXuO1WpVer2eQ9Dg4Gk9V33POXnH9TabTbm5uXGn0ykbj8e59cDjFfp8wr07V4ZyfX3t0jT1DNNPD0JanZjx2NBhflYJyLi5Xsba1tow+nNxI85uf44XXplsMFbRfYQxpCEc0NLn87mXDIlVYUUWCdYz4DkJMMK63a5nIOrXfpZSukUvt+BCXfmFvruWzcEhvNvtBNkqZ6mWJQTmgrrdrsOAqj4ImDX09vYm8/lc7u/vs+Vy6d+DewjMNAJEopMaHFS6T2H1VUNzNgh62+1WZrNZttlsPImlVqvJzc2NGw6HuWrZqsytZ8Kvt4Y8Y32mGNwaWguhQKL7xdYQKKusW/01HZDe3t5ks9nIf/3Xf2Wz2SzHgtVjGs1m07PIzlBYhkSCCQVakUHPIKGZDwhWJ4JF0ObLy4ssl0t5fn7ODoeDZ7DqBFnT+9Efur29lZubm5wrM1fqIR83/ntOcjDO0e/35erqyrVaLVmv1xnOLWtNsbV3kiTSbrddt9v1hYBF0Pm0Sqis/TAFIM+KszYoZ5rWog55C7GvO2y8dfmtKZWXStnHmER6AlpPWUMnb71eZ+v1OsdoKWKpheZJdFakGT7ValU6nY6kaepAG+UhRD4oP6siDpmvxdhTupoNWV+fDbOy3W6Xq/z0NDoTO+r1uldIsFx6uVpZrVYynU6z/X6fY7ZZ648PAu4FnpmIDlWVlg5iAUgcNnoOCHA1lBnW63XO8BGJXJZl7vb21qTGxhALSyXgkkRD7+1YMlOmH2UFJv5dy8vJ2v/1eh06hZ55CskYDnR4trVazZuu4T5bPTStLq1VGq6urqTT6Zh2GzFTQty3w+EgT09P3tOI+1baMFD/G9VGo9HIwX8hUoS1NzlJ5GqoUql4Qs92u3W9Xs8rgnC/CfOHoJHX63WPBsDZVSeVFwehGG05xuTRB4LI/8wHIZqG3j/UqA31G3gTnqUppNFo+IfIukVlhzT1oRODBDR+G7L0Ri+ISRmh7NP60QoJVs8JByM1S32wYywX11PUV7Kuy+qxWa/XGRzfC75PgB1Ap7fgB3zu8XgUQCx6UFQ/Wyio8/siW9VJzmq1kqenp2w2m3lhSN1f03JC1vOp1WpeUNIKzrrHh99DwEJWPJlMsslk4hMHvCdeu16vZbFYZLCPttZR0fq9tNINBQ4d3C04Pga3sbxNDO7WQ5JcIUEJBAKfyM4tRALKBr1ezw2HQz+Xw0FAzw/q6k6TGmq1mu95hGBq3jc4lBE0MQ/UaDRED7BraBJ7o1arybdv3xxYfRzYyoxf6IDIewKq90hm0zSVTqcjr6+vDkFIQ9EISEygYb3ID8n2xL5I0eCShTuiwYwvF7JpsDJ9S/oiZCyXJInjz9MOlloKxvouuo8Uml9BLwgB1loIqIS22202n8/9Ag8Nylols2WoFQoCgIM6nY40Gg3HLJhYEnEpdh86+KxsOfZsLfVe/Sxwz2EDj3vOVZCGyCBei94JbzaucA6Hg8xms2yxWPgEQR8eoQOYDxccLCyNZCUkyDS5p4M/X61WMplMfLXMBoTH49E3kPH/p9PJ/3/Mc+ojgruXICFl39+SaLKEL0NIAN9XRj+urq5kPB7LP//5z2w+n+fIB9zDgJ1Iv9/3VeRut5Pdbvduzk+fN0yAQhIE0g8zZPU5ox1/uW1xthfPALNykNLsT/0cASei35IkSc5cTldxZZm+OoFiHUUeGtc0dt07jdnIlwpC1gEXOyS0Zhf/P7LP7XYr2+02Y3iFsXw95GllkpYlsYbEGP8P9VeKNlvZzRvrL/H32W63Mp1OZbfb5fo2sQ2s1cJ1Fq5tDbiM73Q6CELvMjkdtHQ/pUjK3mIXFkEs1kFkscFCrD9AuavV6t090VYOmDBnS/fQUOtut5OHh4dsOp3KdrvNHTD6+cT6hazSzfpeoURLD7Tu93uZTqfZbDYTOH0yK4+p2qzJdzweBTMhRRYboUSyaLg8RkAoIu1YMj4W1KorhRgao/s1WZbJbDaTnz9/ZrPZ7N15wNBtq9WS4XAot7e30mw2Zb/fy/F4lO12m3FyGUoO9bBwu92WwWAQtX0IUZvBwpxMJj7ZAGMWQYgrdz7Dzj0bh8pJW5rgO+hB6FifPaT5phW9+azBPuFAb8mWhWbSKp/R7wlNH1uNacAILCFuLUwrAIaGQnXWUa1WfUZhmVNZgoy6YWz1gSzJDdKAy/WeLCO2zWaT4bsXqViHYC0dGC3tK1CEu92udDodBxdJCw6JqVKXaXCXzZwtm4qQ0rX1GSRlkkG1QLvwakkbCDfWajXveIoDHIFmu93KYrHwenBaNSFUeeqNxteTJIk/+CwLD86oAUWu12sZj8fZ09NTzuhPU7i5+rM8rD6T5fh7/VwyTxSrjPif4/Eoj4+PggDEUC16c7wu+v2+A7sQbF30g3iAmg9wvV/wHOv1eq7S1lWaZeeA1y2XS5nNZhk+D8GED3uuRni2qd1uS7fb9QLQqIZ0fziWOOgzjdU3GK0KCSRzPxrrtlar5ao4JkRZ11KqJ2QNZ4X6OSFpFsbz4X1uyfTEIKZQD4JvSpIk0mw2fe9Di1vGKN56gVy6QTVey1IrcELc7Xa576MZbZpVF+sL8fvwYCSyvTRNHXxBrEFJy7JcuzqGqhsdzMrCfLH5ICsI8QZ8eXmRxWLh4RWGCPR3AoW51+s5HFJaPPR8cGXPz8/Cci768LAqudCzP9OznYYgtUo8DiWYlD08PGTz+Vy2221uXkPDHJxEASq2qLihfuNHIdeYSGUMrg+dDyHBYZ2QhpQ2+PeR2GLAE0GH9x96FZVKRfr9vhsMBv56KpWKJyVod1xWtrYEO0H84R8mkOgzjpNirOf5fO4b+NjLTGjR+xfv2el0HCpuFtzVbrJW8hrSHNQD0iG/Iw5O1nA2k63YcvxiOO5SZlQsi8ED3W63GUd7zWwq05wPHWyIwq1Wy+lFyhLpZecpdCarX6sXrN4sTEaYTqcZDhh+kHp40goKlkaevldn1WbPZun1eq7T6fiS36pEyki2hOY3PiJzVMaKPMTYQj+NZ6uYUacPMvgmIdPVm/l0OslqtRJ4p+A5WRYiWtXDqsAZYgMrE5WVtkPmdTmdTmUymWSg6wNGRnXN0A9DLfgzZMdl1QVCIwBFrsUWHBZ7phbSEKtuQkQka0aMk6nT6SS73U7u7++z3W73jmbMMzj1el2ur6/d169fvd08AhZaBNx3RU+Y/YMA6eJzzlJY7/q2Fl2eERBU4U9PTxkCD0vwsIwXgotmzYGNp/dCzL+nqIdn2aGEpNs+yg/4XYJQKDBoijJop/znXDbHfEqKelXMjNPeQTozCcF8RcGpiKlnXfcZaskmk4ns9/t38vGhOSZrYNXKDnW5zYN3rLUWsruw4LBYM1HTaC1h2KL7UjYIcQXx9vYmaNTjnvGzRVMXCc55ONdpgVOGhDGZjkFG1i/kwyTm7cQJCYJfrVZ7lyTo4AFzvPv7ez8IyL0ozcCyYBNUXlo1Qa/r2GESOlhCFWqoj8Q9gpD0kCVhVERCsKotvleHw0Emk4ngOSIwawWSl5cXiHpKkiQ56Ha73XpWW5FlA6//8xC0a7Vapdc1ntnxeJTn52c5HA65SrZM2+PLly/Sbrc94mOhPaE+n/V8dA9b95+s98O6tIb/y6JYvxSEPir2yUOGZeZ0eJEWSc2AaQTDMh4S05G/yKRL31jr80PyGyyPATVczERxFYTqxYLeQnRtPZuAa4VjJAQU+/2+w0LH3/8qG+5X+gllPOpDJBA27YJKgtXP4uuArAjslTlQVCoVWa1W3hcIGTICD5hmOByKjNZ0xl2v16Ver+f6S3j2CJBXV1cymUxyigyaNq4HuK1ggaqXByv/N370MCcfiBzErcNMr2eLCMUVAlP6j8ejV7bA+ueqmHvR8NVpNps5kgfYiNzYt6wVNMSFBBLjD1y1WgGbAwDmlmazWabn3Pie6p4L+i5n8ovDjBkqulAxEINki2D3WIvkM4qV0kGojK+Q5QDJN/OsP5TpDJqxw6KSXDPhdA8AXjmsFccldUgGJkQBD11LqGph3BcCpdPpNJtOp57Tz3THMr0GPkD5eriChJr09fW1jEYjp51TQ8QLHXAZ/9W049CMiBXY+RkxTTZEPceBqmnruorWqgV6o/L1MDmFv9NqtZK7u7tsOp3611kZH0vwa9jVovJD/qXVavnKi5UW8Gf7/V7m83l2f3/vK7sydhYWVH0moLgyFealdGurCrAYVMxG5D2nBYYtOrs+ZC2Ck9XPPBuvyfPzs9zd3WXr9do0smOtMyg468B2rrAzhqytfa8p+BhO7Xa77xRA9Lwau0UjeM7n81wvqIynF6Mn+C66XxMK4hYcG4NgQzBtqAjRPSgrgf5QEPqI/XPIIfKMu/oM0epzxIKbnivgAMPqAOgHaRqwlk/RPRcNW8UesG4Y43PYl/0ME2SbzSY3N8K4rTWDEKqGNIUVVRQ2W7/fz/mH6HtW9NwstqGVlZVZK3q6/NIen1Wt7nY7ryrMzxHaa7oqASyGP6/Vap4CDVVsHqpjiKXdbudYnKGERB+u9XpdWq2WA0sIzwiV6PnwycbjsbcKsEz0rKFtTlqYdots+LPZcUU9In1IIZlkdpU14xYauYjNOLEpIfprLy8vMp1OvbisRYUWEW9t8PXrV+8syonKdrv1QspaCFc34/nvuRo5HA7v7CNiZyiS08PhIM1mM2iMqPtJ+J5QhGFEpUhGSdPZreAQ6yWVrXCKtC0/DMeFHrBlo8yZC0pNTN6CGcb+5txI0ywaqzzW0g/8YJCJ4nDiv7dulP47S+8qtDGs+R0sVgyfQQk3NrsRYhnpe41FzgcnroFl10PfJ4Z3W+KrWvbeom3z/dPDtJZYZ5lgpA9mHGjr9Tqn7mApbHADWUvqnKfSs/F47N+HG/s4WAaDgfT7fVksFrn+peW2qu8tng96EFrxeLFYZA8PD++MHPHfMakjfh64FlR7ZfuaMcanThr0D7MfY1WxXtu6d2cleEXwvmZ1rtdreXp6ekfHZoNHfG6v15Pv37/75EyLw4Kazder96nuvb69vXk9Rj0EbfXZdNK6Wq1ktVr5ZElDzLH9cXV1JbVazRvnldlXeuYp9KxCQSzU1+OADTiQA7UFMf6SbE8R+01XCPz3mHLnwGBlVFr+Rr9Gl7u8Mc5CnZ6vz46T1hfXw1RcseksSG8CPgiYXPDlyxfZ7/eyWCyyxWLxbmNYGeQlTpRMA0YFkCSJ3NzciIYaLJp17Ef30HQ/LuShwgFAb+SQOnqo8gkJcMJ7SpNZeA1oFQRsVvycFZV9ImTRZbvdrgwGA6lWq26z2WRa4NMauuOAiwCkPWbW6zVkeGSz2fjKrEhnLNQn4aFYPY90afUTO/yK9BL5mvj76HvLQUwPpTOcF5rH0VX9crmUf/3rX9lqtfKD2LoPg6q2Wq06sCEtaaDlcvkO7tbSTHwuYa9DmglQeAwJ4H0EQgrWAMuJxe671h7kfabP3LIVr67aYnv8M9Cy350dp9VdtSTHbrfLrBkB5ppb+C8HHd0P4sMf1tXIcDXOHJqPiWmfxZq9ugo6O8XKZDLJnp+fBY6I1sCbdQhY0JnelGhoApLodrvS6/Wk3W47ZPM6k7PkR2KstRCeG1JZxg9bBuugomeirPutDyd+j+126xvPbKWg6ck82Y1KZLfbyXq9zu7u7t55mfBardfrcnNzI51Ox81ms2w+n0chTYucwB5CuMZz7yK7v7+X5XIpb29vntLL9szadyYGh0FfrNVqOfzuZ/r7hJIUnZBx5cTD4agwoebANHXQ4N/e3jILwo+hFnh/SBWxSaGuOvDv+XyebbfbHOUZlSf27H6/f5cU6FkYXqvo987nc5lMJrkK3CJBvb6++gUE11bA9LyGYygF7ysmGoWsTKwKSQeqWAAMMXR19cVqFFbVpiHZi4NQmYVdNDeCRQMOv57K17psRfpoelgPDwUy4ug5IQBwdWPRDbW+l1WxWBmDHh48L6xsPp/n7HB5biHU7AwNbeo+B6tgt1ot6ff7MhgMnMXqs9hVMQyXBU1xcOigoytcZg1xNsuS7lYQK+pLaYLHcrn0gqL8PDnhwGbG99jv9zIej2WxWGSz2Uxms1nu7/naq9UqDMnc6+urH4i1sHYrODC5gokNr6+v8vz8nM3ncw8B8qbVpJnQ3rMYmLDoYDWMX+3/hHpfoT2PhAjWCfAIOxwOGaRw0C8BCsLPTtt0hM4TLZUDFhy75FommGC+6Z4ZJ3S6J8WJrYY+2cEU+51n/XQP1ILlQIBg+EqjACFFdLQ22u224+fG556u8jWiY5G9ykDmvyf7snQQKiq7OMDoMvt4POYYQ9ZciZ5Pic0S6PkLMOO4WW/d/Nh3C/kKFU2CHw4HmFFlUMdmH3s2V7MepqUaYTWkQQOFYu9oNJI0TR1oyFbTMVbphNiHaN6jkrMybUtjDmQMUGFhk8zZllYN0FmahnOQUcP8kGdD+J5YVdhkMvFkBgzx4ruwhUaWZdLr9WQwGEi9XpfZbJaNx+Ocw6qeNQrpgOG+4H3X67X8/PlTYDuhm/hYJyE9xhDigPUOurG1l0J2BLq607IyPGfDIwWYrcGQ73a7hT19djgcZLvd+gpFa0jyusPha0HUzIbU34MDPaMPll8TryX0XfR1MdlBDyhb+17LcmmYjc8e66zhqtca7bBUQvQzYqkzS4k+htiU6Tn9nj+xz/80OC60Odn/Rfv4WD2IMtPYXJnQhnQ8jcwBinsIoeDKJa5+0PohYkOcJVcyZOqaDMG9kVAlENKq42DKWk5pmnomHL4X05stQkKZhceyH7PZTObzudTr9VzGyN/fqrQOh4OkaSqNRiNrtVqOIYqiiX6LOoqME7i7VdJruJW9nNj4Th9C2NTdbldub29dr9fzDE6Gh7UApOXEC9gNa3C328liscienp78NaDiAmUbUi+o8Cx5lNAowtmew6EnweQEC0LRKgAantFUaKZcY//sdjuZz+cynU79emckgHsmWgzXUpWOJXaW9YXloGrtS8urh/+bAy32uaV4bVUHCGi6UrLYjSGxVZ7p4kq+KCnmNcKDpJbP0mec5Z/1+2Xeq3JpNAtVRyGhvHMQyj10tlawMrMiYzfeNGdath9MRLVgZZghPySr3xRiDuH6MV8wHo9lPB570T4tKGo5zIYeTgiCQYBJ01S+ffvmIAuD76sP45jvk6WjxxR1/BnorFqfDYeMtfCazWZOosY6+ENsGd5QgDPPQ53enhmwjnbTtbJY6MDx32lxyHa7LTc3N9Lr9eTq6ko2m03OD6bMmuQg/vLykm02GwdBVJBTcC2gmCdJIqPRKDepX8Ra43kS7n+ypbWVEBZRda3gBwHW0+nkNdWWy2W22Wxks9m8g84QfEKD3TEIU68HfShzf5eDkl6zqDCseTTAX1blFEN7NEyPva8DU9F+tlS1+ZmVGSLl/f3y8pJlWeas+b2PwmZlmXafWQF9CjvO+iLajwOlOtOxNSygH2rMkZD7QDjkarWa09WAbvRa0AlDBex/YR3kgNZw8I/HY9//6XQ67zyLOLCBoq4H8qzFbmVlV1dXkqap9Ho9b57F8ECROGRR1mn1xiwGYxmyxq/2JThzB+Sj+3BFJIGY9wxgk6urKxA7HJKlxWKRgb3G9946qCxxyrP1sYdlNWx5Op08tbfVarnD4ZAVjTxomjC06UBuYLi0iKZr9WCtuRg0z6fTqcxmswxQG+4tgqq+H/w+ZTJza71Ylu+6z2HZPaBa5wCpKw6mwoe+eygJ5V6e1avRv4N1xtWi3vuWUK5VpfK9ZDq6hhJjP2Xm9Yr6QL9SIcXOjcpHomWIY65vNqoFQEasPMuwFx8ORRGUbXmhxcZwhKW1pVWmLZo0mns8vcymeJVKRdbrtR+QgycQZ/wxcz7GsnWA5eCqCQCwZBiNRr7/o4dVAfGUWSwxvyBWdy4DHVokFEsCKdZj1A1Zvj+wbYhV5GVhTtBqcd/OOmJeZfz19VXm87ns9/tg5RZLzk6nkzw9Pfn1jH4aH16tVktubm5kOBy6/X7vk7OQdYZeL1inrVbL6fVi0YqtoBaCmTB/ttlscqKqqDx5XfA1a402/mzNGovNm2ligF5j3BPk9wYBSUOouBb0CxGc0EebzWZyOBwKTeP481lolK+xqA8LuB+wJpNeiqxT+Nkh0B8OB9FnapH5qFVV/W/2hn6XnpBVYoMVx4dkSIyw6ADVlQIWYafTyQlGhkrKkGyM7lNprBebaLPZyHw+z6bTqYcXQ0ZRlxxeDKHxBvzy5Ys0Gg0MT7pWq+V7G5Zcza9kI0VVTky406JafwaG/PLyIpvNRhiKCwm9Wgw2fY/QEH95eZFWqyXX19deZRwsrsPhIC8vL74Jf2k1iYNSQ4E4vHq9nn+Wj4+P2WKxMAU9reFArvwbjUZu2DsEj1ooRagntN1uvQ7bcrl8513D6457RXoPccWFQMws0ZgMDKpFJm6wGR0TF5xzvpJlaJKDMv83fidJEjlbZmQsAxW6Lk6WkiTx540FbVMi5wxDxsw5Jw8PD/45WiLLsWoFZwM0FDWt/Fd6Pr9nUCp678pnvyk/UDCbtDXsJZihxfBhTDVN05yLZdFQbchtVWd3+CyYns1mM09D5Q3B5X7s/oSkSzSEh1L+zIBznU5HdAXEFSdr78WyjVifyJKKwf0twsktlpVFM7UqFOt54NBYr9eeJKCJHWWkQXSSgXvVarXk27dvkqZpDutfLpdePyxkJxGjMDPMpWX4a7WajEYjGQwG3gVztVrlrARCfQRd+SVJIkmSmKrwsYREP3/cZzBXf/78mW02G1ksFrm+m4Z5kcWjctJutehZNRoNaDm+I6joe3hmIWYMBYKMooMcgmGn05HBYOBGo5F3JGUYTFfnLHfFfWoeQI31Z88+RPL161fXbrdzexf3C+eCNUD85csXd7adyGazWY44pVEka3/xWsXwNlQTrLaF/v6X0LFj6z1UVemBY2vu8JdVtMuoIOuKaL/fy36/N29OqDKKBSB9WJ51vhwLlpaxatCZsqa5YhgN6gfL5dLP53CWzFbLlvhiqAfFmZrGu2u1mnQ6HRmNRq7X6+XuG9SYWQ0CStkfwd+LiCccTCzPp9jnXNrcxH3DFPl2u81wz8u6thaxNL98+SLD4VAGg4ED/AqatF6nWmOwqG+jjRHxzOHu2u/3XZqmcp5D8sO3Vg/QqohA/UdPMCRrZe2VkAzVWcpIlstl9vj46O8F3p8rErZuxnoARHVWJpBmsylpmrp2uy21Ws3/g3sdG0PIssxVKhXZ7/dyd3cnT09PGSBvHgDOssxXsoPBwFcljJDw92clEOec7HY7WS6XOU8z9mrSCAX3mbvdroONN4IxMyh5n+pkgud4Xl5efGIZq4L4Xr2+vkq9Xvefs1gssjRNHZvgcQsByIo1kPqR86HMyMxH4b5PpWjryHc8HjON+VpBwdokOlBYbKRmsynQS9M3yJrcj00Do/fw8vIiq9Uqm0wmPhPXLKzQgJkVULl5yRtRkwBqtZo0m00ZDAbS7XY9xKClY3jYz2KZFR3UsUNLi3myJE6oqc3PSle81vOIHUR8GKzXa191hgRRY6KLuoqr1WoyGAxkMBg4/C6yebj9YiPjwNBCs7HgaslKIXv+7bffHNPdF4uFD4r6ALKyYQSMMz3fgbmGfodOwPhA4pEFzprP82AymUwySNcw88uCm5hcg14pXHy/f//uMDyLz2VtPE68dLAFDHdWGJflcpnxIKlmyQ0GA7m+vvYJIfeDObHQYxZXV1ee7aerMk4KNZQLGA8VKK/TskkXBG7b7babTCY5C4eQp5o+7zgpW61WHjqOqXDHDEcvIZz9nj+Vzwg4Glph4zDOKGMy30V9CX0QYV6CobhYjyFU5qK8X61Wst/vs+12K9vt1mfGfMizDwlTRGOHFB8wgAp4AcPKGYdkr9dzyO60Hps2L0M2F8rWL5XxD2U1RUZ3l3yGxQrkvhgar1Cw5mZzbH7MmjNhNYJerye3t7c5u3P8e7PZZNyA1xbFet4LB7F2TNUHymAwkOFw6HB4oee02+18r4uhG+4J8gENHbyzqsM7GFcjCpbwKQumrlYreXp6yiaTiby8vPixhpCyhxYbxuuHw6H0+30PiaE3C2ib9wZrx/GMHyqq0+kkd3d32fPzs2y3Wz+Tg4CLHtWPHz/k5ubGAU615JMsSjQ+HzI+fI7EhlXx/TEcrEcnOKEpajcgYLNcj3WvQr1wvr7NZiPr9VrSNJXdbif1et2fZSHG66Vs5xD8FiKphc6OT+0Jxd5QY/c8PR0LXrGDzfpz3uxJkjhg6pY4qlVlYVANJmnL5TLb7Xb+YODZFt6YgL3YtpkzrqJDHZkxD8uhmoMdd6vV8tmylYmW7aOFgnFMNZcPXt0QBj5vKV1w9s8VGRQXYuQGDtA4CM6zKdl6vc4dEBbcGVroHLAwR4ZgoFl5Z+jvXVZrDS/qrBoEBA6WOGharZbv6fH622w2OQkiq8qzErt6vS79ft/fEx289KEQqpR3u533uNpsNjnVBqtXypUCX8951smlaeoHb3n/a8QDVa0WI4Y9N/7RTFkEKUCRP378cBAtxX3gGSpOJHDNSCbW67XMZjO/l60ehrXXzmaRDo7NMbX7GIsT6tudTkdms9m7Wb/YuYd5M7zX6XSSx8fHbDgcejsJfpYaQSnyBIp9h5hba6wHZFVlv6tigo7aYBuF5O8t6ZfY+2opjnNpm4PLLPYP/gyCltTvyTAsyGwVy9bZajZzZsdZB/d8+CDXA3bVatX3fkA+CLnNhqDGj1AtQ1UEAmmSJPLt2zcZDoeglTprUb6+vmYhyC1NU8eUdD2UGuvlnE4nXwWFkh9LtFFrwiHQ4/BO0/TdTFWtVvMSNAxhhfoqSCJC10MHlgyHQ9fpdHwmj/WyWq2yECyrm8y8ZjqdjqRp6kAmYIpvjMTDCeJ0OpWnp6dsuVzmdNO4qgv1F7kPOhgM5Nu3b240Gr3bL5pyznASH+pgJU4mEz/2wNA0D4Y65+T6+lq+f//uUAlylYoqlteyHmw9V0Ee4bCqRl3585+DncpUbQ1HhypyhtKTJJF2uy3QE9TuvTphZPUQVE+4n/P5XJ6enuTf/u3f/DxdSBatbIVTRESIWYLEFGk+XAmFoKxQ6YUHBPVaHMAW+ydGZS4Sc+RSHWKbvAFQqZwrpOz19VU2m02OcMAbhWGyIkKDzjb1cB2CEUN3LH2Dafd2uy2dTserH1gU1qJ5lY/AbUVZzhlWcbyx+UCjWZHcG3J/wnJTjbFq+DDfbDZedFL3SkKsMQ3FcJUJyIizSNzvt7c3WSwWGVd6ofulva64z4j1mCSJDIdD+fr1q2u1Wn4tIjAul0uP5VteOtbQJD6z2+36xrQ10G3BzXzArddrGY/HfsQAjDLLBsDq3XJv5Obmxl1fX3sSCauhcIKm+2Wc1EGYdj6fZ2co3LO99PxTt9uV3377zV1fX/vkQjOy9N7Uyd9+vxf0YnRfRw/J83VXq9WcT5m+52VHEpi9NxqN3Gq1yiCqy8SC0J4GeYav8/X1VX7+/JmBpg7WH9ROGFGxZpFCbNmi/w/1vYuC0y/BcVbGZinW4r8xYa1VAkLBzZKMsDI63mCgchJtMaPAI8fjUV5fX+V4PObslZkoYMEQulrT16CzK50B4b15mhkNxS9fvni1Zp5vsqrCkIbYRwJQGaq2Hhi0pEl0tcvXrDXDtDCmpSisv9fb25vs9/uMvYM0vBbaoBYMh55MvV7PwadcpbJxXWgAWycE+L5sB1Cr1aTb7ebmj/jeIDHDQWIFMktlHYlBt9t1SLpAqNAus7oXhvc8HA5yd3eXzWazd8ytmAim3pfoq93e3kqSJD4BtNw9LXYXPmO73cpkMvFVGc8doT8EuLPb7cpf/vIXL4irFdQRbLU1PRJR3GswXPl3uTqzBEHxDJAoAkbVBBTLyNFa53jfs2miWywWmQ6CIXgQzFiGfqvVqqzXa/nHP/6R/fjxwzWbTf/sWTCa7U9iSVYo4MTGE2Liz6Fk8+IgVGbugD/wTLPMWNMsNB+iN5zOBK2ghUBzhhSy0+n0TqOMG42aTaUVAbTldmjehA9kS+LDGroFjbpSqUin05FWq+WhN6aGM6RhKeyW9Xn/lUAU0h7jJrymuOvqIBQ0Qlm/PtQx3MzzHPxsQk6ebPYFlmG325V+v+/YgVKbrB2PR4EqgIZXQjNCuBZ+btVqVUajkdzc3Lh+v/+OtIABw8Vi4VW5Y8rnuqF/lvkxLUV030YzOI/Ho8xmM//ZqABZZocPZL3m+T3RzwDJgqsNnXhoOBvfebfbyWw2y1lcsMMoP6tms+mHe7HnmSrOySJDrbwecJ9ns1lmGW6GyDJ43TkQOtY05KSHSTNlXIMBEQ+HQ4HvWIi9qte8FhPGa56enkREsu/fv7t+v+/73VqfM5bAFVUulpgsQ4VQr2E3YxC/WNHi4p5QyLo5NOuDgxWK0toJ8CPMLGuQkSXlsak0BRSv50PDqqyYcmplvHpha/aSNdyI7wtGE8plMOF0cGQWV0hP61fp82WCVsiUK6ZpprN2zkhDVWYIVjscDrLZbN4pOsdk7i345OyQ6hqNRg7qwPpE8GeLBV2d6wDBUvz8O5VKRZrNpjAkgk3I9HJNSNBKHTEiDmjZ7IGkG/JWfwpV0MPDg6c889wXB3lr7ogPndFoJKPRyNtka3NB7CNOXPiMAOPx+fk5m06nvoeBhIzXGqrY29tbl6apv++sD6eHQtlXis8C0LIxhGvpvXHgZCfmw+EgnU5HOp1OLknRNvJWpaCTdKwVqHOkaSrD4dD94x//yHj+x6ogOICxtQvLd43HY8myLHPOuTRNBXAwn42xSqeMUk3IhkYHGEaBkiR5R7z4cCVUZs4EZSCbolkW1zHqYczxU2dV2CR8iFvqCJyZWhukDOPMcn3VUBKyYvR8Wq2Wg9gkNjpfJ7IFUK1D95Uhm0tlcYpwXHwGLxSr18IbIKRiwZ/DeLy1jrhpTpTzHFzF9GAdjLUdOTQE2+22n7PC6zV7DEoY0DXUm0xPoGNj8aaGvXar1ZLBYOBAfNBePLhvx+Mxs+xBLOsCfsYIqjyzxWMQfDBi8+Owhs8Vmv66ga7JPtgnIAbgcIdHFJQCLMFUrB8W1kQP6e3tTZ6fn73s1W638z1dppDjO7ZaLbm9vXX9fj93vaBB873lv9eyV1g7s9ksN3JhJZgWm7BSqUi73ZYkSUwWZllSkCZj4dpGoxGeUY6QwYmJHqS34DBAhY+Pj7Lf77Pb21s3Go38dVtJRiiZ0wkRI0Wx8wXzSlpoGPBqLHZUyh5gRdYDuODVapVzUdVlXFHPKcR6smTidVMyFlQ03GIJd1rwkoZetMwHiynC7bLX6+XmfXQvSmPOIcqnrghiBINfrZA4SGo7CmsB6mvinhs/l5BMkrYhR6aMbFUTCKwqF7+Pkr/RaMhwOHQ4tC04k/sP6/U617dkCr9WTYYyAHoyZxag/Pbbb47JJ5jwZxx/t9vJdrvNVQ0sjaQp1xo25Gegs3/e8LgXeN/FYiHPz8+5A96iW4fWH/673W7LcDiUJEl89aj18XgN8SDter2W+XwuDw8PGYZEMWSK62LGaL/fl+Fw6OeA+CAOSTLlDrRzZYB7ul6vZbVaZbEkjOE0DZu1223HkKM23tO95dgYhGaJpmkqp9PJTafTjFX/WaUhZL2iA1Gj0YC/mWy322w2m0mapq7RaOS0NbV9REg1XyctVkuFWZO83nnoebvd5lTfP8SOiw2RWiXdfr/P+CCz2DtWgLOYZtYi0dPguBHWTIT1Z9ZgZxGeiwOIM1C8J2RJOp0OehEOKg54LTeKtZyItTBCFYnVLI/RLa3J79jAqF6MfM+YURTadNZhr827tOQ/vvt5ZutdIoGDXQcUXhOAxLrdrqRpmjMOs8y/UH2CAIHMXa8trm7R4K3VaoLZmNFo5LDBteimnpmCO6ylBKIhNG2rMJlMsi9fvjhchwWb8mwN7vt6vfbSRyG1Zb0uuJpjxXoOcCxsyoZ9UCkHJD0ej738DmjwHLxY/sY5J2mays3NjZerYlUBK7ks8igCI3G9XhcK91pJcLPZ9D2wokHpIjiLEQI+sHu9nvz222/u58+fXkqIv7Mepg1VRDxHhHu/WCwySCqhl6URCuec04iFVSm9vb1lHHw1CqJ7oGiZ1Ot1qVQqORbwh9hx1pCSvin4UAycxfoQVgZWpiLT/ZiiQU5LycEKUNawH1dOWODA+/XB12g0HHBjhm10Q1sPwIW49VYmFdMK+xX/94/a/l46oxST2DkrZudUjUNGYHwvsZHPcjzS6/Ucegc8WMzPHPd9v99ngI1ZpZtp3nhOvNGazSaqXd8DwudYQrQ4vAFJcLDQcyRWkN1sNnJ3dyeHwyHDhkaVwQcKdOpAvUZvFs10qz9nJX+aig9m2WazkW63K9wT0uxIJF2Q33l4eMgWi4V/L/hg4bnh3Gg0GnJ9fe1Go5H0ej1fTXFALUJlNLKA/gskgCzvstDax3043+9czyNEjtEOvLxnrVlHfEfnnNze3spyuZTJZJIL+mWVT7T4KT/P3W4nm83mHTGL3jtjpmGRGk5MCBqJGg/cgywRc5curIQ4e9Ulqf5vzOBoSi9HSV3eabzU6ulo6AYPOGaJHGOTWQN+7Fdi+dqDxQOmEizFm82m1Ot1b/plVRS/EiRCpX2Mm6/7d5d+9iUKFiHYVE9q62xW+9Msl0t/D3WGrmFdDIAChri+vpZOp+MajYZpIMayLTgscEAzWYEPCrZkgJDmWThTrq+vfYOekwrG8/F5+DNW9LDMBK3+I74LZKTOtOWMIToOmoPBQH78+OH0IGvMUdjqfbIhG5QGnp6estfXV9fr9bxgqX6f/X4v6/VaFouFLBaLDNAlq3Jz1YfKcjQauX6/L61WK5dVh1hV1rrWavaAI3UVZEH2lrrJWUjYMRuuDGIU2ou6cuD70Wg05D/+4z9ckiTZ/f19rrdiEVis58aq5ryOGW7mc1OfGyHiQuhc0VAer0dAruehbS8pFLr2D2vH6criPBCWoRLi7DKkmG2xoEIzO0WHYsyILVZp4AayXQJmDHgIs9freZWGdrvtINSolRasBR7rhX2UIv/RgBKaNSoKWJeonYdYeRa+fJ4Nku1266nSIbiXm80IQJ1OR7rdrgPLitck08o1BMTkGct4EIcPgh1otbe3t97bCXRrZmBa1wooQ2sRan04y1EUBz4TEXQfhg90PlAAFYcOQo1k6OoAWfnb25v885//lPv7+wzqE51Ox3EzGhJYcJVlogv3OxDYX15evLjrcDjMaTlyX01Xx6ERDz1uAIFWzAlaSIo1GI6fer0uYOaFMniLwWZBWppZqxNsKIP/+PHDvb6+ZpPJJEj91ow0JvjoGbiQ86u+Vo3aWH15/RpLnxAJzOFwkFarJf/+7//uYOQXU/qvfCQAWVUFGsuQFNGqAsx20llyDLbjSGsNzYYalPqw0z0qfcAxjIagVK/XpdVqSb1e91kR4968uYp0lT7Tt92iml/KcvwVaC2kA6d7PlZVotfO2XMqs1w4rb4YDstGo5EjgKA6Yol9ptxqe4b9fu9ZiUg09AGNZOTswur153g2RUN5rC3IlGrLtI5HCDRso0cKLM8WfDcmN/DzZW1DazbLsi7QKADbApwtBGSz2chsNstQeUJKCEoXmj6NHilgSe6FDIfDXEWqlbMtK5FQ35RJRFBIYFZpkacWj0wgwWHBViuYa5i9aE9azFN8Rrfblb///e+u2WzKdDrNYG+viRFWALS+U6gPHuvrh643NEeoxw32+730+3359u2bY/+pWBX3YT8hTReGBhv6Ijpqc5NaExZCzLkY0yR0iIbKdmveR5MaQDQA9bbZbLokSXxjGr/LlEM+eELTxCFb9Esqn9Ch/Hv0b351JikG2Vnuu5BUsjanDkDQDRwMBjnL8yLZE52hausJrb6M10OKB3NHnKho9p6uZvC6JEmccy7Tw8gW+9FKsrQeomYvWUOiZ+VnlyRJttvtTOsBPQfInjwIsDxsyKoG2+3Wj2MwkaFarQrMAdEbYPbouaJ0X79+lXa7ncvUtSApa7QVPVduep9OJ4FAK7+/RejQ+wn3ot/vO10d69/TVP5QH1P3g/TZiP/e7/dSq9Xkr3/9q3S7XXd3d5dNp9N3w/jWYLwmPIXOjVgxERvniBll8hnXarXk69evDr09TmBCyhyVSw4yfaDwxmaVBP07BiPjXUao5W9CfY2P6KhpGQ9cEwJmvV6XJEmkVqtJkiR+sJQH17jq0ZktG1bF9N4+avhWpiotez9imU8oWIUyyCL9KP16raKMAwNUaT3/xRg2DkfQ4HmSHs8GrDgewsTfsfgorBFAG9XVA/7sPAMk3759c0yRZggClgxaBYG/M5iTGgLUvVPLHoSrCotJyQGa+yEiIp1OR3q9nmBOCDM7rE5g9Xb4AOVnwvcWIsUc2BCQuTLl/d3pdOTbt29uMBjkTN3QM+DvjOxZ9331PWb4iYeQF4tFZskhWYmqbgfAMiNU+ZdVKwkpWMcqDpyhgDzPNPsMbrOAF617VHTWFMl+FflmhZJ6jFicEzavm8g6fbHz5aIgZGXyOCTAetHuoTyjYPHNrcFHC6orYseEtNYs+iVwfJjiJUniwCzCYaUHAq1MJ0Q7t7KEz3A+DTF5ftXj54+qkEIGdxY934LkWq2WdLtdGY1GXkvMWie64raysMFgIPv9XmC1zL0d6MD1+33Xbrdz18YVm7YO50DBmWm1WpW//vWvLsuy7OnpyVcMDOdpbyJ9eDLUFvIS4oQP1uG9Xs+Nx+MMRAytMGKpz1sSVnq4GNdu7QHAnAgwIB90Oh1hFQvum1kIQmhfWDJQp9PJD2c+Pz/75CDUX9brnsWP+/2+NBqNqFBp6JDW+olW4LTOMMunCuswSRI3n89ltVp5sVcr8dUEoRj6YrUnYsLRej3qwqDRaMj379/dzc1NTrg3BKNeFIRCcBnrT/FFsbMiZyk6i7MG8qzhQv35+uCygpB+LzxgqBmcB7gcBx2W72H4gLM/zV6yZqFCfY9Y4CiCy0JT2iF9s9AGjtkolIHzYj0urhSLKP5cXdbrdYEgJjubstIGi1kOh0PXaDRyfx9St9YZPIJNpVKR6+trd4ZfM8y5YD0kSeLa7ba317DmNGJ7xWJ7YrC1Xq97/yqtnM7PTVdElkYcPoOTQPyDe5Omqfz97393//3f/53N5/NcpaGDX4iEYmn3afsGzEuxCV2tVvO+SoPBQOADxOZrvN9CCWcZ3UQ8v91u543reLA8lETqXuG5cnU66Mco7h+FyUMjDMxOBEni+/fv8vr66vb7vRwOByEbmkxD0SGdTotNGCJ8WFJZgcDrsizL6vW6Gw6HnhrPZz8QipDNR+XSbDaEi7ZaLVer1bJGo+G4D8TBSh/WOvMKyUjEWHMW1dU64DGwxYN2lh6ZDohMWrDo1xYDMLRhQt46VgPRYtrE6JJlKqtf8SH6VdjBIpdApLJSqbher5ejlfLBD7YUqgdtQ24FR4sIgH4eeg+9Xk8ajYbjyp3XhtbFComy4pBC9mcdmkmSAPp1q9XKWyrwQR+iHmuoLxRkQXHmxv454IqIuFar5UVDuWriZxjqrXLQxx5iyJGVrM9EHrm9vXXtdttXP7zGrR6cdcBb2Xjo4McAcq1Wc71eL8Oa0fR4/vzzPzizMueclwvSVXSRbmFs35VhyWqIiysqpq23221pNpvy+voq//mf//nHQBkFR8Cv/HI0COmHoBulfPNub2/9xXD1olWqLan/mOROUR+FZw4sqmGRkuxHhzUvbf6Hgok+SH+FDHCJZW+savrIPQk1Mi25HS3dw0ZdloAmQ1sW5Kup2TGmJQdMTPlrwgQbIYYcZS1mVsiZFNUdAl+n03HD4dCkReugqZlmsYq4Wq0KrMQ1rPP161dJ09Td3d1lq9UKdvbvnlPou+rhWG2NgvuXJAl6UW40Gpkoh2YihlxsrcQp9IxZaudvf/ubHI9Hx7NGFpHBqAYc1iPPtfCc2Ucg9Fj/RVe4OiHV94r7Qexc/H/5p/IrB67e2BbN1poIt7yCimwUyjDkrFkdixFX1Kux+hIh9XALcipr7hRTQfi9mW6fYZT3K8GSoSQcFGyhruEZwDYxPb1Y4xWNb+53aMhMJyzabND6LnxYsDkikyJQgenr40NdB+oQEchKWNjkkWWlWOoKw7Z/+9vf3OFwkPl8Lo+PjxlgPE280SgFV4icWKLagEkjFJz5tWyDbg0waz3FEORsJVus3o5ADGiOpZR4vYUoxvxsQ0mtNq/kHnJMEDS2//TMkGZaMlypBUn/vw9CRaWnznx19WO9TxGLLWTqVsbmoexQaMjA6iMH/KXupkVipGXhtBDcd0m1UiZb+4hSsGZtcT/Qgh5447NzrqYfcxBhaIYPmdB30RWVAcm8q9Is76jYoRKqvnAQgzDAPQj9/SyTO0vWR//DeDvPuiEYsu9WtVqVm5sbSdPUwW14tVplx+PRQ1r83MB+QpUAssFZLd4lSSJQDkHAYfiTLSz4niKT10HFIgFYZCD+vozW8IAq92NZR1CzDFlNHdfJKhqh/VEE08X2oQXv8r7DfuBhZSsB+r/+4/6o+ZE/f/78+fPnz58/f/78eZcg/nkL/vz58+fPnz9//vz53/r5fwMAgESGr7WKTcsAAAAASUVORK5CYII=',
                            width: 60,
                            border: [false, false, false, false],
                            alignment: 'right'
                        },
                        {
                            alignment: 'left',
                            border: [false, false, false, false],
                            table: {
                                widths: ['100%'],
                                body: [
                                    [{ text: document.getElementById("company_name").innerHTML, border: [false, false, false, false], fontSize: 20, bold: true, alignment: 'left' }],
                                    [{ text: document.getElementById("company_address").innerHTML, border: [false, false, false, false], fontSize: 10, alignment: 'left' }],
                                    [{
                                        border: [false, false, false, false],
                                        paddingLeft: function(i, node) {
                                            return 0;
                                        },
                                        paddingRight: function(i, node) {
                                            return 0;
                                        },
                                        paddingTop: function(i, node) {
                                            return 0;
                                        },
                                        paddingBottom: function(i, node) {
                                            return 0;
                                        },
                                        margin: [0, 0, 0, 0],
                                        table: {
                                            widths: ['7%', '1%', '25%', '9%', '1%', '40%'],
                                            body: [
                                                [{
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: "Tel",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: ":",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: document.getElementById("company_tel").innerHTML,
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: "Email",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: ":",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: document.getElementById("company_email").innerHTML,
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    }
                                                ],
                                                [{
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: "Fax",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: ":",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: document.getElementById("company_fax").innerHTML,
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: document.getElementById("hot_line").innerHTML,
                                                        border: [false, false, false, false],
                                                        fontSize: 10,
                                                        bold: true,
                                                        colSpan: 3
                                                    }
                                                ]
                                            ]
                                        }
                                    }]
                                ]
                            }
                        }
                    ],
                    [{ text: '', border: [false, false, false, true], colSpan: 2 }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        table: {
                            widths: ['60%', '40%'],
                            body: [
                                [{ text: document.getElementById("customer_name").innerHTML, border: [false, false, false, false], fontSize: 11 },
                                    { text: document.getElementById("invoice_no").innerHTML, border: [false, false, false, false], fontSize: 11 }
                                ],
                                [
                                    { text: document.getElementById("address").innerHTML, border: [false, false, false, false], fontSize: 11 },
                                    {
                                        text: document.getElementById("sales_order_no").innerHTML,
                                        border: [false, false, false, false],
                                        fontSize: 11
                                    }
                                ],
                                [
                                    { text: "", border: [false, false, false, false], fontSize: 11 },
                                    {
                                        border: [false, false, false, false],
                                        table: {
                                            widths: ['40%', '60%'],
                                            body: [
                                                [
                                                    { text: document.getElementById("payment_type").innerHTML, fontSize: 11 },
                                                    { text: document.getElementById("amount").innerHTML, fontSize: 11 }
                                                ],
                                                [
                                                    { text: "Invoice Date", fontSize: 11 },
                                                    { text: document.getElementById("invoice_date").innerHTML, fontSize: 11 }
                                                ]
                                            ]
                                        }
                                    }
                                ]

                            ]
                        }
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        table: {
                            widths: ['10%', '50%', '10%', '10%', '10%', '10%'],
                            body: tableToJSON(table)
                        }
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        text: "Payment Details",
                        bold: true,
                        fontSize: 12
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        table: {
                            widths: ['15%', '30%'],
                            body: tableToJSON("payment_details")
                        }
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        text: (document.getElementById("chequ_favour") == null ? "" : document.getElementById("chequ_favour").innerHTML),
                        fontSize: 10,
                        italics: true,
                        margin: [0, 0, 0, 70]
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        table: {
                            widths: ['25%', '5%', '25%', '5%', '25%'],
                            body: [
                                [
                                    { text: "Issued By", fontSize: 11, alignment: 'center', border: [false, true, false, false] },
                                    { text: "", fontSize: 11, textAlign: 'center', border: [false, false, false, false] },
                                    { text: "Checked By", fontSize: 11, alignment: 'center', border: [false, true, false, false] },
                                    { text: "", fontSize: 11, textAlign: 'center', border: [false, false, false, false] },
                                    { text: "Received By", fontSize: 11, alignment: 'center', border: [false, true, false, false] }
                                ]
                            ]
                        }
                    }]
                ]
            }
        }]
    };
    //pdfMake.createPdf(docDefinition).open();

    // print the PDF
    //pdfMake.createPdf(docDefinition).print();

    // download the PDF
    pdfMake.createPdf(docDefinition).open();
}

function exportInvoiceToPDF(table) {

    var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [10, 15, 10, 10],
        content: [{
            table: {
                widths: ['25%', '75%'],
                body: [
                    [{
                            image: 'data:image/png;base64,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',
                            width: 60,
                            border: [false, false, false, false],
                            alignment: 'right'
                        },
                        {
                            alignment: 'left',
                            border: [false, false, false, false],
                            table: {
                                widths: ['100%'],
                                body: [
                                    [{ text: document.getElementById("company_name").innerHTML, border: [false, false, false, false], fontSize: 20, bold: true, alignment: 'left' }],
                                    [{ text: document.getElementById("company_address").innerHTML, border: [false, false, false, false], fontSize: 10, alignment: 'left' }],
                                    [{
                                        border: [false, false, false, false],
                                        paddingLeft: function(i, node) {
                                            return 0;
                                        },
                                        paddingRight: function(i, node) {
                                            return 0;
                                        },
                                        paddingTop: function(i, node) {
                                            return 0;
                                        },
                                        paddingBottom: function(i, node) {
                                            return 0;
                                        },
                                        margin: [0, 0, 0, 0],
                                        table: {
                                            widths: ['7%', '1%', '25%', '9%', '1%', '40%'],
                                            body: [
                                                [{
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: "Tel",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: ":",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: document.getElementById("company_tel").innerHTML,
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: "Email",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: ":",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: document.getElementById("company_email").innerHTML,
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    }
                                                ],
                                                [{
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: "Fax",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: ":",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: document.getElementById("company_fax").innerHTML,
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: document.getElementById("hot_line").innerHTML,
                                                        border: [false, false, false, false],
                                                        fontSize: 10,
                                                        bold: true,
                                                        colSpan: 3
                                                    }
                                                ]
                                            ]
                                        }
                                    }]
                                ]
                            }
                        }
                    ],
                    [{ text: '', border: [false, false, false, true], colSpan: 2 }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        table: {
                            widths: ['60%', '40%'],
                            body: [
                                [{ text: document.getElementById("customer_name").innerHTML, border: [false, false, false, false], fontSize: 11 }, { text: document.getElementById("invoice_no").innerHTML, border: [false, false, false, false], fontSize: 11 }],
                                [
                                    { text: document.getElementById("address").innerHTML, border: [false, false, false, false], fontSize: 11 },
                                    {
                                        border: [false, false, false, false],
                                        table: {
                                            widths: ['40%', '60%'],
                                            body: [
                                                [
                                                    { text: document.getElementById("payment_type").innerHTML, fontSize: 11 },
                                                    { text: document.getElementById("amount").innerHTML, fontSize: 11 }
                                                ],
                                                [
                                                    { text: "Invoice Date", fontSize: 11 },
                                                    { text: document.getElementById("invoice_date").innerHTML, fontSize: 11 }
                                                ]
                                            ]
                                        }
                                    }
                                ]
                            ]
                        }
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        table: {
                            widths: ['10%', '50%', '10%', '10%', '10%', '10%'],
                            body: tableToJSON(table)
                        }
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        text: "Payment Details",
                        bold: true,
                        fontSize: 12
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        table: {
                            widths: ['15%', '30%'],
                            body: tableToJSON("payment_details")
                        }
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        text: (document.getElementById("chequ_favour") == null ? "" : document.getElementById("chequ_favour").innerHTML),
                        fontSize: 10,
                        italics: true,
                        margin: [0, 0, 0, 70]
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        table: {
                            widths: ['25%', '5%', '25%', '5%', '25%'],
                            body: [
                                [
                                    { text: "Issued By", fontSize: 11, alignment: 'center', border: [false, true, false, false] },
                                    { text: "", fontSize: 11, textAlign: 'center', border: [false, false, false, false] },
                                    { text: "Checked By", fontSize: 11, alignment: 'center', border: [false, true, false, false] },
                                    { text: "", fontSize: 11, textAlign: 'center', border: [false, false, false, false] },
                                    { text: "Received By", fontSize: 11, alignment: 'center', border: [false, true, false, false] }
                                ]
                            ]
                        }
                    }]
                ]
            }
        }]
    };
    //pdfMake.createPdf(docDefinition).open();

    // print the PDF
    //pdfMake.createPdf(docDefinition).print();

    // download the PDF
    pdfMake.createPdf(docDefinition).open();
}

function exportGRNToPDF(table) {
    var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [10, 15, 10, 10],
        content: [{
            table: {
                widths: ['25%', '75%'],
                body: [
                    [{
                            image: 'data:image/png;base64,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',
                            width: 60,
                            border: [false, false, false, false],
                            alignment: 'right'
                        },
                        {
                            alignment: 'left',
                            border: [false, false, false, false],
                            table: {
                                widths: ['100%'],
                                body: [
                                    [{ text: document.getElementById("company_name").innerHTML, border: [false, false, false, false], fontSize: 20, bold: true, alignment: 'left' }],
                                    [{ text: document.getElementById("company_address").innerHTML, border: [false, false, false, false], fontSize: 10, alignment: 'left' }],
                                    [{
                                        border: [false, false, false, false],
                                        paddingLeft: function(i, node) {
                                            return 0;
                                        },
                                        paddingRight: function(i, node) {
                                            return 0;
                                        },
                                        paddingTop: function(i, node) {
                                            return 0;
                                        },
                                        paddingBottom: function(i, node) {
                                            return 0;
                                        },
                                        margin: [0, 0, 0, 0],
                                        table: {
                                            widths: ['7%', '1%', '25%', '9%', '1%', '40%'],
                                            body: [
                                                [{
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: "Tel",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: ":",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: document.getElementById("company_tel").innerHTML,
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: "Email",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: ":",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: document.getElementById("company_email").innerHTML,
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    }
                                                ],
                                                [{
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: "Fax",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: ":",
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: document.getElementById("company_fax").innerHTML,
                                                        border: [false, false, false, false],
                                                        fontSize: 10
                                                    },
                                                    {
                                                        margin: [0, 0, 0, 0],
                                                        paddingLeft: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingRight: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingTop: function(i, node) {
                                                            return 0;
                                                        },
                                                        paddingBottom: function(i, node) {
                                                            return 0;
                                                        },
                                                        text: document.getElementById("hot_line").innerHTML,
                                                        border: [false, false, false, false],
                                                        fontSize: 10,
                                                        bold: true,
                                                        colSpan: 3
                                                    }
                                                ]
                                            ]
                                        }
                                    }]
                                ]
                            }
                        }
                    ],
                    [{ text: '', border: [false, false, false, true], colSpan: 2 }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        table: {
                            widths: ['60%', '40%'],
                            body: [
                                [{ text: document.getElementById("supplier_name").innerHTML, border: [false, false, false, false], fontSize: 11 }, { text: document.getElementById("grn_no").innerHTML, border: [false, false, false, false], fontSize: 11 }],
                                [
                                    { text: document.getElementById("address").innerHTML, border: [false, false, false, false], fontSize: 11 },
                                    {
                                        border: [false, false, false, false],
                                        table: {
                                            widths: ['40%', '60%'],
                                            body: [
                                                [
                                                    { text: document.getElementById("payment_type").innerHTML, fontSize: 11 },
                                                    { text: document.getElementById("amount").innerHTML, fontSize: 11 }
                                                ],
                                                [
                                                    { text: "GRN Date", fontSize: 11 },
                                                    { text: document.getElementById("grn_date").innerHTML, fontSize: 11 }
                                                ]
                                            ]
                                        }
                                    }
                                ]
                            ]
                        }
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        table: {
                            widths: ['50%', '10%', '10%', '10%', '10%', '10%'],
                            body: tableToJSON(table)
                        }
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        text: "Payment Details",
                        bold: true,
                        fontSize: 12
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        table: {
                            widths: ['15%', '30%'],
                            body: tableToJSON("payment_details")
                        }
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        text: (document.getElementById("chequ_favour") == null ? "" : document.getElementById("chequ_favour").innerHTML),
                        fontSize: 10,
                        italics: true,
                        margin: [0, 0, 0, 70]
                    }],
                    [{
                        colSpan: 2,
                        border: [false, false, false, false],
                        table: {
                            widths: ['25%', '5%', '25%', '5%', '25%'],
                            body: [
                                [
                                    { text: "Issued By", fontSize: 11, alignment: 'center', border: [false, true, false, false] },
                                    { text: "", fontSize: 11, textAlign: 'center', border: [false, false, false, false] },
                                    { text: "Checked By", fontSize: 11, alignment: 'center', border: [false, true, false, false] },
                                    { text: "", fontSize: 11, textAlign: 'center', border: [false, false, false, false] },
                                    { text: "Received By", fontSize: 11, alignment: 'center', border: [false, true, false, false] }
                                ]
                            ]
                        }
                    }]
                ]
            }
        }]
    };
    //pdfMake.createPdf(docDefinition).open();

    // print the PDF
    //pdfMake.createPdf(docDefinition).print();

    // download the PDF
    pdfMake.createPdf(docDefinition).open();
}

//for reciving paymnet for credit sales  

$(document).ready(function() {

    $('.recvpay').click(function() {
        //     var el = this;
        var id = this.id;

        $.ajax({
            url: 'a_get_invoice_details_to_model.php',
            type: 'POST',
            data: { id: id },
            success: function(response) {
                var obj = JSON.parse(response);
                var invoiceNumberField = document.getElementById("invoice_no_m");
                var totalAmountField = document.getElementById("total_amount_m");
                var invIdField = document.getElementById("inv_id_m");
                var paidAmountField = document.getElementById("paid_amount_m");
                var dueBalanceField = document.getElementById("due_amount_m");
                var paymentTypeField = document.getElementById("payment_type_m");
                var paymentField = document.getElementById("payment_m");
                var chequeNumberField = document.getElementById("chq_number_m");
                var chequeDateField = document.getElementById("chq_date_m");
                var bankField = document.getElementById("bank_m");
                var chequeAmountField = document.getElementById("amount_m");

                //         echo number_format(obj[0].totalvalue, 2, '.', ',')-->
                invIdField.value = obj[0].invid;
                invoiceNumberField.innerHTML = obj[0].invoiceno;
                totalAmountField.value = obj[0].totalvalue;
                dueBalanceField.value = obj[0].duebalance;
                paidAmountField.value = obj[0].paidamount;
                paymentField.placeholder = "0.00";

                totalAmountField.disabled = "true";
                dueBalanceField.disabled = "true";
                paidAmountField.disabled = "true";


                $('#paymentModel').modal('show');


                $('#payment_type_m').change(function() {

                    var paymentTypeField = document.getElementById("payment_type_m");
                    if (paymentTypeField.value === 'CH') {
                        paymentField.disabled = true;
                        paymentField.value = 0;

                        document.getElementById("amount_m").placeholder = "0.00";
                        $('#checkdetails').show();


                        var banks = [
                            "Axis Bank Ltd.", "Bank of Ceylon", "Cargills Bank Ltd.", "Citibank N.A.", "Commercial Bank of Ceylon PLC", "Deutsche Bank AG",
                            "DFCC Vardhana Bank PLC", "Habib Bank Ltd.", "Hatton National Bank PLC", "ICICI Bank Ltd.", "Indian Bank", "Indian Overseas Bank",
                            "MCB Bank Ltd.", "National Development Bank PLC", "Nations Trust Bank PLC", "Pan Asia Banking Corporation PLC", "Peoples Bank",
                            "Sampath Bank PLC", "Seylan Bank PLC", "Standard Chartered Bank", "State Bank of India",
                            "The Hongkong and Shanghai Banking Corporation Ltd.", "Union Bank of Colombo PLC"
                        ];
                        bankField.innerHTML += "<option value=''>" + '-select-' + "</option>";
                        for (i = 0; i < banks.length; i++) {
                            bankField.innerHTML += "<option value='" + banks[i] + "'>" + banks[i] + "</option>";
                        }
                    } else {
                        chequeNumberField.value = "";
                        chequeDateField.value = "";
                        bankField.value = "";
                        chequeAmountField.value = "";
                        paymentField.value = "";
                        $('#checkdetails').hide();

                        paymentField.disabled = false;
                        paymentField.placeholder = "0.00";

                    }
                });

                $('#amount_m').keyup(function() {
                    var chequeAmountField = document.getElementById("amount_m");
                    var paymentField = document.getElementById("payment_m");
                    paymentField.value = chequeAmountField.value;

                });


            }
        });
    });

});

$(document).ready(function() {

    $('#btnpay_m').click(function() {

        if (checkPaymentModelFields()) {
            var invId = document.getElementById("inv_id_m").value;
            var totalAmount = document.getElementById("total_amount_m").value;
            var paidAmount = document.getElementById("paid_amount_m").value;
            var dueBalance = document.getElementById("due_amount_m").value;
            var paymentType = document.getElementById("payment_type_m").value;
            var payment = document.getElementById("payment_m").value;
            var chequeNumber = document.getElementById("chq_number_m").value;
            var chequeDate = document.getElementById("chq_date_m").value;
            var bank = document.getElementById("bank_m").value;
            var chequeAmount = document.getElementById("amount_m").value;

            $.ajax({
                type: "POST",
                url: 'a_get_update_relavent_receivable_payment_fields.php',
                data: {
                    id: invId,
                    totalAmount: totalAmount,
                    paidAmount: paidAmount,
                    dueBalance: dueBalance,
                    paymentType: paymentType,
                    payment: payment,
                    chequeNumber: chequeNumber,
                    chequeDate: chequeDate,
                    bank: bank,
                    chequeAmount: chequeAmount
                },
                success: function(response) {
                    $('#paymentModel').modal('toggle');
                    location.reload();

                }
            });
        }

    });
});

function checkPaymentModelFields() {
    var totalAmountField = document.getElementById("total_amount_m");
    var invIdField = document.getElementById("inv_id_m");
    var paidAmountField = document.getElementById("paid_amount_m");
    var dueBalanceField = document.getElementById("due_amount_m");
    var paymentTypeField = document.getElementById("payment_type_m");
    var paymentField = document.getElementById("payment_m");
    var chqNoField = document.getElementById("chq_number_m");
    var chqDateField = document.getElementById("chq_date_m");
    var bankField = document.getElementById("bank_m");
    var amountField = document.getElementById("amount_m");
    var dueBalanceValue;
    var paymentFieldValue;
    var amountFieldValue;

    var errorAlert = document.getElementById("payment_modal_error_msg");
    var x = 1;
    if (paymentTypeField.value === "") {
        paymentTypeField.style.border = "1px solid #ed5565";
        paymentTypeField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "select Payment Type";
        x = 0;
        return false;
    } else {
        paymentTypeField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    if (paymentField.value === "") {
        paymentField.style.border = "1px solid #ed5565";
        paymentField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "enter payment amount";
        return false;
    } else {
        paymentField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    if (!$.isNumeric(paymentField.value)) {
        paymentField.style.border = "1px solid #ed5565";
        paymentField.value = "";
        paymentField.focus();
        if (paymentTypeField.value === "CH") {
            paymentField.style.border = "1px solid #ed5565";
            paymentField.focus();
        }
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "enter valid amount";
        return false;
    } else {
        paymentField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    dueBalanceValue = parseInt(dueBalanceField.value);
    paymentFieldValue = parseInt(paymentField.value);

    if (paymentFieldValue > dueBalanceValue) {
        paymentField.style.border = "1px solid #ed5565";
        paymentField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Payment canot be more than due. plese reduce the amount from next invoice";
        return false;
    } else {
        paymentField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }



    if (paymentTypeField.value === "CH") {

        if (chqNoField.value === "") {
            chqNoField.style.border = "1px solid #ed5565";
            chqNoField.focus();

            errorAlert.style.display = "block";
            errorAlert.children[1].innerHTML = "Enter a Cheque Number";

            return false;
        } else {
            chqNoField.style.border = "1px solid #ccc";

            errorAlert.style.display = "none";
            errorAlert.children[1].innerHTML = "";
        }

        if (!$.isNumeric(chqNoField.value)) {
            chqNoField.style.border = "1px solid #ed5565";
            chqNoField.value = "";
            chqNoField.focus();

            errorAlert.style.display = "block";
            errorAlert.children[1].innerHTML = "enter valid cheque number";
            return false;
        } else {
            chqNoField.style.border = "1px solid #ccc";

            errorAlert.style.display = "none";
            errorAlert.children[1].innerHTML = "";
        }

        if (chqDateField.value === "") {
            chqDateField.style.border = "1px solid #ed5565";
            chqDateField.focus();

            errorAlert.style.display = "block";
            errorAlert.children[1].innerHTML = "Select a Cheque Date";

            return false;
        } else {
            chqDateField.style.border = "1px solid #ccc";

            errorAlert.style.display = "none";
            errorAlert.children[1].innerHTML = "";
        }

        if (bankField.value === "") {
            bankField.style.border = "1px solid #ed5565";
            bankField.focus();

            errorAlert.style.display = "block";
            errorAlert.children[1].innerHTML = "Select a Bank";

            return false;
        } else {
            bankField.style.border = "1px solid #ccc";

            errorAlert.style.display = "none";
            errorAlert.children[1].innerHTML = "";
        }

        if (amountField.value === "") {
            amountField.style.border = "1px solid #ed5565";
            amountField.focus();

            errorAlert.style.display = "block";
            errorAlert.children[1].innerHTML = "enter valid amount";

            return false;
        } else {
            amountField.style.border = "1px solid #ccc";

            errorAlert.style.display = "none";
            errorAlert.children[1].innerHTML = "";
        }

        if (!$.isNumeric(amountField.value)) {
            amountField.style.border = "1px solid #ed5565";
            amountField.value = "";
            amountField.focus();

            errorAlert.style.display = "block";
            errorAlert.children[1].innerHTML = "enter valid amount";
            return false;
        } else {
            amountField.style.border = "1px solid #ccc";

            errorAlert.style.display = "none";
            errorAlert.children[1].innerHTML = "";
        }




    }

    if (errorAlert.children[1].innerHTML == "") {
        return true;
    }
}

function addNewRow() {
    var tbody = document.getElementById("invoice_details_tbody");

    var itemIdField = document.getElementById("item_id");
    var itemNameField = document.getElementById("line_item_name");
    var quantityField = document.getElementById("qty");
    var availabelQtyFieled = document.getElementById("available_qty");
    var unitPriceField = document.getElementById("unit_price");
    var netAmountField = document.getElementById("line_net_amount");
    var grossAmountField = document.getElementById("line_gross_amount");
    var discountField = document.getElementById("discount");

    var errorAlert = document.getElementById("item_error_msg");

    if (itemIdField.value === "") {
        itemNameField.style.border = "1px solid #ed5565";
        itemNameField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select an item";

        return false;
    } else {
        itemNameField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (unitPriceField.value === "") {
        unitPriceField.style.border = "1px solid #ed5565";
        unitPriceField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Enter Unit Price";

        return false;
    } else {
        unitPriceField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (quantityField.value === "") {
        quantityField.style.border = "1px solid #ed5565";
        quantityField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Enter Quantity";

        return false;
    } else {
        var quantity = parseFloat(quantityField.value === "" ? "0" : quantityField.value);
        var avbQuantity = parseFloat(availabelQtyFieled.value === "" ? "0" : availabelQtyFieled.value);

        if (quantity > avbQuantity) {
            quantityField.style.border = "1px solid #ed5565";
            quantityField.focus();

            errorAlert.style.display = "block";
            errorAlert.children[1].innerHTML = "Quantity cannot be Greater Than Available Quantity";

            return false;
        } else {
            itemNameField.style.border = "1px solid #ccc";

            errorAlert.style.display = "none";
            errorAlert.children[1].innerHTML = "";
        }
    }

    var rowCount = tbody.rows.length;
    var newRow = tbody.insertRow();

    var itemIdFieldNew = document.createElement("INPUT");
    itemIdFieldNew.setAttribute("type", "hidden");
    itemIdFieldNew.setAttribute("value", itemIdField.value);
    itemIdFieldNew.setAttribute("readOnly", true);
    itemIdFieldNew.setAttribute("class", "hdnfield");
    itemIdFieldNew.setAttribute("name", "Item_Id" + rowCount);

    //    var ItemIdCell = newRow.insertCell();
    //    ItemIdCell.appendChild(itemIdFieldNew);


    var itemNameFielddNew = document.createElement("INPUT");
    itemNameFielddNew.setAttribute("type", "text");
    itemNameFielddNew.setAttribute("value", itemNameField.value);
    itemNameFielddNew.setAttribute("readOnly", true);
    itemNameFielddNew.setAttribute("class", "hdnfield");
    itemNameFielddNew.setAttribute("name", "Item_Name" + rowCount);

    var ItemNameCell = newRow.insertCell();
    ItemNameCell.appendChild(itemNameFielddNew);
    ItemNameCell.appendChild(itemIdFieldNew);

    var quantityFieldNew = document.createElement("INPUT");
    quantityFieldNew.setAttribute("type", "text");
    quantityFieldNew.setAttribute("value", quantityField.value);
    quantityFieldNew.setAttribute("readOnly", true);
    quantityFieldNew.setAttribute("class", "hdnfield");
    quantityFieldNew.setAttribute("name", "Quantity" + rowCount);

    var quantityCell = newRow.insertCell();
    quantityCell.appendChild(quantityFieldNew);

    var unitPriceFieldNew = document.createElement("INPUT");
    unitPriceFieldNew.setAttribute("type", "text");
    unitPriceFieldNew.setAttribute("value", unitPriceField.value);
    unitPriceFieldNew.setAttribute("readOnly", true);
    unitPriceFieldNew.setAttribute("class", "hdnfield");
    unitPriceFieldNew.setAttribute("name", "Unit_Price" + rowCount);

    var unitPriceCell = newRow.insertCell();
    unitPriceCell.appendChild(unitPriceFieldNew);

    var grossAmountFieldNew = document.createElement("INPUT");
    grossAmountFieldNew.setAttribute("type", "text");
    grossAmountFieldNew.setAttribute("value", grossAmountField.value);
    grossAmountFieldNew.setAttribute("readOnly", true);
    grossAmountFieldNew.setAttribute("class", "hdnfield");
    grossAmountFieldNew.setAttribute("name", "Gross_Amount" + rowCount);

    var grossAmountCell = newRow.insertCell();
    grossAmountCell.appendChild(grossAmountFieldNew);

    var discountFieldNew = document.createElement("INPUT");
    discountFieldNew.setAttribute("type", "text");
    discountFieldNew.setAttribute("value", discountField.value);
    discountFieldNew.setAttribute("readOnly", true);
    discountFieldNew.setAttribute("class", "hdnfield");
    discountFieldNew.setAttribute("name", "Discount" + rowCount);

    var discountCell = newRow.insertCell();
    discountCell.appendChild(discountFieldNew);

    var netAmountFieldNew = document.createElement("INPUT");
    netAmountFieldNew.setAttribute("type", "text");
    netAmountFieldNew.setAttribute("value", netAmountField.value);
    netAmountFieldNew.setAttribute("readOnly", true);
    netAmountFieldNew.setAttribute("class", "hdnfield");
    netAmountFieldNew.setAttribute("name", "Net_Amount" + rowCount);
    netAmountFieldNew.setAttribute("id", "Net_Amount" + rowCount);

    var netAmountCell = newRow.insertCell();
    netAmountCell.appendChild(netAmountFieldNew);

    var rowCountField = document.getElementById("row_count");
    rowCountField.value = rowCount;

    var totalGrossAmountField = document.getElementById("gross_amount");
    var totalDiscountField = document.getElementById("total_discount");
    var totalNetAmountField = document.getElementById("net_amount");
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");

    var i;
    var grossAmount = 0;

    for (i = 0; i <= rowCountField.value; i++) {

        var amount = document.getElementById("Net_Amount" + i);
        var lineNetAmount = parseFloat((amount.value === "" ? "0" : amount.value));
        //console.log(x);
        grossAmount += lineNetAmount;

    }

    var totalDiscount = parseFloat((totalDiscountField.value === "" ? "0" : totalDiscountField.value));
    var netAmount = (grossAmount - (grossAmount * totalDiscount) / 100);
    var payment = parseFloat((paymentField.value === "" ? "0" : paymentField.value));
    var balance = netAmount - payment;

    totalGrossAmountField.value = grossAmount.toFixed(2);
    totalNetAmountField.value = netAmount.toFixed(2);
    balanceField.value = balance.toFixed(2);

    clearInvoiceDetailFields();
}

function changeFinalValueFields() {
    var tbody = document.getElementById("invoice_details_tbody");
    var rowCount = tbody.rows.length;

    var totalGrossAmountField = document.getElementById("gross_amount");
    var totalDiscountField = document.getElementById("total_discount");
    var totalNetAmountField = document.getElementById("net_amount");
    var paymentField = document.getElementById("payment");
    var balanceField = document.getElementById("balance");

    var i;
    var grossAmount = 0;

    for (i = 0; i < rowCount; i++) {

        var amount = document.getElementById("Net_Amount" + i);

        var lineNetAmount = parseFloat((amount.value === "" ? "0" : amount.value));
        grossAmount += lineNetAmount;
    }


    totalGrossAmountField.value = grossAmount;
    totalDiscountField.value = 0;
    totalNetAmountField.value = totalGrossAmountField.value;
    paymentField.value = "0.00";
    balanceField.value = totalNetAmountField.value;
}


function validateExpence() {

    var expenceTypeField = document.getElementById("expence_type");
    var descriptionField = document.getElementById("description");
    var amountField = document.getElementById("amount");
    var dateField = document.getElementById("dated");
    var customerField = document.getElementById("customer");

    var errorAlert = document.getElementById("item_error_msg");


    if (expenceTypeField.value === "") {
        expenceTypeField.style.border = "1px solid #ed5565";
        expenceTypeField.focus();
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Select Expence Type";

        return false;
    } else {
        expenceTypeField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (descriptionField.value === "") {
        descriptionField.style.border = "1px solid #ed5565";
        descriptionField.focus();
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Enter a Description";

        return false;
    } else {
        descriptionField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (amountField.value === "") {
        amountField.style.border = "1px solid #ed5565";
        amountField.focus();
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Enter Amount";

        return false;
    } else {
        amountField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    return true;
}