import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { urlAPI } from '../services/api';
import { 
  Link as LinkIcon, 
  Copy, 
  ExternalLink, 
  BarChart, 
  Calendar,
  Plus,
  Trash2
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState('');
  const [shortening, setShortening] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    try {
      const response = await urlAPI.getUserUrls();
      setUrls(response.data);
    } catch (error) {
      setError('Failed to load URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShortUrl = async (e) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    setShortening(true);
    setError('');
    setSuccess('');

    try {
      const response = await urlAPI.shorten(newUrl);
      setUrls([response.data, ...urls]);
      setNewUrl('');
      setSuccess('URL shortened successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setShortening(false);
    }
  };

  const copyToClipboard = async (shortUrl) => {
    const fullUrl = `${window.location.origin}/${shortUrl}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setSuccess('URL copied to clipboard!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (error) {
      setError('Failed to copy URL');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user?.username}!</p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700">{success}</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* URL Shortener Form */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Short URL</h2>
        <form onSubmit={handleCreateShortUrl} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Enter URL to shorten
            </label>
            <div className="flex space-x-3">
              <input
                id="url"
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="https://example.com/very-long-url"
                className="flex-1 input-field"
                required
              />
              <button
                type="submit"
                disabled={shortening}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              >
                {shortening ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Plus className="h-5 w-5" />
                    <span>Shorten</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* URLs List */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your URLs</h2>
        </div>
        
        {urls.length === 0 ? (
          <div className="p-6 text-center">
            <LinkIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No URLs yet</h3>
            <p className="text-gray-600">Create your first short URL using the form above.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {urls.map((url) => (
              <div key={url.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Short URL */}
                    <div className="flex items-center space-x-3 mb-2">
                      <LinkIcon className="h-5 w-5 text-primary-600 flex-shrink-0" />
                      <span className="text-lg font-medium text-primary-600">
                        /{url.shortUrl}
                      </span>
                      <button
                        onClick={() => copyToClipboard(url.shortUrl)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    
                    {/* Original URL */}
                    <p className="text-gray-600 truncate mb-2">{url.originalUrl}</p>
                    
                    {/* Stats */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <BarChart className="h-4 w-4" />
                        <span>{url.clickCount} clicks</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Created {formatDate(url.createdDate)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      title="Visit original URL"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <button
                      onClick={() => window.open(`/analytics/${url.shortUrl}`, '_blank')}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                      title="View analytics"
                    >
                      <BarChart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;