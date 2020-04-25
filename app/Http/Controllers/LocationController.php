<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Locations;

class LocationController extends Controller
{
    public function create(){
        return view('stock.location');
    }

    public function storeLocations(Request $request){
        $this->validate($request,[
            'loc_code'=>'required',
            'loc_Name'=>'required',
         
        ]);

        $location = new Locations;
        $location->loc_code=$request->input('loc_code');
        $location->loc_Name=$request->input('loc_Name');
        $location->save();
        return redirect('/loc')->with('success','New location Added Successfully');

    }

}
