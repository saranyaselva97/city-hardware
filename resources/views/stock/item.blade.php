@extends('layouts.home')
@section('content')
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <div class="col-md-12 content-box">
    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Master Data</a></li>
                <li class="breadcrumb-item"><a href="c_master.php?action=nitm">Item Master</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-cubes"></span> New Item</li>
            </ol>
        </div>
    </div>
    @if(\Session::has('success'))
      <div class="alert alert-success">
      <p>{{\Session::get('success')}}</p>
      </div>
    
    @endif

    <div class="row" style="padding: 15px; padding-top: 0px;">
                <div class="col-md-12 shadow" style="padding: 15px; padding-bottom: 0px; margin-bottom: 15px;">
            <div class="alert alert-danger col-md-12" id="item_error_msg" style="display: none;">
                <span class="closebtn" onclick="closeAlert(this.parentElement)">×</span>
                <span id="error_msg"></span>
            </div>
                        <form method="post" action="{{action('ItemController2@store')}}">
                     @csrf
                <table class="table">
                 
                    <thead>
                        <tr>
                            <th>Item Code <span style="color: red">*</span></th>
                            <th>Item Name <span style="color: red">*</span></th>
                            <th>Re-Order Level</th>
                            <th>Selling Price <span style="color: red">*</span></th>
                            <th>Label Price <span style="color: red">*</span></th>
                            <th>Category <span style="color: red">*</span></th>
                            <th>Measurement Unit <span style="color: red">*</span></th>
                        </tr>
                    </thead>
                    <tbody id="item_tbody">
                        <tr>
                            <td style="width: 130px">
                                <input type="text" name="item_code" id="item_code" class="form-control">
                            </td>
                            <td>
                                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="item_name" id="item_name" class="form-control ui-autocomplete-input" autocomplete="off">
                            </td>
                            <td style="width: 80px">
                                <input type="text" name="re_order_level" id="re_order_level" class="form-control" value="0" onkeypress="return isNumberKey(event)">
                            </td>
                            <td style="width: 80px">
                                <input type="text" name="selling_price" id="selling_price" class="form-control" onkeypress="return isNumberKey(event)">
                            </td>
                            <td style="width: 80px">
                                <input type="text" name="label_price" id="label_price" class="form-control" onkeypress="return isNumberKey(event)">
                            </td>
                            <td style="width: 150px;">
                                <select name="category" id="category" class="form-control">
                                    <option value="">-Select-</option>
                                                                            <option value="4">Agriculture Machinary</option>
                                                                                <option value="6">Electronic Applicance</option>
                                                                                <option value="5">Other Machinary</option>
                                                                                <option value="1">Spare Parts</option>
                                                                        </select>
                            </td>
                            <td style="width: 150px; text-align: center">
                                <select name="measure_unit" id="measure_unit" class="form-control">
                                    <option value="">-Select-</option>
                                                                            <option value="3">Boxes</option>
                                                                                <option value="2">Packets</option>
                                                                                <option value="1">Unit</option>
                                                                        </select>
                                <button type="submit" class="btn btn-primary" id="btn_add_item" style="margin-top: 10px">
                                    <span class="fa fa-plus"></span> Add Item
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="col-md-12" style="padding: 15px;">
                    <input type="hidden" name="item_row_count" id="item_row_count">
                    <button type="submit" class="btn btn-primary pull-right" style="display: none;" id="save_item_button"><span class="fa fa-send-o"></span> Save Items</button>
                </div>
            </form>
        </div>
                <div class="col-md-12 shadow" style="background-color: #fff; padding: 15px;"> 
            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer"><div class="dataTables_length" id="DataTables_Table_0_length"><label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>Search:<input type="search" class="" placeholder="" aria-controls="DataTables_Table_0"></label></div><table class="table item-table dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                <thead>
                    <tr role="row"><th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Item Code: activate to sort column descending" style="width: 102px;">Item Code</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style="width: 127px;">Item Name</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Re-Order Level: activate to sort column ascending" style="width: 145px;">Re-Order Level</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Selling Price: activate to sort column ascending" style="width: 120px;">Selling Price</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Label Price: activate to sort column ascending" style="width: 110px;">Label Price</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Category: activate to sort column ascending" style="width: 180px;">Category</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Measurement Unit: activate to sort column ascending" style="width: 173px;">Measurement Unit</th></tr>
                </thead>
                <tbody>
                                            
                                                
                                                
                                                
                                                
                                                
                                                
                                        <tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">f001</td>
                            <td>Temp Item</td>
                            <td>200</td>
                            <td>50</td>
                            <td>55</td>
                            <td>Other Machinary</td>
                            <td>Packets</td>
                        </tr><tr role="row" class="even">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">f001</td>
                            <td>Temp Item</td>
                            <td>1</td>
                            <td>100</td>
                            <td>105</td>
                            <td>Other Machinary</td>
                            <td>Packets</td>
                        </tr><tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">f002</td>
                            <td>Temp Item</td>
                            <td>100</td>
                            <td>300</td>
                            <td>320</td>
                            <td>Other Machinary</td>
                            <td>Packets</td>
                        </tr><tr role="row" class="even">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">f003</td>
                            <td>Temp Item</td>
                            <td>100</td>
                            <td>300</td>
                            <td>320</td>
                            <td>Other Machinary</td>
                            <td>Boxes</td>
                        </tr><tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">f004</td>
                            <td>Temp Item</td>
                            <td>20</td>
                            <td>100</td>
                            <td>120</td>
                            <td>Agriculture Machinary</td>
                            <td>Boxes</td>
                        </tr><tr role="row" class="even">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">v0001</td>
                            <td>Temp Item</td>
                            <td>100</td>
                            <td>35</td>
                            <td>30</td>
                            <td>Agriculture Machinary</td>
                            <td>Boxes</td>
                        </tr><tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">v0002</td>
                            <td>Temp Item </td>
                            <td>25</td>
                            <td>110</td>
                            <td>150</td>
                            <td>Agriculture Machinary</td>
                            <td>Boxes</td>
                        </tr></tbody>
            </table><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 7 of 7 entries</div><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a class="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" id="DataTables_Table_0_previous">Previous</a><span><a class="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0">1</a></span><a class="paginate_button next disabled" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" id="DataTables_Table_0_next">Next</a></div></div>
        </div>
    </div>
</div>                                </div>

@endsection



