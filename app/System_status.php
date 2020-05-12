<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class System_status extends Model
{
    protected $table = 'system_status';
    protected $fillable = [
          'Name','Code'];
}
