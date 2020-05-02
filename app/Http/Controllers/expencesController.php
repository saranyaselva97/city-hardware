<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Expences;
use Auth;
class expencesController extends Controller
{
    public function addExpences(Request $request){
        $this->validate($request,[
            'expence_type'=>'required',
            'description'=>'required',
            'amount'=>'required',
            'dated'=>'required',
            'customer'=>'required',
          ]);

         $expences = new Expences;   //declaring suppliers model
         $user_id = Auth::user()->id;
          $expences->expence_type=$request->input('expence_type');
          $expences->description=$request->input('description');
          $expences->amount=$request->input('amount');
          $expences->dated=$request->input('dated');
          $expences->customer=$request->input('customer');
          $expences->user_id=$user_id;
       
          $expences->save();
          return redirect('/expenses')->with('success','Expences Added Successfully');
    }
}
