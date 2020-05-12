<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payments';
    protected $fillable = [
          'Doc_Type','Doc_No', 'Due_Amount', 'Total_Discount','Gross_Amount', 
          'payement_Date','System_Date','user_id','status'];
}
