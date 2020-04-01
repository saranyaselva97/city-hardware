@extends('layouts.home')
@section('content')

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <div class="col-md-12 content-box">
    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Transactions</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-puzzle-piece"></span>Invoice Return</li>
            </ol>
        </div>
    </div>
    
        
    <div class="row" style="padding: 15px;">
        <div class="col-md-12 shadow" style="padding: 15px; margin-bottom: 15px;">
            <form action="c_transactions.php" method="get">
            <!--<form action="c_transactions.php?action=inrt" method="get">-->
            <input type="hidden" name="action" id="action" value="inrt">
                <table>
                    <tbody><tr>
                        <td style="padding:5px">Invoice No : </td>
                        <td style="padding:5px">
                            <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="invoice_no" id="invoice_no" class="form-control ui-autocomplete-input" value="" autocomplete="off">
                            <input type="hidden" name="idn" id="idn" class="form-control">
                        </td>  
                        <td style="padding:5px">
                            <button type="submit" class="btn btn-primary"><span class="fa fa-send"></span> View Details </button>
                        </td>
                    </tr>
                </tbody></table>
            </form>
        </div>
    </div>
    </div>                                </div>
@endsection
