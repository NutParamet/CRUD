import React from 'react';

export default function Navbar() {
    return (
        <nav className="bg-white text-black p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">Booking</div>
                <ul className="flex space-x-6">
                    <li><a href="/" className="hover:text-gray-600 text-sm">Home</a></li>
                    <li><a href="/booking" className="hover:text-gray-600 text-sm">Table</a></li>
                    <li><a href="/booking/visual" className="hover:text-gray-600 text-sm">Visualize</a></li>
                </ul>
            </div>
        </nav>
    );
}
