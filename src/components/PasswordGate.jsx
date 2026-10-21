import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const ACCESS_PASSWORD = 'SeccurityPlus';
const STORAGE_KEY = 'secplus_access_granted';

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === 'yes'
  );
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  if (unlocked) return children;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === ACCESS_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'yes');
      setUnlocked(true);
    } else {
      setError('Wrong password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-sky-50 to-purple-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-8 space-y-6 text-center"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 flex items-center justify-center">
          <Lock className="w-8 h-8 text-purple-700" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900">Protected Content 🔒</h1>
          <p className="text-sm text-slate-500 font-medium">
            Enter the password to access the CompTIA Security+ practice app.
          </p>
        </div>

        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-slate-200 focus:border-purple-500 focus:outline-none font-bold text-slate-900"
          />
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {error && <p className="text-sm font-bold text-rose-600">{error}</p>}

        <button
          type="submit"
          disabled={!input}
          className={`w-full py-3 rounded-2xl font-extrabold text-base transition-all active:scale-95 ${
            input ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Unlock 🔓
        </button>
      </form>
    </div>
  );
}
