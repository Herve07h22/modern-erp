import { Trash2, Plus } from 'lucide-react';
import type { InvoiceItem } from '../../store/domain/invoices/invoice';

interface ItemListProps {
  items: InvoiceItem[];
  onAddItem: () => void;
  onUpdateItem: (index: number, item: InvoiceItem) => void;
  onRemoveItem: (index: number) => void;
  vatRate: number;
}

export default function ItemList({ items, onAddItem, onUpdateItem, onRemoveItem, vatRate }: ItemListProps) {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const vatAmount = subtotal * (vatRate / 100);
  const total = subtotal + vatAmount;

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const updatedItem = { ...items[index] };
    if (field === 'quantity' || field === 'unitPrice' || field === 'total') {
      updatedItem[field] = value as number;
      updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
    } else if (field === 'type') {
      updatedItem[field] = value as 'product' | 'service';
    } else {
      updatedItem[field] = value as string;
    }

    onUpdateItem(index, updatedItem);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Item</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Description</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Quantity</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Unit Price</th>
              <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Total</th>
              <th className="px-4 py-2 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={item.id}>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={item.description || ''}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                    className="w-24 text-right border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                    className="w-32 text-right border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-4 py-2 text-right font-medium">
                  ${item.total.toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={onAddItem}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Item
      </button>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-500">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-500">VAT ({vatRate}%)</span>
          <span className="font-medium">${vatAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}