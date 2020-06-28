
@extends('layouts.home')
@section('content')


<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <div class="row" style="padding:15px; margin-left: 0px; margin-right: 0px; border-bottom: 2px solid black">
    <div class="col-md-2">
        <img id="dmac_logo" src="assests/images/dmac_trans.png" alt="dmac" style="width: 120px; height: auto">
    </div>
    <div class="col-md-10">
        <h2 style="font-size: 30px; font-weight: bolder; margin-bottom: 0px" id="company_name">City Hardware (Pvt) Ltd</h2>
        <br>
        <h5 style="margin-top: 0px; margin-bottom: 5px" id="company_address">K.K.S Road,Jaffna. Sri Lanka</h5>
        <table style="font-size: 13px; width: 360px">
            <tbody><tr>
                <td style="width: 30px">Tele</td>
                <td style="width: 5px;">&nbsp;</td>
                <td style="width: 5px;">:</td>
                <td style="width: 5px;">&nbsp;</td>
                <td style="width: 120px" id="company_tel">021-2215452</td>
                <td style="width: 30px">Email</td>
                <td style="width: 5px;">&nbsp;</td>
                <td style="width: 5px;">:</td>
                <td style="width: 5px;">&nbsp;</td>
                <td style="width: 150px" id="company_email">Cityhardware@gmail.com</td>
            </tr>
            <tr>
                <td style="width: 30px">Fax</td>
                <td style="width: 5px;">&nbsp;</td>
                <td style="width: 5px;">:</td>
                <td style="width: 5px;">&nbsp;</td>
                <td style="width: 120px" id="company_fax">021-22143245</td>
                <td style="width: 195px; font-size: 15px; font-weight: bold;" colspan="5" id="hot_line">Hot Line : 077201465</td>
            </tr>
        </tbody></table>
    </div>
</div>
<div class="row" style="padding:15px; margin-left: 0px; margin-right: 0px;">
    <div class="col-md-5 pull-left">
        <ul style="list-style: none; font-size: 13px; font-weight: bold;">
            <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><li style="padding-top: 5px" id="customer_name" class="ui-autocomplete-input" autocomplete="off">Customer Name : {{$customer->customer_name}}</li>
            <li style="padding-top: 5px" id="address">Address : {{$customer->address}} </li>
            <li style="padding-top: 5px" id="telephone">Telephone : {{$customer->contact}}</li>
        </ul>
    </div>
    <div class="col-md-5 pull-right">
        <ul style="list-style: none; font-size: 13px; font-weight: bold; padding-left: 0px">
            <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><li style="padding-top: 5px;" id="invoice_no" class="ui-autocomplete-input" autocomplete="off">Invoice No : {{$invoice}}</li>
                            

            
        </ul>
        <table style="width: 100%">
            <tbody><tr>
                <td style="border: 1px solid black; padding: 5px; font-size: 13px" id="payment_type">{{$payment_type}} </td>
                <td style="border: 1px solid black; padding: 5px; font-size: 13px" id="amount">{{$grossamount}}</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 5px; font-size: 13px">Date </td>
                <td style="border: 1px solid black; padding: 5px; font-size: 13px" id="invoice_date">{{$grndate}}</td>
            </tr>
        </tbody></table>
    </div>
</div>
<div class="row" style="padding:15px; margin-left: 0px; margin-right: 0px;">
    <table id="invoice_details" class="talbe table-bordered" style="width: 100%">
        <thead>
            <tr>
                <td style="padding: 5px; font-size: 13px; text-align: center">Qty.</td>
                <td style="padding: 5px; font-size: 13px; text-align: center">Description</td>
                <td style="padding: 5px; font-size: 13px; text-align: center">Unit Price</td>
                <td style="padding: 5px; font-size: 13px; text-align: center">Discount(%)</td>
                <td style="padding: 5px; font-size: 13px; text-align: center">Rs.</td>
                <td style="padding: 5px; font-size: 13px; text-align: center">Cts.</td>
  
            </tr>
        </thead>
         
          
            
        @foreach($invoiceDetail as $grnD)
             <?php 
                $totalAmount=0;
              $item = App\Items::where('id',$itemid)->first();
              
             ?>      


             @endforeach
             <tr>
                <td style="padding: 5px; font-size: 13px">{{$item->item_name}}</td>
                <td style="padding: 5px; font-size: 13px">{{$invoiceDetail->Quantity}}</td>
                <td style="padding: 5px; font-size: 13px">{{$invoiceDetail->Unit_Price}}</td>
                <td style="padding: 5px; font-size: 13px">{{$invoiceDetail->Discount}}</td>
                <td style="padding: 5px; font-size: 13px">{{$invoiceDetail->Gross_Amount}}</td>
            </tr> 
             
            
          
            
            <tr>
                <td style="padding: 5px; font-size: 13px"></td>
                <td style="padding: 5px; font-size: 13px"></td>
                <td style="padding: 5px; font-size: 13px; text-align: right;">Total</td>
                <td style="padding: 5px; font-size: 13px"></td>
                <td style="text-align: right; padding: 5px; font-size: 13px;">{{$invoiceDetail->Gross_Amount}}</td>
                <td style="padding: 5px; font-size: 13px">00</td>
            </tr>
        </tbody>
    </table>
</div>
<div class="row" style="margin-left: 0px; margin-right: 0px;">
<div class="col-md-12">
        <p style="font-weight: bold; font-size: 15px;">Payment Details</p>
    </div>
    <div class="col-md-6" style="padding-left: 15px;">
                <table id="payment_details" class="table table-bordered">
            <thead>
                <tr>
                    <td colspan="2" style="text-align: center; font-size: 15px; font-weight: bold;">{{$payment_type}}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="width: 100px;">Total Amount</td>
                    <td style="width: 200px;">{{$invoiceDetail->Gross_Amount}}</td>
                </tr>
                <tr>
                    <td style="width: 100px;">Total Discount(%)</td>
                    <td style="width: 200px;">{{$invoiceheader->Total_Discount}}</td>
                </tr>
                <tr>
                    <td style="width: 100px;">Total Payment</td>
                    <td style="width: 200px;">{{$invoiceheader->Payment}}</td>
                </tr>
                <tr>
                    <td style="width: 100px;">Balance</td>
                    <td style="width: 200px;">{{$invoiceheader->Balance}}</td>
                </tr>
            </tbody>
        </table>
            </div>
</div>
<div class="row" style="padding:15px; margin-left: 0px; margin-right: 0px;">
    <div class="col-md-12">
                <button type="button" class="btn btn-primary pull-right" onclick="window.print();"><span class="fa fa-print"></span> Printed Invoice</button>
            </div>
</div>                                </div>

@endsection



@section('scripts')


@endsection

