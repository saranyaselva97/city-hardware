@extends('layouts.home')
@section('content')
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <div class="col-md-12 content-box">
    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Transactions</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-newspaper-o"></span> Sales order Invoice</li>
            </ol>
        </div>
    </div>
    @if(\Session::has('success'))
               <div class="alert alert-success">
                <p>{{\Session::get('success')}}</p>
                </div>
                            
        @endif
    <div class="row" style="padding: 0px;">
        <div class="col-md-12 shadow" style="padding: 15px; margin-bottom: 15px;">
            <div class="alert alert-danger col-md-12" id="item_error_msg" style="display: none;">
                <span class="closebtn" onclick="closeAlert(this.parentElement)">×</span>
                <span id="error_msg"></span>
            </div>
            <form action="{{action('GrnController@salesinvoicestore')}}" method="post" onsubmit="return validateInvoiceForm();">
                @csrf 
                <div class="col-md-4">
                    <table style="width: 100%; border: none">
                        <tbody><tr style="padding: 5px">
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="invoice_no">Invoice Number</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="Invoice_No" id="invoice_no" class="form-control ui-autocomplete-input" value="{{$invoiceNumber}}" readonly="" style="background-color: #fff" autocomplete="off">
                            </td>
                        </tr> 
                        <tr>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="order_no">Order No</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <input type="text" name="Order_Number" id="order_no" class="form-control" value="{{$saleorder->Order_Number}}" readonly="" style="background-color: #fff">
                                <input type="hidden" name="Order_Id" value="3">
                                <input type="hidden" name="Sale_Location" id="sale_location" class="form-control" value="{{$saleorder->Location}}">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="item_name">Item Name</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="Item_Name" id="item_name" class="form-control ui-autocomplete-input" onkeyup="getSimilarItemList();" autocomplete="off">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-top: 2px; padding-bottom: 2px">
                                <label for="available_qty">Available Qty.</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <input type="text" name="Available_Qty" id="available_qty" class="form-control" readonly="" style="background-color: #fff">
                            </td>
                        </tr>

                    </tbody></table>
                </div>
                <div class="col-md-4">
                    <table style="width: 100%; border: none">
                        <tbody><tr>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <select name="Item" id="item_list" class="form-control product" size="9">
                              @foreach($items as $it)
                                 <option value='{{ $it->id }}'>{{ $it->item_name }}</option>
                                   @endforeach                             
                                    </select>                             
                            </td>
                        </tr>
                    </tbody></table>
                </div>
                <div class="col-md-4">
                    <table style="width: 100%; border: none">
                        <tbody><tr style="padding: 5px">
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="order_date">Invoice Date</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <input type="text" name="Invoice_Date" id="invoice_date" class="form-control datepicker" value="2020/03/29" readonly="">
                            </td>
                        </tr>
                        <tr style="padding: 5px">
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="customer_name">Customer Name</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="Customer_Name" id="customer_name" class="form-control ui-autocomplete-input" value="{{$customer->customer_name}}" readonly="" autocomplete="off">
                                <input type="hidden" name="Customer_Id" id="customer_id" class="form-control" value="{{$customer->id}}">
                            </td>
                        </tr>
                        <tr style="padding: 5px">
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="customer_due">Customer Due</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <input type="text" name="Customer_Due" id="customer_due" class="form-control" readonly="" style="background-color: #fff">
                            </td>
                            
                        </tr>
                        <tr style="padding: 5px">
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="sales_rep">Sales Rep</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <input type="text" name="Sales_Rep" id="sales_rep" class="form-control" readonly="" style="background-color: #fff" value="{{$salesRep->name}}">
                            </td>
                        </tr>
                        
                    </tbody></table>
                </div>
                <div class="col-md-12" style="margin-top: 20px">
                    <div class="col-md-2">
                        <label for="line_item_name">Item</label>
                        <input type="text" name="Line_Item_Name" id="line_item_name" class="form-control" readonly="">
                        <input type="hidden" name="Item_Id" id="item_id" class="form-control" readonly="">
                    </div>
                    <div class="col-md-2">
                        <label for="unit_price">Unit Price</label>
                        <input type="text" name="Unit_Price" id="unit_price" class="form-control" onkeypress="return isNumberKey(event);" onkeyup="calculateGrnLineAmounts()" onfocus="calculateGrnLineAmounts()">
                    </div>
                    <div class="col-md-2">
                        <label for="quantity">Quantity</label>
                        <input type="text" name="Qty" id="qty" class="form-control" onkeypress="return isNumberKey(event);" onkeyup="calculateGrnLineAmounts()">
                    </div>
                    <div class="col-md-2">
                        <label for="line_gross_amount">Gross Amount</label>
                        <input type="text" name="Line_Gross_Amount" id="line_gross_amount" class="form-control" readonly="">
                    </div>
                    <div class="col-md-2">
                        <label for="discount">Discount (%)</label>
                        <input type="text" name="Discount" id="discount" class="form-control" onkeypress="return isNumberKey(event);" value="0" onkeyup="calculateGrnLineAmounts()">
                    </div>
                    <div class="col-md-2">
                        <label for="line_net_amount">Net Amount</label>
                        <input type="text" name="Line_Net_Amount" id="line_net_amount" class="form-control" readonly="">
                        <button type="button" class="btn btn-primary pull-right" style="margin-top: 10px;" onclick="addInvoiceRow();"><span class="fa fa-plus"></span> Add Row</button>
                    </div>
                </div>
                <div class="col-md-12" style="margin-top: 20px">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Gross Amount</th>
                                <th>Discount</th>
                                <th>Net Amount</th>
                            </tr>
                        </thead>
                        <tbody id="invoice_details_tbody">
                        <?php 
                        use App\Items;
                            $i = 0;
                            
                                foreach($saleOrderDetails as $orderDetail){
                                    $item = Items::where('id',$orderDetail->Item)->firstorfail();
                            ?>
                            <tr>
                                <td>
                                    <input type="text" name="<?php echo "Item_Name".$i ?>" class="hdnfield" value="<?php echo $item->item_name ?>" 
                                           readonly/>
                                    <input type="hidden" name="<?php echo "Item_Id".$i ?>" value="<?php echo $item->id ?>"/>
                                </td>
                                <td>
                                    <input type="text" name="<?php echo "Quantity".$i ?>" value="<?php echo $orderDetail->Quantity ?>" class="hdnfield" 
                                           readonly/>
                                </td>
                                <td>
                                    <input type="text" name="<?php echo "Unit_Price".$i ?>" value="<?php echo $orderDetail->Unit_Price ?>" 
                                           class="hdnfield" readonly/>
                                </td>
                                <td>
                                    <input type="text" name="<?php echo "Gross_Amount".$i ?>" value="<?php echo $orderDetail->Net_Amount ?>" 
                                           class="hdnfield" readonly/>
                                </td>
                                <td>
                                    <input type="text" name="<?php echo "Discount".$i ?>" value="<?php echo $orderDetail->Discount ?>"  class="form-control" 
                                           onkeypress="return isNumberKey(event);" onkeyup="calculateSaleOrderInvoiceLineDiscount(this.parentElement.parentElement); changeFinalValueFields();"/>
                                </td>
                                <td>
                                    <input type="text" name="<?php echo "Net_Amount".$i ?>" id="<?php echo "Net_Amount".$i ?>" value="<?php echo $orderDetail->net_amount ?>" 
                                           class="hdnfield" readonly/>
                                </td>
                            </tr>
                            <?php 
                            $i ++;
                                }
                            ?>

                        </tbody>
                    </table>
                </div>
                <div class="col-md-12" style="margin-top: 20px;">
                    <div class="col-md-2">
                        <label for="payment_type">Payment Type</label>
                        <select name="Payment_Type" id="payment_type" class="form-control" onchange="checkPaymentType(this)">
                            <option value="">-Select-</option>
                            <option value="CA">Cash</option>
                            <option value="CH">Cheque</option>
                            <option value="CR">Credit</option>
                            <option value="FR">Free of Charge</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="gross_amount">Gross Amount</label>
                        <input type="text" name="Gross_Amount" id="gross_amount" class="form-control" onchange="calculateGrnHeaderTotals()" readonly="">
                    </div>
                    <div class="col-md-2">
                        <label for="total_discount">Total Discount (%)</label>
                        <input type="text" name="Total_Discount" id="total_discount" class="form-control" onkeypress="return isNumberKey(event);" onkeyup="calculateInvoiceTotals()" value="0">
                    </div>
                    <div class="col-md-2">
                        <label for="net_amount">Net Amount</label>
                        <input type="text" name="Net_Amount" id="net_amount" class="form-control" readonly="">
                    </div>
                    <div class="col-md-2">
                        <label for="payment">Payment</label>
                        <input type="text" name="Payment" id="payment" class="form-control" onkeypress="return isNumberKey(event);" value="0.00" onkeyup="calculateBalance()">
                    </div>
                    <div class="col-md-2">
                        <label for="balance">Balance</label>
                        <input type="text" name="Balance" id="balance" class="form-control" readonly="">
                        <input type="hidden" name="Cheque_No" id="Cheque_No">
                        <input type="hidden" name="Cheque_Date" id="Cheque_Date">
                        <input type="hidden" name="Bank" id="Bank">
                        <input type="hidden" name="Cheque_Amount" id="Cheque_Amount">
                       
                    </div>
                </div>
                
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">Cheque Details</h4>
            </div>
            <div class="modal-body">
                <div class="row" style="padding: 10px;">
                    <div class="alert alert-danger col-md-12" id="modal_error_msg" style="display: none;">
                        <span class="closebtn" onclick="closeAlert(this.parentElement)">×</span>
                        <span id="error_msg"></span>
                    </div>
                </div>
                <div class="row" style="padding: 5px">
                    <div class="col-md-3">
                        <label for="chq_number">Cheque No.</label>
                    </div>
                    <div class="col-md-9">
                        <input type="text" name="Cheque_No" id="chq_number" class="form-control">
                    </div>
                </div>
                <div class="row" style="padding: 5px">
                    <div class="col-md-3">
                        <label for="chq_date">Cheque Date</label>
                    </div>
                    <div class="col-md-9">
                        <input type="text" name="Cheque_Date" id="chq_date" class="form-control datepicker">
                    </div>
                </div>
                <div class="row" style="padding: 5px">
                    <div class="col-md-3">
                        <label for="bank">Bank</label>
                    </div>
                    <div class="col-md-9">
                        <select name="Bank" id="bank" class="form-control">
                            
                        </select>
                    </div>
                </div>
                <div class="row" style="padding: 5px">
                    <div class="col-md-3">
                        <label for="amount">Amount</label>
                    </div>
                    <div class="col-md-9">
                        <input type="text" name="Amount" id="amount" class="form-control" >
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="addInvoiceChequeDetails();"><span class="fa fa-send-o"></span> Add Cheque Details</button>
            </div>
        </div>
    </div>
