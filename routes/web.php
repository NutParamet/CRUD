<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/chart', [ProductController::class, 'chart'])->name('products.chart');
Route::get('/products/{table}/create', [ProductController::class, 'create']);
Route::get('/products/{table}/edit/{id}', [ProductController::class, 'edit']);
Route::delete('/products/{table}/delete/{id}', [ProductController::class, 'destroy']);
Route::post('/products/{table}/store', [ProductController::class, 'store'])->name('products.store');
Route::put('/products/{table}/update/{id}', [ProductController::class, 'update'])->name('products.update');

require __DIR__.'/auth.php';
