
@extends('layouts.home')
@section('content')
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <link rel="stylesheet" href="assests/css/report_styles.css">

<div class="col-md-12 content-box">
    <div class="row  no-print">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Transactions</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-newspaper-o"></span> New Expence</li>
            </ol>
        </div>
    </div>
    <div class="row" style="padding: 15px;">
        <div class="col-md-12 shadow no-print" style="padding: 15px; margin-bottom: 15px;">
            <div class="alert alert-danger col-md-12" id="item_error_msg" style="display: none;">
                <span class="closebtn" onclick="closeAlert(this.parentElement)">×</span>
                <span id="error_msg"></span>
            </div>
                        <form action="c_transactions.php?action=save" method="post" id="expence_form" onsubmit="">
                <div class="col-md-12">
                    
                    <table style="width: 100%; border: none">
                        <tbody><tr style="padding: 5px">
                            <td style="padding: 5px;">
                                <label for="expence_type">Expence Type</label>
                            </td>
                            <td style="padding: 5px;">
                                <label for="description">Description</label>
                            </td>
                            <td style="padding: 5px;">
                                <label for="amount">Amount</label>
                            </td>
                            <td style="padding: 5px;">
                                <label for="dated">Date</label>
                            </td>
                            <td style="padding: 5px;">
                                <label for="customer">Customer / Company</label>
                            </td>
                        </tr> 
                        <tr style="padding: 5px">
                            <td style="padding: 5px;">
                                
                                <select name="Expence_Type" id="expence_type" class="form-control">
                                    <option value="">-Select-</option>
                                                                        <option value="1">Free Of Charge</option>
                                                                        <option value="2">Petty Cash</option>
                                                                        <option value="3">Service Charge</option>
                                                                    </select>
                                
                            </td>
                            <td style="padding: 5px;">
                                <input type="text" name="Description" id="description" class="form-control" style="background-color: #fff">
                            </td>
                            <td style="padding: 5px;">
                                <input type="text" name="Amount" id="amount" class="form-control" onkeypress="return isNumberKey(event);" style="background-color: #fff">
                            </td>
                            <td style="padding: 5px;">
                                <input type="text" name="Dated" id="dated" class="form-control datepicker" value="2020/03/30" readonly="">
                            </td>
                            <td style="padding: 5px;">
                                <input type="text" name="Customer" id="customer" class="form-control" onkeyup="">
                            </td>
                        </tr>
                    </tbody></table>
                    <div class="pull-right" style="padding: 5px;">
                        <button type="submit" class="btn btn-primary pull-right" style="margin-top: 10px;" onclick="return validateExpence();"><span class="fa fa-plus"></span> Add Expence </button>
                    </div>
                </div>
            </form>
        </div>
        
        <div class="col-md-12 shadow" style="padding: 15px; margin-bottom: 15px;">
        	<div class="col-md-12 full-width" id="expenceReport">
                    <div class="full-width report-header" style="margin-bottom: 10px ">
                    <p class="company-name">City Hardware (Pvt) Ltd</p>
                    <p>Jaffna. Sri Lanka</p>
                </div>
                    
                <div class="full-width">
                    <h3>Expences Report</h3>
                    <p style="float: right; font-weight: bold; font-size: 12px; margin-right: 10px">Printed On : 2020-03-30</p>
                </div>
                
                <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer"><div class="dataTables_length" id="DataTables_Table_0_length"><label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>Search:<input type="search" class="" placeholder="" aria-controls="DataTables_Table_0"></label></div><table class="item-table dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info" style="width: 1060px;">
                    <thead>
                        <tr role="row"><th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Expence Type: activate to sort column descending" style="width: 220px;">Expence Type</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending" style="width: 170px;">Description</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Amount: activate to sort column ascending" style="width: 140px;">Amount</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Date: activate to sort column ascending" style="width: 149px;">Date</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Customer: activate to sort column ascending" style="width: 166px;">Customer</th><td class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="User: activate to sort column ascending" style="width: 101px;">User</td></tr>
                    </thead>
                    <tbody>
                                                
                                                
                                                
                                                
                                            <tr role="row" class="odd">
                            <td class="sorting_1">Free Of Charge</td>
                            <td>test</td>
                            <td>13334</td>
                            <td>2020-03-29</td>
                            <td>tj</td>
                            <td>Admin</td>
                        </tr><tr role="row" class="even">
                            <td class="sorting_1">Free Of Charge</td>
                            <td>test</td>
                            <td>13334</td>
                            <td>2020-03-29</td>
                            <td>tj</td>
                            <td>Admin</td>
                        </tr><tr role="row" class="odd">
                            <td class="sorting_1">Petty Cash</td>
                            <td>jhghgv</td>
                            <td>600</td>
                            <td>2019-01-31</td>
                            <td>5</td>
                            <td>Admin</td>
                        </tr><tr role="row" class="even">
                            <td class="sorting_1">Service Charge</td>
                            <td>sdcvss</td>
                            <td>5511</td>
                            <td>2019-01-31</td>
                            <td>axq</td>
                            <td>krisAdminhan</td>
                        </tr></tbody>
                </table><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 4 of 4 entries</div><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a class="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" id="DataTables_Table_0_previous">Previous</a><span><a class="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0">1</a></span><a class="paginate_button next disabled" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" id="DataTables_Table_0_next">Next</a></div></div>
            </div>
            <div class="full-width">
                <button class="btn btn-primary no-print" style="float: right; margin-right: 30px; margin-top: 30px;" onclick="window.print();"><span class="fa fa-print"></span>&nbsp;Print</button>
            </div>
        </div>
        
    </div>
</div>                                </div>

@endsection


