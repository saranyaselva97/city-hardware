<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Items;
use App\Stocks;
use App\Categories;
use App\Measurement;

class ItemController2 extends Controller
{
    public function create(){
      
        $items = Items::all(); //fetch the data from Items model
        return view('stock.item')->with('items',$items);
    }

    public function store(Request $request){
        $this->validate($request,[
          'item_code'=>'required',
          'item_name'=>'required',
          're_order_level'=>'required',
          'selling_price'=>'required',
          'label_price'=>'required',
          'category'=>'required',
          'measure_unit'=>'required',

        ]);
        $item = new Items;   //declaring items model

        $item->item_code=$request->input('item_code');
        $item->item_name=$request->input('item_name');
        $item->re_order_level=$request->input('re_order_level');
        $item->selling_price=$request->input('selling_price');
        $item->label_price=$request->input('label_price');
        $item->category=$request->input('category');
        $item->measure_unit=$request->input('measure_unit');

        $item->save();
        return redirect('/item')->with('success','Item Added Successfully');

    }
    public function storeCategory(Request $request){
        $this->validate($request,[
            'category_code'=>'required',
            'category_Name'=>'required',
         
        ]);

        $category = new Categories;
        $category->category_code=$request->input('category_code');
        $category->category_Name=$request->input('category_Name');
        $category->save();
        return redirect('/item')->with('success','New category Added Successfully');

    }

    public function StoreMeasurementUnit(Request $request){
        $this->validate($request,[
            'measurement_Name'=>'required',

        ]);

        $messure = new Measurement;
        $messure->measurement_Name=$request->input('measurement_Name');
        $messure->save();
        return redirect('/item')->with('success',' New Measurement Unit Added Successfully');

    }

    //Fetch Data from Item Model and sent it to AJEX Script
    public function getProduct(Request $req)
    {
        $data=Items::select('id','item_name','label_price')->where('id',$req->id)->take(100)->get();
        
        return response()->json($data);
       
    }

    public function findQty(Request $request){
	
		//it will get price if its id match with product id
		$stocks=Stocks::select('Quantity')->where('Item',$request->id)->take(100)->get();
		
    	return response()->json($stocks);
	}

    
}
