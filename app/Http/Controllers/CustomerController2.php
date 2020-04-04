<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customers;

class CustomerController2 extends Controller
{
    public function create(){
        $customsers = Customers::all(); //fetch the data from Items model
        return view('customer.customer_master')->with('customers',$customsers);
       
    }

    public function store(Request $request){
        $this->validate($request,[
            'customer_code'=>'required',
            'customer_name'=>'required',
            'address'=>'required',
            'contact'=>'required',
          ]);

          $customers = new customers;   //declaring items model

          $customers->customer_code=$request->input('customer_code');
          $customers->customer_name=$request->input('customer_name');
          $customers->address=$request->input('address');
          $customers->contact=$request->input('contact');
  
          $customers->save();
          return redirect('/customer_master')->with('success','customer Added Successfully');
    }
}
