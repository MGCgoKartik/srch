import React from 'react';
import { Clock, CheckCircle, Zap, Users, TrendingUp, Battery } from 'lucide-react';

interface QuickFiltersProps {
  onFilter: (filterType: string) => void;
}

export default function QuickFilters({ onFilter }: QuickFiltersProps) {
  const quickFilters = [
    {
      id: 'today-deliveries',
      label: "Today's Approved",
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-green-600',
      hoverGradient: 'hover:from-emerald-600 hover:to-green-700',
      description: 'Applications approved today'
    },
    {
      id: 'pending-applications',
      label: 'Pending Applications',
      icon: Clock,
      gradient: 'from-amber-500 to-orange-600',
      hoverGradient: 'hover:from-amber-600 hover:to-orange-700',
      description: 'Applications awaiting approval'
    },
    {
      id: 'electric-vehicles',
      label: 'Electric Vehicles',
      icon: Battery,
      gradient: 'from-green-500 to-emerald-600',
      hoverGradient: 'hover:from-green-600 hover:to-emerald-700',
      description: 'All electric vehicle orders'
    },
    {
      id: 'walk-in-customers',
      label: 'Walk-in Customers',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
      hoverGradient: 'hover:from-blue-600 hover:to-indigo-700',
      description: 'Customers who visited showroom'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Zap className="w-5 h-5 text-blue-600" />
        <h3 className="text-sm font-semibold text-slate-700">Quick Filters</h3>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickFilters.map((filter) => {
          const IconComponent = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => onFilter(filter.id)}
              className={`group relative overflow-hidden bg-gradient-to-r ${filter.gradient} ${filter.hoverGradient} text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-sm">{filter.label}</h4>
                  </div>
                </div>
                <p className="text-xs text-white/80 group-hover:text-white transition-colors duration-300">
                  {filter.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          );
        })}
      </div>

      {/* Additional Quick Stats */}
      <div className="flex items-center justify-center space-x-6 pt-4 text-sm text-slate-600">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>Smart Search</span>
        </div>
        <div className="w-px h-4 bg-slate-300"></div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-blue-500" />
          <span>Real-time Data</span>
        </div>
        <div className="w-px h-4 bg-slate-300"></div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-purple-500" />
          <span>Advanced Filters</span>
        </div>
      </div>
    </div>
  );
}