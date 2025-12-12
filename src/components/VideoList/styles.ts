export const container = "space-y-6";
export const header = "flex justify-between items-end";
export const title = "text-2xl font-bold text-slate-800";
export const filtersContainer = "bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5";
export const searchWrapper = "relative w-full";
export const searchIcon = "absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400";
export const searchInput = "w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-shadow bg-slate-50 focus:bg-white";
export const categoryLabel = "text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 ml-1";
export const categoryList = "flex gap-2 overflow-x-auto pb-2 scrollbar-hide";
export const emptyStateContainer = "text-center py-20 bg-white rounded-xl border border-dashed border-slate-300";
export const emptyStateIconWrapper = "mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4";
export const emptyStateIcon = "text-slate-400";
export const emptyStateTitle = "text-lg font-medium text-slate-900";
export const emptyStateText = "text-slate-500";
export const grid = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
export const card = "bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer transform hover:-translate-y-1";
export const thumbnailWrapper = "h-44 bg-slate-800 flex items-center justify-center relative overflow-hidden";
export const thumbnailOverlay = "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent";
export const playIcon = "text-white opacity-80 group-hover:scale-110 transition-transform duration-300";
export const durationBadge = "absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded";
export const cardContent = "p-5 flex-1 flex flex-col";
export const cardHeader = "flex justify-between items-start mb-3";
export const categoryBadge = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wide border border-blue-100";
export const cardTitle = "text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors";
export const cardDescription = "text-slate-600 text-sm mb-4 line-clamp-2 flex-1";
export const cardFooter = "flex items-center justify-between pt-4 border-t border-slate-100 mt-auto";
export const dateWrapper = "flex items-center gap-1.5 text-xs text-slate-500";
export const deleteButton = "text-slate-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50 z-10";

export const getCategoryButtonClass = (isSelected: boolean) => `px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${isSelected
        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
    }`;
