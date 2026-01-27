import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, Package, ShoppingBag, 
  DollarSign, Clock, ArrowRight, Activity 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext"; // Import your Auth Hook

// Static Chart Data
const dummyLineData = [
  { date: 'Jan 22', rev: 4000 }, { date: 'Jan 24', rev: 9000 }, { date: 'Jan 26', rev: 14000 }
];
const dummyPieData = [
  { name: 'Oud Intense', value: 40 }, { name: 'Rose Aura', value: 30 }, 
  { name: 'Midnight', value: 20 }, { name: 'Amber', value: 10 }
];
const COLORS = ['#064e3b', '#065f46', '#059669', '#10b981', '#34d399'];

function Dashboard() {
  const { user, loading: authLoading } = useAuth(); // Access user and loading from Context
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0, totalProducts: 0, revenue: 124500, orders: 86, pending: 5
  });
  const [topProducts, setTopProducts] = useState([]);

  const loadDashboardData = useCallback(async () => {
    try {
      const [uRes, pRes, bestRes] = await Promise.all([
        api.get('auth/admin/users/'),
        api.get('admin/products/list/'),
        api.get('products/best-sellers/')
      ]);
      
      setStats(prev => ({
        ...prev,
        totalUsers: uRes.data.length,
        totalProducts: pRes.data.length,
      }));

      const formattedTop = bestRes.data.slice(0, 5).map(p => ({
        name: p.title,
        value: p.sold_count || Math.floor(Math.random() * 50) + 10 
      }));
      setTopProducts(formattedTop);
    } catch (err) {
      console.error("Dashboard Sync Error:", err);
    }
  }, []);

  useEffect(() => {
    // 1. Wait for AuthProvider to finish checking the session
    if (authLoading) return;

    // 2. Check user from context and verify Admin role
    if (!user || user.role?.toLowerCase() !== 'admin') {
      console.warn("Unauthorized access. Redirecting to signin...");
      navigate('/signin');
    } else {
      // 3. Only load data if user is an authenticated admin
      loadDashboardData();
    }
  }, [user, authLoading, navigate, loadDashboardData]);

  // Prevent rendering content while checking auth to stop the "blink"
  if (authLoading || !user) return null;

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 tracking-tighter">{value}</h3>
        </div>
        <div className={`p-3.5 rounded-2xl ${color} text-white shadow-lg`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 uppercase italic">
            PERF<span className="text-emerald-700 font-light tracking-[0.15em]">AURA</span> 
            <span className="not-italic font-black text-sm ml-2 bg-gray-100 px-3 py-1 rounded-full text-gray-500 uppercase">Intelligence</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium">Welcome back, {user.name || 'Admin'}</p>
        </div>
        <div className="px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">System Live</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`₹${stats.revenue.toLocaleString()}`} icon={DollarSign} color="bg-emerald-900" />
        <StatCard title="Orders" value={stats.orders} icon={ShoppingBag} color="bg-gray-950" />
        <StatCard title="Customers" value={stats.totalUsers} icon={Users} color="bg-emerald-800" />
        <StatCard title="Out of Stock" value={stats.pending} icon={Package} color="bg-red-900" />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Growth Chart */}
        <div className="lg:col-span-7 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm min-w-0">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] mb-10">Revenue Growth</h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyLineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} />
                <Tooltip />
                <Line type="monotone" dataKey="rev" stroke="#064e3b" strokeWidth={4} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best Sellers Donut Chart */}
        <div className="lg:col-span-5 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col min-w-0">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] mb-4">Top 5 Best Sellers</h2>
          <div className="flex-1 min-h-[350px] relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Inventory</span>
              <span className="text-2xl font-bold text-emerald-950">Top 5</span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topProducts.length > 0 ? topProducts : dummyPieData}
                  cx="50%" cy="50%" innerRadius={85} outerRadius={115}
                  paddingAngle={5} dataKey="value" stroke="none"
                >
                  {(topProducts.length > 0 ? topProducts : dummyPieData).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 'bold', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;