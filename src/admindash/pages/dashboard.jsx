import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Package, ShoppingBag, DollarSign, TrendingUp 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

// Color palette for the Pie Chart
const COLORS = ['#064e3b', '#065f46', '#059669', '#10b981', '#34d399'];

function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // State for real data
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    totalUsers: 0,
    totalProducts: 0
  });
  const [revenueHistory, setRevenueHistory] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const loadDashboardData = useCallback(async () => {
    try {
      setDataLoading(true);
      const res = await api.get('analytics/admin/stats/');
      
      const { stats: apiStats, charts } = res.data;

      // 1. Set Top Cards
      setStats({
        revenue: apiStats.revenue,
        orders: apiStats.orders,
        totalUsers: apiStats.customers,
        totalProducts: apiStats.products,
      });

      // 2. Format Line Chart Data (Revenue Growth)
      const formattedLineData = charts.revenue_history.map(item => ({
        // Converts "2024-05-20" to "May 20"
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rev: parseFloat(item.rev)
      }));
      setRevenueHistory(formattedLineData);

      // 3. Set Pie Chart Data (Best Sellers)
      setTopProducts(charts.top_products);

    } catch (err) {
      console.error("Dashboard Sync Error:", err);
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (!user || user.role?.toLowerCase() !== 'admin') {
      console.warn("Unauthorized. Redirecting...");
      navigate('/signin');
    } else {
      loadDashboardData();
    }
  }, [user, authLoading, navigate, loadDashboardData]);

  // Prevent UI flickering while checking auth or fetching data
  if (authLoading || dataLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-900/20 border-t-emerald-900 rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Syncing Intelligence</p>
      </div>
    );
  }

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
          <p className="text-sm text-gray-500 font-medium italic">Dashboard Overview for {user.name || 'Administrator'}</p>
        </div>
        <div className="px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">Live Analytics</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`₹${stats.revenue.toLocaleString('en-IN')}`} 
          icon={DollarSign} 
          color="bg-emerald-900" 
        />
        <StatCard 
          title="Total Orders" 
          value={stats.orders} 
          icon={ShoppingBag} 
          color="bg-gray-950" 
        />
        <StatCard 
          title="Customers" 
          value={stats.totalUsers} 
          icon={Users} 
          color="bg-emerald-800" 
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={Package} 
          color="bg-emerald-600" 
        />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Growth Chart */}
        <div className="lg:col-span-7 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm min-w-0">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em]">Revenue Growth (30 Days)</h2>
            <TrendingUp size={16} className="text-emerald-700" />
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#9ca3af'}} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#9ca3af'}} 
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="rev" 
                  stroke="#064e3b" 
                  strokeWidth={4} 
                  dot={{ r: 4, fill: '#064e3b', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best Sellers Donut Chart */}
        <div className="lg:col-span-5 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col min-w-0">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] mb-4">Top 5 Best Sellers</h2>
          <div className="flex-1 min-h-[350px] relative">
            {/* Center Label for Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Total Sold</span>
              <span className="text-2xl font-bold text-emerald-950">
                {topProducts.reduce((acc, curr) => acc + curr.value, 0)}
              </span>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topProducts}
                  cx="50%" 
                  cy="50%" 
                  innerRadius={85} 
                  outerRadius={115}
                  paddingAngle={5} 
                  dataKey="value" 
                  stroke="none"
                >
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', paddingTop: '20px' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;