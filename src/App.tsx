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
import { Client, CampaignSummary, CompareResponse, apiService, APIError, formatCampaignName, formatDuration } from './services/api';
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
  
  // Global client state (shared between Header and Compare tab)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  // Compare tab specific state
  const [campaigns, setCampaigns] = useState<CampaignSummary[]>([]);
  const [similarCampaigns, setSimilarCampaigns] = useState<CampaignSummary[]>([]);
  const [primaryCampaign, setPrimaryCampaign] = useState<CampaignSummary | null>(null);
  const [comparisonCampaign, setComparisonCampaign] = useState<CampaignSummary | null>(null);
  const [compareResult, setCompareResult] = useState<CompareResponse | null>(null);
  
  // Loading states
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(false);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Error states
  const [campaignError, setCampaignError] = useState<string | null>(null);
  const [similarError, setSimilarError] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Effect: Load campaigns when client changes (mirrors Gradio client_dropdown.change)
  useEffect(() => {
    const loadCampaigns = async () => {
      if (!selectedClient) {
        setCampaigns([]);
        setPrimaryCampaign(null);
        setComparisonCampaign(null);
        setSimilarCampaigns([]);
        return;
      }

      try {
        setIsLoadingCampaigns(true);
        setCampaignError(null);
        setPrimaryCampaign(null);
        setComparisonCampaign(null);
        setSimilarCampaigns([]);
        
        const campaignData = await apiService.getCampaignsByClient(selectedClient.client_id);
        setCampaigns(campaignData);
      } catch (error) {
        console.error('Failed to load campaigns:', error);
        setCampaignError(error instanceof APIError ? error.message : 'Failed to load campaigns');
        setCampaigns([]);
      } finally {
        setIsLoadingCampaigns(false);
      }
    };

    loadCampaigns();
  }, [selectedClient]);

  // Effect: Load similar campaigns when primary campaign changes (mirrors primary_campaign_dropdown.change)
  useEffect(() => {
    const loadSimilarCampaigns = async () => {
      if (!primaryCampaign) {
        setSimilarCampaigns([]);
        setComparisonCampaign(null);
        return;
      }

      try {
        setIsLoadingSimilar(true);
        setSimilarError(null);
        setComparisonCampaign(null);
        
        const similarData = await apiService.getSimilarCampaigns(primaryCampaign.campaign_id);
        setSimilarCampaigns(similarData);
      } catch (error) {
        console.error('Failed to load similar campaigns:', error);
        setSimilarError(error instanceof APIError ? error.message : 'Failed to load similar campaigns');
        setSimilarCampaigns([]);
      } finally {
        setIsLoadingSimilar(false);
      }
    };

    loadSimilarCampaigns();
  }, [primaryCampaign]);

  // Handle analyze button click (mirrors compare_btn.click)
  const handleAnalyze = async () => {
    if (!primaryCampaign || !comparisonCampaign) {
      setAnalysisError('Please select both campaigns to compare');
      return;
    }

    try {
      setIsAnalyzing(true);
      setAnalysisError(null);
      
      const result = await apiService.compareCampaigns({
        campaign_ids: [primaryCampaign.campaign_id, comparisonCampaign.campaign_id],
        comparison_type: 'performance'
      });
      
      setCompareResult(result);
    } catch (error) {
      console.error('Failed to analyze campaigns:', error);
      setAnalysisError(error instanceof APIError ? error.message : 'Failed to analyze campaigns');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Helper function to render individual KPI card
  const renderKPICard = (kpiName: string, kpiData?: { current: number; previous: number; change_percent: number; is_positive: boolean }) => {
    const kpiDisplayNames: Record<string, string> = {
      'ad_displays': 'Ad Displays',
      'engagements': 'Engagements', 
      'visitors': 'Visitors',
      'leads': 'Leads',
      'attributions': 'Attributions'
    };

    const displayName = kpiDisplayNames[kpiName] || kpiName;
    
    // Loading state - during analysis
    if (isAnalyzing) {
      return (
        <div key={kpiName} className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <h3 className="text-base font-semibold text-gray-900 mb-3">{displayName}</h3>
          <p className="text-2xl font-bold text-blue-400 mb-2">
            <span className="animate-pulse">...</span>
          </p>
          <p className="text-blue-400 font-medium text-sm mb-2">Analyzing...</p>
          <p className="text-xs text-blue-500">Please wait</p>
        </div>
      );
    }
    
    // No data state - before analysis
    if (!kpiData) {
      return (
        <div key={kpiName} className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <h3 className="text-base font-semibold text-gray-900 mb-3">{displayName}</h3>
          <p className="text-2xl font-bold text-gray-400 mb-2">---</p>
          <p className="text-gray-400 font-medium text-sm mb-2">---%</p>
          <p className="text-xs text-gray-400">Select campaigns to analyze</p>
        </div>
      );
    }

    // With data - after analysis
    const isPositive = kpiData.is_positive;
    const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';
    const borderColor = isPositive ? 'border-green-200' : 'border-red-200';
    const percentColor = isPositive ? 'text-green-700' : 'text-red-700';
    const sign = kpiData.change_percent >= 0 ? '+' : '';
    
    return (
      <div key={kpiName} className={`${bgColor} ${borderColor} rounded-xl p-4 text-center`}>
        <h3 className="text-base font-semibold text-gray-900 mb-3">{displayName}</h3>
        <p className="text-2xl font-bold text-gray-900 mb-2">{kpiData.current.toLocaleString()}</p>
        <p className={`${percentColor} font-medium text-sm mb-2`}>
          {sign}{kpiData.change_percent.toFixed(1)}%
        </p>
        <p className="text-xs text-gray-500">from {kpiData.previous.toLocaleString()}</p>
      </div>
    );
  };

  // Extract KPI data from API response
  const getKPIData = () => {
    if (!compareResult || !compareResult.metrics_comparison) return null;
    
    const metrics = compareResult.metrics_comparison;
    const kpiData: Record<string, { current: number; previous: number; change_percent: number; is_positive: boolean }> = {};
    
    // Map API metrics to our KPI structure
    // Note: This assumes the API returns data in a specific format - may need adjustment based on actual API response
    const kpiMetrics = ['ad_displays', 'engagements', 'visitors', 'leads', 'attributions'];
    
    kpiMetrics.forEach(kpi => {
      if (metrics[kpi] && typeof metrics[kpi] === 'object') {
        // Actual API structure: { "ad_displays": { "previous": 123, "current": 456, "change_percent": 12.5, "is_positive": true } }
        const kpiMetric = metrics[kpi];
        if ('previous' in kpiMetric && 'current' in kpiMetric) {
          kpiData[kpi] = {
            current: kpiMetric.current,
            previous: kpiMetric.previous,
            change_percent: kpiMetric.change_percent,
            is_positive: kpiMetric.is_positive
          };
        }
      }
    });
    
    return Object.keys(kpiData).length > 0 ? kpiData : null;
  };

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
            {/* Campaign Selection Bar */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-8">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Compare:</span>
                </div>
                
                {/* Primary Campaign Dropdown */}
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedClient || isLoadingCampaigns}
                  value={primaryCampaign?.campaign_id || ''}
                  onChange={(e) => {
                    const campaignId = parseInt(e.target.value);
                    const campaign = campaigns.find(c => c.campaign_id === campaignId);
                    setPrimaryCampaign(campaign || null);
                  }}
                >
                  <option value="">
                    {!selectedClient 
                      ? 'Select client first' 
                      : isLoadingCampaigns 
                        ? 'Loading campaigns...' 
                        : campaignError
                          ? 'Error loading campaigns'
                          : 'Select primary campaign'
                    }
                  </option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.campaign_id} value={campaign.campaign_id}>
                      {formatCampaignName(campaign)} ({formatDuration(campaign.duration_days)})
                    </option>
                  ))}
                </select>
                
                <span className="text-gray-500">vs</span>
                
                {/* Comparison Campaign Dropdown */}
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500"
                  disabled={!primaryCampaign || isLoadingSimilar}
                  value={comparisonCampaign?.campaign_id || ''}
                  onChange={(e) => {
                    const campaignId = parseInt(e.target.value);
                    const campaign = similarCampaigns.find(c => c.campaign_id === campaignId);
                    setComparisonCampaign(campaign || null);
                  }}
                >
                  <option value="">
                    {!primaryCampaign 
                      ? 'Select primary first' 
                      : isLoadingSimilar 
                        ? 'Loading similar campaigns...' 
                        : similarError
                          ? 'Error loading similar campaigns'
                          : similarCampaigns.length === 0
                            ? 'No similar campaigns found'
                            : 'Select comparison campaign'
                    }
                  </option>
                  {similarCampaigns.map((campaign) => (
                    <option key={campaign.campaign_id} value={campaign.campaign_id}>
                      {formatCampaignName(campaign)} ({formatDuration(campaign.duration_days)})
                    </option>
                  ))}
                </select>
                
                {/* Analyze Button */}
                <button 
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm"
                  disabled={!primaryCampaign || !comparisonCampaign || isAnalyzing}
                  onClick={handleAnalyze}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
              
              {/* Error Display */}
              {analysisError && (
                <div className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {analysisError}
                </div>
              )}
            </div>

            {/* KPI Performance Row - Top of Page */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>KPI Performance Changes</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {(() => {
                  const kpiData = getKPIData();
                  const kpiMetrics = ['ad_displays', 'engagements', 'visitors', 'leads', 'attributions'];
                  
                  return kpiMetrics.map(kpi => 
                    renderKPICard(kpi, kpiData?.[kpi])
                  );
                })()}
              </div>
            </div>

            <AnalysisSection 
              primaryCampaign={primaryCampaign}
              comparisonCampaign={comparisonCampaign}
              compareResult={compareResult}
              isAnalyzing={isAnalyzing}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        selectedClient={selectedClient}
        onClientChange={setSelectedClient}
      />
      
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