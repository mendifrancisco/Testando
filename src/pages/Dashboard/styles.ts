// Layout
export const container = "p-6 max-w-7xl mx-auto animate-fadeIn";
export const header = "text-xl font-bold text-slate-900 flex items-center gap-2 mb-1";
export const headerIcon = "text-blue-600";
export const headerSubtitle = "text-slate-500 text-sm mb-6";

// Stats Cards Grid - Compacto
export const statsGrid = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6";

// Card Styles Helper - Compacto
const cardBase = "bg-white p-4 rounded-lg border shadow-sm transition-all hover:shadow-md";
const iconWrapperBase = "p-2 rounded-lg mb-2 w-fit";
const trendIconBase = "ml-auto";

// Blue Card (Views)
export const statCardBlue = `${cardBase} border-blue-100 hover:border-blue-200`;
export const statIconWrapperBlue = `${iconWrapperBase} bg-blue-50 text-blue-600`;
export const statTrendIconBlue = `${trendIconBase} text-blue-500`;
export const statLabelBlue = "text-xs font-medium text-slate-500 mb-1";
export const statValueBlue = "text-xl font-bold text-slate-900";

// Red Card (Likes)
export const statCardRed = `${cardBase} border-red-100 hover:border-red-200`;
export const statIconWrapperRed = `${iconWrapperBase} bg-red-50 text-red-600`;
export const statTrendIconRed = `${trendIconBase} text-red-500`;
export const statLabelRed = "text-xs font-medium text-slate-500 mb-1";
export const statValueRed = "text-xl font-bold text-slate-900";

// Green Card (Comments)
export const statCardGreen = `${cardBase} border-green-100 hover:border-green-200`;
export const statIconWrapperGreen = `${iconWrapperBase} bg-green-50 text-green-600`;
export const statTrendIconGreen = `${trendIconBase} text-green-500`;
export const statLabelGreen = "text-xs font-medium text-slate-500 mb-1";
export const statValueGreen = "text-xl font-bold text-slate-900";

// Purple Card (Total Videos)
export const statCardPurple = `${cardBase} border-purple-100 hover:border-purple-200`;
export const statIconWrapperPurple = `${iconWrapperBase} bg-purple-50 text-purple-600`;
export const statTrendIconPurple = `${trendIconBase} text-purple-500`;
export const statLabelPurple = "text-xs font-medium text-slate-500 mb-1";
export const statValuePurple = "text-xl font-bold text-slate-900";

// Table Section - Compacto
export const tableContainer = "bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden";
export const tableHeader = "p-4 border-b border-slate-200";
export const tableHeaderContent = "flex flex-col md:flex-row md:items-center justify-between gap-3";
export const tableTitle = "text-base font-semibold text-slate-900";

// Search - Compacto
export const searchWrapper = "relative w-full md:w-56";
export const searchIcon = "absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400";
export const searchInput = "w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

// Table - Compacto
export const tableWrapper = "overflow-x-auto";
export const table = "w-full";
export const thead = "bg-slate-50";
export const tbody = "divide-y divide-slate-200";

// Table Headers - Compacto
export const thBase = "px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors";
export const thContent = "flex items-center gap-1.5";
export const thContentCenter = "flex items-center justify-center gap-1.5";
export const thCenter = `${thBase} text-center`;

// Responsive Headers
export const thLeftHiddenMd = `${thBase} hidden md:table-cell`;
export const thLeftHiddenLg = `${thBase} hidden lg:table-cell`;
export const thCenterHiddenSm = `${thCenter} hidden sm:table-cell`;
export const hiddenSm = "hidden sm:inline";

// Table Rows - Compacto
export const tableRow = "hover:bg-slate-50 transition-colors";
export const tdBase = "px-4 py-3 whitespace-nowrap";
export const tdHiddenMd = `${tdBase} hidden md:table-cell`;
export const tdCenter = `${tdBase} text-center`;
export const tdCenterHiddenSm = `${tdCenter} hidden sm:table-cell`;
export const tdLeftHiddenLg = `${tdBase} hidden lg:table-cell`;

// Cell Content - Compacto
export const videoTitle = "font-medium text-slate-900 text-sm";
export const videoDescription = "text-xs text-slate-500 truncate max-w-[180px]";

export const categoryBadge = "inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800";
export const categoryText = "truncate max-w-[80px]";

// Stat Badges - Compacto
export const statBadgeBase = "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium";
export const statBadgeBlue = `${statBadgeBase} bg-blue-50 text-blue-700`;
export const statBadgeRed = `${statBadgeBase} bg-red-50 text-red-700`;
export const statBadgeGreen = `${statBadgeBase} bg-green-50 text-green-700`;

// Empty State - Compacto
export const emptyRow = "px-4 py-8 text-center";
export const emptyIcon = "mx-auto text-slate-300 mb-2";
export const emptyTitle = "text-slate-900 font-medium text-sm";
export const emptySubtitle = "text-xs text-slate-500";
