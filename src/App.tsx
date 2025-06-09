import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Plane, 
  Shield, 
  TrendingUp, 
  Mail, 
  ChevronRight,
  Check,
  Star,
  Globe,
  Zap
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// TODO: Move these to environment variables (e.g., .env and import.meta.env.VITE_SUPABASE_URL)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail(email)) {
      setIsLoading(true);
      try {
        // 1. Check if email exists
        const { data: existingUser, error: selectError } = await supabase
          .from('signups')
          .select('user_email')
          .eq('user_email', email)
          .maybeSingle();

        if (selectError) {
          console.error('Error checking for existing email:', selectError.message);
          return; 
        }

        // 2. If not, create new entry
        if (!existingUser) { 
          const { error: insertError } = await supabase
            .from('signups')
            .insert([{ user_email: email, status: 'pending', referrer: 'fluxbeam' }]);

          if (insertError) {
            console.error('Error inserting new email:', insertError.message);
            return;
          }
        }
        
        setIsSubmitted(true);
        window.location.href = 'https://app.elephants.inc/onboard/signup';

      } catch (error) {
        console.error('An unexpected error occurred during form submission:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <img 
                src="/elephantsLogoOnly.jpg" 
                alt="Elephants.inc Logo" 
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-gray-800">Elephants.inc</span>
            </div>
            <div className="hidden md:flex items-center space-x-1 text-black">
              <span>×</span>
              <div className="flex items-center space-x-2 ml-2">
                <div className="p-0.5 bg-black rounded-md">
                  <img
                    src="/fluxbeam.png"
                    alt="fluxbeam Logo"
                    className="w-6 h-6 rounded object-cover"
                  />
                </div>
                <span className="font-semibold">fluxbeam</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-primary-accent transition-colors">Features</a>
            <a href="#footer-section" className="text-gray-600 hover:text-primary-accent transition-colors">About</a>
            
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-secondary-accent text-primary-accent px-4 py-2 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4 text-primary-accent" />
                  <span>World's First Crypto Airline Rewards Card</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Payments Reimagined
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience the future of payments with stablecoins, Apple Pay integration, 
                  and earn airline miles on every transaction.
                </p>
              </div>

              {/* Email Signup */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for early access"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-bg rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitted || !!(email && !isValidEmail(email))}
                    onMouseEnter={() => { if (!email) setShowEmailWarning(true); }}
                    onMouseLeave={() => setShowEmailWarning(false)}
                    className="px-8 py-4 bg-primary-accent text-white font-semibold rounded-xl hover:opacity-90 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-75"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : showEmailWarning && !email ? (
                      <span>Please enter email</span>
                    ) : isSubmitted ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Submitted!</span>
                      </>
                    ) : (
                      <>
                        <span>Get Early Access</span>
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
                
              </form>

              {/* Trust Indicators */}
             
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative z-10">
                {/* Credit Card Mockup */}
                <div className="w-80 h-48 mx-auto rounded-2xl shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-300 overflow-hidden border-4 border-secondary-accent">
                  <img 
                    src="/elephantsCard.jpg" 
                    alt="Elephants Credit Card" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary-accent/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-secondary-accent/20 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 -right-8 w-8 h-8 bg-primary-accent/20 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-neutral-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The perfect fusion of visa convenience and cutting-edge crypto innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Apple & Google Pay */}
            <div className="group bg-white border border-secondary-accent rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-secondary-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8 text-primary-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Apple & Google Pay</h3>
              <p className="text-gray-700 mb-6">
                Seamlessly integrate with your favorite payment methods. Tap to pay anywhere, 
                powered by USDC stability.
              </p>
              <div className="flex items-center space-x-4">
                <img src="/applepay.jpg" alt="Apple Pay" className="w-12 h-auto object-contain rounded" />
                <img src="/Google_Pay_Logo.png" alt="Google Pay" className="w-12 h-auto object-contain rounded" />
              </div>
            </div>

            {/* USDC Support */}
            <div className="group bg-white border border-secondary-accent rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-secondary-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-primary-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">USDC Stability</h3>
              <p className="text-gray-700 mb-6">
                Built on USD Coin for maximum stability. No more volatility worries - 
                your purchasing power stays constant.
              </p>
              <div className="flex items-center space-x-2 text-primary-accent">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">1 USDC = $1.00</span>
              </div>
            </div>

            {/* Airline Miles */}
            <div className="group bg-white border border-secondary-accent rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-secondary-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Plane className="w-8 h-8 text-primary-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Airline Mile Rewards</h3>
              <p className="text-gray-700 mb-6">
                World's first crypto card with airline mile rewards. 
                Earn up to 1 Mile per $1 spend on every transaction.
              </p>
              <div className="flex items-center space-x-2 text-primary-accent">
                <Star className="w-5 h-5" />
                <span className="font-semibold">Up to 1 Mile per $1 spend</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="footer-section">
      {/* Footer */} 
      <footer className="px-6 py-12 border-t border-neutral-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="/elephantsLogoOnly.jpg" 
                  alt="Elephants.inc Logo" 
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span className="text-xl font-bold text-gray-800">Elephants.inc</span>
              </div>
              <p className="text-gray-600">
                Payments reimagined for the digital age.
              </p>
            </div>

            <div className="space-y-4">
              
            </div>

            <div className="space-y-4">
              
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Compliance</a>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-bg pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2025 Elephants.inc × fluxbeam. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </section>
    </div>
  );
}

export default App;