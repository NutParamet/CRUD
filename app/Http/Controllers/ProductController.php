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
    public function chart()
    {
        $topOrders = OrderDetail::select('product_id')
            ->selectRaw('SUM(quantity) as order_count')
            ->groupBy('product_id')
            ->orderByDesc('order_count')
            ->get();

        return Inertia::render('Product/Chart', [
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

    public function create(Request $request, $table)
    {
        return Inertia::render('Product/Create', ['table' => $table]);
    }

    public function store(Request $request, $table)
    {
        // กำหนดโมเดลที่ใช้ตามค่าของ $table
        $models = [
            '1' => Product::class,
            '2' => Order::class,
            '3' => OrderDetail::class,
            '4' => ProdCustomer::class,
        ];

        // ตรวจสอบว่า table ที่ส่งมาอยู่ใน models หรือไม่
        if (!isset($models[$table])) {
            return redirect()->back()->with('error', 'Invalid table selected');
        }

        // Validate ข้อมูลก่อนบันทึก
        $validatedData = $request->validate([
            'id' => 'nullable|integer',
            'product_code' => 'nullable|string|max:255',
            'product_name' => 'nullable|string|max:255',
            'price' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'prod_customer_id' => 'nullable|integer',
            'order_date' => 'nullable|date',
            'order_id' => 'nullable|integer',
            'product_id' => 'nullable|integer',
            'quantity' => 'nullable|integer',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
        ]);

        // บันทึกข้อมูลลงในโมเดลที่ถูกต้อง
        $models[$table]::create($validatedData);

        return redirect()->route('products.index', ['table' => $table])
            ->with('message', 'Record added successfully');
    }

    public function edit(Request $request, $table, $id)
    {
        // ดึงข้อมูลจากฐานข้อมูลตาม $table และ $id
        $data = null;

        if ($table == '1') {
            $data = Product::find($id);
        } elseif ($table == '2') {
            $data = Order::find($id);
        } elseif ($table == '3') {
            $data = OrderDetail::find($id);
        } elseif ($table == '4') {
            $data = ProdCustomer::find($id);
        }

        // หากไม่พบข้อมูลให้ redirect ไปยังหน้าก่อนหน้านี้
        if (!$data) {
            return redirect()->back()->with('error', 'Data not found');
        }

        // ส่งข้อมูลไปยัง view สำหรับการแก้ไข
        return Inertia::render('Product/Edit', [
            'data' => $data,
            'table' => $table
        ]);
    }

    public function update(Request $request, $table, $id)
    {
        // ดึงข้อมูลจากฐานข้อมูลตาม $table และ $id
        $data = null;

        if ($table == '1') {
            $data = Product::find($id);
        } elseif ($table == '2') {
            $data = Order::find($id);
        } elseif ($table == '3') {
            $data = OrderDetail::find($id);
        } elseif ($table == '4') {
            $data = ProdCustomer::find($id);
        }

        // หากไม่พบข้อมูลให้ redirect ไปยังหน้าก่อนหน้านี้
        if (!$data) {
            return redirect()->back()->with('error', 'Data not found');
        }

        // Validate ข้อมูลที่รับมา
        $validatedData = $request->validate([
            'product_code' => 'nullable|string|max:255',
            'product_name' => 'nullable|string|max:255',
            'price' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'prod_customer_id' => 'nullable|integer',
            'order_date' => 'nullable|date',
            'order_id' => 'nullable|integer',
            'product_id' => 'nullable|integer',
            'quantity' => 'nullable|integer',
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
        ]);

        // อัปเดตข้อมูลที่ได้รับจากฟอร์ม
        $data->update($validatedData);

        // รีไดเรกต์ไปยังหน้ารายการพร้อมกับข้อความสำเร็จ
        return redirect()->route('products.index', ['table' => $table])->with('message', 'Record updated successfully');
    }

    public function destroy(Request $request, $table, $id)
    {
        if ($table == '1') {
            Product::destroy($id);
        } elseif ($table == '2') {
            Order::destroy($id);
        } elseif ($table == '3') {
            OrderDetail::destroy($id);
        } elseif ($table == '4') {
            ProdCustomer::destroy($id);
        }

        return redirect()->back()->with('message', 'Record deleted successfully');
    }

}
