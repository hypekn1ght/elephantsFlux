import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

// TODO: Move these to environment variables (e.g., .env and import.meta.env.VITE_SUPABASE_URL)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the type for our signup data
interface SignUpEntry {
  user_email: string;
  referrer: string | null;
  status: string | null;
  volume: number | null;
  aff_reward?: number | null; // New column
  paid_out?: number | null;   // New column, changed to numeric
  // Add any other relevant fields that might come from Supabase, like created_at
  created_at?: string;
}

function TrackingPage() {
  // Placeholder for data, sorting, and pagination state
  const [signups, setSignups] = useState<SignUpEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Or make this configurable
  const [totalItems, setTotalItems] = useState(0);
  const [sortColumn, setSortColumn] = useState<keyof SignUpEntry>('user_email');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Basic useEffect to fetch data (will be expanded later)
  useEffect(() => {
    const fetchSignups = async () => {
      setLoading(true);
      try {
        // Get total count first
        const { count, error: countError } = await supabase
          .from('signups')
          .select('*', { count: 'exact', head: true });

        if (countError) {
          console.error('Error fetching total count:', countError);
          setError(countError.message);
          setTotalItems(0);
          setSignups([]);
          setLoading(false);
          return;
        }
        setTotalItems(count || 0);

        // Fetch paginated data
        const from = (currentPage - 1) * itemsPerPage;
        const to = currentPage * itemsPerPage - 1;

        const { data, error: dataError } = await supabase
          .from('signups')
          .select('*')
          .order(sortColumn, { ascending: sortDirection === 'asc' })
          .range(from, to);

        if (dataError) {
          console.error('Error fetching signups:', dataError);
          setError(dataError.message);
          setSignups([]);
        } else {
          setSignups(data || []);
          setError(null);
        }
      } catch (err) {
        console.error('Unexpected error fetching signups:', err);
        setError('An unexpected error occurred.');
        setSignups([]);
      }
      setLoading(false);
    };

    fetchSignups();
  }, [currentPage, itemsPerPage, sortColumn, sortDirection]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="px-6 py-6 border-b border-neutral-bg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-accent hover:opacity-80 transition-opacity">
            Elephants.inc × fluxbeam
          </Link>
          <h1 className="text-3xl font-semibold text-gray-700">Sign-up Tracking</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {loading && <p className='text-center text-lg'>Loading data...</p>}
          {error && <p className='text-center text-red-500 text-lg'>Error: {error}</p>}
          {!loading && !error && signups.length === 0 && (
            <p className='text-center text-lg text-gray-600'>No sign-up data found.</p>
          )}
          {!loading && !error && signups.length > 0 && (
            <div className="overflow-x-auto bg-white border border-neutral-bg rounded-xl shadow">
              <table className="min-w-full divide-y divide-neutral-bg">
                <thead className="bg-gray-50">
                  <tr>
                    {[ 
                      { id: 'user_email', label: 'User Email' },
                      { id: 'referrer', label: 'Referrer' },
                      { id: 'status', label: 'Status' },
                      { id: 'volume', label: 'Volume' },
                      { id: 'aff_reward', label: 'Aff. Reward' },
                      { id: 'paid_out', label: 'Paid Out' },
                      // { id: 'created_at', label: 'Signed Up At' } // Example if you add created_at
                    ].map(header => (
                      <th 
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          if (sortColumn === header.id) {
                            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                          } else {
                            setSortColumn(header.id as keyof SignUpEntry);
                            setSortDirection('asc');
                          }
                        }}
                      >
                        <div className="flex items-center">
                          {header.label}
                          {sortColumn === header.id ? (
                            sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 ml-1" /> : <ArrowDown className="w-3 h-3 ml-1" />
                          ) : (
                            <ArrowUpDown className="w-3 h-3 ml-1 opacity-50" />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-bg">
                  {signups.map((signup) => (
                    <tr key={signup.user_email} className="hover:bg-secondary-accent/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{signup.user_email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{signup.referrer || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{signup.status || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{signup.volume !== null ? signup.volume : '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{signup.aff_reward !== null && signup.aff_reward !== undefined ? `$${signup.aff_reward.toFixed(2)}` : '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{signup.paid_out !== null && signup.paid_out !== undefined ? signup.paid_out : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Pagination Controls */}
          {!loading && !error && totalItems > itemsPerPage && (
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
                  {' '}to <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span>
                  {' '}of <span className="font-medium">{totalItems}</span> results
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalItems / itemsPerPage)))}
                  disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-neutral-bg mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Elephants.inc × fluxbeam. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default TrackingPage;
