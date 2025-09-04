/**
 * CLDB-AI API Service Layer - Compare Agent & Benchmark Agent
 * 
 * Provides typed API calls to the CLDB-AI backend endpoints.
 * Matches the exact response structure from /src/models/api_models.py
 */

// ========== CONFIGURATION ==========

const API_BASE_URL = 'http://localhost:8000/api/v1';

// ========== TYPE DEFINITIONS ==========
// These match exactly the backend Pydantic models

export interface Client {
  client_id: number;
  client_name: string;
  industry: string;
  campaign_count: number;
}

export interface CampaignSummary {
  campaign_id: number;
  name: string | null;
  client_name: string | null;
  industry: string | null;
  job_type: string | null;
  status: string | null;
  total_pcs_mailed: number | null;
  duration_days: number | null;
  
  // Calculated metrics
  combined_social_ctr: number | null;
  leads_per_1000: number | null;
  total_social_clicks: number | null;
  total_social_impressions: number | null;
  total_leads: number | null;
}

export interface AnalysisInsight {
  type: 'strength' | 'weakness' | 'opportunity' | 'recommendation' | 'observation';
  title: string;
  message: string;
  supporting_data?: Record<string, any> | null;
  priority?: 'low' | 'medium' | 'high' | 'critical' | null;
}

export interface KeyFinding {
  headline: string;
  context: string;
  business_impact: string;
}

export interface PrimaryFactor {
  root_cause: string;
  tactical_detail: string;
  confidence_level: string;
}

export interface KPIChange {
  kpi_name: 'ad_displays' | 'engagements' | 'visitors' | 'leads' | 'attributions';
  change: number;
  change_percent: number;
  previous_value: number;
  current_value: number;
  is_positive: boolean;
}

export interface CompareRequest {
  campaign_ids: number[];
  comparison_type?: 'performance' | 'audience' | 'creative' | 'financial' | 'comprehensive';
  confidence_threshold?: number;
  focus_metrics?: string[];
}

export interface CompareResponse {
  comparison_id: string;
  campaign_summaries: CampaignSummary[];
  metrics_comparison: Record<string, Record<string, number>>;
  industry_benchmarks?: Record<string, any> | null;
  insights: AnalysisInsight[];
  statistical_analysis?: any | null;
  key_finding: KeyFinding;
  primary_factor: PrimaryFactor;
  executive_summary: string;
  detailed_analysis: string;
  created_at: string;
}

// ========== BENCHMARK AGENT TYPES ==========
// Matches backend /src/models/api_models.py BenchmarkRequest/BenchmarkResponse

export interface BenchmarkRequest {
  campaign_id: number;
  industry?: string;
  job_type?: string;
  geographic_region?: string;
  timeframe?: string;
  minimum_sample_size?: number;
  include_trends?: boolean;
  include_competitive_gaps?: boolean;
}

export interface IndustryPosition {
  metric_name: string;
  campaign_value: number;
  industry_percentile: number;
  industry_median: number;
  industry_top_quartile: number;
  performance_vs_median: number;
  rank_description: string;
}

export interface PerformanceGap {
  metric_name: string;
  campaign_value: number;
  industry_top_10_avg: number;
  gap_percentage: number;
  improvement_potential: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface IndustryTrend {
  metric_name: string;
  trend_direction: 'improving' | 'declining' | 'stable';
  trend_percentage: number;
  trend_confidence: number;
  context: string;
}

export type PerformanceGrade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';

export interface BenchmarkResponse {
  campaign_summary: CampaignSummary;
  industry_cohort: Record<string, any>;
  statistical_significance: boolean;
  industry_positions: IndustryPosition[];
  overall_industry_grade: PerformanceGrade;
  overall_percentile: number;
  performance_gaps: PerformanceGap[];
  competitive_strengths: string[];
  industry_trends: IndustryTrend[];
  competitive_positioning: string;
  market_opportunity_score: number;
  insights: AnalysisInsight[];
  created_at: string;
}

// ========== ERROR HANDLING ==========

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    
    try {
      const errorData = JSON.parse(errorText);
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch {
      // Use default message if JSON parsing fails
    }
    
    throw new APIError(errorMessage, response.status, errorText);
  }
  
