@extends('layouts.home')
@section('content')
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <link rel="stylesheet" href="assests/css/report_styles.css">
<div class="col-md-12 content-box">
    <div class="row no-print">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Transactions</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-puzzle-piece"></span>Received Payment From Credit Sales</li>
            </ol>
        </div>
    </div>
        
    
        
    <div class="row" style="padding: 15px;">
        <div class="col-md-12 shadow no-print" style="padding: 15px; margin-bottom: 15px;">
            <form action="c_transactions.php" method="get">
            <input type="hidden" name="action" id="action" value="ncspym">
                <table>
                    <tbody><tr>
                        <td style="padding:5px">Invoice Number : </td>
                        <td style="padding:5px">
                            <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="due_invoice_no" id="due_invoice_no" class="form-control ui-autocomplete-input" value="" autocomplete="off">
                            <input type="hidden" name="idn" id="idn" class="form-control">
                            
                        </td>  
                        <td style="padding:5px">
                            <button type="submit" class="btn btn-primary"><span class="fa fa-send"></span> View</button>
                        </td>
                    </tr>
                </tbody></table>
            </form>
        </div>
        
        <div class="col-md-12 shadow no-print" style="padding: 15px; margin-bottom: 15px;">
        <form action="c_transactions.php" method="get">
            <input type="hidden" name="action" value="ncspym">
            <div class="col-md-3">
                <label for="customer_name">Customer Name</label>
                <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="customer_name" id="customer_name" class="form-control ui-autocomplete-input" value="" autocomplete="off">
                <input type="hidden" name="idn" id="idn" class="form-control">
                
            </div>
            <div class="col-md-3">
                
                <label for="frdte">From Date</label>
                <input type="text" name="frdte" id="frdte" class="form-control datepicker" placeholder="From Date" readonly="" required="">
            </div>
            <div class="col-md-3">
                <label for="todte">To Date</label>
                <input type="text" name="todte" id="todte" class="form-control datepicker" placeholder="To Date" readonly="" required="">
            </div>
            <div class="col-md-3">
                <br>
                
                <button type="submit" class="btn btn-primary"><span class="fa fa-send"></span> View</button>
            </div>
            
        </form>
    </div>
    </div>
                                    </div>
                            </div>
@endsection
