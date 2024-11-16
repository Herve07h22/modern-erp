import { useParams, Link } from 'react-router-dom';
import {
  Building2, Globe, Mail, Phone, MapPin,
  FolderKanban, FileText, Receipt
} from 'lucide-react';
import CompanyStats from '../components/crm/CompanyStats';
import type { Company, CompanyStats as ICompanyStats } from '../store/domain/crm/crm';

// Mock data for demonstration
const mockCompany: Company = {
  id: '1',
  name: 'Acme Corporation',
  website: 'www.acme.com',
  companyId: 'ACM001',
  industry: 'Technology',
  size: 'large',
  status: 'active',
  address: {
    street: '123 Tech Street',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    postalCode: '94105',
  },
  contacts: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@acme.com',
      phone: '+1 (555) 123-4567',
      role: 'CEO',
      isPrimary: true,
      companyId: '1',
    },
  ],
  createdAt: '2024-01-01',
  updatedAt: '2024-03-15',
};

const mockStats: ICompanyStats = {
  totalProjects: 12,
  activeProjects: 5,
  totalQuotations: 24,
  pendingQuotations: 3,
  totalInvoices: 36,
  unpaidInvoices: 2,
  revenue: 154750,
};

function CompanyDetails() {
  const { id } = useParams<{ id: string }>();
  const company = mockCompany; // In real app, fetch by id

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-sm text-gray-500">ID: {company.companyId}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Edit
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Add Contact
          </button>
        </div>
      </div>

      <CompanyStats stats={mockStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to={`/projects?company=${id}`}
                className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100"
              >
                <FolderKanban className="w-6 h-6 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-purple-900">Projects</p>
                  <p className="text-sm text-purple-700">{mockStats.activeProjects} active</p>
                </div>
              </Link>
              <Link
                to={`/quotations?company=${id}`}
                className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
              >
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-blue-900">Quotations</p>
                  <p className="text-sm text-blue-700">{mockStats.pendingQuotations} pending</p>
                </div>
              </Link>
              <Link
                to={`/invoices?company=${id}`}
                className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100"
              >
                <Receipt className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-green-900">Invoices</p>
                  <p className="text-sm text-green-700">{mockStats.unpaidInvoices} unpaid</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Contact List */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contacts</h2>
            <div className="divide-y divide-gray-200">
              {company.contacts.map((contact) => (
                <div key={contact.id} className="py-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {contact.firstName} {contact.lastName}
                      {contact.isPrimary && (
                        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          Primary
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{contact.role}</p>
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    {contact.phone && (
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
          <div className="space-y-4">
            {company.website && (
              <div className="flex items-center text-sm">
                <Globe className="w-5 h-5 text-gray-400 mr-3" />
                <a
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {company.website}
                </a>
              </div>
            )}
            <div className="flex items-start text-sm">
              <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
              <div>
                <p>{company.address.street}</p>
                <p>{company.address.city}, {company.address.state} {company.address.postalCode}</p>
                <p>{company.address.country}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Industry</dt>
                  <dd className="text-sm text-gray-900">{company.industry}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Company Size</dt>
                  <dd className="text-sm text-gray-900">
                    {company.size.charAt(0).toUpperCase() + company.size.slice(1)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Status</dt>
                  <dd className="text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${company.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : company.status === 'lead'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;