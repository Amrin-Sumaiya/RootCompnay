import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid
  // Defs, LinearGradient, Stop removed from here
} from "recharts";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Building2, 
  Users, 
  Activity, 
  Server
} from "lucide-react";

const data = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 300 },
  { name: "Mar", users: 500 },
  { name: "Apr", users: 200 },
  { name: "May", users: 600 },
  { name: "Jun", users: 800 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 font-sans">
      
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Dashboard Overview</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, here is what's happening with your business today.</p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Companies */}
        <div className="bg-indigo-100 dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Companies</p>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">1,240</h3>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
              <Building2 size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-600 font-medium">
             <TrendingUp size={16} className="mr-1" />
             <span>+12.5%</span>
             <span className="text-slate-400 ml-2 font-normal">from last month</span>
          </div>
        </div>

        {/* Card 2: Revenue */}
        <div className="bg-green-100 dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</p>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">$18,450</h3>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-emerald-600 font-medium">
             <TrendingUp size={16} className="mr-1" />
             <span>+4.2%</span>
             <span className="text-slate-400 ml-2 font-normal">from last month</span>
          </div>
        </div>

        {/* Card 3: Orders */}
        <div className="bg-red-100 dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Orders</p>
              <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">320</h3>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400">
              <ShoppingBag size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-500 font-medium">
             <TrendingUp size={16} className="mr-1 rotate-180" />
             <span>-1.2%</span>
             <span className="text-slate-400 ml-2 font-normal">from last month</span>
          </div>
        </div>

      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">User Growth Analytics</h3>
            <button className="text-sm text-indigo-600 font-medium hover:underline">View Report</button>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                {/* FIX: Use standard lowercase SVG tags for gradients. 
                   Do NOT import Defs, LinearGradient, Stop from recharts. 
                */}
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ 
                        backgroundColor: '#fff', 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
                    }}
                />
                <Bar 
                    dataKey="users" 
                    fill="url(#colorUsers)" 
                    radius={[8, 8, 0, 0]} 
                    barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats / Side Panel */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">System Status</h3>
          
          <div className="space-y-6">
            
            {/* Stat Item 1 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Users size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">Active Companies</p>
                        <p className="text-xs text-slate-500">Currently registered</p>
                    </div>
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">860</span>
            </div>

            {/* Stat Item 2 */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <Activity size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">New Signups</p>
                        <p className="text-xs text-slate-500">This week</p>
                    </div>
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">120</span>
            </div>

             {/* Stat Item 3 */}
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                        <TrendingUp size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">Conversion Rate</p>
                        <p className="text-xs text-slate-500">Leads to Customers</p>
                    </div>
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">4.6%</span>
            </div>

             {/* Stat Item 4 */}
             <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                        <Server size={18} />
                    </div>
                    <span className="text-sm font-medium text-slate-800 dark:text-white">Server Status</span>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    Online
                </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;