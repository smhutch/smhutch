export const GA_TRACKING_ID = process.env.GA_TRACKING_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const trackPage = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
