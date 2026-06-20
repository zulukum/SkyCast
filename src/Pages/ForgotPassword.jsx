import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { resetPassword } from '../utils/auth';

function ForgotPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = resetPassword(form);
    if (!result.success) {
      setError(result.message);
      setSuccess('');
      return;
    }

    setError('');
    setSuccess(result.message);
    setTimeout(() => {
      navigate('/login');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0b132b] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827]/90 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-black mb-4">Reset Password</h1>
        <p className="text-sm text-white/50 mb-6">Enter your email and new password to update your account.</p>

        {error && <div className="mb-4 rounded-full bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-200">{error}</div>}
        {success && <div className="mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 p-3 text-sm text-emerald-200">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs uppercase tracking-[0.15em] text-white/50">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
            aria-label="email"
            className="w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/30 focus:border-cyan-400 focus:outline-none"
          />

          <label className="block text-xs uppercase tracking-[0.15em] text-white/50">New Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
            aria-label="new password"
            className="w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 text-white placeholder-white/30 focus:border-cyan-400 focus:outline-none"
          />

          <button type="submit" className="w-full rounded-full bg-cyan-400 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300">Reset Password</button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          Remembered your password? <Link to="/login" className="text-cyan-300 hover:text-cyan-100">Login instead</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
