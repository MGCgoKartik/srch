import { useState, useEffect } from 'react';
import { Search, Car, Sparkles } from 'lucide-react';
import SearchInterface from './components/SearchInterface';
import QuickFilters from './components/QuickFilters';
import ResultsDisplay from './components/ResultsDisplay';
import { SheetRow as SearchResult, SearchFilters } from './types/index';

function App() {
  const [allData, setAllData] = useState<SearchResult[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true to fetch initial data
  const [hasSearched, setHasSearched] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

  useEffect(() => {
    // Fetch all data from the backend on initial load
    const fetchAllData = async () => {
      try {
        const response = await fetch('/api/sheet-data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SearchResult[] = await response.json();
        setAllData(data);
      } catch (error) {
        console.error("Failed to fetch sheet data:", error);
        // Handle error appropriately in the UI
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleSearch = (filters: SearchFilters) => {
    setIsLoading(true);
    setSearchFilters(filters);
    setHasSearched(true);

    // Filter the already-loaded data on the client-side
    let filteredResults = allData.filter(item => {
      const query = filters.query?.toLowerCase() || '';
      const matchesQuery = !query || 
        item.CustomerName?.toLowerCase().includes(query) ||
        item.Mobile?.includes(query) ||
        item.ModelText1?.toLowerCase().includes(query) ||
        item.Invoicenumber?.includes(query) ||
        item.VehicleIDNo?.toLowerCase().includes(query) ||
        item.Customer?.includes(query);

      const matchesVehicleColor = !filters.vehicleColor || item.Color === filters.vehicleColor;
      const matchesInteriorColor = !filters.interiorColor || item.InteriorColorDescription === filters.interiorColor;
      const matchesModelLine = !filters.modelLine || item.ModelLineDescription === filters.modelLine;
      const matchesTransmission = !filters.transmission || item.TransmissiontypeDescription === filters.transmission;
      const matchesFuelType = !filters.fuelType || item.FuelTypeDescription === filters.fuelType;
      const matchesCustomerChannel = !filters.customerChannel || item.Channel === filters.customerChannel;
      const matchesMainOutlet = !filters.mainOutlet || item.MainOutletName?.toLowerCase().includes(filters.mainOutlet.toLowerCase());
      const matchesFinanceMode = !filters.financeMode || item.FinanceMode === filters.financeMode;
      const matchesApplicationStatus = !filters.applicationStatus || item.ApplicationStatus === filters.applicationStatus;

      return matchesQuery && matchesVehicleColor && matchesInteriorColor && 
             matchesModelLine && matchesTransmission && matchesFuelType && 
             matchesCustomerChannel && matchesMainOutlet && matchesFinanceMode && 
             matchesApplicationStatus;
    });

    setSearchResults(filteredResults);
    setIsLoading(false);
  };

  const handleQuickFilter = (filterType: string) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    let newFilters: SearchFilters = { ...searchFilters };
    
    switch (filterType) {
      case 'today-deliveries':
        newFilters = {
          ...newFilters,
          applicationStatus: 'Approved',
          dateRange: { start: today, end: today }
        };
        break;
      case 'pending-applications':
        newFilters = {
          ...newFilters,
          applicationStatus: 'Pending'
        };
        break;
      case 'electric-vehicles':
        newFilters = {
          ...newFilters,
          fuelType: 'Electric'
        };
        break;
      case 'walk-in-customers':
        newFilters = {
          ...newFilters,
          customerChannel: 'Walk-in'
        };
        break;
    }
    
    handleSearch(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  AutoDealer Pro
                </h1>
                <p className="text-sm text-slate-500">Search & Manage</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>Employee Portal</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!hasSearched ? (
          /* Welcome Screen with Prominent Search */
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-12">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Search className="w-4 h-4" />
                <span>Advanced Search System</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Find Vehicle Data,
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                  Instantly
                </span>
              </h1>
              
              
            </div>

            {/* Main Search Interface */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500">
              <SearchInterface onSearch={handleSearch} isMainSearch={true} />
              <div className="mt-6">
                <QuickFilters onFilter={handleQuickFilter} />
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Vehicle Specifications</h3>
                <p className="text-sm text-slate-600">Search by color, interior, model line, transmission type</p>
              </div>

              <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Customer Channels</h3>
                <p className="text-sm text-slate-600">Track walk-in, digital, online, and referral customers</p>
              </div>

              <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">💳</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Finance Options</h3>
                <p className="text-sm text-slate-600">Filter by cash, loan, lease, and EMI options</p>
              </div>

              <div className="group bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Application Status</h3>
                <p className="text-sm text-slate-600">Track approvals, pending, and documentation status</p>
              </div>
            </div>
          </div>
        ) : (
          /* Search Results View */
          <div className="space-y-6">
            {/* Compact Search Bar */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
              <SearchInterface onSearch={handleSearch} isMainSearch={false} />
              <div className="mt-4">
                <QuickFilters onFilter={handleQuickFilter} />
              </div>
            </div>
            
            {/* Results */}
            <div className="animate-fadeIn">
              <ResultsDisplay 
                results={searchResults}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      {hasSearched && (
        <button
          onClick={() => {
            setHasSearched(false);
            setSearchResults([]);
            setSearchFilters({
              query: '',
              vehicleColor: '',
              interiorColor: '',
              modelLine: '',
              modelSeries: '',
              transmission: '',
              fuelType: '',
              customerChannel: '',
              mainOutlet: '',
              financeMode: '',
              applicationStatus: '',
              dateRange: { start: '', end: '' }
            });
          }}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        >
          <Search className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
}

export default App;