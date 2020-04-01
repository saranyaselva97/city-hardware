@extends('layouts.home')
@section('content')
<div class="col-xs-15">
          <div class="box box-info">
          <div class="box-header with-bstock_category">
            <h3 class="box-title">Payment Receivable Detail</h3>

            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                <i class="fa fa-minus"></i></button>
              <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                <i class="fa fa-times"></i></button>
            </div>
          </div>
          <div class="box-body">

            <div class="row" style="width:100%;margin-left:5px">
                      <div class="col-xs-12">
                        <div class="bootstrap-table"><div class="fixed-table-toolbar"><div class="columns columns-right btn-group pull-right">
                          
                            
                                  
                                   
                                </div></div><div class="fixed-table-container" style="padding-bottom: 0px;">
                                <div class="fixed-table-header" style="display: none;">
                                <table></table></div><div class="fixed-table-body">
                                    <div class="fixed-table-loading" style="top: 50px; display: none;">
                                </div><table id="table" class="table table-responsive table-hover" data-toggle="table" data-url="http://127.0.0.1:8000/stock/get/availability" data-pagination="true" data-side-pagination="server" data-page-list="[10, 20, 30 , 40 , 50, 100, 200]" data-search="true" data-show-refresh="true" data-show-toggle="true" data-sort-name="stock_id" data-sort-order="desc">
                            <thead><tr><th style="text-align: center; " data-field="stock_id" tabindex="0"><div class="th-inner sortable both desc">Invoice ID</div><div class="fht-cell"></div></th><th style="text-align: center; " data-field="category.category_name" tabindex="0">
                            <div class="th-inner sortable both">Customer Name</div><div class="fht-cell">

                            </div></th><th style="text-align: center; " data-field="stock_name" tabindex="0">
                            <div class="th-inner sortable both">Date</div><div class="fht-cell"></div>
                        </th><th style="text-align: center; " data-field="purchase_cost" tabindex="0">
                        <div class="th-inner sortable both">Gross Amount</div><div class="fht-cell">

                        </div></th><th style="text-align: center; " data-field="selling_cost" tabindex="0">
                        <div class="th-inner sortable both">Discount</div><div class="fht-cell">

                        </div></th><th style="text-align: center; " data-field="stock_quantity" tabindex="0">
                        <div class="th-inner sortable both">Net Amount</div><div class="fht-cell">
                            
                        </div></th><th style="text-align: center; " data-field="stock_quantity" tabindex="0">
                        <div class="th-inner sortable both">Paid Amount</div><div class="fht-cell">
                            
                        </div></th><th style="text-align: center; " data-field="stock_quantity" tabindex="0">
                        <div class="th-inner sortable both">Returned</div><div class="fht-cell">
                            
                        </div></th><th style="text-align: center; " data-field="stock_quantity" tabindex="0">
                       <!-- <div class="th-inner sortable both">Balance</div><div class="fht-cell">-->
                            
                        </div></th></tr></thead>
                        <tbody>
                            <tr class="no-records-found">
                                <td colspan="6"></td></tr></tbody></table></div>
                                <div class="fixed-table-footer" style="display: none;"><
                                    table><tbody><tr></tr></tbody></table></div>
                                    <div class="fixed-table-pagination" style="display: none;"><div class="pull-left pagination-detail">
                                    
                                        <span class="page-list" style="display: none;"><span class="btn-group dropup"><button type="button" class="btn btn-default  dropdown-toggle" data-toggle="dropdown"><span class="page-size">10</span> <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li class="active"><a href="javascript:void(0)">10</a></li></ul></span> records per page</span></div><div class="pull-right pagination" style="display: none;"><ul class="pagination"><li class="page-pre"><a href="javascript:void(0)">‹</a></li><li class="page-next"><a href="javascript:void(0)">›</a></li></ul></div></div></div></div><div class="clearfix"></div>
                     
                                        <div class="full-width no-print">
                <button class="btn btn-primary" style="float: right; margin-right: 30px; margin-top: 30px;" onclick="window.print();"><span class="fa fa-print"></span>&nbsp;Print</button>
            </div>               </div>
            </div>

            </div>

          </div> 
          
          </div>

          
          <!-- /.box-body -->
          </div>
@endsection
