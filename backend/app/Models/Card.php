<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $table  = 'card';
    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'user_id',
        'name_on_card',
        'card_number',
        'expiration_month',
        'expiration_year',
        'cvv',
        'email',
        'brand',
        'stripe_card_id',
        'stripe_fingerprint',
        'stripe_customer_id',
        'cvc_check',
    ];
}
