
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
            <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><li style="padding-top: 5px" id="supplier_name" class="ui-autocomplete-input" autocomplete="off">Supplier Name : </li>
            <li style="padding-top: 5px" id="address">Address : aD</li>
            <li style="padding-top: 5px" id="telephone">Telephone : </li>
        </ul>
    </div>
    <div class="col-md-5 pull-right">
        <ul style="list-style: none; font-size: 13px; font-weight: bold; padding-left: 0px">
            <li style="padding-top: 5px;" id="grn_no">GRN No. {{ $grn->id }}</li>
        </ul>
        <table style="width: 100%">
            <tbody><tr>
                <td style="border: 1px solid black; padding: 5px; font-size: 13px" id="payment_type">Cash </td>
                <td style="border: 1px solid black; padding: 5px; font-size: 13px" id="amount">1,050.00</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 5px; font-size: 13px">Date </td>
                <td style="border: 1px solid black; padding: 5px; font-size: 13px" id="grn_date">2020-06-06</td>
            </tr>
        </tbody></table>
    </div>
</div>
<div class="row" style="padding:15px; margin-left: 0px; margin-right: 0px;">
    <table id="grn_details" class="talbe table-bordered" style="width: 100%">
        <thead>
            <tr>
                <td style="padding: 5px; font-size: 13px; text-align: center">Description</td>
                <td style="padding: 5px; font-size: 13px; text-align: center">Qty.</td>
                <td style="padding: 5px; font-size: 13px; text-align: center">Unit Price</td>
                <td style="padding: 5px; font-size: 13px; text-align: center">Discount(%)</td>
                <td style="padding: 5px; font-size: 13px; text-align: center">Rs.</td>
                <td style="padding: 5px; font-size: 13px; text-align: center">Cts.</td>
            </tr>
        </thead>
        <tbody>
                        <tr>
                <td style="padding: 5px; font-size: 13px">noodels</td>
                <td style="padding: 5px; font-size: 13px">10</td>
                <td style="padding: 5px; font-size: 13px; text-align: right;">105</td>
                <td style="padding: 5px; font-size: 13px; text-align: right;">0</td>
                <td style="text-align: right; padding: 5px; font-size: 13px;">1,050</td>
                <td style="padding: 5px; font-size: 13px">00</td>
            </tr>
                        <tr>
                <td style="padding: 5px; font-size: 13px"></td>
                <td style="padding: 5px; font-size: 13px"></td>
                <td style="padding: 5px; font-size: 13px"></td>
                <td style="padding: 5px; font-size: 13px; text-align: right;">Total</td>
                <td style="text-align: right; padding: 5px; font-size: 13px;">1,050</td>
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
                    <td colspan="2" style="text-align: center; font-size: 15px; font-weight: bold;">Cash</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="width: 100px;">Total Amount</td>
                    <td style="width: 200px;">1,050.00</td>
                </tr>
                <tr>
                    <td style="width: 100px;">Total Discount(%)</td>
                    <td style="width: 200px;">0</td>
                </tr>
                <tr>
                    <td style="width: 100px;">Total Payment</td>
                    <td style="width: 200px;">0.00</td>
                </tr>
            </tbody>
        </table>
            </div>
</div>
<div class="row" style="padding:15px; margin-left: 0px; margin-right: 0px;">
    <div class="col-md-12">
        <button type="button" class="btn btn-primary pull-right" onclick="exportGRNToPDF('grn_details');"><span class="fa fa-print"></span> Print GRN</button>
    </div>
</div>                                </div>


@endsection



@section('scripts')


@endsection