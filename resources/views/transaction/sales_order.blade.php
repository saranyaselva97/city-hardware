@extends('layouts.home')
@section('content')
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <div class="col-md-12 content-box">
    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Transactions</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-list-alt"></span> New Sales Order</li>
            </ol>
        </div>
    </div>

    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

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
                        
            <form action="{{action('GrnController@newsalesorder')}}" method="post">
                @csrf
                <div class="col-md-4">
                    <table style="width: 100%; border: none">
                        <tbody><tr style="padding: 5px">
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="order_no">Order Number</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <input type="text" name="Order_Number" id="order_no" class="form-control" value="{{$sor}}" readonly="" style="background-color: #fff">
                            </td>
                        </tr> 
                        <tr style="padding: 5px">
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="sale_location">Sale Location</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <select name="Sale_Location" id="sale_location" class="form-control">
                                    <option value="">-Select-</option>
                                    @foreach($locations as $it)
                                  <option value='{{ $it->loc_code}}'>{{ $it->loc_name }}</option>
                                   @endforeach
                                 </select>
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
                            <td style="padding-top: 5px; padding-bottom: 5px">
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
                                <label for="order_date">Order Date</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <input type="text" name="Order_Date" id="order_date" class="form-control datepicker" value="2020/03/30" readonly="">
                            </td>
                        </tr>
                        <tr style="padding: 5px">
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <label for="customer_name">Customer Name</label>
                            </td>
                            <td style="padding-top: 5px; padding-bottom: 5px">
                                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="Customer_Name" id="customer_name" class="form-control ui-autocomplete-input" autocomplete="off">
                                <input type="hidden" name="Customer_Id" id="customer_id" class="form-control">
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
                    </tbody></table>
                </div>
                <div class="col-md-12" style="margin-top: 20px;">
                    <div class="col-md-3">
                        <label for="line_item_name">Item</label>
                        <input type="text" name="Line_Item_Name" id="line_item_name" class="form-control" readonly="">
                        <input type="hidden" name="Item_Id" id="item_id" class="form-control" readonly="">
                    </div>
                    <div class="col-md-2">
                        <label for="quantity">Quantity</label>
                        <input type="text" name="Qty" id="qty" class="form-control" onkeypress="return isNumberKey(event);" onkeyup="calculateSalesOrderNetAmount(); return validateQuantity();">
                    </div>
                    <div class="col-md-2">
                        <label for="unit_price">Unit Price</label>
                        <input type="text" name="Unit_Price" id="unit_price" class="form-control" onkeypress="return isNumberKey(event);" onkeyup="calculateSalesOrderNetAmount()">
                    </div>
                    
                    <div class="col-md-2">
                        <label for="unit_price">Discount%</label>
                        <input type="text" name="Discount" id="discount" class="form-control" value="0" onkeypress="return isNumberKey(event);" onkeyup="calculateSalesOrderNetAmount()">
                    </div>
                    
                    <div class="col-md-3">
                        <label for="line_net_amount">Net Amount</label>
                        <input type="text" name="Line_Net_Amount" id="line_net_amount" class="form-control" readonly="">
                        <button type="button" class="btn btn-primary pull-right" style="margin-top: 10px;" onclick="addSalesOrderRow();"><span class="fa fa-plus"></span> Add Row</button>
                    </div>
                </div>
                <div class="col-md-12" style="margin-top: 20px;">
                    <table class="table">
                        <thead>
                            <tr>
                                <td>Item Name</td>
                                <td>Quantity</td>
                                <td>Unit Price</td>
                                <td>Discount%</td>
                                <td>Net Amount</td>
                            </tr>
                        </thead>
                        <tbody id="sale_order_tbody">
                            
                        </tbody>
                    </table>
                </div>
                <div class="col-md-12" style="margin-top: 20px;">
                    <div class="col-md-3">
                        <label for="total_net">Net Amount</label>
                        <input type="text" name="Total_Net_Amount" class="form-control" id="total_net" readonly="">
                    </div>
                    <input type="hidden" name="Row_Count" id="row_count">
                    <button type="submit" class="btn btn-primary pull-right"><span class="fa fa-send"></span> Save Details</button>
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


</script>
@endsection
