export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  companyId: string;
  industry: string;
  size: 'small' | 'medium' | 'large' | 'enterprise';
  status: 'active' | 'inactive' | 'lead';
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  contacts: Contact[];
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  isPrimary: boolean;
  companyId: string;
}

export interface CompanyStats {
  totalProjects: number;
  activeProjects: number;
  totalQuotations: number;
  pendingQuotations: number;
  totalInvoices: number;
  unpaidInvoices: number;
  revenue: number;
}