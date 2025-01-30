import React from "react";
import { router } from '@inertiajs/react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TopOrderChart({ topOrders }) {
    // Assuming topOrders is an array of objects with product_id and order_count properties
    const data = {
        labels: topOrders.map((order) => order.product_id), // Mapping the product_id for x-axis labels
        datasets: [
            {
                label: "จำนวนการสั่งซื้อ", // The label for the bar chart
                data: topOrders.map((order) => order.order_count), // Mapping the order_count for bar chart data
                backgroundColor: "rgba(59, 130, 246, 0.6)", // The color of the bars
                borderColor: "rgb(29, 78, 216)", // Border color of the bars
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true, // Start y-axis from zero
                title: {
                    display: true,
                    text: "จำนวนการสั่งซื้อ", // Label for the y-axis
                },
            },
            x: {
                title: {
                    display: true,
                    text: "รหัสสินค้า", // Label for the x-axis
                },
            },
        },
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0 mt-12">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            อันดับสินค้าที่มีการสั่งซื้อมากที่สุด
                        </h1>
                        <div className="w-full max-w-4xl mx-auto">
                            {/* Render the Bar chart */}
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50" onClick={() => router.get('/products')}>
                        Back
                    </button>
                </main>
            </div>

        </>
    );
}
