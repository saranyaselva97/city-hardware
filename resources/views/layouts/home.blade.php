
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>City Hardware</title>
 

    <link rel="stylesheet" href="/css/Ionicons/css/ionicons.min.css">

    <link href="/css/app.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/AdminLTE.min.css">
    <link rel="stylesheet" href="/css/bootstrapValidator.min.css">
    <link rel="stylesheet" href="/css/bootstrap-table.css">
    <link rel="stylesheet" href="/css/jquery-ui.min.css">
  

    <link type="text/css"  href="/css/font-awesome/css/font-awesome.min.css" rel="stylesheet">
 <link href="assests/css/bootstrap.css" rel="stylesheet" />
<link href="assests/css/simple-sidebar.css" rel="stylesheet" />
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" />
<link href="../assests/css/bootstrap-datepicker.css" rel="stylesheet" />
<link href="../assests/css/jquery.timepicker.css" rel="stylesheet" />
<link href="../assests/css/notie.css" rel="stylesheet" />

<!--<link href = "https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel = "stylesheet">-->
<link href="../assests/css/styles.css" rel="stylesheet" id="dynamic_styles" />
<link href="../assests/css/main.css" rel="stylesheet" />
<link href="../assests/css/dashboard_styles.css" rel="stylesheet" />
<link href="../assests/css/jquery.dataTables.css" rel="stylesheet"/>
<link href="../assests/css/jquery-ui.css" rel="stylesheet"/>



<link href="http://aehlke.github.io/tag-it/css/jquery.tagit.css" rel="stylesheet" />



</head>

<body class="hold-transition skin-blue sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">

  <header class="main-header">
    <!-- Logo -->
    <a href="http://127.0.0.1:8000/path" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>C</b>H</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg">City Hardware</span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"> </a>
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="/img/user2-160x160.png" class="user-image" alt="User Image">
              <span class="hidden-xs"> {{ Auth::user()->name }} </span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header">
                <img src="/img/user2-160x160.png" class="img-circle" alt="User Image">

                <p>
                {{ Auth::user()->name }} 
                  <small> {{ Auth::user()->email }} </small>
                </p>
              </li>
              
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <a href="#" class="btn btn-default btn-flat">Profile</a>
                </div>
                <div class="pull-right">
                <a href="{{ route('logout') }}" 
                    onclick="event.preventDefault();
                 document.getElementById('logout-form').submit();"  class="btn btn-default btn-flat">
                   Logout
                 </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                      {{ csrf_field() }}
                     </form>

                    
                </div>
              </li>
            </ul>
          </li>
         
        </ul>
      </div>
    </nav>
  </header>

  <!-- =============================================== -->

  <!-- Left side column. contains the sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="/img/user2-160x160.png" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>{{ Auth::user()->email }}</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
    
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
         
        </div>
      </form>
     
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">

        <li class="treeview ">
          <a href="/dashboard"><i class="fa fa-dashboard"></i> <span>Dashboard</span></a>
        </li>

        @can('admin')
       
          <li>
            <a href="#">
              <i class="fa fa-edit"></i> <span>Transactions</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li><a href="/create_grn"><i class="fa fa-map-o"></i>GRN</a></li>
              <li><a href="/create_invoice"><i class="fa fa-newspaper-o"></i> Invoice</a></li>
              <li><a href="/sales_order_list"><i class="fa fa-indent"></i>Sales Order List</a></li>
              <li><a href="/duerecive"><i class="fa fa-money"></i> Due Receivable</a></li>
              <li><a href="/expenses"><i class="fa fa-asl-interpreting"></i>Expences</a></li>
              <li><a href="/sales_order"><i class="fa fa-list-alt"></i> Sales Orders</a></li>
              <li><a href="/item_transfer"><i class="fa fa-puzzle-piece"></i>Item Transfer</a></li>
            </ul>
          </li>
           @endcan
           @can('admin')
          <li class="treeview ">
            <a href="#">
              <i class="glyphicon glyphicon-folder-open"></i> <span>Transaction Reports</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li class=""><a href="/total_sales_report"><i class="fa fa-file-o"></i>Total Sales Amount Report</a></li>
              <li class=""><a href="/item_wise_sales"><i class="fa fa-cubes"></i> Item wise Sales Report</a></li>
          
              <li class=""><a href="http://127.0.0.1:8000/sales/view"><i class="fa fa-file-o"></i>Date wise Incomes</a></li>
              <li class=""><a href="/date_wise_payments"><i class="fa fa-asl-interpreting "></i>Date wise Payments</a></li>
              <li class=""><a href="http://127.0.0.1:8000/sales/view"><i class="fa fa-file-o"></i> Date wise GRN</a></li>
              
            </ul>
          </li>
          @endcan
         
          @can('admin')
          <li class="treeview ">
            <a href="#">
              <i class="glyphicon glyphicon-folder-open"></i> <span>Stock Reports</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li class=""><a href="/stock_details"><i class="fa fa-file-o"></i>Stock Sheets</a></li>
            </ul>
          </li>
          @endcan
          @can('admin')
          <li class="treeview ">
            <a href="#">
              <i class="glyphicon glyphicon-folder-open"></i> <span>Master Data</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li><a href="/suplier_master"><i class="fa fa-male"></i>Supllier Master</a></li>
              <li><a href="/customer_master"><i class="fa fa-user"></i>Customer Master</a></li>
              <li><a href="/item"><i class="fa fa-user-secret"></i>Item Master</a></li>
              <li><a href="/loc"><i class="fa fa-user-secret"></i>Location Master</a></li>
            </ul>
          </li>
          @endcan
          @can('Administer roles & permissions')
          <li>
            <a href="#">
              <i class="fa fa-users"></i> <span>User Management</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li><a href="/users"><i class="fa fa-user"></i>Add Users</a></li>
              <li><a href="/roles"><i class="fa fa-user-secret"></i>Add User Groups and Roles </a></li>
          
            </ul>
          </li>
          @endcan

      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>



  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
  @can('admin')
    <!-- Content Header (Page header) -->
    @yield('content')
  </div>
  @endcan
  <!-- /.content-wrapper -->

 



<script src="/js/app.js"></script>
<script src="/js/app.min.js"></script>
<script src="/js/bootstrapValidator.min.js"></script>
<script src="/js/default.js"></script>
@yield('scripts')

<script src="/js/bootstrap-table.js"></script>
<script src="/js/jquery-ui.min.js"></script>

<script src="../assests/js/grn_scripts.js" type="text/javascript"></script>
    <script src="../assests/js/sales_order_scripts.js" type="text/javascript"></script>
    <script src="../assests/js/transaction_scripts.js" type="text/javascript"></script>
    <script src="../assests/js/pdfmake.min.js" type="text/javascript"></script>
    <script src="../assests/js/master_data_scripts.js" type="text/javascript"></script>
   
    <script src="../assests/js/jquery.auto-complete.js" type="text/javascript"></script>
    <script src="../assests/js/bootstrap-datepicker.js" type="text/javascript"></script>
    <script src="../assests/js/bootstrap-datepicker.js" type="text/javascript"></script>
<!-- for content-->

<script>


        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });

        function closeAlert(div) {
            //var div = this.parentElement;
            div.style.opacity = "0";
            setTimeout(function () {
                div.style.display = "none";
                div.style.opacity = "1";
            }, 600);
        }

    
        $('.datepicker').datepicker({
        format: 'yyyy/mm/dd'
      });
        $("#tabs").tabs();

        
    </script>
   
</body>
</html>
