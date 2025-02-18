import React, { useState } from 'react';
import { Copy, Share2, X } from 'lucide-react';

interface ShareDialogProps {
  title: string;
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareDialog({ title, url, isOpen, onClose }: ShareDialogProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareError, setShareError] = useState(false);

  const handleShare = async () => {
    try {
      if (!navigator.share) {
        throw new Error('Web Share API not supported');
      }

      await navigator.share({
        title,
        url
      });
      onClose();
    } catch (error) {
      // Only show error if it's not a user cancellation
      if (error instanceof Error && error.name !== 'AbortError') {
        setShareError(true);
        setTimeout(() => {
          setShareError(false);
          handleCopyLink(); // Fallback to copy link
        }, 1500);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Share this experience</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {shareError && (
          <div className="mb-4 text-center text-[#800000]">
            Sharing not available. Copying link instead...
          </div>
        )}
        
        <div className="space-y-4">
          {navigator.share && !shareError && (
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 bg-[#800000] text-white px-4 py-3 rounded-md hover:bg-[#600000] transition-colors duration-300"
            >
              <Share2 className="w-5 h-5" />
              Share
            </button>
          )}
          
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 border border-[#800000] text-[#800000] px-4 py-3 rounded-md hover:bg-gray-50 transition-colors duration-300"
          >
            <Copy className="w-5 h-5" />
            {copySuccess ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  );
}