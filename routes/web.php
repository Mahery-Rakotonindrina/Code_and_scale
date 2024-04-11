<?php

use App\Http\Controllers\CodeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/', [CodeController::class, 'index'])->name('home_page');
Route::post('/table', [CodeController::class, 'getPlayer'])->name('player_table');
