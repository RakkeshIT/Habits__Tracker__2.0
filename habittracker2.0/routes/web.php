<?php

use App\Http\Controllers\habitController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::middleware('auth')->group(function(){
    Route::get('/habit', [habitController::class, 'index'])->name('habit.index');
    Route::post('/habit', [habitController::class, 'store'])->name('habit.store');
    Route::get('/habitlist', [habitController::class, 'list'])->name('habit.list');
    Route::get('/habitchart', [habitController::class, 'chart'])->name('habit.chart');
    Route::delete('/habit/{id}', [habitController::class, 'deletehabit']);
    Route::post('/habitcomplete/{id}/toggle-complete', [habitController::class, 'togglecompleted'])->middleware('auth');
});

Route::get('/users/credits', function() {
    return response()->json(['credits' => auth()->user()->credits]);
})->middleware('auth');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
