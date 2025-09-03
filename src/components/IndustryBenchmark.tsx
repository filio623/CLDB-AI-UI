import React from 'react';
import { Trophy, Building2, Target, TrendingUp, TrendingDown, Award, Lightbulb } from 'lucide-react';
import KPICard from './KPICard';
import MetricCard from './MetricCard';

const IndustryBenchmark: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Industry Benchmark Analysis</h1>
        <p className="text-gray-600">Compare performance against industry cohorts with statistical analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campaign Selection Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Campaign Selection</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Select Campaign to Benchmark
                </label>
                <p className="text-sm text-gray-500 mb-3">Choose a campaign for industry comparison</p>
                <div className="relative">
                  <select className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option>Living Room Sets Promo (10 days)</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Analyze Industry Position</span>
              </button>
              
              <p className="text-sm text-gray-600 text-center italic">
                Compare against 152 similar furniture campaigns
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          {/* Campaign Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Industry Benchmark Analysis</h2>
                <p className="text-sm text-gray-600">Performance comparison against furniture industry cohorts</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-orange-600" />
                  <span>Campaign Details</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-orange-200">
                    <span className="text-sm font-medium text-gray-600">Campaign</span>
                    <span className="text-sm font-semibold text-gray-900">Living Room Sets Promo</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-orange-200">
                    <span className="text-sm font-medium text-gray-600">Client</span>
                    <span className="text-sm font-semibold text-gray-900">Blake and Sons Furniture</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-orange-200">
                    <span className="text-sm font-medium text-gray-600">Duration</span>
                    <span className="text-sm font-semibold text-gray-900">10 days</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-orange-200">
                    <span className="text-sm font-medium text-gray-600">Industry</span>
                    <span className="text-sm font-semibold text-gray-900">Furniture</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span>Industry Position Summary</span>
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-600 mb-2">Overall Industry Grade</p>
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-lg font-bold bg-orange-100 text-orange-800 border border-orange-300">
                      C+
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-blue-200">
                      <span className="text-sm font-medium text-gray-600">Industry Percentile</span>
                      <span className="text-sm font-semibold text-blue-700">55.0th percentile</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-gray-600">Industry Cohort</span>
                      <span className="text-sm font-semibold text-gray-900">Furniture (152 campaigns)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Industry Benchmark Metrics - Full Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Click-Through Rate (CTR)</h3>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Industry Median</p>
              <p className="text-2xl font-bold text-gray-900">0.23%</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Your Campaign</p>
              <p className="text-2xl font-bold text-gray-900">1.79%</p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-semibold">678% above average</span>
                <span className="text-green-600">(95.0th percentile)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Leads per 1000</h3>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Industry Median</p>
              <p className="text-2xl font-bold text-gray-900">156.05</p>
            </div>
            
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Your Campaign</p>
              <p className="text-2xl font-bold text-gray-900">8.08</p>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="text-red-700 font-semibold">95% below average</span>
                <span className="text-red-600">(15.0th percentile)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Strengths - Full Width */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <span>✅</span>
          <span>Competitive Strengths:</span>
        </h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              ✓
            </div>
            <p className="text-gray-700">Strong combined social ctr performance (Exceptional (Top 10%))</p>
          </div>
        </div>
      </div>

      {/* Key Industry Insights - Full Width */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <span>Key Industry Insights:</span>
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              1
            </div>
            <p className="text-gray-700">Focus on improving lead generation strategies to align with industry benchmarks.</p>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              2
            </div>
            <p className="text-gray-700">Leverage your strong social media engagement to drive more qualified leads.</p>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
              3
            </div>
            <p className="text-gray-700">Analyze competitor strategies for lead generation to identify areas for improvement.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryBenchmark;