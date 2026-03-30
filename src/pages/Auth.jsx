// src/pages/Auth.jsx
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Leaf, Mail, Lock, Eye, EyeOff, User, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Auth() {
  const navigate      = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register } = useAuth();
  const toast         = useToast();

  const [tab, setTab]   = useState(searchParams.get('mode') === 'register' ? 'register' : 'login');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // Login form
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Register form
  const [regData, setRegData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [showRegPass, setShowRegPass]   = useState(false);
  const [showRegConf, setShowRegConf]   = useState(false);
  const [termsAccepted, setTerms]       = useState(false);

  const switchTab = (t) => { setTab(t); setError(''); };

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      toast.success('Welcome back! 🌿');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError('');
    if (regData.password !== regData.confirmPassword) return setError('Passwords do not match.');
    if (!termsAccepted) return setError('Please accept the Terms & Conditions.');
    if (regData.password.length < 8) return setError('Password must be at least 8 characters.');
    setLoading(true);
    try {
      await register({
        firstName: regData.firstName,
        lastName:  regData.lastName,
        email:     regData.email,
        password:  regData.password,
      });
      toast.success('Account created! Welcome to EcoTrack 🌿');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md page-enter">

        {/* Back link */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-leaf-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-slate-900">EcoTrack</h1>
          <p className="text-slate-500 text-sm mt-1">
            {tab === 'login' ? 'Sign in to your account' : 'Create your free account'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 bg-slate-100 rounded-xl p-1 mb-6">
          {['login', 'register'].map(t => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`py-2.5 rounded-lg font-semibold text-sm capitalize transition-all duration-200 ${
                tab === t ? 'bg-white text-leaf-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-7">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* ── LOGIN ── */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="email" required
                    value={loginData.email}
                    onChange={e => setLoginData(p => ({ ...p, email: e.target.value }))}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type={showLoginPass ? 'text' : 'password'} required
                    value={loginData.password}
                    onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500 focus:border-transparent transition-all"
                  />
                  <button type="button" onClick={() => setShowLoginPass(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input type="checkbox" className="accent-leaf-600 w-4 h-4" /> Remember me
                </label>
                <a href="#" className="text-leaf-600 hover:text-leaf-700 font-semibold">Forgot Password?</a>
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full bg-leaf-600 hover:bg-leaf-700 disabled:opacity-60 text-white py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                {loading ? 'Signing in…' : 'Login'}
              </button>
              <p className="text-center text-sm text-slate-500">
                No account?{' '}
                <button type="button" onClick={() => switchTab('register')} className="text-leaf-600 font-semibold hover:text-leaf-700">
                  Register here →
                </button>
              </p>
            </form>
          )}

          {/* ── REGISTER ── */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="text" required
                      value={regData.firstName}
                      onChange={e => setRegData(p => ({ ...p, firstName: e.target.value }))}
                      placeholder="Jane"
                      className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="text" required
                      value={regData.lastName}
                      onChange={e => setRegData(p => ({ ...p, lastName: e.target.value }))}
                      placeholder="Doe"
                      className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500 transition-all"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="email" required
                    value={regData.email}
                    onChange={e => setRegData(p => ({ ...p, email: e.target.value }))}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type={showRegPass ? 'text' : 'password'} required
                    value={regData.password}
                    onChange={e => setRegData(p => ({ ...p, password: e.target.value }))}
                    placeholder="Min. 8 characters"
                    className="w-full pl-10 pr-11 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500 transition-all"
                  />
                  <button type="button" onClick={() => setShowRegPass(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showRegPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type={showRegConf ? 'text' : 'password'} required
                    value={regData.confirmPassword}
                    onChange={e => setRegData(p => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="Repeat password"
                    className="w-full pl-10 pr-11 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-leaf-500 transition-all"
                  />
                  <button type="button" onClick={() => setShowRegConf(p => !p)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showRegConf ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <label className="flex items-start gap-2.5 text-sm cursor-pointer text-slate-600">
                <input type="checkbox" checked={termsAccepted} onChange={e => setTerms(e.target.checked)} className="accent-leaf-600 w-4 h-4 mt-0.5 shrink-0" />
                I agree to the{' '}
                <a href="#" className="text-leaf-600 hover:text-leaf-700 font-semibold">Terms &amp; Conditions</a>
              </label>
              <button
                type="submit" disabled={loading}
                className="w-full bg-leaf-600 hover:bg-leaf-700 disabled:opacity-60 text-white py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
              <p className="text-center text-sm text-slate-500">
                Have an account?{' '}
                <button type="button" onClick={() => switchTab('login')} className="text-leaf-600 font-semibold hover:text-leaf-700">
                  Login here →
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
