<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
 public function index(){
     return view('layouts.home');
 }

 public function __construct() {
    $this->middleware(['auth','isAdmin']); //isAdmin middleware lets only users with a //specific permission permission to access these resources
}
}
