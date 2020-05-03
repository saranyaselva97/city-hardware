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
   
   public function user(){
       return $this->belongsTo(User::class);
   }
   public function expence_types(){
    return $this->belongsTo(ExpencesTypes::class,'user_id');
   }
}
