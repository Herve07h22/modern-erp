import React from 'react';
import { BarChart3, FileText, FolderKanban, Receipt } from 'lucide-react';
import type { CompanyStats } from '../../types/crm';

interface CompanyStatsProps {
  stats: CompanyStats;
}

export default function CompanyStats({ stats }: CompanyStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-purple-50 rounded-lg">
            <FolderKanban className="w-6 h-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Projects</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.activeProjects}
              </p>
              <p className="ml-2 text-sm text-gray-500">
                of {stats.totalProjects}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-blue-50 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Quotations</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.pendingQuotations}
              </p>
              <p className="ml-2 text-sm text-gray-500">
                of {stats.totalQuotations}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-green-50 rounded-lg">
            <Receipt className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Invoices</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stats.unpaidInvoices}
              </p>
              <p className="ml-2 text-sm text-gray-500">
                of {stats.totalInvoices}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <BarChart3 className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${stats.revenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}