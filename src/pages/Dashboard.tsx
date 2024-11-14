import React from 'react';
import { TrendingUp, Users, FileText, Receipt, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$54,239',
    change: '+12.5%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    title: 'Active Clients',
    value: '245',
    change: '+3.2%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Pending Quotations',
    value: '12',
    change: '-2.1%',
    trend: 'down',
    icon: FileText,
  },
  {
    title: 'Unpaid Invoices',
    value: '8',
    change: '-5.4%',
    trend: 'down',
    icon: Receipt,
  },
];

const recentActivities = [
  {
    id: 1,
    title: 'New Project Created',
    description: 'Website Redesign for ABC Corp',
    time: '2 hours ago',
    icon: FileText,
  },
  {
    id: 2,
    title: 'Invoice Paid',
    description: 'Invoice #1234 paid by XYZ Ltd',
    time: '4 hours ago',
    icon: Receipt,
  },
  {
    id: 3,
    title: 'Time Entry Added',
    description: 'John logged 4 hours on Project Alpha',
    time: '5 hours ago',
    icon: Clock,
  },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Export
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="p-6 bg-white rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className={`flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 ml-1" />
                  )}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="px-6 py-4">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;