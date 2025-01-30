<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\OrderDetail;
use App\Models\Order;
use App\Models\ProdCustomer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Pagination\Paginator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function visual()
    {
        $topOrders = OrderDetail::select('product_id')
            ->selectRaw('SUM(quantity) as order_count')  // Calculate the total quantity for each product
            ->groupBy('product_id') // Group by product_id
            ->orderByDesc('order_count') // Order by total quantity ordered in descending order
            ->take(10) // Limit to top 10 products
            ->get();

        return Inertia::render('Product/Visual', [
            'topOrders' => $topOrders,
    ]);
    }

    public function index(Request $request)
    {
        $selectedTable = $request->input('selectedTable', 1);
        $table = Product::paginate(10);

        if ($selectedTable == 1) {
            $table = Product::paginate(10);
        } else if ($selectedTable == 2) {
            $table = Order::paginate(10);
        } else if ($selectedTable == 3) {
            $table = OrderDetail::paginate(10);
        } else if ($selectedTable == 4) {
            $table = ProdCustomer::paginate(10);
        }

        return Inertia::render('Product/Index', [
            'table' => $table,
            'tableNo' => $selectedTable,
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
    public function show(Bookings $bookings)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bookings $bookings)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bookings $bookings)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bookings $bookings)
    {
        //
    }
}
