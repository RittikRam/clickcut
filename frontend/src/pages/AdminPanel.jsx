import { useState, useEffect } from 'react';
import { 
  Users, 
  Link as LinkIcon, 
  BarChart3, 
  Shield, 
  Trash2,
  Eye,
  Settings
} from 'lucide-react';

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalUrls: 0,
    totalClicks: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading admin data
    setTimeout(() => {
      setStats({
        totalUsers: 15,
        totalUrls: 127,
        totalClicks: 2456,
        recentActivity: [
          { id: 1, action: 'User registration', user: 'john_doe', timestamp: new Date() },
          { id: 2, action: 'URL created', user: 'jane_smith', timestamp: new Date(Date.now() - 3600000) },
          { id: 3, action: 'Bulk clicks detected', user: 'mike_wilson', timestamp: new Date(Date.now() - 7200000) }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="mt-2 text-gray-600">Manage users, URLs, and system settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-red-500" />
          <span className="text-sm font-medium text-red-600">Admin Access</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <LinkIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total URLs</h3>
              <p className="text-2xl font-bold text-green-600">{stats.totalUrls}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Clicks</h3>
              <p className="text-2xl font-bold text-purple-600">{stats.totalClicks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Management */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
              <button className="btn-secondary text-sm">
                <Users className="h-4 w-4 mr-2" />
                View All Users
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">Active Users</span>
                  <p className="text-sm text-gray-600">Users who logged in this week</p>
                </div>
                <span className="text-2xl font-bold text-green-600">12</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">New Registrations</span>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <button className="w-full btn-secondary justify-center">
                <Eye className="h-4 w-4 mr-2" />
                View User Details
              </button>
              <button className="w-full btn-secondary justify-center text-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                Manage User Permissions
              </button>
            </div>
          </div>
        </div>

        {/* URL Management */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">URL Management</h2>
              <button className="btn-secondary text-sm">
                <LinkIcon className="h-4 w-4 mr-2" />
                View All URLs
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">URLs Created Today</span>
                  <p className="text-sm text-gray-600">New short URLs</p>
                </div>
                <span className="text-2xl font-bold text-green-600">8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">Most Popular URL</span>
                  <p className="text-sm text-gray-600">Highest click count</p>
                </div>
                <span className="text-2xl font-bold text-purple-600">342</span>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <button className="w-full btn-secondary justify-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                View URL Analytics
              </button>
              <button className="w-full btn-secondary justify-center text-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                Manage Suspicious URLs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {stats.recentActivity.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">{activity.action}</span>
                  <p className="text-sm text-gray-600">by {activity.user}</p>
                </div>
                <span className="text-sm text-gray-500">{formatDate(activity.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Settings */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Settings className="h-6 w-6 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Enable rate limiting</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Require email verification</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-700">Enable two-factor authentication</span>
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">URL Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Enable URL expiration</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Scan URLs for malware</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-700">Allow custom short URLs</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="btn-primary">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;