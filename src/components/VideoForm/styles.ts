export const container = "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden";
export const header = "bg-slate-50 px-8 py-6 border-b border-slate-200";
export const title = "text-2xl font-bold text-slate-800";
export const subtitle = "text-slate-500 mt-1";
export const form = "p-8 space-y-6";
export const errorContainer = "bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2 border border-red-100";
export const grid = "grid grid-cols-1 md:grid-cols-2 gap-6";
export const fieldGroup = "space-y-2";
export const label = "block text-sm font-medium text-slate-700";
export const input = "w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all";
export const select = "w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white";
export const linkInputWrapper = "relative";
export const linkIconWrapper = "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none";
export const linkIcon = "h-5 w-5 text-slate-400";
export const linkInput = "w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all";
export const descriptionHeader = "flex justify-between items-center";
export const textarea = "w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none";
export const footer = "pt-4 border-t border-slate-100 flex justify-end";
export const submitButton = "flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg active:transform active:scale-95";

export const getAiButtonClass = (isGenerating: boolean) => `text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${isGenerating
        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
        : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
    }`;
