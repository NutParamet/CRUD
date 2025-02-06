import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Index({ table, tableNo, sortBy, sortOrder }) {
    const [selectedTable, setSelectedTable] = useState(tableNo || 1);
    const [sorting, setSorting] = useState({ column: sortBy || 'id', order: sortOrder || 'asc' });

    const columns = {
        1: [
            { label: 'ID', key: 'id' },
            { label: 'Product Code', key: 'product_code' },
            { label: 'Product Name', key: 'product_name' },
            { label: 'Prices', key: 'price' },
            { label: 'Stock', key: 'stock' },
        ],
        2: [
            { label: 'ID', key: 'id' },
            { label: 'Customer ID', key: 'prod_customer_id' },
            { label: 'Order Date', key: 'order_date' },
        ],
        3: [
            { label: 'ID', key: 'id' },
            { label: 'Order Id', key: 'order_id' },
            { label: 'Product ID', key: 'product_id' },
            { label: 'Quantity', key: 'quantity' },
            { label: 'Price', key: 'price' },
        ],
        4: [
            { label: 'ID', key: 'id' },
            { label: 'Name', key: 'name' },
            { label: 'Email', key: 'email' },
        ]
    };

    const handlePageChange = (url) => {
        router.get(url, { selectedTable, sortBy: sorting.column, sortOrder: sorting.order });
    };

    const handleTableChange = (newTable) => {
        setSelectedTable(newTable);
        router.get('/products', { selectedTable: newTable, sortBy: sorting.column, sortOrder: sorting.order });
    };

    const handleSort = (column) => {
        const newOrder = sorting.column === column && sorting.order === 'asc' ? 'desc' : 'asc';
        setSorting({ column, order: newOrder });
        router.get('/products', { selectedTable, sortBy: column, sortOrder: newOrder });
    };

    const handleCreate = () => {
        router.get(`/products/${selectedTable}/create`);
    };

    const handleEdit = (id) => {
        router.get(`/products/${selectedTable}/edit/${id}`);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            router.delete(`/products/${selectedTable}/delete/${id}`);
        }
    };

    return (
        <div className="p-16">
            <h1 className="text-2xl font-bold mb-8 text-center">
                <div className="flex justify-evenly items-center space-x-8">
                    <button onClick={() => handleTableChange(1)}>Product</button>
                    <button onClick={() => handleTableChange(2)}>Order</button>
                    <button onClick={() => handleTableChange(3)}>Order Detail</button>
                    <button onClick={() => handleTableChange(4)}>Customer</button>
                    <button onClick={() => router.get('/products/chart')}>Chart Order</button>
                </div>
            </h1>

            <div className="flex justify-end mb-4">
                <button onClick={handleCreate} className="px-4 py-2 bg-green-500 text-white rounded">
                    Create New
                </button>
            </div>

            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        {columns[selectedTable].map((column) => (
                            <th
                                key={column.key}
                                className="py-2 px-4 border-b border-gray-300 cursor-pointer"
                                onClick={() => handleSort(column.key)}
                            >
                                {column.label} {sorting.column === column.key ? (sorting.order === 'asc' ? '↑' : '↓') : ''}
                            </th>
                        ))}
                        <th className="py-2 px-4 border-b border-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {table.data.map(item => (
                        <tr key={item.id} className="even:bg-gray-50">
                            {columns[selectedTable].map((column) => (
                                <td key={column.key} className="py-2 px-4 border-b border-gray-300 text-center">
                                    {item[column.key]}
                                </td>
                            ))}
                            <td className="py-2 px-4 border-b border-gray-300 text-center space-x-2">
                                <button onClick={() => handleEdit(item.id)} className="px-2 py-1 bg-yellow-500 text-white rounded">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-8 flex justify-center items-center space-x-4">
                <button
                    onClick={() => handlePageChange(table.prev_page_url)}
                    disabled={!table.prev_page_url}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg">Page {table.current_page} of {table.last_page}</span>
                <button
                    onClick={() => handlePageChange(table.next_page_url)}
                    disabled={!table.next_page_url}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
