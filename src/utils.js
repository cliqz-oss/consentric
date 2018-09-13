export const checkIsChrome = () => {
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
};

export const getConsentType = ({ features, consent }) => {
  if (features.length) {
    return features[0].site;
  }

  if (consent !== null) {
    return 'iab';
  }

  return null;
};
