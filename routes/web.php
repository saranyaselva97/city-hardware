<?php

use Illuminate\Support\Facades\Route;
use App\Categories;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});
Route::get('/dashboard', function () {
    return view('layouts.dashboard');
});




/**User and user groups Routs */
Route::get('/add_user', 'userController@create');
Route::get('/usergroups', 'userController@addgroups');

/**Transcaation */
Route::get('/create_grn', 'TransactionController_2@create');
Route::get('/create_invoice', 'TransactionController_2@makeinvoice');
Route::get('/sales_order_list', 'TransactionController_2@salesOrderList');
Route::get('/invoice_return', 'TransactionController_2@invreturn');
Route::get('/duerecive', 'TransactionController_2@dueRecive');
Route::get('/payementrecivable', 'TransactionController_2@payrecieve');
Route::get('/grn_return', 'TransactionController_2@grnReturn');
Route::get('/expenses', 'TransactionController_2@addexpense');
Route::get('/sales_order', 'TransactionController_2@salesOrder');
Route::get('/item_transfer', 'TransactionController_2@itemTransfer');
Route::get('/itemlist','ItemController2@getProduct'); //fetch data with ajex
Route::get('/itemqty','ItemController2@findQty'); //fetch data with ajex
Route::get('/supplier_autocomplete', 'SupplierController2@autocomplete_Supplier')->name('supplier_autocomplete');;//auto compete the supllier textbox results in Create GRN Page
Route::post('/addExpences', 'expencesController@addExpences');
Route::post('/addGrn', 'GrnController@store');
Route::get('/customer_autocomplete', 'CustomerController2@autocomplete_Customer')->name('customer_autocomplete');;
Route::get('/get_prefix','GrnController@get_prefix');
Route::post('/add_invoice','GrnController@add_invoice');
Route::get('/printgrn', 'GrnController@printGRN');
Route::get('/printivo', 'GrnController@printInvo');
Route::post('/Transfer_History','GrnController@itemTrasnfer');

/**Supplier */
Route::get('/suplier_master', 'SupplierController2@create');
Route::post('/store_supplier', 'SupplierController2@store');
Route::get('/item_autocomplete', 'ItemController2@autocomplete_Item')->name('item_autocomplete');;
/**Customer */
Route::get('/customer_master', 'CustomerController2@create');
Route::post('/store_customer', 'CustomerController2@store');


/**Item master */

Route::get('/item', 'ItemController2@create');
Route::post('/item_store', 'ItemController2@store');
Route::post('/category_store', 'ItemController2@storeCategory');
Route::post('/measurementunit_store', 'ItemController2@StoreMeasurementUnit');


Route::post('/locations', 'LocationController@storeLocations');
Route::get('/loc', 'LocationController@create');

Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');
Route::get('create','RegisterController@create');


Route::resource('users', 'UserController');

Route::resource('roles', 'RoleController');

Route::resource('permissions', 'PermissionController');

Route::resource('posts', 'PostController');

Route::get('/admin','AdminController@index');





    
