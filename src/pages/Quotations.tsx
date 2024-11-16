import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Download } from 'lucide-react';
import QuotationEditor from '../components/quotations/QuotationEditor';
import ItemList from '../components/quotations/ItemList';
import VersionHistory from '../components/quotations/VersionHistory';
import type { Quotation, QuotationItem, QuotationVersion } from '../store/domain/qutotations/quotation';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Mock data
const mockQuotation: Quotation = {
  id: '1',
  reference: 'QT-2024-001',
  companyId: '1',
  title: 'Website Development Project',
  validUntil: '2024-04-15',
  currentVersion: 1,
  versions: [
    {
      id: '1',
      version: 1,
      description: '<h2>Project Scope</h2><p>Complete website redesign including:</p><ul><li>Custom design</li><li>Responsive development</li><li>CMS integration</li></ul>',
      items: [
        {
          id: '1',
          type: 'service',
          name: 'Website Design',
          description: 'Custom design with 3 revision rounds',
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
      createdAt: '2024-03-15',
      status: 'draft'
    }
  ],
  createdAt: '2024-03-15',
  updatedAt: '2024-03-15'
};

export default function Quotations() {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get('company');
  
  const [quotation, setQuotation] = useState<Quotation>(mockQuotation);
  const [selectedVersion, setSelectedVersion] = useState<QuotationVersion>(
    quotation.versions.find(v => v.version === quotation.currentVersion)!
  );

  const handleDescriptionChange = (content: string) => {
    setSelectedVersion(prev => ({
      ...prev,
      description: content
    }));
  };

  const handleAddItem = () => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      type: 'service',
      name: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };

    setSelectedVersion(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const handleUpdateItem = (index: number, item: QuotationItem) => {
    setSelectedVersion(prev => ({
      ...prev,
      items: prev.items.map((i, idx) => idx === index ? item : i)
    }));
  };

  const handleRemoveItem = (index: number) => {
    setSelectedVersion(prev => ({
      ...prev,
      items: prev.items.filter((_, idx) => idx !== index)
    }));
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('quotation-content');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${quotation.reference}-v${selectedVersion.version}.pdf`);
  };

  const handleCreateNewVersion = () => {
    const newVersion: QuotationVersion = {
      ...selectedVersion,
      id: Date.now().toString(),
      version: quotation.versions.length + 1,
      createdAt: new Date().toISOString(),
      status: 'draft',
      sentAt: undefined
    };

    setQuotation(prev => ({
      ...prev,
      versions: [...prev.versions, newVersion],
      currentVersion: newVersion.version
    }));
    setSelectedVersion(newVersion);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{quotation.reference}</h1>
          <p className="text-sm text-gray-500">
            {quotation.title}
            {quotation.validUntil && ` • Valid until ${new Date(quotation.validUntil).toLocaleDateString()}`}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleCreateNewVersion}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Plus className="w-5 h-5 mr-2 inline-block" />
            New Version
          </button>
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
        <div className="lg:col-span-3 space-y-6" id="quotation-content">
          <QuotationEditor
            content={selectedVersion.description}
            onChange={handleDescriptionChange}
          />

          <div className="bg-white rounded-lg shadow-sm p-6">
            <ItemList
              items={selectedVersion.items}
              onAddItem={handleAddItem}
              onUpdateItem={handleUpdateItem}
              onRemoveItem={handleRemoveItem}
              vatRate={selectedVersion.vatRate}
            />
          </div>
        </div>

        <div className="space-y-6">
          <VersionHistory
            versions={quotation.versions}
            currentVersion={quotation.currentVersion}
            onVersionSelect={(version) => {
              setSelectedVersion(
                quotation.versions.find(v => v.version === version)!
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}