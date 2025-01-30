import React from 'react';

const DashboardIndex = ({ products, orders, orderDetails, prodCustomers }) => {
    return (
        <div>
            <h1>Dashboard</h1>
            <table className="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Product Name</th>
                        <th className="border p-2">Order Number</th>
                        <th className="border p-2">Order Detail</th>
                        <th className="border p-2">Customer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {/* เรียงลำดับข้อมูลตามที่ต้องการ */}
                    {products.map((product) => {
                        const relatedOrder = orders.find(order => order.product_id === product.id);
                        const relatedOrderDetail = orderDetails.find(detail => detail.order_id === relatedOrder?.id);
                        const relatedCustomer = prodCustomers.find(customer => customer.id === relatedOrder?.prod_customer_id);

                        return (
                            <tr key={product.id}>
                                <td className="border p-2">{product.name}</td>
                                <td className="border p-2">{relatedOrder ? relatedOrder.order_number : 'N/A'}</td>
                                <td className="border p-2">{relatedOrderDetail ? relatedOrderDetail.detail : 'N/A'}</td>
                                <td className="border p-2">{relatedCustomer ? relatedCustomer.name : 'N/A'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardIndex;
