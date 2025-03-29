declare global {
    interface Window {
      fbq: any;
    }
  }
  
  export const initFacebookPixel = (pixelId: string): void => {
    if (typeof window !== 'undefined') {
      if (!window.fbq) {
        window.fbq = function (...args: any[]) {
          window.fbq.callMethod ? window.fbq.callMethod(...args) : window.fbq.queue.push(args);
        };
        window.fbq.queue = [];
        window.fbq.loaded = true;
        window.fbq.version = '2.0';
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        document.head.appendChild(script);
      }
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }
  };
  