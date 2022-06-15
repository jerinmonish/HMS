<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImages;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      // print_r($request->all()['per_page']);exit;
      $perPage = 2;
      $data = Product::orderBy('id','DESC')->paginate($request->all()['per_page']);
      return response()->json($data);
    }

    public function getProductsbasedOnCategory(Request $request){
      if(!empty($request->all()['id'])){
        $getProducts = Product::where('cat_id',$request->all()['id'])
                        ->where('available','Active')
                        ->orderBy('id', 'DESC')
                        ->paginate('12');

        

        if($getProducts->count() > 0 ){
          $getProducts->getCollection()->transform(function ($value) {
            // Your code here
            return [
                  'id' => $value->id,
                  'pname' => $value->p_name,
                  'pimage' => $this->getProductImage($value->id),
                  'category' => $this->getCategoryName($value->cat_id),
                  'pdesc' => $value->p_description,
                  'p_amt' => $value->p_amt,
                ];
          });
          return response()->json(['message'=>'List Product Success','data'=>$getProducts], 200);
        } else {
          return response()->json(['message'=>'No Data'], 200);
        }
      } else {
        return response()->json(['message'=>'Id Missing'], 400);
      }
    }

    private function getProductImage($pid){
      if(!empty($pid)){
        $get_product_img = ProductImages::where('pid',$pid)->get();
        if($get_product_img->count() > 0 ){
          foreach($get_product_img as $gpikey => $gpival){
            
            if (file_exists(public_path().'/assets/pimages/'.$gpival->p_image_name)){
              $totArr = [
                  'img' => asset('assets/pimages/'.$gpival->p_image_name),
                ];
            } else {
              $totArr = [
                  'img' => asset('assets/no_img.jpg'),
                ];
            }
          }
          return $totArr;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    private function getCategoryName($cid){
      if(!empty($cid)){
        $get_cat = Category::where('id',$cid)->get();
        return $get_cat[0]->name;
      } else {
        return false;
      }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
      $product_img_saved = 0;
      $img_status = 0;
      $pdata = $request->all()['params'];
      $prdata = new Product();
      $prdata->p_name = $pdata['p_name'];
      $prdata->p_description = $pdata['p_description'];
      $prdata->available = $pdata['available'];
      $prdata->p_amt = $pdata['p_amt'];
      $prdata->cat_id= $pdata['cat_id'];
      $prdata_status = $prdata->save();
      // print_r($prdata_status);exit;
      
      if($prdata_status){
        foreach($request->all()['params']['p_image_name'] as $images){
          $fileImg_parts  = explode(";base64,", $images);
          $image_type_aux = explode("image/", $fileImg_parts[0]);
          $image_type = $image_type_aux[1];
          $image_base64 = base64_decode($fileImg_parts[1]);
          $iname = uniqid().date("ymdhis").'.'.$image_type;
          $results = public_path().'/assets/pimages/' . $iname;
          $res = file_put_contents($results, $image_base64);
          if($res){
            $img_status = 1;
            $pimages = new ProductImages();
            $pimages->p_image_name = $iname;
            $pimages->pid = $prdata->id;
            if($pimages->save()){
              $product_img_saved = 1;
            }
          }
        }
      }

      if($product_img_saved == 1 && $prdata_status && $img_status == 1){
        return response()->json(['message'=>'Product Added Successfully'], 200);
      } else {
        return response()->json(['message'=>'Unable to save Product'], 400);
      }
      exit;
      /*if($request->file()) {
        try {
          $fileName = time().'_'.$request->p_image_name->getClientOriginalName();
          $filePath = $request->file('p_image_name')->storeAs('uploads', $fileName, 'public');
        } catch (Exception $e) {
          print_r($e);exit;
        }
      } else {
        die("NO File");
      }
      exit;*/
      /*if(!$request->hasFile('p_image_name')) {
        return response()->json(['upload_file_not_found'], 400);
      }
      $allowedfileExtension=['pdf','jpg','png'];
      $files = $request->file('p_image_name'); 
      $errors = [];

      foreach ($files as $file) {
        $extension = $file->getClientOriginalExtension();

        $check = in_array($extension,$allowedfileExtension);

        if($check) {
          foreach($request->p_image_name as $mediaFiles) {
            //$media = new Media();
            $media_ext = $mediaFiles->getClientOriginalName();
            $media_no_ext = pathinfo($media_ext, PATHINFO_FILENAME);
            $mFiles = time() . '-' . uniqid() . '.' . $extension;
            $mediaFiles->move(public_path().'/pimages/', $mFiles);
            //$media->p_image_name = $mFiles;
            //$media->clientId = $request->clientId;
            //$media->uploadedBy = Auth::user()->id;
            //$media->save();
          }
        } else {
          return response()->json(['invalid_file_format'], 422);
        }
        return response()->json(['file_uploaded'], 200);
      }*/


      $product_img_saved = 0;
      $img_status = 0;
      // if(!$request->hasFile('p_image_name')) {
      //   return response()->json(['message'=>'Kindly Upload Product Image'], 400);
      // }
      $allowedfileExtension=['pdf','jpg','png','jpeg','JPG'];
      $files = $request->file('p_image_name'); 
      $errors = [];
      $pdata = $request->all();
      $prdata = new Product();
      $prdata->p_name = $pdata['p_name'];
      $prdata->p_description = $pdata['p_description'];
      $prdata->available = $pdata['available'];
      $prdata->p_amt = $pdata['p_amt'];
      $prdata->cat_id= $pdata['cat_id'];
      $prdata_status = $prdata->save();
      if($prdata_status){
        foreach ($files as $file) {
          $extension = $file->getClientOriginalExtension();

          $check = in_array($extension,$allowedfileExtension);

          if($check) {
            foreach($request->p_image_name as $product_img) {
              $pimages = new ProductImages();
              $media_ext = $product_img->getClientOriginalName();
              $media_no_ext = pathinfo($media_ext, PATHINFO_FILENAME);
              $pfname = $media_no_ext . '-' . uniqid() . '.' . $extension;
              $pimages->p_image_name = $pfname;
              $pimages->pid = $prdata->id;

              try{
                $product_img->move(public_path().'/assets/pimages/', $pfname);
                $img_status = 1;
              } catch(Exception $imexpt){
                $img_status = 0;
              }

              if($pimages->save()){
                $product_img_saved = 1;
              }
            }
          } else {
            return response()->json(['message'=>'Files must be of pdf,jpg,png Format'], 422);
          }
          // return response()->json(['file_uploaded'], 200);
          if($product_img_saved == 1 && $prdata_status && $img_status == 1){
            return response()->json(['message'=>'Product Added Successfully'], 200);
          } else {
            return response()->json(['message'=>'Unable to save Product'], 400);
          }
        }
      } else {
        return response()->json(['message'=>'Unable to save Product'], 400);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request){
      if(!empty($request->all()['id'])){
        $data['product'] = Product::where('id',$request->all()['id'])->first();
        $pimages = ProductImages::where('pid',$request->all()['id'])->get();
        foreach ($pimages as $pikey => $pivalue) {
          $data['product_images'][] = ['pimages'=>asset('assets/pimages/'.$pivalue->p_image_name)];
        }
        return response()->json(['message'=>'View Product Success','data'=>$data], 200);
      } else {
        return response()->json(['message'=>'Unable to view Product'], 400); 
      }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
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
    public function destroy(Product $product)
    {
        //
    }
}
