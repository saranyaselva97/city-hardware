
@extends('layouts.home')
@section('content')

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <link rel="stylesheet" href="assests/css/report_styles.css">
                            
<div class="row" style="margin-left: 0px; margin-right: 0px;  padding: 10px;">

        <div class="full-width report-header">
            <p class="company-name"> <img id="dmac_logo" src="assests/images/dmac_trans.png" alt="dmac" style="width: 120px; height: auto">City Hardware (Pvt) Ltd</p>
            <p>K.K.S Road,Jaffna. Sri Lanka</p>
        </div>
        <div class="full-width">
            <h3>Stock Sheet | <span style="font-size: 15px; font-weight: 900;">Location : Outlet</span></h3>
            <p style="float: right; font-weight: bold; font-size: 12px; margin-right: 15px">Printed On : 2020-07-22</p>
        </div>
        <div class="full-width">
            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper"><div class="dataTables_length" id="DataTables_Table_0_length"><label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>Search:<input type="search" class="" placeholder="" aria-controls="DataTables_Table_0"></label></div><table class="item-table dataTable" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                <thead>
                    <tr role="row"><th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Item Code: activate to sort column descending" style="width: 67px;">Item Code</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Item Name: activate to sort column ascending" style="width: 90px;">Item Name</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Average Price: activate to sort column ascending" style="width: 93px;">Average Price</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Quantity: activate to sort column ascending" style="width: 63px;">Quantity</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Total Amount: activate to sort column ascending" style="width: 84px;">Total Amount</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Rate: activate to sort column ascending" style="width: 35px;">Rate</th></tr>
                </thead>
                <tbody>
                    <?php
                    $totalQuantity = 0;
                    $totalAmount = 0;

                    foreach ($reportDetails as $reportDetail) {
                        ?>
                        <tr style="text-align: center">
                            <td><?php echo $reportDetail["item_code"] ?></td>
                            <td><?php echo $reportDetail["item_name"] ?></td>
                            <td class="number-column"><?php echo number_format($reportDetail["Average_Price"], 2, ".", ",") ?></td>
                            <td class="number-column"><?php echo number_format($reportDetail["Quantity"], 0, ".", ",") ?></td>
                            <td class="number-column"><?php echo number_format($reportDetail["Total_Amount"], 2, ".", ",") ?></td>
                            <td class="number-column"><?php echo number_format($reportDetail["selling_price"], 2, ".", ",") ?></td>
                        </tr>
                        <?php
                        $totalQuantity += $reportDetail["Quantity"];
                        $totalAmount += $reportDetail["Total_Amount"];
                    }
                    ?>
                <tfoot style="text-align: center">    
                    <tr style="font-weight: bold" style="text-align: center">
                        <td class="number-column" style="background-color: #eee; border-bottom: 1px solid black; border-top: 1px solid black">Total</td>
                        <td class="number-column" style="background-color: #eee; border-bottom: 1px solid black; border-top: 1px solid black"></td>
                        <td class="number-column" style="background-color: #eee; border-bottom: 1px solid black; border-top: 1px solid black"></td>
                        <td class="number-column" style="background-color: #eee; border-bottom: 1px solid black; border-top: 1px solid black"><?php echo number_format($totalQuantity, 2, ".", ",") ?></td>
                        <td class="number-column" style="background-color: #eee; border-bottom: 1px solid black; border-top: 1px solid black"><?php echo number_format($totalAmount, 2, ".", ",") ?></td>
                        <td class="number-column" style="background-color: #eee; border-bottom: 1px solid black; border-top: 1px solid black"></td>
                    </tr>
                </tfoot>    
<!--                    <tr style="font-weight: bold">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="number-column" style="border-top: 1px solid black"></td>
                        <td class="number-column" style="border-top: 1px solid black"></td>
                        <td></td>
                    </tr>-->
                </tbody>
<!--                    <tr style="font-weight: bold">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="number-column" style="border-top: 1px solid black"></td>
                        <td class="number-column" style="border-top: 1px solid black"></td>
                        <td></td>
                    </tr>-->
                
            </table><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 3 of 3 entries</div><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a class="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" id="DataTables_Table_0_previous">Previous</a><span><a class="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0">1</a></span><a class="paginate_button next disabled" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" id="DataTables_Table_0_next">Next</a></div></div>
        </div>
        <div class="full-width">
            <button class="btn btn-primary no-print" style="float: right; margin-right: 30px; margin-top: 30px;" onclick="window.print();"><span class="fa fa-print"></span>&nbsp;Print</button>
        </div>
    </div>

                                </div>


@endsection

@section('scripts')


@endsection

