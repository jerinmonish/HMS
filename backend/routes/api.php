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

Route::post('signup', [App\Http\Controllers\AuthenticationController::class, 'signUp']);
Route::post('signin', [App\Http\Controllers\AuthenticationController::class, 'signIn']);
// Route::get('get-all-category', [App\Http\Controllers\CategoryController::class, 'index']);

Route::group(['middleware' => ['auth:sanctum']],function(){
  // return $request->user();
  Route::prefix('v1')->group(function(){
    Route::get('/demo', function() {
      echo 'WElcome';
    });
    // Route::apiResouce('product',\App\Http\Controller\ProductController::class);
    Route::post('add-product', [App\Http\Controllers\ProductController::class, 'store']);
    Route::post('add-category', [App\Http\Controllers\CategoryController::class, 'store']);
    Route::get('get-all-category', [App\Http\Controllers\CategoryController::class, 'index']);
    Route::post('get-cat-based-products', [App\Http\Controllers\ProductController::class, 'getProductsbasedOnCategory']);
    Route::post('view-product', [App\Http\Controllers\ProductController::class, 'show']);
    Route::post('add-to-cart', [App\Http\Controllers\CartController::class, 'store']);
    Route::post('add-get-cart-details', [App\Http\Controllers\CartController::class, 'getAddCartDetails']);
    Route::get('view-cart', [App\Http\Controllers\CartController::class, 'getMyCartDetails']);
    Route::post('delete-cart-item', [App\Http\Controllers\CartController::class, 'deleteCartItem']);
    Route::post('payment', [App\Http\Controllers\CartController::class, 'payment']);
    Route::get('list-products', [App\Http\Controllers\ProductController::class, 'index']);
    Route::post('my-orders', [App\Http\Controllers\CartController::class, 'getMyOrderDetails']);
  });
  Route::post('signout',[App\Http\Controllers\AuthenticationController::class,'signOut']);
});

