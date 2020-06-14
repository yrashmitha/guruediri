<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('stu/register', 'UserController@studentRegister');
Route::post('teach/register', 'UserController@teacherRegister');
Route::get('teach/getsubs', 'UserController@getSubjects');
Route::get('teach/getgrades', 'UserController@getGrades');


Route::get('teach/getsubs/{id}', 'UserController@getSubjectsById');
Route::get('teach/getgrades/{id}', 'UserController@getGradesById');

Route::get('getp/{id}', 'UserController@getUserPapers');


Route::get('h/grades', 'HomePage@getGrades');




Route::get('p/g/{id}','PaperController@getGradedPapers');
Route::get('t/g/{id}','PaperController@getGradedTutes');
Route::post('d','PaperController@Download');



Route::post('users/login', 'UserController@login');
