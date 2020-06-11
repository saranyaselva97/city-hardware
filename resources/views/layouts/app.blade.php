{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
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
    .justify-content-center {
         margin: 150px !important; 
         align:center;
  
    }
    html,body{
        background-image:url("assests/images/bg.jpg");
        
  /* Full height */
  height: 100%;

/* Center and scale the image nicely */
background-position: center;
background-repeat: no-repeat;
background-size: cover;
    }
</style>

    
    <!-- Scripts -->
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>

    
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Laravel') }}
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        <li><a href="{{ url('/') }}">Home</a></li>
                        @if (!Auth::guest())
                            <li><a href="{{ url('dashboard') }}">Back To Dashboard</a></li>
                         @endif
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->
                        @if (Auth::guest())
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <li><a href="{{ route('register') }}">Register</a></li>
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        @role('Admin') {{-- Laravel-permission blade helper --}}
                                        <a href="#"><i class="fa fa-btn fa-unlock"></i>Admin</a>
                                        @endrole
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>

                           
                        @endif
                    </ul>
                </div>
            </div>
        </nav>

        @if(Session::has('flash_message'))
            <div class="container">      
                <div class="alert alert-success"><em> {!! session('flash_message') !!}</em>
                </div>
            </div>
        @endif 

        <div class="row">
            <div class="col-md-8 col-md-offset-2">              
                @include ('admin.errors.list') {{-- Including error file --}}
            </div>
        </div>
        @if (!Auth::guest())
                           
        @else
        @yield('content')

        @endif
       
 
      

    </div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
</html>