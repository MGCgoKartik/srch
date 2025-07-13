import React from 'react';
import { Phone, Eye, User, Car, Calendar, IndianRupee, MapPin, Clock, Battery, Fuel, Settings, CreditCard, FileText } from 'lucide-react';
import { SheetRow as SearchResult } from '../types/index';

interface UnifiedResultCardProps {
  result: SearchResult;
}

export default function UnifiedResultCard({ result }: UnifiedResultCardProps) {
  // Helper function to safely parse numeric values from string
  const parseCurrency = (value: string | undefined) => {
    if (!value) return 0;
    return parseFloat(value.replace(/,/g, ''));
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white';
      case 'Pending':
        return 'bg-gradient-to-r from-amber-500 to-orange-600 text-white';
      case 'Rejected':
        return 'bg-gradient-to-r from-red-500 to-pink-600 text-white';
      case 'Under Review':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'Documentation Pending':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      default:
        return 'bg-gradient-to-r from-slate-500 to-slate-600 text-white';
    }
  };

  const getFuelTypeIcon = (type: string) => {
    switch (type) {
      case 'Electric':
        return <Battery className="w-4 h-4" />;
      case 'Hybrid':
        return <Battery className="w-4 h-4" />;
      default:
        return <Fuel className="w-4 h-4" />;
    }
  };

  const getFuelTypeColor = (type: string) => {
    switch (type) {
      case 'Electric':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
      case 'Hybrid':
        return 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white';
      case 'Petrol':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'Diesel':
        return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white';
      default:
        return 'bg-gradient-to-r from-slate-500 to-slate-600 text-white';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'Walk-in':
        return '🚶';
      case 'Dealer Digital':
        return '💻';
      case 'Online':
        return '🌐';
      case 'Referral':
        return '👥';
      case 'Social Media':
        return '📱';
      case 'Advertisement':
        return '📺';
      default:
        return '📋';
    }
  };

  const getFinanceModeIcon = (mode: string) => {
    switch (mode) {
      case 'Cash':
        return '💵';
      case 'Loan':
        return '🏦';
      case 'Lease':
        return '📋';
      case 'EMI':
        return '💳';
      default:
        return '💰';
    }
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Main Content Row */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Customer & Vehicle Info */}
        <div className="flex items-start space-x-4 flex-1">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <User className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Customer Details */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-3">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                {result.CustomerName}
              </h3>
              <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                ID: {result.Customer}
              </span>
            </div>
            
            <div className="flex items-center text-slate-600 mb-3">
              <Phone className="w-4 h-4 mr-2 text-blue-500" />
              <a 
                href={`tel:${result.Mobile}`} 
                className="hover:text-blue-600 transition-colors duration-200 font-medium mr-4"
              >
                {result.Mobile}
              </a>
              <MapPin className="w-4 h-4 mr-2 text-slate-400" />
              <span className="text-sm">{result.BranchName}</span>
            </div>

            {/* Vehicle Details */}
            <div className="bg-slate-50/80 rounded-lg p-3 mb-3">
              <div className="flex items-center space-x-2 mb-2">
                <Car className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-slate-900">
                  {result.ModelText1} {result.ModelSeries}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold shadow-md ${getFuelTypeColor(result.FuelTypeDescription || '')}`}>
                  {getFuelTypeIcon(result.FuelTypeDescription || '')}
                  <span className="ml-1">{result.FuelTypeDescription}</span>
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: result.Color?.toLowerCase().replace(' ', '') }}></div>
                  <span>{result.Color}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Settings className="w-3 h-3 text-slate-400" />
                  <span>{result.TransmissiontypeDescription}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs">Interior:</span>
                  <span>{result.InteriorColorDescription}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs">Line:</span>
                  <span>{result.ModelLineDescription}</span>
                </div>
              </div>
            </div>

            {/* Channel & Finance Info */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {getChannelIcon(result.Channel || '')} {result.Channel}
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                {getFinanceModeIcon(result.FinanceMode || '')} {result.FinanceMode}
              </span>
            </div>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex flex-col items-start lg:items-end space-y-3 lg:min-w-[200px]">
          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${getStatusColor(result.ApplicationStatus || '')}`}>
            {result.ApplicationStatus}
          </span>
          
          <div className="flex items-center text-sm text-slate-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            <span>Order: {result.DocumentDate}</span>
          </div>
          
          <div className="flex items-center text-lg font-bold text-slate-900">
            <IndianRupee className="w-5 h-5 mr-1 text-green-600" />
            <span>₹{(parseCurrency(result.TotalVehicleValue) / 100000).toFixed(1)}L</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2 w-full lg:min-w-[140px]">
            <button className="flex items-center justify-center px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </button>
            <button className="flex items-center justify-center px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg">
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info Bar */}
      <div className="mt-4 pt-4 border-t border-slate-200/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center space-x-4">
          <span>Sales: {result.EmployeeName}</span>
          <span>•</span>
          <span>Outlet: {result.MainOutletName}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <FileText className="w-3 h-3" />
            <span>Invoice: {result.Invoicenumber}</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Vehicle ID: {result.VehicleIDNo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}