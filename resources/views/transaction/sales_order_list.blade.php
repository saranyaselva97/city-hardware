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
                                        <tr>
                        <td>SOR000010</td>
                        <td>2020-03-12</td>
                        <td>110.00</td>
                        <td>cash</td>
                        <td>User</td>
                        <td>
                            <a href="#" class="btn btn-primary"><span class="fa fa-plus"></span> Create Invoice</a>
                        </td>
                    </tr>
                                    </tbody>
            </table>
        </div>
    </div>
</div>                                </div>

@endsection
