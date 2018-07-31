import Detector from './base';
import { fetchDocument } from './utils';

export const features = [
  {
    title: 'Twitter Data Sharing with third party services',
    key: 'twitter-thrid-party-sharing',
    icon: 'IconThirdPartyAccess',
    settingsUrl: 'https://twitter.com/personalization',
    aboutUrl: 'https://cliqz.com',
    description: 'Allow Twitter to share your data with third party services?',
    group: 'automatically-detected',
  },
  {
    title: 'Twitter Cookie Tracking',
    key: 'twitter-cookie-tracking',
    icon: 'IconThirdPartyAccess',
    settingsUrl: 'https://twitter.com/personalization',
    aboutUrl: 'https://cliqz.com',
    description: 'Allow Twitter to track which websites you used?',
    group: 'automatically-detected',
  },
  {
    title: 'Twitter Location Tracking',
    key: 'twitter-location-tracking',
    icon: 'IconLocation',
    settingsUrl: 'https://twitter.com/personalization',
    aboutUrl: 'https://cliqz.com',
    description: 'Allow Twitter to track which websites you used?',
    group: 'automatically-detected',
  },
];

async function doFetch() {
  return fetchDocument('https://api.twitter.com/1.1/account/personalization/p13n_preferences.json', 'json');
}

function doDetect(feature, doc) {
  switch (feature.key) {
    case 'twitter-thrid-party-sharing': return doc.share_data_with_third_party;
    case 'twitter-cookie-tracking': return doc.use_cookie_personalization;
    case 'twitter-location-tracking': return doc.location_preferences.use_location_for_personalization;
    default: throw Error(`Feature detection not implemented: ${feature.key}`);
  }
}

export default class TwitterDetector extends Detector {
  getDomains() {
    return [
      'twitter.com',
    ];
  }

  getSiteName() {
    return 'Twitter';
  }

  detect() {
    return this.detectFeatures(features, doDetect, doFetch);
  }
}
