<?php

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

Route::get('/clear-cache', function () {
    return Artisan::call('config:clear');
});

// Route::get('/', function () {
//     return view('welcome');
// });


	Auth::routes();

	Route::group(['middleware' => ['auth']], function () {
		Route::get('/dashboard', 'RegisterController@welcome');
	
		Route::get('/', 'RegisterController@welcome')->name('home');
		
		Route::get('/employees', 'RegisterController@index')->name('employees');
		Route::get('/company', 'RegisterController@company')->name('company');
		Route::get('/create', 'RegisterController@create')->name('create');
		Route::post('/store-step1', 'RegisterController@storeStep1')->name('store-step1');
		Route::post('/store-step2', 'RegisterController@storeStep2')->name('store-step2');
		Route::post('/store-step3', 'RegisterController@storeStep3')->name('store-step3');
		Route::post('/store-step4', 'RegisterController@storeStep4')->name('store-step4');
		Route::post('/store-step5', 'RegisterController@storeStep5')->name('store-step5');
		Route::post('/store-step6', 'RegisterController@storeStep6')->name('store-step6');
		Route::post('/store-step7', 'RegisterController@storeStep7')->name('store-step7');

		Route::get('/view-registration/{id}', 'RegisterController@view')->name('registration.view');
		Route::post('/update-registration', 'RegisterController@update')->name('update-registration');
		Route::get('/editView-registration/{id}', 'RegisterController@editView')->name('registration.editView');
		Route::get('/download-registration/{id}', 'RegisterController@downloadRegistration')->name('download-registration');
		Route::get('/report', 'ReportController@index')->name('report');
		Route::post('/generate-report', 'ReportController@generateReport')->name('generate-report');
		Route::get('/download-report/{id}', 'RegisterController@downloadReport')->name('download-report');
		Route::get('/destroy/{id}', 'RegisterController@destroy')->name('destroy');

		Route::post('/filter-register', 'RegisterController@filterRegistration')->name('filter-register');
		Route::post('/filter-chart', 'Chartcontroller@filterchart')->name('filter-chart');

		Route::get('/chartdata', 'Chartcontroller@getdatafordoughnut')->name('chartdata');
		Route::get('/chartdata/barchartdata', 'Chartcontroller@barchartdata')->name('chartdata.barchartdata');
		Route::get('/chartdata/symptopmbarchartdata', 'Chartcontroller@symptopmsbarchart')->name('chartdata.symptopmbarchartdata');
	});