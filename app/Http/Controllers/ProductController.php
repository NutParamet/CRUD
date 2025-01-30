<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\ProdCustomer;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        $orders = Order::all();
        $orderDetails = OrderDetail::all();
        $prodCustomers = ProdCustomer::all();

        // ส่งข้อมูลทั้งหมดไปยัง Inertia
        return Inertia::render('Product/Index', [
            'products' => $products,
            'orders' => $orders,
            'orderDetails' => $orderDetails,
            'prodCustomers' => $prodCustomers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
