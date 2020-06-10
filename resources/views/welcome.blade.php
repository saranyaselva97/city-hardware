<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/Ionicons/css/ionicons.min.css">

<link href="/css/app.css" rel="stylesheet">
<link rel="stylesheet" href="/css/AdminLTE.min.css">
<link rel="stylesheet" href="/css/bootstrapValidator.min.css">{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/Ionicons/css/ionicons.min.css">

<link href="/css/app.css" rel="stylesheet">
<link rel="stylesheet" href="/css/AdminLTE.min.css">
<link rel="stylesheet" href="/css/bootstrapValidator.min.css">
<link rel="stylesheet" href="/css/bootstrap-table.css">
<link rel="stylesheet" href="/css/jquery-ui.min.css">



<link href="assests/css/bootstrap.css" rel="stylesheet" />
<link href="assests/css/simple-sidebar.css" rel="stylesheet" />

<link href="../assests/css/bootstrap-datepicker.css" rel="stylesheet" />
<link href="../assests/css/jquery.timepicker.css" rel="stylesheet" />
<link href="../assests/css/notie.css" rel="stylesheet" />


<link href="../assests/css/styles.css" rel="stylesheet" id="dynamic_styles" />
<link href="../assests/css/main.css" rel="stylesheet" />
<link href="../assests/css/dashboard_styles.css" rel="stylesheet" />
<link href="../assests/css/jquery.dataTables.css" rel="stylesheet"/>
<link href="../assests/css/jquery-ui.css" rel="stylesheet"/>



    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'City') }}</title>

    <!-- Styles -->
    
    <style type="text/css">
  
    
</style>

    
    <!-- Scripts -->
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>

    
</head>
    <body>
  
    <nav class="navbar navbar-default navbar-static-top"><div class="container"><div class="navbar-header"><button type="button" data-toggle="collapse" data-target="#app-navbar-collapse" class="navbar-toggle collapsed"><span class="sr-only">Toggle Navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a href="http://127.0.0.1:8000" class="navbar-brand">
                        Welcome to City Hardware 
                    </a></div> <div id="app-navbar-collapse" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav"><li><a href="/admin">Home</a></li></ul>
                     <ul class="nav navbar-nav navbar-right"><li><a href="http://127.0.0.1:8000/login">Login</a></li> <li>
                     <a href="http://127.0.0.1:8000/register">Register</a></li></ul></div></div></nav>
    <div class="login-box">
<br>
<img id="dmac_logo" src="assests/images/dmac_trans.png" alt="dmac" style="width: 120px; height: 100px; margin:100px"/>
  <div class="login-logo">
 
    <a href="/">C  i  t  y  H  a  r  d  w  a  r  e</a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">K.K.S Road,Jaffna. Sri Lanka</p>

   

  

  </div>
  <!-- /.login-box-body -->
</div>

    </body>
</html>
