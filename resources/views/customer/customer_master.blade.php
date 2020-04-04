@extends('layouts.home')
@section('content')
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <div class="col-md-12 content-box">
    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Master Data</a></li>
                <li class="breadcrumb-item"><a href="c_master.php?action=nitm">Customer Master</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-cubes"></span> New Customer</li>
            </ol>
        </div>
    </div>

        @if(\Session::has('success'))
               <div class="alert alert-success">
                <p>{{\Session::get('success')}}</p>
                </div>
                            
        @endif

<div class="row" style="padding: 15px;">
<div class="col-md-12 shadow" style="padding: 15px; padding-bottom: 0px; margin-bottom: 15px;">
            <div class="alert alert-danger col-md-12" id="item_error_msg" style="display: none;">
                <span class="closebtn" onclick="closeAlert(this.parentElement)">×</span>
                <span id="error_msg"></span>
            </div>

                        <form  method="post" action="{{action('CustomerController2@store')}}">
                        @csrf
                <table class="table">
                    <thead>
                        <tr>
                            <th>Customer Code <span style="color: red">*</span></th>
                            <th>Customer Name <span style="color: red">*</span></th>
                            <th>Address</th>
                            <th>Contact No</th>
                        </tr>
                    </thead>
                    <tbody id="customer_tbody">
                        <tr>
                            <td>
                                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="customer_code" id="customer_code" class="form-control ui-autocomplete-input" autocomplete="off">
                            </td>
                            <td>
                                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="customer_name" id="customer_name" class="form-control ui-autocomplete-input" autocomplete="off">
                            </td>
                            <td>
                                <textarea name="address" id="address" class="form-control"></textarea>
                            </td>
                            <td style="width: 150px; text-align: center">
                                <input type="text" maxlength="10" name="contact" id="contact" class="form-control" >
                                <button type="submit" class="btn btn-primary pull-right" id="btn_add_item" style="margin-top: 10px;" >
                                    <span class="fa fa-plus"></span> Add Customer
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
               
            </form>
        </div>


        <div class="col-md-12 shadow" style="background-color: #fff; padding: 15px;"> 
            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer"><div class="dataTables_length" id="DataTables_Table_0_length"><label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>Search:<input type="search" class="" placeholder="" aria-controls="DataTables_Table_0"></label></div><table class="table item-table dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                <thead>
                    <tr role="row"><th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Customer Code: activate to sort column descending" style="width: 261px;">Customer Code</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Customer Name: activate to sort column ascending" style="width: 272px;">Customer Name</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Address: activate to sort column ascending" style="width: 161px;">Address</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Contact No: activate to sort column ascending" style="width: 201px;">Contact No</th></tr>
                </thead>
                <tbody>
                   @foreach($customers as $row)                        
                                                
                         <tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">{{$row->customer_code}}</td>
                            <td>{{$row->customer_name}}</td>
                            <td>{{$row->address}}</td>
                            <td>{{$row->contact}}</td>
                        </tr>
                        @endforeach
                      
                       </tbody>
            </table><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite"></div><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a class="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" id="DataTables_Table_0_previous">Previous</a><span><a class="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0">1</a></span><a class="paginate_button next disabled" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" id="DataTables_Table_0_next">Next</a></div></div>
        </div>
@endsection
