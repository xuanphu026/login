import React from 'react';
import { Button } from './Button';
import { LogOut, LayoutDashboard, Users, Settings, Activity, User } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="font-bold text-gray-900 text-lg">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-right hidden sm:block">
            <p className="font-medium text-gray-900">Administrator</p>
            <p className="text-gray-500 text-xs">admin@system.local</p>
          </div>
          <Button 
            variant="secondary" 
            onClick={onLogout} 
            className="!w-auto !py-2 !px-3"
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
          <nav className="p-4 space-y-2">
            {[
              { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Tổng quan', active: true },
              { icon: <Users className="w-5 h-5" />, label: 'Người dùng', active: false },
              { icon: <Activity className="w-5 h-5" />, label: 'Hoạt động', active: false },
              { icon: <Settings className="w-5 h-5" />, label: 'Cài đặt', active: false },
            ].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  item.active 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
              <h1 className="text-3xl font-bold mb-2">Xin chào, Admin!</h1>
              <p className="text-indigo-100 opacity-90">Hệ thống đang hoạt động ổn định. Chúc bạn một ngày làm việc hiệu quả.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Tổng người dùng', value: '1,234', trend: '+12%', color: 'bg-blue-500' },
                { label: 'Lượt truy cập', value: '45.2k', trend: '+5.4%', color: 'bg-green-500' },
                { label: 'Doanh thu', value: '₫ 125M', trend: '+8.2%', color: 'bg-purple-500' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-full ${stat.color} opacity-10`}></div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                  <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Hoạt động gần đây</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Người dùng mới đăng ký</p>
                      <p className="text-xs text-gray-500">2 phút trước</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};