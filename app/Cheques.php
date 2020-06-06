<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cheques extends Model
{
  
    protected $table = 'cheques';
    protected $fillable = [
          'Chq_Number',
          'Chq_Date','Bank', 'Amount', 'Payment','user_id', 'status', 
    ];
}
