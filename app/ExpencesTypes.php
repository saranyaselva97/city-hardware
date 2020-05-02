<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExpencesTypes extends Model
{
    protected $table = 'expences_types';
    protected $fillable = [
        'Types'
    ];
}
