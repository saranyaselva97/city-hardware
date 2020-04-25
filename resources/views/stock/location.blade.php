@extends('layouts.home')

@section('content')
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 home-box" id="content_box" style="padding: 0px">
       <div  class="col-md-12 content-box">
                                    

   

    
    @if(\Session::has('success'))
      <div id='divMessahge'class="alert alert-success">
      <p>{{\Session::get('success')}}</p>
      </div>
    
    @endif

    <div class="row" style="padding: 15px; padding-top: 0px;">
                <div class="col-md-12 shadow" style="padding: 15px; padding-bottom: 0px; margin-bottom: 15px;">
            <div class="alert alert-danger col-md-12" id="item_error_msg" style="display: none;">
                <span class="closebtn" onclick="closeAlert(this.parentElement)">×</span>
                <span id="error_msg"></span>
            </div>
                <form method="post" action="{{action('LocationController@storeLocations')}}">
                     @csrf
                <table class="table">
                 
                    <thead>
                        <tr>
                            <th>Location Code <span style="color: red">*</span></th>
                            <th>location Name <span style="color: red">*</span></th>
                        </tr>
                    </thead>
                    <tbody id="item_tbody">
                        <tr>
                            <td style="width: 130px">
                                <input type="text" name="loc_code" id="loc_code" class="form-control">
                            </td>
                            <td style="width: 130px">
                                <input type="text" name="loc_Name" id="loc_Name" class="form-control">

                                <button type="submit" class="btn btn-primary" id="btn_add_item" style="margin-top: 10px">
                                    <span class="fa fa-plus"></span> Add Location
                                </button>
                            </td>
                     
                        </tr>
                    </tbody>
                </table>
                
            </form>
        </div>
              
@endsection


