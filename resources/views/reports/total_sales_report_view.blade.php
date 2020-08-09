
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
                        
                        <h3>Total Sales Report | <span style="font-size: 15px; font-weight: 900;">From Date:  {{$fromDate}}| To Date : {{$toDate}}| Location : {{$locationName}}</span></h3>
                                                            
                        <p style="float: right; font-weight: bold; font-size: 12px; margin-right: 15px"><?php echo "Printed On : " . date("Y-m-d") ?></p>
                    </div>

                    <div class="full-width">
            <table class="details-table">
                
                <thead>
                    <tr>
                                    
                        <th>Date of Sale</th>
                                                                        
                        <th>Gross Amount</th>
                        <th>Total Discount</th>
                        <th>Total Return</th>
                        <th>Net Amount</th>
                    </tr>
                </thead>
                <?php
                $pageGrossAmount=0;
                $pageTotalDiscount=0;
                $pageReturnAmount=0;
                $pageNetAmount=0;
                
                
                foreach ($details as $detail) {
                    ?>
                <tr>
                   
                    <td class="number-column"><?php echo $detail["Invoice_Date"]?></td>
                   
                    <td class="number-column"><?php echo $detail["Gross_Amount"] === "0.00" ? "-" : number_format($detail["Gross_Amount"], 2, ".", ",") ?></td>
                    <td class="number-column"><?php echo $detail["Total_Discount"] === "0.00" ? "-" : number_format($detail["Total_Discount"], 2, ".", ",") ?></td>
                    <td class="number-column"><?php echo $detail["Return_Amount"] === "0.00" ? "-" : number_format($detail["Return_Amount"], 2, ".", ",") ?></td>
                    <td class="number-column"><?php echo $detail["Net_Amount"] === "0.00" ? "-" : number_format($detail["Net_Amount"], 2, ".", ",") ?></td>
                </tr>
                <?php
                $pageGrossAmount+=$detail["Gross_Amount"];
                $pageTotalDiscount+=$detail["Total_Discount"];
                $pageReturnAmount+=$detail["Return_Amount"];
                $pageNetAmount+=$detail["Net_Amount"];
                ?>
                <?php }?>
                <tr> <td colspan="7"></td> </tr>
                <tr> <td colspan="7"></td> </tr>

                <tr>
                    <td colspan="7">
                        <table class="details-table" style="width:100%;border-bottom: 1px solid; border-top: 1px solid">
                        <tr>
                           <th></th>
                           <th class="number-column">page Gross Amount</th>
                           <th class="number-column">page Total Discount</th>
                           <th class="number-column">page Return Amount</th>
                           <th class="number-column">page Net Amount</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td class="number-column"><?php echo $pageGrossAmount;?></td>
                            <td class="number-column"><?php echo $pageTotalDiscount;?></td>
                            <td class="number-column"><?php echo $pageReturnAmount;?></td>
                            <td class="number-column"><?php echo $pageNetAmount;?></td>
                        </tr>
                        <tr> <td colspan="7"></td> </tr>
                        <tr> <td colspan="7"></td> </tr>
                        </table>
                    </td>
                </tr>
                
                
            </table>

        </div>    
        <div class="full-width">
        <br>
        <br>
        <br>
        <br>
            <p>.................................................................................................</p>
                    <p>    Owner / Warehouse Keeper / Cashier   </p>
        </div>     
        <div class="full-width">
            <button class="btn btn-primary no-print" style="float: right; margin-right: 30px; margin-top: 30px;" onclick="window.print();"><span class="fa fa-print"></span>&nbsp;Print</button>
        </div>

@endsection

@section('scripts')


@endsection

