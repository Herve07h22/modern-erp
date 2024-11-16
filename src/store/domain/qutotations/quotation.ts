export interface QuotationItem {
  id: string;
  type: 'product' | 'service';
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  unit?: string;
  total: number;
}

export interface QuotationVersion {
  id: string;
  version: number;
  description: string;
  items: QuotationItem[];
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  createdAt: string;
  sentAt?: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
}

export interface Quotation {
  id: string;
  reference: string;
  companyId: string;
  title: string;
  validUntil?: string;
  versions: QuotationVersion[];
  currentVersion: number;
  createdAt: string;
  updatedAt: string;
}