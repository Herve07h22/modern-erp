import React from 'react';
import { Building2, Globe, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Company } from '../../types/crm';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link
      to={`/crm/companies/${company.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
            <p className="text-sm text-gray-500">{company.industry}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {company.website && (
            <div className="flex items-center text-sm text-gray-600">
              <Globe className="w-4 h-4 mr-2" />
              <span>{company.website}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{`${company.address.city}, ${company.address.country}`}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>{`${company.contacts.length} contacts`}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            company.status === 'active'
              ? 'bg-green-100 text-green-800'
              : company.status === 'lead'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
          </span>
          <span className="text-sm text-gray-500">
            ID: {company.companyId}
          </span>
        </div>
      </div>
    </Link>
  );
}