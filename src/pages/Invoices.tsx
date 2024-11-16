import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {  Download, Calendar } from 'lucide-react';
import InvoiceEditor from '../components/invoices/InvoiceEditor';
import ItemList from '../components/invoices/ItemList';
import type { Invoice, InvoiceItem } from '../store/domain/invoices/invoice';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';

// Mock data
const mockInvoice: Invoice = {
  id: '1',
  invoiceNumber: 'INV-2024-001',
  companyId: '1',
  title: 'Website Development Services',
  summary: '<h2>Project Deliverables</h2><p>Completed work includes:</p><ul><li>Custom design implementation</li><li>Responsive development</li><li>CMS integration</li></ul>',
  items: [
    {
      id: '1',
      type: 'service',
      name: 'Website Design',
      description: 'Custom design implementation',
      quantity: 1,
      unitPrice: 2500,
      total: 2500
    },
    {
      id: '2',
      type: 'service',
      name: 'Development',
      description: 'Frontend and backend development',
      quantity: 80,
      unitPrice: 100,
      unit: 'hours',
      total: 8000
    }
  ],
  subtotal: 10500,
  vatRate: 20,
  vatAmount: 2100,
  total: 12600,
  issueDate: '2024-03-15',
  dueDate: '2024-04-14',
  status: 'sent',
  createdAt: '2024-03-15',
  updatedAt: '2024-03-15'
};

export default function Invoices() {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get('company');
  
  const [invoice, setInvoice] = useState<Invoice>(mockInvoice);

  const handleSummaryChange = (content: string) => {
    setInvoice(prev => ({
      ...prev,
      summary: content
    }));
  };

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      type: 'service',
      name: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };

    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const handleUpdateItem = (index: number, item: InvoiceItem) => {
    setInvoice(prev => {
      const newItems = [...prev.items];
      newItems[index] = item;
      
      const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
      const vatAmount = subtotal * (prev.vatRate / 100);
      
      return {
        ...prev,
        items: newItems,
        subtotal,
        vatAmount,
        total: subtotal + vatAmount
      };
    });
  };

  const handleRemoveItem = (index: number) => {
    setInvoice(prev => {
      const newItems = prev.items.filter((_, idx) => idx !== index);
      const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
      const vatAmount = subtotal * (prev.vatRate / 100);
      
      return {
        ...prev,
        items: newItems,
        subtotal,
        vatAmount,
        total: subtotal + vatAmount
      };
    });
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('invoice-content');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${invoice.invoiceNumber}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{invoice.invoiceNumber}</h1>
          <p className="text-sm text-gray-500">
            {invoice.title}
            <span className="mx-2">•</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
              invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
              invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </span>
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Download className="w-5 h-5 mr-2 inline-block" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6" id="invoice-content">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Invoice Details</h3>
                <div className="space-y-1 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Issue Date: {format(new Date(invoice.issueDate), 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Due Date: {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ${invoice.total.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  Including VAT ({invoice.vatRate}%)
                </div>
              </div>
            </div>
          </div>

          <InvoiceEditor
            content={invoice.summary}
            onChange={handleSummaryChange}
          />

          <div className="bg-white rounded-lg shadow-sm p-6">
            <ItemList
              items={invoice.items}
              onAddItem={handleAddItem}
              onUpdateItem={handleUpdateItem}
              onRemoveItem={handleRemoveItem}
              vatRate={invoice.vatRate}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                  invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                  invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Due Date</span>
                <span className="text-sm font-medium text-gray-900">
                  {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Amount Due</span>
                <span className="text-lg font-bold text-gray-900">
                  ${invoice.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}