<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Categories;
use App\Measurement;
use App\Items;
use App\Locations;
use App\ExpencesTypes;
use App\Expences;
use App\Doc_settings;
use App\Suppliers;
use App\Customers;
use App\Transactions;
use App\Sales_order_header;
use App\Stocks;
use App\Invoice_header;
use DB;
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
            $view->with('sup',Suppliers::all());
            $view->with('trans',Transactions::all());
            $view->with('cust',Customers::all());
            $view->with('locations',Locations::all());
            $view->with('expence',Expences::all());
            $view->with('exp',ExpencesTypes::all());
            $view->with('grn',Doc_settings::createDocNo("GRN"));
            $view->with('tnn',Doc_settings::createDocNo("TNN"));
            $view->with('sor',Doc_settings::createDocNo("SOR"));
            $view->with('sales',Sales_order_header::where('status',"2")->get());
            $view->with('stocksdetails',Stocks::all());
            $view->with('warehousedetails',Stocks::getStockReport("W"));
            $view->with('Branch1',Stocks::getStockReport("B1"));
            $view->with('Branch2',Stocks::getStockReport("B2"));
            $view->with('Branch3',Stocks::getStockReport("B3"));
         
          
        });
      
    }
 }
