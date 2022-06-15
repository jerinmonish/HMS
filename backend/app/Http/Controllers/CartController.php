<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Card;
use App\Models\Product;
use App\Models\ProductImages;
use Illuminate\Http\Request;
use Auth;
use Session;
use Stripe;

class CartController extends Controller
{
    public function getAddCartDetails(Request $request){
      if($request->all()['id']){
        $cdata = Cart::where('user_id',Auth::user()->id)->get();
        $pdata = Product::where('id',$request->all()['id'])->first();
        print_r($pdata);exit;
      } else {

      }
    }

    public function store(Request $request){
      $ex_product = Product::where('id',$request->all()['pid'])->where('available','Active')->first();
      if(!empty($ex_product)){
        $verify_prcart = Cart::where('product_id',$request->all()['pid'])
                              ->where('purchased_status','Incart')
                              ->get();
        if($verify_prcart->count() == 0){
          $cart                   = new Cart();
          $cart->user_id          = @Auth::user()->id;
          $cart->product_id       = $ex_product->id;
          $cart->quantity         = $request->all()['qty'];
          $cart->cart_dated       = date('Y-m-d h:i:s');
          $cart->purchased_status = 'Incart';
          $cart->product_amount   = $ex_product->p_amt;
          $cart->total_amount     = $ex_product->p_amt*(int)$request->all()['qty'];
          $csaved = $cart->save();
          if($csaved){
            return response()->json(['message'=>'Added To Cart','data'=>null], 200);
          } else {
            return response()->json(['message'=>'Unable to add to cart','data'=>null], 400);
          }
        } else {
          return response()->json(['message'=>'Already this product is present in you cart','data'=>null], 200);
        }
      } else {
        return response()->json(['message'=>'Product Doesnot exist','data'=>null], 400);
      }
    }

    public function getMyCartDetails(){
      $cdata = Cart::where('user_id',Auth::user()->id)->where('purchased_status','Incart')->get()->toArray();
      if(!empty($cdata)){
        foreach ($cdata as $ckey => $cvalue) {
          $cartData[] = [
                    'id' => $cvalue['id'],
                    'product_name' => $this->getProductName($cvalue['product_id']),
                    'pid' => $cvalue['product_id'],
                    'product_images' => $this->getProductImage($cvalue['product_id']),
                    'no_of_qty' => $cvalue['quantity'],
                    'single_price' => $cvalue['product_amount'],
                    'sp_total_price' => $cvalue['total_amount'],
                  ];
          // $totAmt[] = $cvalue['total_amount'];
                  $totAmt[] = round($cvalue['total_amount']);
        }
        return response()->json(['message'=>'List Cart Details','data'=>$cartData,'amt'=>array_sum($totAmt)], 200);
      } else {
        return response()->json(['message'=>'No Details in Cart','data'=>null], 200);
      }
    }

