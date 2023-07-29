export const GA_TRACKING_ID = process.env.GA_TRACKING_ID

if (!GA_TRACKING_ID) {
  throw new Error('Missing GA_TRACKING_ID')
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const trackPage = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
