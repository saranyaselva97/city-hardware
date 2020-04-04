<?php

use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});
Route::get('/dashboard', function () {
    return view('layouts.home');
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

/**Supplier */
Route::get('/suplier_master', 'SupplierController2@create');

/**Customer */
Route::get('/customer_master', 'CustomerController2@create');
Route::post('/store_customer', 'CustomerController2@store');


/**Item master */
Route::get('/item', 'ItemController2@create');
Route::post('/item_store', 'ItemController2@store');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('create','RegisterController@create');


Route::resource('users', 'UserController');

Route::resource('roles', 'RoleController');

Route::resource('permissions', 'PermissionController');

Route::resource('posts', 'PostController');

Route::get('/admin','AdminController@index');