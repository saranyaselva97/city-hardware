<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Categories;
use App\Measurement;
use App\Items;
use App\Locations;
use App\ExpencesTypes;
use App\Expences;

class DropDownProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        view()->composer('*',function($view){
            $view->with('classname_array',Categories::all());
            $view->with('measurements',Measurement::all());
            
            $view->with('items',Items::all());
              
            $view->with('locations',Locations::all());
            $view->with('expence',Expences::all());
            $view->with('exp',ExpencesTypes::all());
        });

    }
 }
