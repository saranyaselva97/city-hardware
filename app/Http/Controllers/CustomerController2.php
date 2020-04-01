<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CustomerController2 extends Controller
{
    public function create(){
        return view('customer.customer_master');
    }
}
