import React, { useState } from 'react';
import { DollarSign, Upload, FileText, Calculator, TrendingUp, Target, Award, Lightbulb } from 'lucide-react';

const EnhancedROI: React.FC = () => {
  const [campaignCost, setCampaignCost] = useState('5000');
  const [revenueGenerated, setRevenueGenerated] = useState('25000');
  const [pastedData, setPastedData] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const calculateROI = () => {
    const cost = parseFloat(campaignCost);
    const revenue = parseFloat(revenueGenerated);
    const profit = revenue - cost;
    const roiPercentage = ((profit / cost) * 100).toFixed(1);
    return { cost, revenue, profit, roiPercentage };
  };

  const { cost, revenue, profit, roiPercentage } = calculateROI();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Enhanced ROI Calculator</h1>
        <p className="text-gray-600">Calculate return on investment with manual cost/revenue input for accurate financial analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Manual Input Fields */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Manual Input Fields</h2>
            </div>

            <p className="text-sm text-gray-600 mb-6">Enter your campaign cost and revenue for instant ROI calculation</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Cost ($)
                </label>
                <p className="text-xs text-gray-500 mb-2">Total campaign spend (optional - improves accuracy)</p>
                <input
                  type="number"
                  value={campaignCost}
                  onChange={(e) => setCampaignCost(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="5000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenue Generated ($)
                </label>
                <p className="text-xs text-gray-500 mb-2">Sales revenue from campaign (optional - improves accuracy)</p>
                <input
                  type="number"
                  value={revenueGenerated}
                  onChange={(e) => setRevenueGenerated(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="25000"
                />
              </div>
            </div>
          </div>

          {/* File Upload / Data Input */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Upload Data or Paste Directly</h2>
            </div>

            <p className="text-sm text-gray-600 mb-6">Upload a file with cost and revenue data for AI parsing</p>

            {/* File Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Document
              </label>
              <p className="text-xs text-gray-500 mb-3">Supports CSV, TXT, DOC, DOCX, PDF and other document formats</p>
              
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".csv,.txt,.doc,.docx,.pdf,.xlsx,.xls"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {selectedFile ? selectedFile.name : 'Drop File Here'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedFile ? 'File selected - ready for analysis' : 'or Click to Upload'}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    CSV, TXT, DOC, DOCX, PDF, Excel files supported
                  </p>
                </label>
              </div>
            </div>

            {/* Direct Data Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or Paste Revenue Data Directly
              </label>
              <p className="text-xs text-gray-500 mb-3">Paste revenue data in any format - AI will parse it automatically</p>
              <textarea
                value={pastedData}
                onChange={(e) => setPastedData(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                placeholder="Paste your revenue data here...&#10;&#10;Example from Excel:&#10;Product Sales: $18,500&#10;Service Revenue: $6,500&#10;Total Revenue: $25,000&#10;Q1 Sales: $12,000&#10;Q2 Sales: $13,000"
              />
            </div>

            <button className="w-full mt-4 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
              <Calculator className="w-5 h-5" />
              <span>Parse Data & Calculate ROI</span>
            </button>
          </div>

          {/* Campaign Context */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Campaign Context (Optional)</h2>
            </div>

            <p className="text-sm text-gray-600 mb-4">Select a campaign for enhanced ROI analysis with campaign correlation</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign (Optional - for enhanced insights)
              </label>
              <p className="text-xs text-gray-500 mb-3">Select a campaign to get enhanced ROI insights with revenue per piece analysis</p>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <option value="">Select a campaign...</option>
                <option>Living Room Sets Promo (10 days)</option>
                <option>Holiday Home Decor (20 days)</option>
                <option>Summer Office Furniture (17 days)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* ROI Analysis Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">ROI Analysis Results (v3.0 Enhanced)</h2>
            </div>

            {/* Your ROI Section */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <span>Your ROI:</span>
              </h3>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">ROI Percentage</p>
                    <p className="text-3xl font-bold text-green-700">{roiPercentage}%</p>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-700">Excellent ROI</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Profit</p>
                    <p className="text-3xl font-bold text-gray-900">${profit.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total Cost:</p>
                    <p className="font-semibold text-gray-900">${cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Revenue:</p>
                    <p className="font-semibold text-gray-900">${revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span>Explanation:</span>
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-gray-700">
                  ROI calculated: ${revenue.toLocaleString()} revenue - ${cost.toLocaleString()} cost = ${profit.toLocaleString()} profit ({roiPercentage}% ROI)
                </p>
              </div>
            </div>

            {/* Data Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span>Data Information:</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    📊
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong>Data Source:</strong> Manual Input (High Accuracy)
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <p className="text-sm text-gray-700">
                    Simple, accurate ROI calculation focused on what matters to you
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Insights */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              <span>Enhanced ROI Insights:</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Strong Performance Indicator</p>
                  <p className="text-sm text-gray-700">Your {roiPercentage}% ROI significantly exceeds typical industry benchmarks of 15-25%.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Revenue Efficiency</p>
                  <p className="text-sm text-gray-700">Each dollar invested generated ${(revenue / cost).toFixed(2)} in revenue, indicating excellent campaign efficiency.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Scaling Opportunity</p>
                  <p className="text-sm text-gray-700">Consider increasing budget allocation to similar high-performing campaigns to maximize returns.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick ROI Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Profit Margin</h3>
              <p className="text-2xl font-bold text-green-600">{((profit / revenue) * 100).toFixed(1)}%</p>
              <p className="text-xs text-gray-500 mt-1">Of total revenue</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Revenue Multiple</h3>
              <p className="text-2xl font-bold text-blue-600">{(revenue / cost).toFixed(1)}x</p>
              <p className="text-xs text-gray-500 mt-1">Return on investment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedROI;