<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Category;
use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence,
        'price' => $faker->randomDigitNot(0) * 100,
        'category_id' => Category::pluck('id')->random()
    ];
});
