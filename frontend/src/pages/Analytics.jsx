import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { urlAPI } from '../services/api';
import { 
  BarChart3, 
  Calendar, 
  TrendingUp, 
  Clock,
  ExternalLink,
  Filter
} from 'lucide-react';

const Analytics = () => {
  const { shortUrl } = useParams();
  const [urls, setUrls] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [analytics, setAnalytics] = useState([]);
  const [totalClicks, setTotalClicks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadUrls();
  }, []);

  useEffect(() => {
    if (shortUrl) {
      setSelectedUrl(shortUrl);
      loadAnalytics(shortUrl);
    }
  }, [shortUrl]);

  useEffect(() => {
    if (selectedUrl) {
      loadAnalytics(selectedUrl);
    }
    loadTotalClicks();
  }, [dateRange, selectedUrl]);

  const loadUrls = async () => {
    try {
      const response = await urlAPI.getUserUrls();
      setUrls(response.data);
      if (response.data.length > 0 && !selectedUrl) {
        setSelectedUrl(response.data[0].shortUrl);
      }
    } catch (error) {
      setError('Failed to load URLs');
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async (shortUrlParam) => {
    if (!shortUrlParam) return;
    
    try {
      const startDateTime = `${dateRange.startDate}T00:00:00`;
      const endDateTime = `${dateRange.endDate}T23:59:59`;
      
      const response = await urlAPI.getAnalytics(shortUrlParam, startDateTime, endDateTime);
      setAnalytics(response.data);
    } catch (error) {
      setError('Failed to load analytics');
    }
  };

  const loadTotalClicks = async () => {
    try {
      const response = await urlAPI.getTotalClicks(dateRange.startDate, dateRange.endDate);
      setTotalClicks(response.data);
    } catch (error) {
      setError('Failed to load total clicks');
    }
  };

  const selectedUrlData = urls.find(url => url.shortUrl === selectedUrl);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalClicksInRange = () => {
    return Object.values(totalClicks).reduce((sum, clicks) => sum + clicks, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-gray-600">Track your URL performance and engagement</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="url-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select URL
            </label>
            <select
              id="url-select"
              value={selectedUrl}
              onChange={(e) => setSelectedUrl(e.target.value)}
              className="input-field"
            >
              <option value="">All URLs</option>
              {urls.map((url) => (
                <option key={url.id} value={url.shortUrl}>
                  /{url.shortUrl} - {url.originalUrl.length > 50 ? url.originalUrl.substring(0, 50) + '...' : url.originalUrl}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                className="input-field"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Clicks</h3>
              <p className="text-2xl font-bold text-blue-600">
                {selectedUrl ? analytics.length : getTotalClicksInRange()}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total URLs</h3>
              <p className="text-2xl font-bold text-green-600">{urls.length}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Days Tracked</h3>
              <p className="text-2xl font-bold text-purple-600">
                {Math.ceil((new Date(dateRange.endDate) - new Date(dateRange.startDate)) / (1000 * 60 * 60 * 24)) + 1}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected URL Details */}
      {selectedUrlData && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">URL Details</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Short URL:</span>
              <span className="text-primary-600 font-medium">/{selectedUrlData.shortUrl}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Original URL:</span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 truncate max-w-xs">{selectedUrlData.originalUrl}</span>
                <a
                  href={selectedUrlData.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Total Clicks:</span>
              <span className="text-gray-900 font-medium">{selectedUrlData.clickCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Created:</span>
              <span className="text-gray-900">{formatDate(selectedUrlData.createdDate)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Click Events List */}
      {selectedUrl && (
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Clicks</h2>
          </div>
          
          {analytics.length === 0 ? (
            <div className="p-6 text-center">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clicks yet</h3>
              <p className="text-gray-600">This URL hasn't been clicked during the selected time period.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {analytics.map((click, index) => (
                <div key={click.id || index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <span className="text-sm text-gray-900">Click {analytics.length - index}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(click.clickDate)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Daily Clicks Chart (Simple visualization) */}
      {Object.keys(totalClicks).length > 0 && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Clicks</h2>
          <div className="space-y-3">
            {Object.entries(totalClicks).map(([date, clicks]) => (
              <div key={date} className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 w-24">
                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.max((clicks / Math.max(...Object.values(totalClicks))) * 100, 5)}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12 text-right">{clicks}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;