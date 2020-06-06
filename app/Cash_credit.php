<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cash_credit extends Model
{
    protected $table = 'cash_credit_acoount';
    protected $fillable = [
          'Doc_type',
          'Doc_Id','Amount', 'status', 'user_id',
    ];
}
