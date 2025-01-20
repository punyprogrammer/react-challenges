import { useState, useCallback } from 'react';

function useClipboard() {
  const [status, setStatus] = useState({ isCopied: false, error: null });

  const copyToClipboard = useCallback(async (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Modern browsers with clipboard API support
      try {
        await navigator.clipboard.writeText(text);
        setStatus({ isCopied: true, error: null });

        // Reset the status after 2 seconds
        setTimeout(() => setStatus({ isCopied: false, error: null }), 2000);
      } catch (err) {
        console.error('Clipboard API failed:', err);
        setStatus({ isCopied: false, error: 'Failed to copy text.' });
      }
    } else {
      // Fallback for older browsers
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'absolute';
        textarea.style.opacity = '0';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand('copy'); // Fallback API
        document.body.removeChild(textarea);

        setStatus({ isCopied: true, error: null });

        // Reset the status after 2 seconds
        setTimeout(() => setStatus({ isCopied: false, error: null }), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
        setStatus({ isCopied: false, error: 'Failed to copy text.' });
      }
    }
  }, []);

  return {
    isCopied: status.isCopied,
    error: status.error,
    copyToClipboard,
  };
}

export default useClipboard;