    private function getProductImage($pid){
      if(!empty($pid)){
        $get_product_img = ProductImages::where('pid',$pid)->get();
        if($get_product_img->count() > 0 ){
          foreach($get_product_img as $gpikey => $gpival){
            $totArr = [
                'img' => asset('assets/pimages/'.$gpival->p_image_name),
              ];
          }
          return $totArr;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    private function getProductName($cid){
      if(!empty($cid)){
        $get_cat = Product::where('id',$cid)->get();
        return $get_cat[0]->p_name;
      } else {
        return false;
      }
    }

    public function deleteCartItem(Request $request){
      //print_r($request->all()['cid']);
      if($request->all()['cid']){
        $res = Cart::where('user_id',Auth::user()->id)->where('id',base64_decode($request->all()['cid']))->delete();
        if($res){
          return response()->json(['message'=>'Cart Item Deleted','data'=>[],'status'=>true], 200);
        } else {
          return response()->json(['message'=>'Unable to Delete Cart Item','status'=>false, 400]);
        }
      } else {
        return response()->json(['message'=>'No Such Cart Item','status'=>false, 400]);
      }
    }

    public function payment(Request $request){
      // print_r($request->all());exit;
      /*$payment = json_decode(file_get_contents(base_path().'/public/payment.json'),true);
      print_r($payment);exit;*/
      $formData = $request->all();
      $get_cart = Cart::where('user_id',@Auth::user()->id)->where('purchased_status','Incart')->get();
      $cart = [];
      $product = [];
      $items = '';
      if($get_cart->count() > 0){
        foreach ($get_cart as $ckey => $cvalue) {
          $product_data = Product::where('id',$cvalue->product_id)->get();
          if($product_data[0]->available == "Inactive"){
            $product[] = ['pdetails'=>$product_data[0]];
          } else {
            $cart[] = ['id'=>$cvalue->id,'uid'=>$cvalue->user_id,'pid'=>$cvalue->product_id,'tot_amt'=>round($cvalue->total_amount),'sing_amt'=>$cvalue->product_amount,'qty'=>$cvalue->quantity];
            $items .= $product_data[0]->p_name.' (Single Price: '.(round($product_data[0]->p_amt)).") ,";
            $amt[] = round($cvalue->total_amount);
          }
        }
      }
      if(count($product) > 0){
        return response()->json(['message'=>'Some issue with the cart. Hence the product is not available','data'=>$product, 400]);
        exit;
      } else {
        $paid = 0;
        $csaved = 0;
        $cupdated = 0;
        try {
          Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
          $setdata = \Stripe\Token::create(array(
                        "card" => [
                            "number"    => $request->all()['cardNo'],
                            "exp_month" => 1,
                            "exp_year"  => $request->all()['year'],
                            "cvc"       => $request->all()['cvvNo'],
                            "name"      => $request->all()['userName']
                          ]
                        ));
          $payment = Stripe\Charge::create ([
                    "amount" => array_sum($amt),
                    "currency" => "usd",
                    "source" => $setdata->id,
                    "description" => "Payment Done By ".$request->all()['userName']. " for items of ".rtrim($items, ', ')
            ]);

          if($payment->status == "succeeded"){
            $paid = 1;
            $card = new Card();
            $card->user_id            = @Auth::user()->id;
            $card->name_on_card       = $formData['userName'];
            $card->card_number        = $payment->source->last4;
            $card->expiration_month   = $payment->source->exp_month;
            $card->expiration_year    = $payment->source->exp_year;
            $card->email              = @Auth::user()->id;
            $card->brand              = $payment->source->brand;
            $card->stripe_card_id     = $payment->source->id;
            $card->stripe_fingerprint = $payment->source->fingerprint;
            $card->stripe_customer_id = null;
            $card->cvc_check          = $payment->source->cvc_check;
            $cardSaved = $card->save();
            if($cardSaved){
              $csaved = 1;
            }
          }

        } catch (Exception $e){
          return response()->json(['message'=>'Some issue with the Payment. Hence the Paused at Payment','data'=>$e, 400]);
          exit;
          // print_r($e);exit;
        }

        try {
          \DB::beginTransaction();

          foreach ($cart as $uppayKey => $uppayValue) {
            $cf = Cart::find($uppayValue['id']);
            $cf->purchased_status = 'Payment_done'; 
            $cfsaved = $cf->save();
            if($cfsaved){
              $cupdated = 1;
            }
          }

          \DB::commit();

        } catch (Throwable $e) {
            \DB::rollback();
            return response()->json(['message'=>'Some issue with the Cart Updation. Payment Done, Cart Issue Alone','data'=>$e, 400]);
            exit;
        }
      }

      if($paid == 1 && $csaved == 1 && $cupdated == 1){
        return response()->json(['message'=>'Payment Success','data'=>[], 200]);
      }

    }

    private function convertToUSD($value=0)
    {
      // $req_url = 'https://api.exchangerate-api.com/v4/latest/USD';
      $req_url = 'https://v6.exchangerate-api.com/v6/d5dfa37946a8344837cf1c7c/latest/USD';
      $response_json = file_get_contents($req_url);

      // Continuing if we got a result
      if(false !== $response_json) {
        try {
          // Decoding
          $response_object = json_decode($response_json);
          $base_price = $value; // Your price in USD
          $EUR_price = round(($base_price * $response_object->rates->EUR), 2);
          return $EUR_price;
        }
        catch(Exception $e) {
            echo $e->message();exit;
        }
      }
    }

    public function getMyOrderDetails(Request $request){
      $cdata = Cart::where('user_id',Auth::user()->id)
                        ->where('purchased_status','Payment_done')
                        ->orderBy('id', 'DESC')
                        ->paginate('12');
      if($cdata->count() > 0 ){
          $cdata->getCollection()->transform(function ($value) {
            // Your code here
            return [
                  'id' => $value->id,
                    'product_name' => $this->getProductName($value->product_id),
                    'pid' => $value->product_id,
                    'product_images' => $this->getProductImage($value->product_id),
                    'no_of_qty' => $value->quantity,
                    'single_price' => $value->product_amount,
                    'sp_total_price' => $value->total_amount,
                    'ordered_at' => date('d-m-Y h:i A', strtotime($value->updated_at)),
                ];
          });
          return response()->json(['message'=>'List Ordered Product Success','data'=>$cdata], 200);
        } else {
          return response()->json(['message'=>'No Data'], 200);
        }
    }
}
