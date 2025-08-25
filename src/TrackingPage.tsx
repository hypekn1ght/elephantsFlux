import { useState, useEffect } from 'react';
import Airtable from 'airtable';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

// Configure Airtable with environment variables
const airtableToken = import.meta.env.VITE_AIRTABLE_TOKEN;
const airtableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
// Make sure view ID is a string or use 'Grid view' as fallback
const airtableViewId = import.meta.env.VITE_AIRTABLE_VIEW_ID || 'Grid view';

// Initialize Airtable
const base = new Airtable({ apiKey: airtableToken }).base(airtableBaseId);

// Define the type for our signup data based on Airtable's Referral Table
interface SignUpEntry {
  referrer_organization: string | null;
  referral_code: string | null;
  referred_organization: string | null;
  external_deposit_amount: string | null;
  total_card_spend_amount: string | null;
  kyc_status: string | null;
  calculated_payout?: number;
  // Keep other fields for compatibility
  user_email?: string | null;
  referrer?: string | null;
  status?: string | null;
  volume?: number | null;
  aff_reward?: number | null;
  paid_out?: number | null;
  created_at?: string | null;
}

function TrackingPage() {
  // Get referral code from URL params if available
  const { referralCode } = useParams<{ referralCode?: string }>();
  const navigate = useNavigate();
  // Placeholder for data, sorting, and pagination state
  const [signups, setSignups] = useState<SignUpEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100); // Or make this configurable
  const [totalItems, setTotalItems] = useState(0);
  const [sortColumn, setSortColumn] = useState<keyof SignUpEntry>('referrer_organization');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  // Track if filter is applied based on referral code
  const [filterApplied] = useState<boolean>(!!referralCode);

  // Fetch data from Airtable
  useEffect(() => {
    const fetchSignups = async () => {
      setLoading(true);
      try {
        // First, get all records to calculate total count
        // We'll use a temporary array to store all records
        let allRecords: SignUpEntry[] = [];
        
        await base('Referral Table').select({
          view: String(airtableViewId) // Ensure it's a string
        }).eachPage((records, fetchNextPage) => {
          const mappedRecords = records.map(record => {
            const fields = record.fields;
            
            // Extract field values
            const referrerOrg = (fields['Referrer Organization'] as string) || null;
            const referralCode = (fields['Referral Code'] as string) || null;
            const referredOrg = (fields['Referred Organization'] as string) || null;
            const externalDepositAmount = (fields['External Deposit Amount'] as string) || null;
            const totalCardSpendAmount = (fields['Total Card Spend Amount'] as string) || null;
            const kycStatus = (fields['Referred KYC Status'] as string) || null;
            const createdAt = (fields.created_at as string) || null;
            
            // Calculate payout based on the specified logic
            let calculatedPayout = 0;
            
            // If KYC status is KYC_completed, add $3 to payout
            if (kycStatus === 'kyc_completed' || kycStatus === 'kyc_passed') {
              calculatedPayout += 3;
            }
            
            // If external_deposit_amount is more than $100, add $5
            const depositAmount = parseFloat(externalDepositAmount || '0');
            if (depositAmount > 100) {
              calculatedPayout += 5;
            }
            
            // If total_spend_amount is more than $100, add $7
            const spendAmount = parseFloat(totalCardSpendAmount || '0');
            if (spendAmount > 100) {
              calculatedPayout += 7;
            }
            
            // If total_spend_amount exceeds $500, add $5
            if (spendAmount > 500) {
              calculatedPayout += 5;
            }
            
            return {
              referrer_organization: referrerOrg,
              referral_code: referralCode,
              referred_organization: referredOrg,
              external_deposit_amount: externalDepositAmount,
              total_card_spend_amount: totalCardSpendAmount,
              kyc_status: kycStatus,
              calculated_payout: calculatedPayout,
              created_at: createdAt
            } as SignUpEntry;
          });
          
          allRecords = [...allRecords, ...mappedRecords];
          fetchNextPage();
        });
        
        setTotalItems(allRecords.length);
        
        // Filter records by referral code if provided
        let filteredRecords = [...allRecords];
        if (referralCode) {
          filteredRecords = allRecords.filter(record => 
            record.referral_code === referralCode
          );
          
          // If no records found with this referral code
          if (filteredRecords.length === 0 && filterApplied) {
            setError(`No records found with referral code: ${referralCode}`);
          }
        }
        
        // Sort the records based on current sort settings
        const sortedRecords = filteredRecords.sort((a, b) => {
          const aValue = a[sortColumn];
          const bValue = b[sortColumn];
          
          // Handle null/undefined values
          if ((aValue === null || aValue === undefined) && (bValue === null || bValue === undefined)) return 0;
          if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
          if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? -1 : 1;
          
          // Compare based on type
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === 'asc' 
              ? aValue.localeCompare(bValue) 
              : bValue.localeCompare(aValue);
          }
          
          // For numbers or other types
          return sortDirection === 'asc' 
            ? (aValue < bValue ? -1 : aValue > bValue ? 1 : 0)
            : (aValue > bValue ? -1 : aValue < bValue ? 1 : 0);
        });
        
        // Apply pagination
        const from = (currentPage - 1) * itemsPerPage;
        const to = currentPage * itemsPerPage;
        const paginatedRecords = sortedRecords.slice(from, to);
        
        setSignups(paginatedRecords);
        setError(null);
      } catch (err) {
        console.error('Error fetching data from Airtable:', err);
        setError('An error occurred while fetching data from Airtable');
        setSignups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSignups();
  }, [currentPage, itemsPerPage, sortColumn, sortDirection]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="px-6 py-6 border-b border-neutral-bg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src="/elephantsLogo+Text.jpg" alt="Elephants Inc Logo" className="h-10" />
          </Link>
          <Link to="/" className="text-sm bg-primary-accent text-white px-4 py-2 rounded-md hover:bg-primary-accent/90 transition-colors">
            {referralCode}
          </Link>
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
                      { id: 'referrer_organization', label: 'Referrer Organization' },
                      { id: 'referral_code', label: 'Referral Code' },
                      { id: 'referred_organization', label: 'Referred Organization' },
                      { id: 'external_deposit_amount', label: 'External Deposit Amount' },
                      { id: 'total_card_spend_amount', label: 'Total Card Spend Amount' },
                      { id: 'kyc_status', label: 'Referred KYC Status' },
                      { id: 'calculated_payout', label: 'Referral Payout ($)' }
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
                  {signups.map((signup, index) => (
                    <tr key={index} className="hover:bg-secondary-accent/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{signup.referrer_organization || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{signup.referral_code || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{signup.referred_organization|| '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{signup.external_deposit_amount || '0' }</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{signup.total_card_spend_amount || '0'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{signup.kyc_status || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${signup.calculated_payout?.toFixed(2) || '0.00'}</td>
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
              </div>
              <div className="flex items-center space-x-2">
                {/* <button
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
                </button> */}
              </div>
            </div>
          )}
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

export default TrackingPage;
