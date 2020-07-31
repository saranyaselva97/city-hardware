
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
                        
                        <h3>Item Wise Sales Report | <span style="font-size: 15px; font-weight: 900;">From Date:  {{$fromDate}}| To Date : {{$toDate}}| Location : {{$locationName}}</span></h3>
                                                            
                        <p style="float: right; font-weight: bold; font-size: 12px; margin-right: 15px"><?php echo "Printed On : " . date("Y-m-d") ?></p>
                    </div>

                    <div class="full-width">
        <tfooter>
                    </tfooter><table class="details-table">
            <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Gross Amount</th>
                        <th>Total Discount</th>                      
                        <th>Net Amount</th>
                    </tr>
            </thead>
            
            <?php 
            $totQuantity =0;
            $totGrossAmount = 0;
            $totDiscount = 0;
            $totNetAmount = 0;
            $lineCount = sizeof($details); 
            $i=0;
            
                    foreach ($details as $detail){
                        
                        
                        ?>
                
            <tr>
                    <td><?php echo $detail["item_name"];?></td>                    
                    <td class="number-column"><?php echo $detail["Quantity"] === "0.00" ? "-" : number_format($detail["Quantity"]) ?></td>
                    <td class="number-column"><?php echo $detail["Gross_Amount"] === "0.00" ? "-" : number_format($detail["Gross_Amount"], 2, ".", ",") ?></td>
                    <td class="number-column"><?php echo $detail["Total_Discount"] === "0.00" ? "-" : number_format($detail["Total_Discount"], 2, ".", ",") ?></td>
                    <td class="number-column"><?php echo $detail["Net_Amount"] === "0.00" ? "-" : number_format($detail["Net_Amount"], 2, ".", ",") ?></td> 



                     <?php                   
                          
                         
                          
                          $totQuantity +=$detail["Quantity"];
                          $totGrossAmount +=$detail["Gross_Amount"];
                          $totDiscount +=$detail["Total_Discount"];
                          $totNetAmount +=$detail["Net_Amount"];
                          
                          $i++;
                          if((!empty($checkbox))&&($lineCount == $i)){?>
                             
                          
                         <?php }
                            
                            ?>                   
                   
                </tr>
                      
                  
                        
                
            <?php
                    }
                    
            ?>
                
                <tfooter>
                    <tr style="border-width:1px 0px;border-style: solid none;border-color: black -moz-use-text-color;-moz-border-top-colors: none;-moz-border-right-colors: none;-moz-border-bottom-colors: none;
                     -moz-border-left-colors: none;border-image: none;padding: 4px 0px;height: 30px;background-color: #F2F3F4;">
                        <th>Grand Total</th>
                        <th class="number-column"><?php echo $totQuantity === "0.00" ? "-" : number_format($totQuantity) ?></th>
                        <th class="number-column"><?php echo $totGrossAmount === "0.00" ? "-" : number_format($totGrossAmount, 2, ".", ",") ?></th>
                        <th class="number-column"><?php echo $totDiscount === "0.00" ? "-" : number_format($totDiscount, 2, ".", ",") ?></th>
                        <th class="number-column"><?php echo $totNetAmount === "0.00" ? "-" : number_format($totNetAmount, 2, ".", ",") ?></th>
                    </tr>
                    <tr style="width:100%;border-bottom: 1px solid; border-top: 1px solid;height: 2px"></tr>
                </tfooter>
              
            
        </table>
        
        
        
    </div>
    <div class="full-width">
            <button class="btn btn-primary no-print" style="float: right; margin-right: 30px; margin-top: 30px;" onclick="window.print();"><span class="fa fa-print"></span>&nbsp;Print</button>
    </div>
        
@endsection




