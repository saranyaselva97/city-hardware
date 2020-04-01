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
                <li class="breadcrumb-item active"><span class="fa fa-user-secret"></span> User Groups</li>
            </ol>
        </div>
    </div>
    <div class="row" style="padding: 15px; padding-top: 0px;">
        <div id="tabs" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 border-radius-all-0 ui-tabs ui-widget ui-widget-content ui-corner-all">
            <ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
                <li class="ui-state-default ui-corner-top ui-tabs-active ui-state-active" role="tab" tabindex="0" aria-controls="tabs-1" aria-labelledby="ui-id-1" aria-selected="true"><a href="#tabs-1" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-1">Create Group</a></li>
                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="tabs-2" aria-labelledby="ui-id-2" aria-selected="false"><a href="#tabs-2" class="ui-tabs-anchor" role="presentation" tabindex="-1" id="ui-id-2">Group Privilages</a></li>
            </ul>
            <div id="tabs-1" aria-labelledby="ui-id-1" class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel" aria-expanded="true" aria-hidden="false">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <form action="c_master.php?action=susg" method="post">
                        <div class="col-md-3">
                            <label for="group_name">Group Name</label>
                            <input type="text" name="Group_Name" class="form-control" id="group_name" required="">
                        </div>
                        <div class="col-md-3">
                            <br>
                            <button type="submit" class="btn btn-primary"><span class="fa fa-send"></span> Save Group</button>
                        </div>
                    </form>
                </div>
            </div>
            <div id="tabs-2" aria-labelledby="ui-id-2" class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel" aria-expanded="false" aria-hidden="true" style="display: none;">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <form action="c_master.php?action=sgrp" method="post">
                        <div class="col-md-3">
                            <label for="user_group">User Group</label>
                            <select name="User_Group" id="user_group" class="form-control">
                                <option value="">-Select-</option>
                                                                    <option value="1">Admin</option>
                                                                        <option value="2">Cashier</option>
                                                                        <option value="7">general user</option>
                                                                        <option value="6">outlet</option>
                                                                        <option value="5">Sales Rep</option>
                                                                        <option value="3">Test</option>
                                                                </select>
                        </div>
                        <div class="col-md-3">
                            <label for="module">Module</label>
                            <select name="Module" id="module" class="form-control" onchange="getPrivilageDetails();">
                                <option value="">-Select-</option>
                                                                    <option value="4">Customer Reports</option>
                                                                        <option value="2">Inventory</option>
                                                                        <option value="7">Master Data</option>
                                                                        <option value="5">Stock Reports</option>
                                                                        <option value="3">Supplier Reports</option>
                                                                        <option value="6">Transaction Reports</option>
                                                                        <option value="1">Transactions</option>
                                                                        <option value="8">User Management</option>
                                                                </select>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 pull-left">
                            <ul id="check_box_ul">

                            </ul>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 pull-left">
                            <button type="submit" class="btn btn-primary pull-right"><span class="fa fa-send"></span> Save Privilages</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>                                </div>

@endsection

@section('scripts')
<script>
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });

        $(document).ready(function () {
            $('.item-table').DataTable();
        });

        function closeAlert(div) {
            //var div = this.parentElement;
            div.style.opacity = "0";
            setTimeout(function () {
                div.style.display = "none";
                div.style.opacity = "1";
            }, 600);
        }

        $('.datepicker').datepicker({format: "yyyy/mm/dd"});
        
        $("#tabs").tabs();
    </script>
@endsection