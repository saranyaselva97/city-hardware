<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Suppliers;
class SupplierController2 extends Controller
{
    public function create(){
        $suppliers = Suppliers::all(); //fetch the data from Items model
        return view('supplier.suplier_master')->with('suppliers',$suppliers);
       
    }

    
    public function store(Request $request){
        $this->validate($request,[
            'supplier_code'=>'required',
            'supplier_name'=>'required',
            'address'=>'required',
            'contact'=>'required',
          ]);

          $suppliers = new suppliers;   //declaring suppliers model

          $suppliers->supplier_code=$request->input('supplier_code');
          $suppliers->supplier_name=$request->input('supplier_name');
          $suppliers->address=$request->input('address');
          $suppliers->contact=$request->input('contact');
  
          $suppliers->save();
          return redirect('/suplier_master')->with('success','Supplier Added Successfully');
    }

    //for auto complete in GRN supplier text feild
    public function autocomplete_Supplier(Request $request)
    {
        $data = Suppliers::select("supplier_name")
                ->where("supplier_name","LIKE","%{$request->input('query')}%")
                ->get();
   
        return response()->json($data);
    }
}