</div>
                
<div class="col-md-12" style="margin-top: 20px;">
                    <input type="hidden" name="Row_Count" id="row_count">
                    <button type="submit" class="btn btn-primary pull-right"><span class="fa fa-send-o"></span> Save Invoice</button>
                </div>
            </form>
        </div>
    </div>
</div>                                </div>

@endsection


@section('scripts')

<script>
$(function () {
    $("#customer_name").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "GET",
      
                url: "{{ url('/customer_autocomplete') }}",
                data: {
                    term: request.term
                },
                success: function (data) {
                    response(JSON.parse(data));
                }
            });
        },
        minLength: 1,
        select: function (event, ui) {
            $(this).val(ui.item.label);
           // $("#supplier_due").val(ui.item.due);
            $("#customer_id").val(ui.item.value);

            return false;
        }
    });
});



$(document).on('change','.product',function(){
    var saleLocationField = $("#sale_location");
    var errorAlert = document.getElementById("item_error_msg");

    if (saleLocationField.val() === "") {
    saleLocationField.css({ border: "1px solid red" });

    errorAlert.style.display = "block";
    errorAlert.children[1].innerHTML = "Please Select a Sale Location";
    } 
    else {
            errorAlert.style.display = "none";
            errorAlert.children[1].innerHTML = "";
             saleLocationField.css({ border: "1px solid #ccc" });
             var item_id=$(this).val();
             var locationval = saleLocationField.val();
             $.ajax({
            type:'get',
            url: '{!!URL::to('itemlist')!!}',
            data:{'id':item_id,'location':locationval},
            dataType:'json',
            success:function(data){
              if(data.length > 0)
                            {
                                for(key in data)
                                {
                                    var tmp = data[key];
                                    /*console.log(tmp.id);
                                    console.log(tmp.item_name);
                                    console.log(tmp.label_price);*/
                                   // a.find('.itm_name').val(tmp.item_name);
                                    document.getElementById("item_name").value = tmp.item_name;
                                    document.getElementById("line_item_name").value =tmp.item_name;
                                    document.getElementById("item_id").value =tmp.id;
                                    document.getElementById("unit_price").value =tmp.label_price;
                               }
                            }
                            else
                            {
                               alert("No Item Found")
                            }
            },
            error:function(){
            }
           });
        $(document).on('change','.product',function(){
        var item_id=$(this).val();
        var locationval = saleLocationField.val();
           $.ajax({
            type:'get',
            url: '{!!URL::to('itemqty')!!}',
            data:{'id':item_id,'location':locationval},
            dataType:'json',
            success:function(qtydata){
                if(qtydata.length > 0)
                            {
                                for(key in qtydata)
                                {
                                    var tmp = qtydata[key];
                                     document.getElementById("available_qty").value =tmp.Quantity;
                                }
                            }
                            else{
                                document.getElementById("available_qty").value =0;
                            }
                      },
            error:function(){
            }
           });
        });
    }
});


/****To Get the INVOICE number based on the location */
function updateInvoiceNumber(locationTypeField) {
    var prefix;

    if (locationTypeField.value === "B1") {
        prefix = "INVB1";
    } else if (locationTypeField.value === "B2") {
        prefix = "INVB2";
    } else if (locationTypeField.value === "B3") {
        prefix = "INVB3";
    }
     else if (locationTypeField.value === "W") {
        prefix = "INVW";
    }
   


    $.ajax({
        type: "get",
        url: "{{ url('/get_prefix') }}",
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
        "Bank of Ceylon", "Cargills Bank Ltd.", "Commercial Bank of Ceylon PLC",
        "DFCC Vardhana Bank PLC", "Habib Bank Ltd.", "Hatton National Bank PLC",
        "National Development Bank PLC", "Nations Trust Bank PLC", "Pan Asia Banking Corporation PLC", "Peoples Bank",
        "Sampath Bank PLC", "Seylan Bank PLC", "Standard Chartered Bank",
        "Union Bank of Colombo PLC"
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
    alert(amountField.value)



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


</script>
@endsection