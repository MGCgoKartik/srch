import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Search, Sparkles } from 'lucide-react';
import { SearchResult } from '../types/index';
import UnifiedResultCard from './UnifiedResultCard';

interface ResultsDisplayProps {
  results: SearchResult[];
  isLoading: boolean;
}

export default function ResultsDisplay({ results, isLoading }: ResultsDisplayProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const handleExport = () => {
    const csvContent = [
      ['Customer Name', 'Mobile', 'Vehicle', 'Color', 'Interior', 'Channel', 'Finance', 'Status', 'Amount'].join(','),
      ...results.map(result => [
        result.customerName,
        result.mobile,
        `${result.vehicleModel} ${result.modelSeries}`,
        result.vehicleColor,
        result.interiorColor,
        result.customerChannel,
        result.financeMode,
        result.applicationStatus,
        result.totalAmount
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dealership_search_results.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Searching Database...</h3>
            <p className="text-slate-600">Finding matching records across all criteria</p>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No Records Found</h3>
          <p className="text-slate-600">
            No records match your search criteria. Try adjusting your filters or search terms.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-slate-500">
            <span className="bg-slate-100 px-3 py-1 rounded-full">Try broader terms</span>
            <span className="bg-slate-100 px-3 py-1 rounded-full">Check spelling</span>
            <span className="bg-slate-100 px-3 py-1 rounded-full">Remove some filters</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      {/* Results Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                Search Results
              </h2>
              <p className="text-blue-100">
                {results.length} {results.length === 1 ? 'record' : 'records'} found • 
                Showing {indexOfFirstResult + 1}-{Math.min(indexOfLastResult, results.length)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={resultsPerPage}
              onChange={(e) => {
                setResultsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-sm backdrop-blur-sm"
            >
              <option value={10} className="text-slate-900">10 per page</option>
              <option value={25} className="text-slate-900">25 per page</option>
              <option value={50} className="text-slate-900">50 per page</option>
            </select>
            
            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-lg transition-all duration-200 text-sm backdrop-blur-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="p-6">
        <div className="space-y-4">
          {currentResults.map((result, index) => (
            <div 
              key={result.id} 
              className="animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <UnifiedResultCard result={result} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-200/50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}