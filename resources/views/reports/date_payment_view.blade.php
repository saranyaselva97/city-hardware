
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
                        
              <h3>Date Wise Payment Report | <span style="font-size: 15px; font-weight: 900;">From Date:  {{$fromDate}}| To Date : {{$toDate}}| Location : {{$locationName}}</span></h3>
                                                            
            <p style="float: right; font-weight: bold; font-size: 12px; margin-right: 15px"><?php echo "Printed On : " . date("Y-m-d") ?></p>
          </div>

          <div class="full-width">
                <table class="details-table"  style="text-align: center">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th style="min-width: 130px;">Supplier</th>
                            <th>GRN No</th>
                          
                          
                            <th>Payments</th>
                         
                        </tr>
                    </thead>
                    <tbody>
                    <?php
                  
                        $totalGrossAmount = 0;
                        $totalSales = 0;
                        $totalPayments = 0;
                        $totalCheques = 0;
                        $totalCredit = 0;
                        //$totalProfit = 0;

                        foreach ($details as $detail) {
                           
                            //$totalProfit += $detail["Profit"];
                             
                            $totalGrossAmount += $detail["Gross_Amount"];
                        
                            $totalPayments += $detail["Payments"];
                         
                     
                            ?>
                            <tr>
                                <td><?php echo $detail["created_at"] ?></td>
                                <td>{{$supplier}}</td>
                                <td><?php echo $detail["Grn_Code"] ?></td>
                            
                                <td class="number-column"><?php echo $detail["Payments"] === "0.00" ? "-" : number_format($detail["Payment"], 2, ".", ",") ?></td>
                    
                            </tr>
                            <?php
                            
                        }
                        ?>
                         <tr style="background-color: #ccc; font-weight: bold;">
                            <td>Total</td>
                            <td></td>
                            <td></td>
                          
                            <td style="border-top: 1px solid black; border-bottom: 1px solid black" class="number-column"><?php echo number_format($totalGrossAmount, 2, ".", ",") ?></td>

                      
                        </tr>
                     
                       
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="full-width">
            <button class="btn btn-primary no-print" style="float: right; margin-right: 30px; margin-top: 30px;" onclick="window.print();"><span class="fa fa-print"></span>&nbsp;Print</button>
        </div>
        
@endsection




