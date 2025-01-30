<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdCustomer extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
