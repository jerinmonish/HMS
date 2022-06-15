<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCardTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('card', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->string('name_on_card')->nullable();
            $table->string('card_number')->nullable();
            $table->integer('expiration_month')->nullable();
            $table->integer('expiration_year')->nullable();
            $table->string('email')->nullable();
            $table->string('brand')->nullable();
            $table->string('stripe_card_id')->nullable();
            $table->string('stripe_fingerprint')->nullable();
            $table->string('stripe_customer_id')->nullable();
            $table->string('cvc_check')->nullable();
            $table->string('mobile_no')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cart');
    }
}
