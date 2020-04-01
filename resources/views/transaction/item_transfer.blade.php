@extends('layouts.home')
@section('content')
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <div class="col-md-12 content-box">
    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Transactions</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-puzzle-piece"></span> Item Transfer</li>
            </ol>
        </div>
    </div>
    <div class="row" style="padding: 15px;">
        <div class="col-md-12 shadow" style="padding: 15px; margin-bottom: 15px;">
            <div class="alert alert-danger col-md-12" id="item_error_msg" style="display: none;">
                <span class="closebtn" onclick="closeAlert(this.parentElement)">×</span>
                <span id="error_msg"></span>
            </div>
                        <div class="col-md-12">
                <table class="table">
                    <tbody><tr>
                        <td>
                            <label for="transfer_number">Transfer Note Number</label>
                        </td>
                        <td>
                            <label for="from_location">From Location</label>
                        </td>
                        <td>
                            <label for="to_location">To Location</label>
                        </td>
                        <td>
                            <label for="transfer_item">Item</label>
                        </td>
                        <td>
                            <label for="avb_qty">Avb. Qty</label>
                        </td>
                        <td>
                            <label for="quantity">Quantity</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="transfer_number" id="transfer_number" class="form-control" value="TNN000009" readonly="" style="background-color: #fff">
                        </td>
                        <td>
                            <select id="from_location" class="form-control">
                                <option value="">-Select-</option>
                                                                    <option value="O">Outlet</option>
                                                                        <option value="V">Vehicle</option>
                                                                        <option value="W">Warehouse</option>
                                                                </select>
                        </td>
                        <td>
                            <select id="to_location" class="form-control">
                                <option value="">-Select-</option>
                                                                    <option value="O">Outlet</option>
                                                                        <option value="V">Vehicle</option>
                                                                        <option value="W">Warehouse</option>
                                                                </select>
                        </td>
                        <td>
                            <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" id="transfer_item" class="form-control ui-autocomplete-input" autocomplete="off">
                            <input type="hidden" id="item_id">
                        </td>
                        <td>
                            <input type="text" id="avb_qty" class="form-control" readonly="">
                        </td>
                        <td>
                            <input type="hidden" id="unit_price">
                            <input type="text" id="quantity" class="form-control" onkeypress="return isNumberKey(event);">
                            <br>
                            <button type="button" class="btn btn-primary pull-right" onclick="addTransferItem();"><span class="fa fa-plus"></span> Add to List</button>
                        
                        </td>
                    </tr>
                </tbody></table>

            </div>
            <form action="c_transactions.php?action=strn" method="post" id="item_transfer_form">
                <div id="printDiv">
                    <table id="printFullTable" style="border:none;width: 100%">
                        <tbody><tr>
                            <td><h4>Transfer Note -TNN000000</h4><p style="float: right; font-weight: bold; font-size: 12px; margin-right: 15px">Transferred Date : 2020-03-30</p></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="col-md-12">
                                    <table class="table" id="transferTable">
                                        <thead>
                                            <tr>
                                                <th>Item ID</th>
                                                <th>Item</th>
                                                <th>From Location</th>
                                                <th>To Location</th>
                                                <th>Quantity</th>
                                                <th>Unit Price</th>
                                                <th>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody id="transfer_tbody">

                                        </tbody>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="col-md-2 pull-right" style="margin-bottom: 10px">
                                    <label>Net Total : </label>
                                    <label id="txt_sub_total"></label>
                                    
                                </div>
                            </td>
                        </tr>
                    </tbody></table>
                </div>
                <div class="col-md-12">
                    <input type="hidden" name="Row_Count" id="row_count">
                    <input type="hidden" name="transfer_number" id="transfer_number" value="TNN000000">
                    <button type="submit" class="btn btn-primary pull-right" id="transfer_button" style="display: none" disabled="true">
                        <span class="fa fa-send"></span> Transfer Items
                    </button>
                    <button type="button" onclick="printDiv('printFullTable')" class="btn btn-primary pull-right" id="Print" style="display:block; margin-right: 10px">
                        <span class="fa fa-print"></span> Print
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
                                </div>
@endsection
