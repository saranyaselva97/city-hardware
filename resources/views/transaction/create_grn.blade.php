@extends('layouts.home')
@section('content')
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <div class="col-md-12 content-box">
    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Transactions</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-map-o"></span> New GRN</li>
            </ol>
        </div>
    </div>
    @if(\Session::has('success'))
               <div class="alert alert-success">
                <p>{{\Session::get('success')}}</p>
                </div>
                            
        @endif

    <div class="row" style="padding: 15px;">
        <div class="col-md-12 shadow" style="padding: 15px; margin-bottom: 15px;">
            <div class="alert alert-danger col-md-12" id="item_error_msg" style="display: none;">
                <span class="closebtn" onclick="closeAlert(this.parentElement)">×</span>
                <span id="error_msg"></span>
            </div>
            
            <form action="{{action('GrnController@store')}}" method="post">
                @csrf
                <div class="col-md-4">
                    <table style="width: 100%; border: none">
                        <tbody><tr style="padding: 5px">
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="grn_code">GRN Code</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <input type="text" name="Grn_Code" id="grn_code" class="form-control" value="{{ $grn }}" readonly="" style="background-color: #fff">
                            </td>
                        </tr>
                       
                        <tr>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="available_qty">Stock In Warehouse</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <input type="text" name="Available_Qty" id="available_qty" class="form-control" readonly="" style="background-color: #fff">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="due_date">Due Date</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <input type="text" name="Due_Date" id="due_date" class="form-control datepicker">
                            </td>
                        </tr>
                    </tbody></table>
                </div>
                <div class="col-md-4">
                         <tr>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="item_name">Item Name</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="Item_Name" id="item_name" class="form-control  ui-autocomplete-input" onkeyup="getSimilarItemList();" autocomplete="off">
                            </td>
                        </tr>
                    <table style="width: 100%; border: none">
                        <tbody><tr>
                       
                            <td style="padding-top: 5px; padding-bottom: 5px">
                           
                               
                                <select name="product_title" id="product_title" class="form-control product" size="6" >
                                <option value="0" disabled="true" selected="true">-Select Items Here-</option>
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
                        <tbody><tr>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="supplier">Supplier</label>
                            </td>
                              <td>
                              <input type="text" name="sup_name" id="sup_name" class="form-control ui-autocomplete-input" autocomplete="off">
                              <input type="hidden" name="supplier_id" id="supplier_id" class="form-control" >
                              </td>
                            
                        </tr>
                        <tr>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="supplier_due">Supplier Due</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <input type="text" name="Supplier_Due" id="supplier_due" class="form-control" readonly="" style="background-color: #fff">
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="grn_invoice_code">Supplier Inv. No.</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <input type="text" name="Grn_Invoice_Code" id="grn_invoice_code" class="form-control" value="">
                            </td>
                        </tr>
                     
                    </tbody></table>
                </div>
               
                <div   class="col-md-12" style="margin-top: 20px;">
                    <div class="col-md-2">
                        <label for="lines_item_name">Item</label>
                        <input type="text" name="Line_Item_Name" id="line_item_name" class="form-control" readonly="">
                        <input type="hidden" name="Item_Id" id="item_id" class="form-control" readonly="">
                    </div>
                    <div class="col-md-2">
                        <label for="quantity">Quantity</label>
                        <input type="text" name="Qty" id="qty" class="form-control" onkeypress="return isNumberKey(event);" onkeyup="calculateGrnLineAmounts()">
                    </div>
                    <div class="col-md-2">
                        <label for="unit_price">Unit Price</label>
                        <input type="text" name="Unit_Price" id="unit_price" class="form-control" onkeypress="return isNumberKey(event);" onkeyup="calculateGrnLineAmounts()">
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
                        <button type="button" class="btn btn-primary pull-right" style="margin-top: 10px;" onclick="addGrnRow();"><span class="fa fa-plus"></span> Add Row</button>
                    </div>
                </div>
                <div class="col-md-12" style="margin-top: 20px;">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Gross Amount</th>
                                <th>Discount</th>
                                <th>Net Amount</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody id="grn_details_tbody">
                        
                        </tbody>
                    </table>
                </div>
                <div class="col-md-12" style="margin-top: 20px;">
                    <div class="col-md-2">
                        <label for="payment_type">Payment Type</label>
                        <select name="Payment_Type" id="payment_type" class="form-control" onchange="checkGrnPaymentType(this)">
                            <option value="">-Select-</option>
                            <option value="CA">Cash</option>
                            <option value="CH">Cheque</option>
                            <option value="CR">Credit</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="gross_amount">Gross Amount</label>
                        <input type="text" name="Gross_Amount" id="gross_amount" class="form-control" onchange="calculateGrnHeaderTotals()" readonly="">
                    </div>
                    <div class="col-md-2">
                        <label for="total_discount">Total Discount (%)</label>
                        <input type="text" name="Total_Discount" id="total_discount" class="form-control" onkeypress="return isNumberKey(event);" onkeyup="calculateGrnHeaderTotals()" value="0">
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
                  

                    </div>
                </div>
                <div class="col-md-12" style="margin-top: 20px;">
                    <input type="hidden" name="Row_Count" id="row_count">
                    <button type="submit" class="btn btn-primary pull-right"><span class="fa fa-send-o"></span> Save GRN</button>
                </div>
            </form>
        </div>
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
                        <input type="text" name="Amount" id="amount" class="form-control" onkeypress="return isNumberKey(event);">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="addChequeDetails();"><span class="fa fa-send-o"></span> Add Cheque Details</button>
            </div>
        </div>
    </div>
</div>  
  </div>
@endsection


@section('scripts')

<script>
//fetching Item data by ID from Select Box
   $(document).ready(function(){
        $(document).on('change','.product',function(){
           var item_id=$(this).val();
         
           $.ajax({
            type:'get',
            url: '{!!URL::to('itemlist')!!}',
            data:{'id':item_id},
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
        });
        $(document).on('change','.product',function(){
        var item_id=$(this).val();
           $.ajax({
            type:'get',
            url: '{!!URL::to('itemqty')!!}',
            data:{'id':item_id},
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
    });

//Calculation part of GRN 
 function  calculateGrnLineAmounts() {
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
//Auto complete the supplier name by typing names

$(function () {
    $("#sup_name").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "GET",
      
                url: "{{ url('/supplier_autocomplete') }}",
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
            $("#supplier_id").val(ui.item.value);
            $("#supplier_due").val(ui.item.due);
            return false;
        }
    });
});

/****************ADD GRN ROW****/


</script>

@endsection