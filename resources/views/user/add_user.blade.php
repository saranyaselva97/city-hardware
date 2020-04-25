@extends('layouts.home')

@section('content')
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <div class="col-md-12 content-box">
    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Master Data</a></li>
                <li class="breadcrumb-item"><a href="c_master.php?action=nusr">User Master</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-users"></span> New User</li>
            </ol>
        </div>
    </div>

    <div class="row" style="padding: 15px; padding-top: 0px;">
                <div class="col-md-12 shadow" style="padding: 15px; padding-bottom: 0px; margin-bottom: 15px;">
            <div class="alert alert-danger col-md-12" id="item_error_msg" style="display: none;">
                <span class="closebtn" onclick="closeAlert(this.parentElement)">×</span>
                <span id="error_msg"></span>
            </div>
            </div> <form method="POST" action="{{ route('register') }}">
             @csrf
                <table class="table">
                    <thead>
                        <tr>
                            <th>First Name <span style="color: red">*</span></th>
                            <th>Last Name <span style="color: red">*</span></th>
                            <th>Username <span style="color: red">*</span></th>
                            <th>Password <span style="color: red">*</span></th>
                            
                            <th>Confirm Password <span style="color: red">*</span></th>
                           
                            <th>User Group</th>
                        </tr>
                    </thead>
                    <tbody id="user_tbody">
                        <tr>
                            <td>
                                <input id="fname" type="text" class="form-control @error('fname') is-invalid @enderror" name="fname" value="{{ old('fname') }}" required autocomplete="fname" autofocus>

                                @error('fname')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </td>
                            <td>
                               <input id="lname" type="text" class="form-control @error('lname') is-invalid @enderror" name="lname" value="{{ old('lname') }}" required autocomplete="lname" autofocus>

                                @error('lname')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </td>
                            <td>
                               <input id="email" type="text" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </td>
                            <td>
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </td>
                            <td>
                                <input id="password-confirm" type="password" class="form-control @error('password') is-invalid @enderror" name="password_confirmation" required autocomplete="new-password">

                               
                            </td>
                            
                            <td style="width: 150px; text-align: center">
                                <select name="user_group" id="user_group" class="form-control">
                                    <option value="">-Select-</option>
                                                                        <option value="1">Admin</option>
                                                                        <option value="2">Cashier</option>
                                                                        <option value="7">general_user</option>
                                                                        <option value="6">outlet</option>
                                                                        <option value="5">Sales Rep</option>
                                                                        <option value="3">Test</option>
                                                                    </select>
                               <button type="submit"  class="btn btn-primary" style="margin-top: 10px" ><span class="fa fa-plus"></span>
                                    {{ __('Add Users') }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="col-md-12" style="padding: 15px;">
                    <input type="hidden" name="Row_Count" id="user_row_count">
                    <button type="submit" class="btn btn-primary pull-right" style="display: none;" id="save_user_button"><span class="fa fa-send-o"></span> Save Users</button>
                </div>
            </form>
        </div>
                <div class="col-md-12 shadow" style="background-color: #fff; padding: 15px;"> 
            <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer"><div class="dataTables_length" id="DataTables_Table_0_length"><label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div><div id="DataTables_Table_0_filter" class="dataTables_filter"><label>Search:<input type="search" class="" placeholder="" aria-controls="DataTables_Table_0"></label></div><table class="table item-table dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                <thead>
                    <tr role="row"><th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending" aria-label="First Name: activate to sort column descending" style="width: 220px;">First Name</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Last Name: activate to sort column ascending" style="width: 220px;">Last Name</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Username: activate to sort column ascending" style="width: 212px;">Username</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="User Group: activate to sort column ascending" style="width: 225px;">User Group</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending" style="width: 152px;">Status</th></tr>
                </thead>
                <tbody>
                                            
                                                
                                                
                                                
                                                
                                                
                                        <tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">User</td>
                            <td>ara</td>
                            <td>User</td>
                            <td>Admin</td>
                            <td>Active</td>
                        </tr><tr role="row" class="even">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">User</td>
                            <td>Name</td>
                            <td>cashier</td>
                            <td>Cashier</td>
                            <td>Active</td>
                        </tr><tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">User</td>
                            <td>test</td>
                            <td>test data</td>
                            <td>Sales Rep</td>
                            <td>Active</td>
                        </tr><tr role="row" class="even">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">User</td>
                            <td>test</td>
                            <td>test</td>
                            <td>Admin</td>
                            <td>Active</td>
                        </tr><tr role="row" class="odd">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">User</td>
                            <td>Test</td>
                            <td>Test</td>
                            <td>Admin</td>
                            <td>Active</td>
                        </tr><tr role="row" class="even">
                            <!--<td><a href="c_master.php?action=ditm&crd="><span class="fa fa-times" style="font-size: 20px; color: #3a3a3a"></span></a></td>
                            <td><a href="c_master.php?action=eitm&crd="><span class="fa fa-pencil" style="font-size: 20px; color: #3a3a3a"></span></a></td>-->
                            <td class="sorting_1">Test</td>
                            <td>Test</td>
                            <td>Test</td>
                            <td>Test</td>
                            <td>Test</td>
                        </tr></tbody>
            </table><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 6 of 6 entries</div><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><a class="paginate_button previous disabled" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" id="DataTables_Table_0_previous">Previous</a><span><a class="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0">1</a></span><a class="paginate_button next disabled" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" id="DataTables_Table_0_next">Next</a></div></div>
        </div>
    </div>
</div>                                </div>
@endsection