  return response.json();
}

// ========== API SERVICE FUNCTIONS ==========

export const apiService = {
  /**
   * Get all clients with campaign counts
   * Endpoint: GET /api/v1/clients
   */
  async getClients(): Promise<Client[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/clients`);
      return await handleResponse<Client[]>(response);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to fetch clients: ${error instanceof Error ? error.message : 'Network error'}`);
    }
  },

  /**
   * Get all campaigns for a specific client
   * Endpoint: GET /api/v1/campaigns/by-client/{client_id}
   */
  async getCampaignsByClient(clientId: number): Promise<CampaignSummary[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/campaigns/by-client/${clientId}`);
      return await handleResponse<CampaignSummary[]>(response);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to fetch campaigns for client ${clientId}: ${error instanceof Error ? error.message : 'Network error'}`);
    }
  },

  /**
   * Get campaigns with similar duration to the selected campaign
   * Endpoint: GET /api/v1/campaigns/{campaign_id}/similar-duration
   */
  async getSimilarCampaigns(
    campaignId: number, 
    durationTolerance: number = 2.0
  ): Promise<CampaignSummary[]> {
    try {
      const url = `${API_BASE_URL}/campaigns/${campaignId}/similar-duration?duration_tolerance=${durationTolerance}`;
      const response = await fetch(url);
      return await handleResponse<CampaignSummary[]>(response);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to fetch similar campaigns for ${campaignId}: ${error instanceof Error ? error.message : 'Network error'}`);
    }
  },

  /**
   * Compare two campaigns using AI analysis
   * Endpoint: POST /api/v1/compare
   */
  async compareCampaigns(request: CompareRequest): Promise<CompareResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      return await handleResponse<CompareResponse>(response);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to compare campaigns: ${error instanceof Error ? error.message : 'Network error'}`);
    }
  },

  /**
   * Analyze campaign position within industry using Benchmark Agent
   * Endpoint: POST /api/v1/industry-benchmark
   */
  async benchmarkCampaign(request: BenchmarkRequest): Promise<BenchmarkResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/industry-benchmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      return await handleResponse<BenchmarkResponse>(response);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to benchmark campaign: ${error instanceof Error ? error.message : 'Network error'}`);
    }
  },

  /**
   * Health check for API availability
   * Endpoint: GET /health (if available)
   */
  async healthCheck(): Promise<{ status: string }> {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api/v1', '')}/health`);
      return await handleResponse<{ status: string }>(response);
    } catch (error) {
      throw new APIError(`API health check failed: ${error instanceof Error ? error.message : 'Network error'}`);
    }
  }
};

// ========== UTILITY FUNCTIONS ==========

/**
 * Format campaign name for display
 */
export function formatCampaignName(campaign: CampaignSummary): string {
  return campaign.name || `Campaign ${campaign.campaign_id}`;
}

/**
 * Format duration for display
 */
export function formatDuration(durationDays: number | null): string {
  if (!durationDays) return 'Unknown duration';
  if (durationDays === 1) return '1 day';
  return `${durationDays} days`;
}

/**
 * Format KPI change for display
 */
export function formatKPIChange(kpiChange: KPIChange): string {
  const sign = kpiChange.is_positive ? '+' : '';
  return `${sign}${kpiChange.change_percent.toFixed(1)}%`;
}

/**
 * Get insight icon based on type
 */
export function getInsightIcon(type: AnalysisInsight['type']): string {
  switch (type) {
    case 'strength': return '💪';
    case 'weakness': return '⚠️';
    case 'opportunity': return '🎯';
    case 'recommendation': return '💡';
    case 'observation': return '📊';
    default: return '📄';
  }
}