import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [userRes, productRes] = await Promise.all([
        axios.get('http://localhost:3000/users'),
        axios.get('http://localhost:3000/products'),
      ]);

      let orders = 0;
      let revenue = 0;
      const revenueByDate = {};

      userRes.data.forEach(user => {
        (user.orders || []).forEach(order => {
          orders += 1;
          const orderTotal = parseFloat(order.total || 0);
          revenue += orderTotal;

          // Extract date only (YYYY-MM-DD)
          const date = order.date ? order.date.split('T')[0] : 'Unknown';

          if (date !== 'Unknown') {
            revenueByDate[date] = (revenueByDate[date] || 0) + orderTotal;
          }
        });
      });

      const chartData = Object.entries(revenueByDate)
        .map(([date, total]) => ({ date, revenue: total }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setStats({
        users: userRes.data.length,
        products: productRes.data.length,
        orders,
        revenue,
      });

      setRevenueData(chartData);
    };

    fetchData();
  }, []);

  const cards = [
    { label: 'Users', value: stats.users },
    { label: 'Products', value: stats.products },
    { label: 'Orders', value: stats.orders },
    { label: 'Revenue', value: `₹${stats.revenue.toFixed(2)}` },
  ];

  return (
    <div className="p-6 space-y-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow text-center border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-700">{card.label}</h2>
            <p className="text-3xl mt-2 text-green-800">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg border border-gray-200 shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Revenue Over Time</h2>
        {revenueData.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Bar dataKey="revenue" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 max-h-48 overflow-y-auto border border-gray-300 rounded p-3">
              <h3 className="font-semibold mb-2">Revenue Details</h3>
              <ul className="text-gray-700 text-sm">
                {revenueData.map(({ date, revenue }) => (
                  <li key={date} className="mb-1 flex justify-between">
                    <span>{date}</span>
                    <span>₹{revenue.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No revenue data available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
