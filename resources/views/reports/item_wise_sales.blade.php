
@extends('layouts.home')
@section('content')<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
                                    <link rel="stylesheet" href="assests/css/report_styles.css">


<div class="col-md-12 content-box">
    <div class="row">
        <div class="col-md-12">
            <ol class="breadcrumb shadow">
                <li class="breadcrumb-item"><a href="c_home.php">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Reports</a></li>
                <li class="breadcrumb-item"><a href="#">Transaction Reports</a></li>
                <li class="breadcrumb-item active"><span class="fa fa-puzzle-piece"></span>Item wise Sales Report</li>
            </ol>
        </div>
    </div>
    <div class="row" style="padding: 15px;">
        <div class="col-md-12 shadow" style="padding: 15px; margin-bottom: 15px;">
            
        <form method="post" action="{{action('GrnController@item_wise_sales')}}">
            @csrf
            <div lass="col-md-12">
                                
                                
            </div>
            
            <div class="col-md-12" style="margin-top: 20px;">
                <div class="col-md-3">
                    <input type="hidden" name="action" value="iwsr">
                    <label for="item_name">Item Name</label>
                    <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" name="item_name" id="item_names" class="form-control" value="" autocomplete="off">
                    <input type="hidden" name="itn" id="itn" class="form-control">
                </div> 
               
                <div class="col-md-3">
                <label for="from_date">From Date</label>
                <input type="text" name="frdte" id="from_date" class="form-control datepicker" placeholder="From Date" readonly="" required="">
            </div>
            <div class="col-md-3">
                <label for="to_date">To Date</label>
                <input type="text" name="todte" id="to_date" class="form-control datepicker" placeholder="To Date" readonly="" required="">
            </div>
            <div class="col-md-3">
                <label for="location">Location</label>
                <select name="loc" id="location" class="form-control" required="">
                    <option value="">-Select-</option>
                    @foreach($locations as $it)
                      <option value='{{ $it->loc_code}}'>{{ $it->loc_name }}</option>
                      @endforeach 
                                    </select>
            </div>
            </div>
              
            
            <div class="col-md-12">
                <br>
                <button type="submit" class="btn btn-primary" style="float:right"><span class="fa fa-send"></span> View Report</button>
            </div>
            </div>               
            
            
        </form>
        </div>
        
    </div>
</div>
    
                                </div>
@endsection


@section('scripts')

<script>

$(function() {
    $("#item_names").autocomplete({
        source: function(request, response) {
            $.ajax({
                type: "GET",
                url: "{{ url('/item_autocomplete') }}",
                data: {
                    item_name: request.term,
                  
                },
                success: function(data) {
                    response(JSON.parse(data));
                }
            });
        },
        minLength: 1,
        select: function(event, ui) {
            $(this).val(ui.item.label);
            $("#itn").val(ui.item.value);
         
            return false;
        }
    });
});

</script>
@endsection

