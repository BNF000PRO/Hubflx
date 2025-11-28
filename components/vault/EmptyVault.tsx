"use client";

import { Lock, Sparkles } from "lucide-react";
import Link from "next/link";

const EmptyVault = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4">
      {/* Vault Illustration */}
      <div className="relative mb-8">
        <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto relative">
          {/* Glowing Vault Icon */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="relative w-full h-full flex items-center justify-center bg-[#112240] border-2 border-primary-500/30 rounded-full">
            <Lock className="w-16 h-16 sm:w-20 sm:h-20 text-primary-400" />
          </div>
          
          {/* Floating Sparkles */}
          <div className="absolute -top-2 -right-2 animate-bounce" style={{ animationDelay: '0s' }}>
            <Sparkles className="w-6 h-6 text-primary-400" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="absolute top-1/2 -left-4 animate-bounce" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-4 h-4 text-primary-300" />
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="text-center max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Your Vault Awaits! 🔒
        </h2>
        <p className="text-gray-400 text-base sm:text-lg mb-6">
          Start building your personalized library of valuable tech and AI insights. 
          Save content you want to revisit later with one click.
        </p>
        
        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/50"
        >
          <span>Explore Content</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Tips */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
        <div className="text-center p-4 bg-[#112240] border border-primary-500/20 rounded-lg">
          <div className="text-2xl mb-2">🔒</div>
          <h3 className="text-sm font-semibold text-white mb-1">Save Instantly</h3>
          <p className="text-xs text-gray-400">Click the lock icon on any content</p>
        </div>
        <div className="text-center p-4 bg-[#112240] border border-primary-500/20 rounded-lg">
          <div className="text-2xl mb-2">📁</div>
          <h3 className="text-sm font-semibold text-white mb-1">Organize</h3>
          <p className="text-xs text-gray-400">Create collections to group items</p>
        </div>
        <div className="text-center p-4 bg-[#112240] border border-primary-500/20 rounded-lg">
          <div className="text-2xl mb-2">🔍</div>
          <h3 className="text-sm font-semibold text-white mb-1">Find Fast</h3>
          <p className="text-xs text-gray-400">Search and filter your saved content</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyVault;

