$(function() {


    $("#customer_code").autocomplete({
        source: function(request, response) {
            $.ajax({
                type: "POST",
                url: "a_get_auto_complete_customer_code.php",
                data: {
                    customer_code: request.term,

                },
                success: function(data) {
                    response(JSON.parse(data));
                }
            });
        },
        minLength: 1,
        select: function(event, ui) {
            $(this).val(ui.item.label);
            $("#cus").val(ui.item.value);

            return false;
        }
    });

    $("#item_name").autocomplete({
        source: function(request, response) {
            $.ajax({
                type: "POST",
                url: "a_get_auto_complete_item_list.php",
                data: {
                    item_name: request.term,

                },
                success: function(data) {
                    response(JSON.parse(data));
                }
            });
        },
        minLength: 1,
        select: function(event, ui) {
            $(this).val(ui.item.label);
            $("#itn").val(ui.item.value);

            return false;
        }
    });

    $("#invoice_no").autocomplete({
        source: function(request, response) {
            $.ajax({
                type: "POST",
                url: "a_get_similar_invoice_list.php",
                data: {
                    invoice_no: request.term
                },
                success: function(data) {
                    response(JSON.parse(data));
                }
            });
        },
        minLength: 1,
        select: function(event, ui) {
            $(this).val(ui.item.label);
            $("#idn").val(ui.item.value);
            //$("#customer_due").val(ui.item.customer_due);
            return false;
        }
    });

    $("#due_invoice_no").autocomplete({
        source: function(request, response) {
            $.ajax({
                type: "POST",
                url: "a_get_similar_due_invoice_list.php",
                data: {
                    invoice_no: request.term
                },
                success: function(data) {
                    response(JSON.parse(data));
                }
            });
        },
        minLength: 1,
        select: function(event, ui) {
            $(this).val(ui.item.label);
            $("#idn").val(ui.item.value);
            //$("#customer_due").val(ui.item.customer_due);
            return false;
        }
    });

    $("#grn_codes").autocomplete({
        source: function(request, response) {
            $.ajax({
                type: "POST",
                url: "a_get_similar_grn_list.php",
                data: {
                    grn_codes: request.term
                },
                success: function(data) {
                    response(JSON.parse(data));
                }
            });
        },
        minLength: 1,
        select: function(event, ui) {
            $(this).val(ui.item.label);
            $("#grdn").val(ui.item.value);
            //$("#customer_due").val(ui.item.customer_due);
            return false;
        }
    });


    $("#return_code_no").autocomplete({

        source: function(request, response) {
            //console.log("asd");
            $.ajax({
                type: "POST",
                url: "a_get_similar_return_code_list.php",
                data: {
                    return_code_no: request.term
                },
                success: function(data) {
                    response(JSON.parse(data));
                }
            });
        },
        minLength: 1,
        select: function(event, ui) {
            $(this).val(ui.item.label);
            $("#idn").val(ui.item.value);
            //$("#customer_due").val(ui.item.customer_due);
            return false;
        }
    });


    $("#grn_return_code_no").autocomplete({

        source: function(request, response) {
            //console.log("asd");
            $.ajax({
                type: "POST",
                url: "a_get_similar_grn_return_code_list.php",
                data: {
                    grn_return_code_no: request.term
                },
                success: function(data) {
                    response(JSON.parse(data));
                }
            });
        },
        minLength: 1,
        select: function(event, ui) {
            $(this).val(ui.item.label);
            $("#idn").val(ui.item.value);
            //$("#customer_due").val(ui.item.customer_due);
            return false;
        }
    });



});

