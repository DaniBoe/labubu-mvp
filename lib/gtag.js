export const GA_TRACKING_ID = 'G-091V0NEBMX';

// Log pageviews
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
