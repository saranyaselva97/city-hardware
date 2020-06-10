@extends('layouts.home')
@section('content')
<section class="content">
<div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="/dashboard">Hi {{ Auth::user()->name }} !! Welcome Back.</a></li>
              
            </ol>
        </div>
    </div>
      
      <div class="row">
      
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>{{count($items)}}</h3>

              <p>Total Products</p>
            </div>
            <div class="icon">
              <i class="fa fa-briefcase"></i>
            </div>
            <a href="/item" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>{{count($trans)}}</h3>

              <p>Sales Transactions</p>
            </div>
            <div class="icon">
              <i class="fa fa-shopping-cart"></i>
            </div>
            <a href="sales_order_list" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>{{count($sup)}}</h3>

              <p>Suppliers</p>
            </div>
            <div class="icon">
              <i class="fa fa-truck"></i>
            </div>
            <a href="suplier_master" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-red">
            <div class="inner">
              <h3>{{count($cust)}}</h3>

              <p>Customers</p>
            </div>
            <div class="icon">
              <i class="fa fa-group"></i>
            </div>
            <a href="customer_master" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
      </div>

      

      <div class="row">
        <div class="col-xs-12">
          <div class="box box-info">
          <div class="box-header with-bstock_category">
            <h3 class="box-title">Stock Availability</h3>

            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                <i class="fa fa-minus"></i></button>
              <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                <i class="fa fa-times"></i></button>
            </div>
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
</div>      
          <!-- /.box-body -->
          </div>
        </div>  
      </section>

@endsection
