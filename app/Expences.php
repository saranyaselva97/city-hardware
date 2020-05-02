<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Expences extends Model
{
    protected $table = 'expences';
    protected $fillable = [
        'expence_type','description','amount','dated',
        'customer','user_id'
    ];
}
