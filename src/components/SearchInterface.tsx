import React, { useState } from 'react';
import { Search, Filter, Calendar, Sparkles, Zap, X } from 'lucide-react';
import { SearchFilters } from '../types/index';

interface SearchInterfaceProps {
  onSearch: (filters: SearchFilters) => void;
  isMainSearch?: boolean;
}

export default function SearchInterface({ onSearch, isMainSearch = false }: SearchInterfaceProps) {
  const [filters, setFilters] = useState<SearchFilters>({
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

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const clearFilters = () => {
    setFilters({
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
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'dateRange') {
      return value.start || value.end;
    }
    return value && value !== '';
  });

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Search Bar */}
        <div className={`relative ${isMainSearch ? 'max-w-4xl mx-auto' : ''}`}>
          <div className={`relative ${isFocused ? 'scale-105' : ''} transition-transform duration-300`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className={`h-6 w-6 transition-colors duration-300 ${
                isFocused ? 'text-blue-600' : 'text-slate-400'
              }`} />
            </div>
            <input
              type="text"
              placeholder="Search by customer name, mobile, vehicle model, invoice number, or any keyword..."
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`block w-full pl-12 pr-4 ${isMainSearch ? 'py-6 text-lg' : 'py-4'} border-2 border-slate-200/50 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-slate-400 shadow-lg hover:shadow-xl`}
            />
            {isFocused && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 pointer-events-none animate-pulse" />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center px-6 py-3 border-2 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl relative ${
                showAdvancedFilters
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
              {hasActiveFilters && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center px-4 py-3 border-2 border-red-200 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All
              </button>
            )}

            <button
              type="submit"
              className="group flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Search
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="animate-slideDown bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Vehicle Specifications */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">🎨 Vehicle Color</label>
                <select
                  value={filters.vehicleColor}
                  onChange={(e) => setFilters({ ...filters, vehicleColor: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <option value="">All Colors</option>
                  <option value="Pearl White">Pearl White</option>
                  <option value="Candy White">Candy White</option>
                  <option value="Glaze Red">Glaze Red</option>
                  <option value="Turquoise Green">Turquoise Green</option>
                  <option value="Aurora Silver">Aurora Silver</option>
                  <option value="Starburst Black">Starburst Black</option>
                  <option value="Dune Brown">Dune Brown</option>
                  <option value="Havana Grey">Havana Grey</option>
                  <option value="Starry Black">Starry Black</option>
                  <option value="Metal Black">Metal Black</option>
                  <option value="Celadon Blue">Celadon Blue</option>
                  <option value="Candy White + Starry black">Candy White + Starry black</option>
                  <option value="Metal Ash">Metal Ash</option>
                  <option value="Pearl White Dual tone">Pearl White Dual tone</option>
                  <option value="EVERGREENSTARRYBLACK">EVERGREENSTARRYBLACK</option>
                  <option value="Apple Green+Black">Apple Green+Black</option>
                  <option value="Warm White">Warm White</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">🪑 Interior Color</label>
                <select
                  value={filters.interiorColor}
                  onChange={(e) => setFilters({ ...filters, interiorColor: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <option value="">All Interiors</option>
                  <option value="Black Leather">Black Leather</option>
                  <option value="Tan Leather">Tan Leather</option>
                  <option value="Black Fabric">Black Fabric</option>
                  <option value="Oyster White">Oyster White</option>
                  <option value="Black Leatherette">Black Leatherette</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">🚗 Model Line</label>
                <select
                  value={filters.modelLine}
                  onChange={(e) => setFilters({ ...filters, modelLine: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <option value="">All Model Lines</option>
                  <option value="WINDSOR EV">WINDSOR EV</option>
                  <option value="HECTOR">HECTOR</option>
                  <option value="ZS EV">ZS EV</option>
                  <option value="COMET EV">COMET EV</option>
                  <option value="GLOSTER">GLOSTER</option>
                  <option value="WINDSOR PRO">WINDSOR PRO</option>
                  <option value="ASTOR">ASTOR</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">⚙️ Transmission</label>
                <select
                  value={filters.transmission}
                  onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <option value="">All Transmissions</option>
                  <option value="Manual">🔧 Manual</option>
                  <option value="Automatic">🔄 Automatic</option>
                  <option value="CVT">⚡ CVT</option>
                  <option value="AMT">🤖 AMT</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">⛽ Fuel Type</label>
                <select
                  value={filters.fuelType}
                  onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <option value="">All Fuel Types</option>
                  <option value="Electric">🔋 Electric</option>
                  <option value="Petrol">⛽ Petrol</option>
                  <option value="Diesel">🛢️ Diesel</option>
                  <option value="Hybrid">🌱 Hybrid</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">📱 Customer Channel</label>
                <select
                  value={filters.customerChannel}
                  onChange={(e) => setFilters({ ...filters, customerChannel: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <option value="">All Channels</option>
                  <option value="WALK-IN">🚶 WALK-IN</option>
                  <option value="Dealer Digital">💻 Dealer Digital</option>
                  <option value="TELE-OUT">📞 TELE-OUT</option>
                  <option value="Referral">👥 Referral</option>
                  <option value="TELE-IN">☎️ TELE-IN</option>
                  <option value="DIGITAL">🌐 DIGITAL</option>
                  <option value="EVENT">🎉 EVENT</option>
                  <option value="Pulse Hub">🏢 Pulse Hub</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">🏢 Main Outlet</label>
                <input
                  type="text"
                  placeholder="Enter outlet name"
                  value={filters.mainOutlet}
                  onChange={(e) => setFilters({ ...filters, mainOutlet: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">💳 Finance Mode</label>
                <select
                  value={filters.financeMode}
                  onChange={(e) => setFilters({ ...filters, financeMode: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <option value="">All Finance Modes</option>
                  <option value="Cash">💵 Cash</option>
                  <option value="Loan">🏦 Loan</option>
                  <option value="Lease">📋 Lease</option>
                  <option value="EMI">💳 EMI</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">📊 Application Status</label>
                <select
                  value={filters.applicationStatus}
                  onChange={(e) => setFilters({ ...filters, applicationStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="Approved">✅ Approved</option>
                  <option value="Pending">⏳ Pending</option>
                  <option value="Rejected">❌ Rejected</option>
                  <option value="Under Review">🔍 Under Review</option>
                  <option value="Documentation Pending">📄 Documentation Pending</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">📅 Start Date</label>
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    dateRange: { ...filters.dateRange, start: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">📅 End Date</label>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    dateRange: { ...filters.dateRange, end: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white/80 backdrop-blur-sm shadow-sm"
                />
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-6 pt-4 border-t border-slate-200/50">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Active Filters:</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(filters).map(([key, value]) => {
                    if (key === 'dateRange') {
                      if (value.start || value.end) {
                        return (
                          <span key={key} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            📅 {value.start} - {value.end}
                          </span>
                        );
                      }
                      return null;
                    }
                    if (value && value !== '') {
                      return (
                        <span key={key} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {key}: {value}
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}