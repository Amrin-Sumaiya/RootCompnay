import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 300 },
  { name: "Mar", users: 500 },
  { name: "Apr", users: 200 },
  { name: "May", users: 600 },
];

const Dashboard = () => {
  return (
    <div className=" bg-gray-100 dark:bg-gray-900 p-6 ">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Dashboard</h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        <div className="bg-red-100 dark:bg-gray-800 p-6 rounded-2xl shadow ">
          <h3 className="text-black  dark:text-gray-300">Total Compnay</h3>
          <p className="text-3xl font-bold text-blue-900">1,240</p>
        </div>
        <div className="bg-green-100 dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h3 className="text-black dark:text-gray-300">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">$18,450</p>
        </div>
        <div className="bg-sky-100 dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h3 className="text-black dark:text-gray-300">Orders</h3>
          <p className="text-3xl font-bold text-purple-600">320</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" radius={[10, 10, 0, 0]} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Quick Stats</h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li>✔ Active Companies: 860</li>
            <li>✔ New Signups: 120</li>
            <li>✔ Conversion Rate: 4.6%</li>
            <li>✔ Server Status: Online</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
