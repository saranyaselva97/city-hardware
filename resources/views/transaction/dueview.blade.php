@extends('layouts.home')
@section('content')
<div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Transactions</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-puzzle-piece"></span>Received Payment From Credit Sales</li>
            </ol>
        </div>

        <div class="col-md-12 full-width" id="PaymentReceivableDetail"> 
                <div class="full-width">
                    <h3>Payment Receivable Detail</h3>
                    <!--<p style="float: right; font-weight: bold; font-size: 12px; margin-right: 15px">Printed On : 2020-07-22</p>-->
                </div>
                   
                <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer"><div class="dataTables_length" id="DataTables_Table_0_length"><label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>Search:<input type="search" class="" placeholder="" aria-controls="DataTables_Table_0"></label></div><table class="item-table dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                    <thead>
                        <tr role="row"
                        ><th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Invoice Id: activate to sort column descending" style="width: 104px;">Invoice Id</th>
                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Customer Name: activate to sort column ascending" style="width: 147px;">Customer Name</th>
                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Date : activate to sort column ascending" style="width: 89px;">Date </th>
                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Gross Amount: activate to sort column ascending" style="width: 127px;">Gross Amount</th>
                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Discount: activate to sort column ascending" style="width: 80px;">Discount</th>
                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Paid Amount: activate to sort column ascending" style="width: 115px;">Paid Amount</th>
                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Net Amount: activate to sort column ascending" style="width: 115px;">Net Amount</th>
                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Balance: activate to sort column ascending" style="width: 75px;">Balance</th>
                        <th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label=": activate to sort column ascending" style="width: 95px;"></th></tr>
                    </thead>
                    <tbody>
                                                
                        
                  
                 <tr role="row" class="odd"  style="text-align: center">
                                                                 
                     <td class="sorting_1">{{$due_invoice_no}}</td>
                      <td>{{$customer}}</td>
                       <td>{{$invoice_date}}</td>
                      <td>{{$Gross_amount}}</td>
                      <td>{{$Discount}}</td>   
                      <td>{{$Paid}}</td>   
                      <td>{{$net_amount}}</td>       
                      <td>{{$Balance}}</td>
                                       
                    
                       
                        </tr></tbody>
                </table><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a class="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" id="DataTables_Table_0_previous">Previous</a><span><a class="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0">1</a></span><a class="paginate_button next disabled" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" id="DataTables_Table_0_next">Next</a></div></div>
            </div>
@endsection
