<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $activeCat = Category::where('status','Active')->get();
        if(!empty($activeCat) && $activeCat->count() > 0){
          foreach($activeCat as $actC => $actVal){
            $retCat[] = [
                      'id' => $actVal->id,
                      'name' => $actVal->name,
                      'href' => $actVal->name,
                      'imageSrc' => asset('assets/category/'.$actVal->cat_img),
                      'imageAlt' => $actVal->name,
                      'price' => $actVal->name,
                      'color' => $actVal->name
                    ];
          }
          return response()->json(['message'=>'List Category Success','data'=>$retCat], 200);
        } else {
          return response()->json(['message '=>'Error', 'data'=>null], 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
      $errors = [];
      if(!$request->hasFile('cat_img')) {
        return response()->json(['message'=>'Kindly Upload Category Image'], 400);
      }
      $allowedfileExtension=['pdf','jpg','png'];

      $files = $request->file('cat_img');
      $extension = $files->getClientOriginalExtension();
      $check = in_array($extension,$allowedfileExtension);
      $media_ext = $files->getClientOriginalName();
      $media_no_ext = pathinfo($media_ext, PATHINFO_FILENAME);
      $pfname = $media_no_ext . '-' . uniqid() . '.' . $extension;
      $files->move(public_path().'/assets/category/', $pfname);

      $pdata = $request->all();
      $prdata = new Category();
      $prdata->name        = $pdata['name'];
      $prdata->cat_img     = $pfname;
      $prdata->description = $pdata['description'];
      $prdata->status      = $pdata['status'];
      $prdata_status       = $prdata->save();
      if($prdata_status){
        return response()->json(['message'=>'Product Added Successfully'], 200);
      } else {
        return response()->json(['message'=>'Failed to Add Product'], 400);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }
}
