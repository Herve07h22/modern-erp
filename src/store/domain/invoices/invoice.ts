export interface InvoiceItem {
    id: string;
    type: 'product' | 'service';
    name: string;
    description?: string;
    quantity: number;
    unitPrice: number;
    unit?: string;
    total: number;
  }
  
  export interface Invoice {
    id: string;
    invoiceNumber: string;
    companyId: string;
    title: string;
    summary: string;
    items: InvoiceItem[];
    subtotal: number;
    vatRate: number;
    vatAmount: number;
    total: number;
    issueDate: string;
    dueDate: string;
    status: 'draft' | 'sent' | 'paid' | 'overdue';
    createdAt: string;
    updatedAt: string;
  }
