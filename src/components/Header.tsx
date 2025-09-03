import React, { useState } from 'react';
import { BarChart3, TrendingUp, Zap, Target, Trophy, ChevronDown, Building2 } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState('Baker, Williams and Stevens Furniture');

  const clients = [
    'Baker, Williams and Stevens Furniture',
    'Blake and Sons Furniture & Appliance',
    'Modern Home Solutions',
    'Elite Office Furnishings',
    'Comfort Living Stores'
  ];

  const tabs = [
    { id: 'compare', label: 'Compare Campaigns', icon: BarChart3 },
    { id: 'roi', label: 'Enhanced ROI', icon: TrendingUp },
    { id: 'performance', label: 'Performance Review', icon: Zap },
    { id: 'improvements', label: 'Improvements', icon: Target },
    { id: 'benchmark', label: 'Industry Benchmark', icon: Trophy },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <img 
              src="https://directmail2.com/wp-content/themes/dm20/img/logo.svg" 
              alt="DirectMail 2.0 Logo" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">CLDB-AI Campaign Intelligence Platform</h1>
              <p className="text-sm text-gray-600">AI-powered campaign analytics with industry benchmarking</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 text-sm"
            >
              <Building2 className="w-3 h-3" />
              <span className="max-w-48 truncate">{selectedClient}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isClientDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isClientDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-2 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900 flex items-center space-x-1 text-sm">
                    <Building2 className="w-3 h-3" />
                    <span>Select Client</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Choose a client to analyze their campaigns</p>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {clients.map((client) => (
                    <button
                      key={client}
                      onClick={() => {
                        setSelectedClient(client);
                        setIsClientDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-sm ${
                        selectedClient === client ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <div className="font-medium text-sm">{client}</div>
                      <div className="text-xs text-gray-500">
                        {client.includes('Furniture') ? 'Furniture Industry' : 'Home & Office'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <nav className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-orange-100 text-orange-700 border border-orange-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;