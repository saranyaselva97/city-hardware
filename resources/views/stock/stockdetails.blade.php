@extends('layouts.home')

@section('content')
<div class="col-md-12 content-box">
    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Reports</a></li>
                <li class="breadcrumb-item"><a href="#">Stock Reports</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-puzzle-piece"></span> Stock Sheet</li>
            </ol>
        </div>
    </div>
    <div class="row">
        <form action="{{action('GrnController@stockreport')}}" method="post">
        @csrf
            <div class="col-md-3">
                <label for="location">Location</label>
                <input type="hidden" name="action" value="strp">
                <select name="loc" id="location" class="form-control" required="">
                    <option value="">-Select-</option>
                    @foreach($locations as $it)
                      <option value='{{ $it->loc_code}}'>{{ $it->loc_name }}</option>
                      @endforeach 
                                    </select>
            </div>
            <div class="col-md-3">
                <br>
                <button type="submit" class="btn btn-primary"><span class="fa fa-send"></span> View Report</button>
            </div>
        </form>
    </div>
</div>
@endsection