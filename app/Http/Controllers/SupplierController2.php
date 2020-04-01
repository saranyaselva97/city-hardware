<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SupplierController2 extends Controller
{
    public function create(){
        return view('supplier.suplier_master');
    }
}
