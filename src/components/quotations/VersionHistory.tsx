import React from 'react';
import { format } from 'date-fns';
import { Clock, Send, Check, X } from 'lucide-react';
import type { QuotationVersion } from '../../store/domain/qutotations/quotation';

interface VersionHistoryProps {
  versions: QuotationVersion[];
  currentVersion: number;
  onVersionSelect: (version: number) => void;
}

export default function VersionHistory({ versions, currentVersion, onVersionSelect }: VersionHistoryProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Version History</h3>
      <div className="space-y-2">
        {versions.map((version) => (
          <button
            key={version.id}
            onClick={() => onVersionSelect(version.version)}
            className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
              version.version === currentVersion
                ? 'bg-blue-50 border-2 border-blue-200'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {version.status === 'sent' && <Send className="w-5 h-5 text-blue-500" />}
                {version.status === 'accepted' && <Check className="w-5 h-5 text-green-500" />}
                {version.status === 'rejected' && <X className="w-5 h-5 text-red-500" />}
                {version.status === 'draft' && <Clock className="w-5 h-5 text-gray-400" />}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Version {version.version}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(version.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                version.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                version.status === 'accepted' ? 'bg-green-100 text-green-800' :
                version.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {version.status.charAt(0).toUpperCase() + version.status.slice(1)}
              </span>
              {version.sentAt && (
                <p className="text-xs text-gray-500 mt-1">
                  Sent {format(new Date(version.sentAt), 'MMM d, yyyy')}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}