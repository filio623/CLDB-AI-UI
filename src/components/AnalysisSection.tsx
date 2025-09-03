import React from 'react';
import { Brain, TrendingDown, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';

const AnalysisSection: React.FC = () => {
  const kpiChanges = [
    { metric: 'Ad Displays', change: '1,686,496 → 333,535', percentage: '80.2% decrease', trend: 'down' },
    { metric: 'Engagements', change: '6,745 → 667', percentage: '90.1% decrease', trend: 'down' },
    { metric: 'Visitors', change: '5,328 → 466', percentage: '91.3% decrease', trend: 'down' },
    { metric: 'Leads', change: '692 → 37', percentage: '94.7% decrease', trend: 'down' },
    { metric: 'Attributions', change: '456 → 20', percentage: '95.6% decrease', trend: 'down' },
  ];

  const recommendations = [
    'Maintain the full DM20 campaign format rather than the Lite version to ensure maximum reach',
    'Increase budget allocation to high-performing channels identified in the analysis',
    'Implement A/B testing for creative variations to improve engagement rates',
    'Focus on audience segmentation based on the successful Holiday Home Decor campaign patterns',
  ];

  return (
    <div className="space-y-8">
      {/* Campaign Comparison Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Campaign Comparison Analysis</h2>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>Campaigns Compared</span>
          </h3>
          <div className="space-y-1 text-sm text-gray-700">
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <p className="font-medium text-gray-900 mb-1">Primary Campaign (Current)</p>
              <p className="text-gray-700">Holiday Home Decor - Baker, Williams and Stevens Furniture (20 days)</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <p className="font-medium text-gray-900 mb-1">Comparison Campaign (Previous)</p>
              <p className="text-gray-700">Summer Office Furniture - Baker, Williams and Stevens Furniture (17 days)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brief Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Brain className="w-5 h-5 text-blue-600" />
          <span>Brief Summary:</span>
        </h3>
        <p className="text-gray-700 leading-relaxed">
          The Summer Office Furniture campaign (12357) shows a significant drop in performance across all key metrics compared to the Holiday Home Decor 
          campaign (12356). With a substantially smaller mail volume and different job type, the campaign experienced dramatic declines in ad displays, 
          engagements, visitors, leads, and attributions.
        </p>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>Recommendations:</span>
        </h3>
        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-700">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisSection;