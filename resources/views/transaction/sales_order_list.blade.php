@extends('layouts.home')
@section('content')
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <div class="col-md-12 content-box">
    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Transactions</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-indent"></span> Sales Order List</li>
            </ol>
        </div>
    </div>
    <?php 
                if(isset($_SESSION["save_success"])){
            ?>
            <div class="alert alert-danger col-md-12" id="item_error_msg">
                <span class="closebtn" onclick="closeAlert(this.parentElement)">&times;</span>
                <span><?php echo $_SESSION["save_success"] ?></span>
            </div>
            <?php 
                unset($_SESSION["save_success"]);
                }
            ?>
            
    
    <div class="row" style="padding: 15px;">
        <div class="col-md-12 shadow" style="padding: 15px; margin-bottom: 15px;">
            <table class="table">
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Order Date</th>
                        <th>Net Amount</th>
                        <th>Customer</th>
                        <th>Sales Rep</th>
                        <th>Create Invoice</th>
                    </tr>
                </thead>
                <tbody>
                @foreach($sales as $sale =>$sale_vale)
                    <tr>
                        <td>{{$sale_vale->Order_Number}}</td>
                        <td>{{$sale_vale->Order_Date}}</td>
                        <td>{{$sale_vale->Net_Amount}}</td>
                        <td>{{$sale_vale->customer->customer_name}}</td>
                        <td>{{$sale_vale->user->name}}</td>
                        <td>
                            <a href="salestoinvoice/{{$sale_vale->id}}"class="btn btn-primary"><span class="fa fa-plus"></span> Create Invoice</a>
                        </td>
                    </tr>
                    @endforeach
                  </tbody>
            </table>
        </div>
    </div>
</div> 
   </div>

@endsection
