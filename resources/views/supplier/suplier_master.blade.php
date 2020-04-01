@extends('layouts.home')
@section('content')

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <div class="col-md-12 content-box">
    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Master Data</a></li>
                <li class="breadcrumb-item"><a href="c_master.php?action=nspl">Supplier Master</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-male"></span> New Supplier</li>
            </ol>
        </div>
    </div>

    <div class="row" style="padding: 15px; padding-top: 0px;">
                <div class="col-md-12 shadow" style="padding: 15px; padding-bottom: 0px; margin-bottom: 15px;">
            <div class="alert alert-danger col-md-12" id="item_error_msg" style="display: none;">
                <span class="closebtn" onclick="closeAlert(this.parentElement)">×</span>
                <span id="error_msg"></span>
            </div>
                        <form action="c_master.php?action=sspl" method="post">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Supplier Code <span style="color: red">*</span></th>
                            <th>Supplier Name <span style="color: red">*</span></th>
                            <th>Address</th>
                            <th>Contact No</th>
                        </tr>
                    </thead>
                    <tbody id="supplier_tbody">
                        <tr>
                            <td>
                                <input type="text" name="supplier_code" id="supplier_code" class="form-control">
                            </td>
                            <td>
                                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="supplier_name" id="supplier_name" class="form-control ui-autocomplete-input" autocomplete="off">
                            </td>
                            <td>
                                <textarea name="address" id="address" class="form-control"></textarea>
                            </td>
                            <td style="width: 150px; text-align: center">
                                <input type="text" maxlength="10" name="contact" id="contact" class="form-control" onkeypress="return isNumberKey(event);">
                                <button type="button" class="btn btn-primary" id="btn_add_item" style="margin-top: 10px" onclick="addSupplierRow();">
                                    <span class="fa fa-plus"></span> Add Supplier
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="col-md-12" style="padding: 15px;">
                    <input type="hidden" name="supplier_row_count" id="supplier_row_count">
                    <button type="submit" class="btn btn-primary pull-right" style="display: none;" id="save_supplier_button"><span class="fa fa-send-o"></span> Save Suppliers</button>
                </div>
            </form>
        </div>
                <div class="col-md-12 shadow" style="background-color: #fff; padding: 15px;"> 
            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer"><div class="dataTables_length" id="DataTables_Table_0_length"><label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>Search:<input type="search" class="" placeholder="" aria-controls="DataTables_Table_0"></label></div><table class="table item-table dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                <thead>
                    <tr role="row"><th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Supplier Code: activate to sort column descending" style="width: 183px;">Supplier Code</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Supplier Name: activate to sort column ascending" style="width: 361px;">Supplier Name</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Address: activate to sort column ascending" style="width: 215px;">Address</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Contact No: activate to sort column ascending" style="width: 152px;">Contact No</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending" style="width: 98px;">Status</th></tr>
                </thead>
                <tbody>
                                            
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                        <tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">01</td>
                            <td>Dinyi Power Mechinary co-ltd</td>
                            <td>Shangdong</td>
                            <td></td>
                            <td>Active</td>
                        </tr><tr role="row" class="even">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">02</td>
                            <td>Shegiang Machinary co-ltd</td>
                            <td>Thazhen,chaina.</td>
                            <td></td>
                            <td>Active</td>
                        </tr><tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">03</td>
                            <td>Liguio Textiler&amp;Machinary Pvt Ltd</td>
                            <td>Thazhen, Chaina.</td>
                            <td></td>
                            <td>Active</td>
                        </tr><tr role="row" class="even">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">04</td>
                            <td>Foshan Electronic Coperate</td>
                            <td>Foshan City, Chaina.</td>
                            <td></td>
                            <td>Active</td>
                        </tr><tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">05</td>
                            <td>Shegiang Electrical Machinary</td>
                            <td>Thaizhan, Chaina</td>
                            <td></td>
                            <td>Active</td>
                        </tr><tr role="row" class="even">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">06</td>
                            <td>Quangdon Electrical Pvt Ltd</td>
                            <td>Foshan city, Chaina</td>
                            <td></td>
                            <td>Active</td>
                        </tr><tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">07</td>
                            <td>Horizan Agro (pvt) Ltd</td>
                            <td>Rathnapura.</td>
                            <td></td>
                            <td>Active</td>
                        </tr><tr role="row" class="even">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">12</td>
                            <td>ji</td>
                            <td>mn,m,</td>
                            <td></td>
                            <td>Active</td>
                        </tr><tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">12</td>
                            <td>tj</td>
                            <td>jaffna</td>
                            <td></td>
                            <td>Active</td>
                        </tr><tr role="row" class="even">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">HGHFTF</td>
                            <td>FYF</td>
                            <td>HDTRD</td>
                            <td></td>
                            <td>Active</td>
                        </tr></tbody>
            </table><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 11 entries</div><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a class="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" id="DataTables_Table_0_previous">Previous</a><span><a class="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0">1</a><a class="paginate_button " aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0">2</a></span><a class="paginate_button next" aria-controls="DataTables_Table_0" data-dt-idx="3" tabindex="0" id="DataTables_Table_0_next">Next</a></div></div>
        </div>
    </div>
</div>                                </div>
@endsection



