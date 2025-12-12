export const container = "min-h-screen flex bg-gray-50";
export const sidebar = "w-64 bg-slate-900 text-white flex flex-col fixed h-full shadow-xl z-10";
export const brandContainer = "p-6 flex items-center gap-3 border-b border-slate-700";
export const logoWrapper = "bg-blue-600 p-2 rounded-lg";
export const logoIcon = "text-white";
export const brandName = "font-bold text-lg tracking-tight";
export const brandSubtitle = "text-xs text-slate-400";
export const nav = "flex-1 py-6 px-3 space-y-2";
export const navSection = "pt-4 mt-4 border-t border-slate-800";
export const navSectionTitle = "px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2";
export const footer = "p-4 border-t border-slate-700";
export const logoutButton = "flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white transition-colors w-full";
export const main = "flex-1 ml-64 p-8";
export const contentWrapper = "max-w-6xl mx-auto";

export const getButtonClass = (isActive: boolean) => `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
        ? 'bg-blue-700 text-white shadow-lg'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;
