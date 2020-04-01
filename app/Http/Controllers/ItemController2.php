<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ItemController2 extends Controller
{
    public function create(){
        return view('stock.item');
    }
}
