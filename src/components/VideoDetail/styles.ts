export const container = "space-y-6 animate-fadeIn";
export const backButton = "flex items-center gap-2 text-slate-500 hover:text-blue-700 font-medium transition-colors mb-4";
export const grid = "grid lg:grid-cols-3 gap-8";
export const mainContent = "lg:col-span-2 space-y-6";
export const videoPlayerWrapper = "bg-black rounded-xl overflow-hidden shadow-2xl aspect-video relative group";
export const iframe = "w-full h-full";
export const externalVideoWrapper = "w-full h-full flex flex-col items-center justify-center text-white p-8 text-center bg-slate-900";
export const externalVideoTitle = "text-xl font-bold mb-2";
export const externalVideoText = "text-slate-400 mb-6 max-w-md";
export const externalVideoButton = "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors";
export const videoTitle = "text-2xl font-bold text-slate-900 mb-2";
export const videoMetaContainer = "flex flex-wrap items-center justify-between gap-4 py-4 border-b border-slate-200";
export const videoMetaLeft = "flex items-center gap-4 text-sm text-slate-500";
export const dateWrapper = "flex items-center gap-1.5";
export const categoryBadge = "bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-semibold uppercase";
export const videoActions = "flex items-center gap-3";
export const shareButton = "flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all";
export const descriptionContainer = "py-6";
export const descriptionTitle = "text-lg font-semibold text-slate-900 mb-2";
export const descriptionText = "text-slate-700 leading-relaxed whitespace-pre-wrap";
export const sidebar = "lg:col-span-1";
export const commentsWrapper = "bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full max-h-[800px]";
export const commentsHeader = "p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl";
export const commentsTitle = "font-bold text-slate-800 flex items-center gap-2";
export const commentsCount = "text-slate-400 text-sm font-normal";
export const commentsList = "flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar";
export const commentItem = "flex gap-3";
export const commentAvatar = "w-10 h-10 rounded-full bg-slate-200 object-cover";
export const commentContentWrapper = "flex-1";
export const commentHeader = "flex items-center justify-between mb-1";
export const commentAuthor = "font-semibold text-sm text-slate-900";
export const commentDate = "text-xs text-slate-400";
export const commentText = "text-sm text-slate-600";
export const commentActions = "flex items-center gap-3 mt-2";
export const likeButton = "text-slate-400 hover:text-blue-600 flex items-center gap-1 text-xs transition-colors";
export const replyButton = "text-slate-400 hover:text-blue-600 text-xs transition-colors";
export const commentFormWrapper = "p-4 border-t border-slate-200 bg-white rounded-b-xl";
export const commentForm = "flex gap-2";
export const userAvatarWrapper = "w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0";
export const userIcon = "text-blue-700";
export const inputWrapper = "flex-1 relative";
export const commentInput = "w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all";
export const sendButton = "absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 disabled:opacity-30 transition-colors";

export const getLikeButtonClass = (isLiked: boolean) => `flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isLiked
        ? 'bg-red-50 text-red-600 border border-red-200'
        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
    }`;