function addTransferItem() {

    var fromLocationField = document.getElementById("from_location");
    var toLocationField = document.getElementById("to_location");
    var itemNameField = document.getElementById("transfer_item");
    var itemIdField = document.getElementById("item_id");
    var avbQtyField = document.getElementById("avb_qty");
    var transferQtyField = document.getElementById("quantity");
    var unitPriceField = document.getElementById("unit_price");

    var avbQty = parseFloat((avbQtyField.value === "" ? "0" : avbQtyField.value));
    var transferQty = parseFloat((transferQtyField.value === "" ? "0" : transferQtyField.value));
    var unitPrice = parseFloat((unitPriceField.value === "" ? "0" : unitPriceField.value));

    var totalPrice = transferQty * unitPrice;
    unitPrice = unitPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    totalPrice = totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    var errorAlert = document.getElementById("item_error_msg");

    if (fromLocationField.value === "") {
        fromLocationField.style.border = "1px solid #ed5565";
        fromLocationField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Select a From Location";

        return false;
    } else {
        fromLocationField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (toLocationField.value === "") {
        toLocationField.style.border = "1px solid #ed5565";
        toLocationField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Select a To Location";

        return false;
    } else {
        toLocationField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    if (toLocationField.value === fromLocationField.value) {
        toLocationField.style.border = "1px solid #ed5565";
        toLocationField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "You can not choose Same Locations!";

        return false;
    } else {
        toLocationField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (itemIdField.value === "") {
        itemNameField.style.border = "1px solid #ed5565";
        itemNameField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Please Select an Item";

        return false;
    } else {
        itemNameField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    if (avbQty < transferQty) {
        transferQtyField.style.border = "1px solid #ed5565";
        transferQtyField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Transfer Quantity cannot be Greater than Available Quantity.";

        return false;
    } else {
        transferQtyField.style.border = "1px solid #ccc";

        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }

    var transferTBody = document.getElementById("transfer_tbody");

    var rowCount = transferTBody.rows.length;

    var rowCountField = document.getElementById("row_count");
    rowCountField.value = rowCount;

    var fromLocationNameFieldNew = document.createElement("INPUT");
    fromLocationNameFieldNew.setAttribute("type", "text");
    fromLocationNameFieldNew.setAttribute("value", fromLocationField.options[fromLocationField.selectedIndex].text);
    fromLocationNameFieldNew.setAttribute("readOnly", true);
    fromLocationNameFieldNew.setAttribute("class", "hdnfield");
    fromLocationNameFieldNew.setAttribute("name", "FromLocationName" + rowCount);

    var fromLocationValueFieldNew = document.createElement("INPUT");
    fromLocationValueFieldNew.setAttribute("type", "hidden");
    fromLocationValueFieldNew.setAttribute("value", fromLocationField.value);
    fromLocationValueFieldNew.setAttribute("name", "FromLocation" + rowCount);

    var toLocationNameFieldNew = document.createElement("INPUT");
    toLocationNameFieldNew.setAttribute("type", "text");
    toLocationNameFieldNew.setAttribute("value", toLocationField.options[toLocationField.selectedIndex].text);
    toLocationNameFieldNew.setAttribute("readOnly", true);
    toLocationNameFieldNew.setAttribute("class", "hdnfield");
    toLocationNameFieldNew.setAttribute("name", "ToLocationName" + rowCount);

    var toLocationValueFieldNew = document.createElement("INPUT");
    toLocationValueFieldNew.setAttribute("type", "hidden");
    toLocationValueFieldNew.setAttribute("value", toLocationField.value);
    toLocationValueFieldNew.setAttribute("name", "ToLocation" + rowCount);

    var itemNameFieldNew = document.createElement("INPUT");
    itemNameFieldNew.setAttribute("type", "text");
    itemNameFieldNew.setAttribute("value", itemNameField.value);
    itemNameFieldNew.setAttribute("readOnly", true);
    itemNameFieldNew.setAttribute("class", "hdnfield");
    itemNameFieldNew.setAttribute("name", "ItemName" + rowCount);

    var itemIdFieldNew = document.createElement("INPUT");
    itemIdFieldNew.setAttribute("type", "hidden");
    itemIdFieldNew.setAttribute("value", itemIdField.value);
    itemIdFieldNew.setAttribute("name", "ItemId" + rowCount);

    var itemIdFieldNew2 = document.createElement("INPUT");
    itemIdFieldNew2.setAttribute("type", "text");
    itemIdFieldNew2.setAttribute("value", itemIdField.value);
    itemIdFieldNew2.setAttribute("readOnly", true);
    itemIdFieldNew2.setAttribute("class", "hdnfield");
    itemIdFieldNew2.setAttribute("name", "ItemId" + rowCount);

    var qtyFieldNew = document.createElement("INPUT");
    qtyFieldNew.setAttribute("type", "text");
    qtyFieldNew.setAttribute("value", transferQtyField.value);
    qtyFieldNew.setAttribute("readOnly", true);
    qtyFieldNew.setAttribute("class", "hdnfield");
    qtyFieldNew.setAttribute("name", "TransferQty" + rowCount);

    var unitPriceNew = document.createElement("INPUT");
    unitPriceNew.setAttribute("type", "text");
    unitPriceNew.setAttribute("value", unitPrice);
    unitPriceNew.setAttribute("readOnly", true);
    unitPriceNew.setAttribute("class", "hdnfield price-text");
    unitPriceNew.setAttribute("name", "UnitPrice" + rowCount);

    var totalPriceNew = document.createElement("INPUT");
    totalPriceNew.setAttribute("type", "text");
    totalPriceNew.setAttribute("value", totalPrice);
    totalPriceNew.setAttribute("readOnly", true);
    totalPriceNew.setAttribute("class", "hdnfield rowTotal price-text");
    totalPriceNew.setAttribute("name", "TotalPrice" + rowCount);

    var row = transferTBody.insertRow();

    var itemIdCell = row.insertCell();
    itemIdCell.appendChild(itemIdFieldNew2);

    var itemCell = row.insertCell();
    itemCell.appendChild(itemNameFieldNew);
    itemCell.appendChild(itemIdFieldNew);

    var fromLocationCell = row.insertCell();
    fromLocationCell.appendChild(fromLocationNameFieldNew);
    fromLocationCell.appendChild(fromLocationValueFieldNew);

    var toLocationCell = row.insertCell();
    toLocationCell.appendChild(toLocationNameFieldNew);
    toLocationCell.appendChild(toLocationValueFieldNew);

    var quantityCell = row.insertCell();
    quantityCell.appendChild(qtyFieldNew);

    var unitPriceCell = row.insertCell();
    unitPriceCell.appendChild(unitPriceNew);

    var totalPriceCell = row.insertCell();
    totalPriceCell.appendChild(totalPriceNew);

    fromLocationField.selectedIndex = 0;
    toLocationField.selectedIndex = 0;
    itemNameField.value = "";
    itemIdField.value = "";
    avbQtyField.value = "";
    transferQtyField.value = "";

    fromLocationField.focus();

    var sum = 0;
    var subTotal;
    $(".rowTotal").each(function() {
        subTotal = $(this).val();
        console.log(subTotal);
        subTotal = subTotal.replace(',', '');
        console.log(subTotal);
        sum += parseFloat(subTotal);
    });
    sum = sum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    $("#txt_sub_total").text(sum);

    document.getElementById("transfer_button").style.display = "block";
}

function printDiv(id) {
    $('#transfer_button').prop('disabled', false);
    var restorepage = $('body').html();
    var printcontent = $('#' + id).clone();
    $('body').empty().html(printcontent);
    window.print();
    $('body').html(restorepage);
}

function showReturnTable() {
    var return_qty = 0;
    var unit_price = 0;
    var totl_price = 0;
    var line_discount = 0;
    var totl_discount = 0;
    var description = "";
    var return_qty_id = "";
    var unit_price_id = "";
    var description_id = "";
    var line_discount_id = "";
    var totl_discount_id = "";
    var jsonArray = new Array();
    var i = 0;
    var tableHTML = "";
    var totAmount = 0;
    var customerId = $("#customer_id").val();
    var location = $("#location").val();

    $('input:checkbox.chkReturn').each(function() {
        if (this.checked) {
            detail_id = this.id.substring(4);
            return_qty_id = "#qty_" + detail_id;
            unit_price_id = "#unit_price_" + detail_id;
            description_id = "#desc_" + detail_id;
            line_discount_id = "#line_discount_" + detail_id;
            totl_discount_id = "#total_discount";
            description = $(description_id).html();
            return_qty = $(return_qty_id).val();
            unit_price = $(unit_price_id).val();
            line_discount = $(line_discount_id).html();
            totl_discount = $(totl_discount_id).html();
            //console.log(line_discount);
            totl_price = return_qty * unit_price * (1 - (line_discount / 100));
            totAmount += parseInt(totl_price);
            //            totl_price = parseFloat(totl_price).toFixed(2);
            totl_price = parseFloat(totl_price).toFixed(2);
            var tp = totl_price.split(".");
            var Rs = tp[0];
            var Cts = tp[1];

            tableHTML += "<tr> <td style='padding: 5px; font-size: 13px'>" + parseFloat(return_qty).toFixed(2) + "</td> <td style='padding: 5px; font-size: 13px' >" + description + "</td> <td style='padding: 5px; font-size: 13px' >" + parseFloat(unit_price).toFixed(2) + "</td> <td style='padding: 5px; font-size: 13px; text-align: right;' >" + Rs + "</td> <td style='padding: 5px; font-size: 13px' >" + Cts + "</td> </tr>";
            jsonArray[i] = { "detail_id": detail_id, "quantity": return_qty, "unit_price": unit_price, "net_amount": totl_price }

            i++;
        }
    });

    tableHTML += "</tbody>";

    $('#returnTableBody').html(tableHTML);
    $('#invoice_details').hide();
    $('#returnTable').show();
    $('#paymetsDiv').hide();

    var headerId = $('#header_id').val();
    objectJSON = JSON.stringify(jsonArray);
    totAmount = totAmount * (1 - (totl_discount / 100));
    saveReturn(objectJSON, headerId, totAmount, customerId, location);

}

function showReturnTableGRN() {
    var return_qty = 0;
    var unit_price = 0;
    var totl_price = 0;
    var description = "";
    var return_qty_id = "";
    var unit_price_id = "";
    var description_id = "";
    var jsonArray = new Array();
    var i = 0;
    var tableHTML = "";
    var totAmount = 0;
    var supplierId = $("#supplier_id").val();
    var location = $("#location").val();
    var Rs = 0;
    var Cts = 0;
    $('input:checkbox.chkReturn').each(function() {
        if (this.checked) {
            detail_id = this.id.substring(4);
            return_qty_id = "#qty_" + detail_id;
            unit_price_id = "#unit_price_" + detail_id;
            description_id = "#desc_" + detail_id;
            description = $(description_id).html();
            return_qty = $(return_qty_id).val();
            unit_price = $(unit_price_id).val();

            totl_price = return_qty * unit_price;
            totAmount += parseInt(totl_price);

            var tpl = totl_price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            var tp = tpl.split(".");
            Rs = tp[0];
            Cts = tp[1];

            var tpl2 = totAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            var tp2 = tpl2.split(".");
            Rs2 = tp2[0];
            Cts2 = tp2[1];

            totl_price = parseFloat(totl_price).toFixed(2);
            tableHTML += "<tr> <td style='padding: 5px; font-size: 13px'>" + parseFloat(return_qty).toFixed(2) + "</td> <td style='padding: 5px; font-size: 13px' >" + description + "</td> <td style='padding: 5px; font-size: 13px' >" + parseFloat(unit_price).toFixed(2) + "</td> <td style='padding: 5px; font-size: 13px; text-align: right;' >" + Rs + "</td> <td style='padding: 5px; font-size: 13px' >" + Cts + "</td> </tr>";
            jsonArray[i] = { "detail_id": detail_id, "quantity": return_qty, "unit_price": unit_price, "net_amount": totl_price }

            i++;
        }
    });

    tableHTML += "<tr style='text-align: center'><td colspan='3'>Total</td><td style='text-align: right'>" + Rs2 + "</td><td style='text-align: left'>" + Cts2 + "</td></td>";
    tableHTML += "</tbody>";

    $('#returnTableBody').html(tableHTML);
    $('#grn_details').hide();
    $('#returnTable').show();
    $('#paymetsDiv').hide();

    var headerId = $('#header_id').val();
    objectJSON = JSON.stringify(jsonArray);
    saveGRNReturn(objectJSON, headerId, totAmount, supplierId, location);

}

function saveReturn(objectJSON, headerId, totAmount, customerId, location) {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    console.log(month.length);
    if (month < 10) { month = '0' + month };

    if (day < 10) { day = '0' + day };
    $.ajax({
        type: "GET",
        url: 'c_transactions.php?action=srtn',
        data: { data: objectJSON, headerId: headerId, totAmount: totAmount, customerId: customerId, location: location },
        success: function(data) {
            $('#invoice_no').html(data);
            $('#btn_print').show();
            $('#btn_return').hide();
            var returnId = "Return Invoice No : " + data;
            $('#invoice_no_field').html(returnId);
            $('#amount').html(totAmount.toFixed(2));
            $('#invoice_date').html(year + "-" + month + "-" + day);
            $('#tot_pay').html(totAmount.toFixed(2));
        }
    });
}

function saveGRNReturn(objectJSON, headerId, totAmount, supplierId, location) {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    if (month < 10) { month = '0' + month };

    if (day < 10) { day = '0' + day };
    $.ajax({
        type: "GET",
        url: 'c_transactions.php?action=sgrnrtn',
        data: { data: objectJSON, headerId: headerId, totAmount: totAmount, supplierId: supplierId, location: location },
        success: function(data) {
            $('#grn_code').html(data);
            $('#btn_print').show();
            $('#btn_return').hide();
            var returnId = "Return GRN Code : " + data;
            $('#grn_no_field').html(returnId);
            $('#amount').html(totAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
            $('#grn_date').html(year + "-" + month + "-" + day);
            $('#tot_pay').html(totAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        }
    });


}