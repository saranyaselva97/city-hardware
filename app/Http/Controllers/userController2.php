<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class userController2 extends Controller
{
    public function create()
    {

        return view('user.add_user');
    }

    public function addgroups()
    {

        return view('user.usergroups');
    }
}
