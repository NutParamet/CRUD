// resources/js/Pages/Product/Create.jsx
import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Create({ table }) {
    const [formData, setFormData] = useState({
        product_code: '',
        product_name: '',
        price: '',
        stock: '',
        prod_customer_id: '',
        order_date: '',
        order_id: '',
        product_id: '',
        quantity: '',
        name: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/products/${table}/store`, formData);
    };

    return (
        <div className="p-16">
            <h1 className="text-2xl font-bold mb-4 text-center">Create New Record</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow rounded">
                {table === '1' && (
                    <>
                        <label>Product Code</label>
                        <input type="text" name="product_code" value={formData.product_code} onChange={handleChange} className="border p-2 w-full mb-2" />

                        <label>Product Name</label>
                        <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} className="border p-2 w-full mb-2" />

                        <label>Price</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="border p-2 w-full mb-2" />

                        <label>Stock</label>
                        <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="border p-2 w-full mb-2" />
                    </>
                )}

                {table === '2' && (
                    <>
                        <label>Customer ID</label>
                        <input type="number" name="prod_customer_id" value={formData.prod_customer_id} onChange={handleChange} className="border p-2 w-full mb-2" />

                        <label>Order Date</label>
                        <input type="date" name="order_date" value={formData.order_date} onChange={handleChange} className="border p-2 w-full mb-2" />
                    </>
                )}

                {table === '3' && (
                    <>
                        <label>Order ID</label>
                        <input type="number" name="order_id" value={formData.order_id} onChange={handleChange} className="border p-2 w-full mb-2" />

                        <label>Product ID</label>
                        <input type="number" name="product_id" value={formData.product_id} onChange={handleChange} className="border p-2 w-full mb-2" />

                        <label>Quantity</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="border p-2 w-full mb-2" />

                        <label>Price</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="border p-2 w-full mb-2" />
                    </>
                )}

                {table === '4' && (
                    <>
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full mb-2" />

                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full mb-2" />
                    </>
                )}

                <div className="flex justify-between mt-4">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
                    <button type="button" onClick={() => router.get('/products')} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                </div>
            </form>
        </div>
    );
}
