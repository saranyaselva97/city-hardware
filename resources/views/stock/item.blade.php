@extends('layouts.home')

@section('content')
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
       <div  class="col-md-12 content-box">
                                    

    <div id="myDIV" class="row" style="padding: 15px; padding-top: 0px;">
        <div  id="tabs" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 border-radius-all-0 ui-tabs ui-widget ui-widget-content ui-corner-all">
            <ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
                <li class="ui-state-default ui-corner-top ui-tabs-active ui-state-active" role="tab" tabindex="0" aria-controls="tabs-1" aria-labelledby="ui-id-1" aria-selected="true"><a href="#tabs-1" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-1">Add New Category</a></li>
                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="tabs-2" aria-labelledby="ui-id-2" aria-selected="false"><a href="#tabs-2" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-2">Measurement Unit</a></li>
            </ul>
            <div id="tabs-1" aria-labelledby="ui-id-1" class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel" aria-expanded="false" aria-hidden="true" style="display: block;">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                   <form method="post" action="{{action('ItemController2@storeCategory')}}">
                    @csrf
                        <div class="col-md-3">
                            <label for="group_name">Category Code</label>
                            <input type="text" name="category_code" class="form-control" id="category_code" required="">
                            <label for="group_name">Category Name</label>
                            <input type="text" name="category_Name" class="form-control" id="category_Name" required="">
                        </div>
                        <div class="col-md-3">
                            <br>
                            <button type="submit" class="btn btn-primary"><span class="fa fa-send"></span> Save Category</button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="tabs-2" aria-labelledby="ui-id-2" class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel" aria-expanded="true" aria-hidden="false" style="display: none;">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <form method="post" action="{{action('ItemController2@StoreMeasurementUnit')}}">
                        @csrf
                        <div class="col-md-3">
                            <label for="user_group">Add Measurement Unit</label>
                            <input type="text" name="measurement_Name" class="form-control" id="measurement_name" required="">
                        </div> 
                        <div class="col-md-3">
                            <br>
                            <button type="submit" class="btn btn-primary"><span class="fa fa-send"></span> Measurement Unit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    

    <button id="myButton2" type="button" onclick="myFunction()" class="btn btn-primary"><span class="fa fa-send"></span>Click Here to Add New Category</button>
    @if(\Session::has('success'))
      <div id='divMessahge'class="alert alert-success">
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
                                    @foreach ($classname_array  as $ct) 
                                        {
                                            <option value='{{ $ct->id }}'>{{ $ct->category_Name }}</option>
                                        }
                                    @endforeach
                              </select>
                            </td>
                            <td style="width: 150px; text-align: center">
                                <select name="measure_unit" id="measure_unit" class="form-control">
                                    <option value="">-Select-</option>
                                    @foreach ($measurements  as $mt) 
                                        {
                                            <option value='{{ $mt->id }}'>{{ $mt->measurement_Name }}</option>
                                        }
                                    @endforeach
                                  
                                    </select>
                                                                    
                                
                                <button type="submit" class="btn btn-primary" id="btn_add_item" style="margin-top: 10px">
                                    <span class="fa fa-plus"></span> Add Item
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
                    <tr role="row"><th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Item Code: activate to sort column descending" style="width: 102px;">Item Code</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style="width: 127px;">Item Name</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Re-Order Level: activate to sort column ascending" style="width: 145px;">Re-Order Level</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Selling Price: activate to sort column ascending" style="width: 120px;">Selling Price</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Label Price: activate to sort column ascending" style="width: 110px;">Label Price</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Category: activate to sort column ascending" style="width: 180px;">Category</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Measurement Unit: activate to sort column ascending" style="width: 173px;">Measurement Unit</th></tr>
                </thead>
                <tbody>
                    @foreach($items as $row)
              
                        <tr role="row" class="odd" style="text-align: center" >
                        
                            <td class="sorting_1">{{$row->item_code}}</td>
                            <td>{{$row->item_name}}</td>
                            <td>{{$row->re_order_level}}</td>
                            <td>{{$row->selling_price}}</td>
                            <td>{{$row->label_price}}</td>
                            <td>{{$row->category}}</td>
                            <td>{{$row->measure_unit}}</td>
                       
                        </tr>
                        @endforeach
                        </tbody>
            </table><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite"></div><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a class="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" id="DataTables_Table_0_previous">Previous</a><span><a class="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0">1</a></span><a class="paginate_button next disabled" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" id="DataTables_Table_0_next">Next</a></div></div>
        </div>
    </div>
</div>                                </div>

@endsection



@section('scripts')
        <script>
    

         $(document).ready(function () {
          // Hide the div
          $("#myDIV").hide();
        
        
      });  
        

        function myFunction() {
        var x = document.getElementById("myDIV");
       
        if (x.style.display === "none") {
            x.style.display = "block";
            $("#myButton2").html("Close");
           
            
        } else {
           
            x.style.display = "none";
            $("#myButton2").html("Click Here to Add New Category");
            $("#divMessahge").hide();
           
        }
        
        }

        
</script>

@endsection