function validateQuantity() {
    var availableQtyField = document.getElementById("available_qty");
    var orderQuantityField = document.getElementById("qty");

    var availableQty = parseFloat((availableQtyField.value === "" ? "0" : availableQtyField.value));

    var orderQty = parseFloat((orderQuantityField.value === "" ? "0" : orderQuantityField.value));

    var errorAlert = document.getElementById("item_error_msg");

    if (availableQty < orderQty) {
        orderQuantityField.style.border = "1px solid #ed5565";
        orderQuantityField.focus();
        orderQuantityField.value = "";

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Quantity cannot be Greater Than Available Quantity";

        return false;
    } else {
        orderQuantityField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    return true;
}

function calculateSalesOrderNetAmount() {
    var quantityField = document.getElementById("qty");
    var unitAmountField = document.getElementById("unit_price");
    var discountField = document.getElementById("discount");

    var quantity = parseFloat((quantityField.value === "" ? "0" : quantityField.value));
    var unitAmount = parseFloat((unitAmountField.value === "" ? "0" : unitAmountField.value));
    var discountRate = parseFloat((discountField.value === "" ? "0" : discountField.value));


    var grossAmount = quantity * unitAmount;
    var discount = ((grossAmount * discountRate) / 100);
    var netAmount = grossAmount - discount;

    document.getElementById("line_net_amount").value = netAmount.toFixed(2);
}

function addSalesOrderRow() {
    var tbody = document.getElementById("sale_order_tbody");

    var itemNameField = document.getElementById("line_item_name");
    var itemIdField = document.getElementById("item_id");
    var quantityField = document.getElementById("qty");
    var unitAmountField = document.getElementById("unit_price");
    var netAmountField = document.getElementById("line_net_amount");
    var locationField = document.getElementById("sale_location");
    var discountRateField = document.getElementById("discount");

    var errorAlert = document.getElementById("item_error_msg");

    if (itemNameField.value === "") {
        itemNameField.style.border = "1px solid #ed5565";
        itemNameField.focus();
        itemNameField.value = "";

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Select an Item";

        return false;
    } else {
        itemNameField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (locationField.value === "") {
        locationField.style.border = "1px solid #ed5565";
        locationField.focus();
        locationField.value = "";

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Select a Sale Location";

        return false;
    } else {
        locationField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (discountRateField.value === "") {
        discountRateField.style.border = "1px solid #ed5565";
        discountRateField.focus();
        discountRateField.value = "";

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Select a Sale Location";

        return false;
    } else {
        discountRateField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (quantityField.value === "") {
        quantityField.style.border = "1px solid #ed5565";
        quantityField.focus();
        quantityField.value = "";

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Fill Quantity Field";

        return false;
    } else {
        quantityField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (unitAmountField.value === "") {
        unitAmountField.style.border = "1px solid #ed5565";
        unitAmountField.focus();
        unitAmountField.value = "";

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Fill Unit Price Field";

        return false;
    } else {
        unitAmountField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    var rowCount = tbody.rows.length;

    var itemNameText = "<input type='text' name='Item_Name" + rowCount + "' class='hdnfield' value='" + itemNameField.value + "' readonly/>";
    var itemIdText = "<input type='hidden' name='Item_Id" + rowCount + "' value='" + itemIdField.value + "'/>";
    var quantityText = "<input type='text' name='Quantity" + rowCount + "' value='" + quantityField.value + "' class='hdnfield' readonly/>";
    var unitPriceText = "<input type='text' name='Unit_Price" + rowCount + "' value='" + unitAmountField.value + "' class='hdnfield' readonly/>";
    var discountRateText = "<input type='text' name='Discount_Rate" + rowCount + "' value='" + discountRateField.value + "' class='hdnfield' readonly/>";
    var netAmountText = "<input type='text' name='Net_Amount" + rowCount + "' value='" + netAmountField.value + "' class='hdnfield' readonly/>";

    var row = "<tr><td>" + itemNameText + itemIdText + "</td><td>" + quantityText + "</td><td>" + unitPriceText + "</td><td>" + discountRateText + "</td><td>" + netAmountText + "</td></tr>";

    tbody.innerHTML += row;

    document.getElementById("row_count").value = rowCount;

    var totalNetAmountField = document.getElementById("total_net");

    var netAmount = parseFloat((totalNetAmountField.value === "" ? "0" : totalNetAmountField.value));
    var lineNetAmount = parseFloat((netAmountField.value === "" ? "0" : netAmountField.value));

    netAmount += lineNetAmount;

    totalNetAmountField.value = netAmount.toFixed(2);
}

function validateSalesOrderForm() {
    var orderNoField = document.getElementById("order_no");
    var orderDateField = document.getElementById("order_date");
    var customerIdField = document.getElementById("customer_id");
    var customerNameField = document.getElementById("customer_name");
    var searchItemNameField = document.getElementById("item_name");

    var detailsTBody = document.getElementById("sale_order_tbody");

    var errorAlert = document.getElementById("item_error_msg");

    if (orderNoField.value === "") {
        orderNoField.style.border = "1px solid #ed5565";
        orderNoField.focus();
        orderNoField.value = "";

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Invalid Order Number";

        return false;
    } else {
        orderNoField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (orderDateField.value === "") {
        orderDateField.style.border = "1px solid #ed5565";
        orderDateField.focus();
        orderDateField.value = "";

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Invalid Order Date";

        return false;
    } else {
        orderDateField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (customerIdField.value === "") {
        customerNameField.style.border = "1px solid #ed5565";
        customerNameField.focus();
        customerNameField.value = "";

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Select a Customer";

        return false;
    } else {
        customerNameField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (detailsTBody.rows.length === 0) {
        searchItemNameField.style.border = "1px solid #ed5565";
        searchItemNameField.focus();
        searchItemNameField.value = "";

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Add Order Details to Save";

        return false;
    } else {
        searchItemNameField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    return true;
}