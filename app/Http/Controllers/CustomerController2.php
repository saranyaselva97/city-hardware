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

          $customers = new customers;   //declaring customers model

          $customers->customer_code=$request->input('customer_code');
          $customers->customer_name=$request->input('customer_name');
          $customers->address=$request->input('address');
          $customers->contact=$request->input('contact');
  
          $customers->save();
          return redirect('/customer_master')->with('success','customer Added Successfully');
    }
    public function autocomplete_Customer(Request $request)
    {

       $term = $request->term;
       $customers = Customers::where('customer_name', 'LIKE',"%"."$term"."%" )->get();
    
       $customerDetails = array();
       if(count($customers)==0){
        $customerDetails[] = "No Such Customers";
       }
       else{
       foreach($customers as $customer){
        $customerdue=Customers::getCustomerDueByCustomerId($customer->id);
           $customerDetails[] = array("label"=>$customer->customer_name, "value"=>$customer->id,"due"=>$customerdue);
       }
    }
       return json_encode($customerDetails);
    }

}
