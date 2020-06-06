<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payments';
    protected $fillable = [
          'Doc_Type','Doc_No', 'Due_Amount', 
          'Payment_Amount','Payment_Date','Payment_Type','Balance','System_Date','user_id','status'];
}
