import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import KPICard from './components/KPICard';
import MetricCard from './components/MetricCard';
import AnalysisSection from './components/AnalysisSection';
import CampaignSelector from './components/CampaignSelector';
import IndustryBenchmark from './components/IndustryBenchmark';
import EnhancedROI from './components/EnhancedROI';
import PerformanceReview from './components/PerformanceReview';
import Improvements from './components/Improvements';
import {
  Eye,
  MousePointer,
  Users,
  Target,
  Award,
  Mail,
  Phone,
  Share2,
  Youtube,
  QrCode,
  TrendingUp,
  PieChart,
  BarChart3,
  Activity,
  Search,
  Zap,
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('compare');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'roi':
        return <EnhancedROI />;
      case 'benchmark':
        return <IndustryBenchmark />;
      case 'performance':
        return <PerformanceReview />;
      case 'improvements':
        return <Improvements />;
      case 'compare':
      default:
        return (
          <div className="space-y-8">
            {/* OPTION 2: Compact Top Bar */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-8">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Compare:</span>
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500">
                  <option>Holiday Home Decor (20 days)</option>
                </select>
                <span className="text-gray-500">vs</span>
                <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500">
                  <option>Summer Office Furniture (17 days)</option>
                </select>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm">
                  Analyze
                </button>
              </div>
            </div>

            {/* KPI Performance Row - Top of Page */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>KPI Performance Changes</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Ad Displays */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Ad Displays</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-2">2,766,618</p>
                  <p className="text-green-700 font-medium text-sm mb-2">+13.5%</p>
                  <p className="text-xs text-gray-500">from 2,438,018</p>
                </div>

                {/* Engagements */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Engagements</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-2">5,533</p>
                  <p className="text-green-700 font-medium text-sm mb-2">+13.5%</p>
                  <p className="text-xs text-gray-500">from 4,876</p>
                </div>

                {/* Visitors */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Visitors</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-2">3,928</p>
                  <p className="text-red-700 font-medium text-sm mb-2">-0.5%</p>
                  <p className="text-xs text-gray-500">from 3,949</p>
                </div>

                {/* Leads */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Leads</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-2">274</p>
                  <p className="text-red-700 font-medium text-sm mb-2">-53.7%</p>
                  <p className="text-xs text-gray-500">from 592</p>
                </div>

                {/* Attributions */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Attributions</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-2">172</p>
                  <p className="text-red-700 font-medium text-sm mb-2">-41.9%</p>
                  <p className="text-xs text-gray-500">from 296</p>
                </div>
              </div>
            </div>

            <AnalysisSection />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'compare' && (
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Compare Campaign Performance</h1>
            <p className="text-gray-600">Select campaigns to analyze performance trends and get AI-powered insights</p>
          </div>
        )}
        
        {renderTabContent()}
      </main>
    </div>
  );
}

export default App;