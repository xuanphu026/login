import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for a better UX feel
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setError('Tên đăng nhập hoặc mật khẩu không chính xác');
      }
    }, 800);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
        <div className="p-8">
          <div className="text-center mb-10">
            <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Chào mừng trở lại
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Vui lòng đăng nhập vào tài khoản quản trị
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Tài khoản"
              type="text"
              placeholder="Nhập tài khoản"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={<User className="w-5 h-5" />}
              autoFocus
            />

            <Input
              label="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-5 h-5" />}
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-sm text-red-600 animate-fade-in">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <div className="pt-2">
              <Button type="submit" isLoading={isLoading}>
                <span>Đăng nhập</span>
                {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
          <span>&copy; 2026 NGUYỄN XUÂN PHÚ</span>
          <a href="#" className="hover:text-indigo-600 transition-colors">Quên mật khẩu?</a>
        </div>
      </div>
    </div>
  );
};