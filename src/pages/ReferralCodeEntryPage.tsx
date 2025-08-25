import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ReferralCodeEntryPage() {
  const [referralCode, setReferralCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (referralCode.trim()) {
      navigate(`/${encodeURIComponent(referralCode)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="px-6 py-6 border-b border-neutral-bg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src="/elephantsLogo+Text.jpg" alt="Elephants Inc Logo" className="h-10" />
          </Link>
          
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-6 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md border border-neutral-bg">
            <h2 className="text-2xl font-semibold text-center mb-6">Enter Your Referral Code</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Referral Code
                </label>
                <input
                  type="text"
                  id="referralCode"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent"
                  placeholder="Enter your referral code"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-primary-accent text-white py-2 px-4 rounded-md hover:bg-primary-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-accent transition-colors"
                >
                  Track
                </button>
              </div>
            </form>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-neutral-bg mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Elephants.inc All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ReferralCodeEntryPage;
