import React from 'react';

import DetectionCardScanning from './DetectionCardScanning';
import DetectionCardSuccess from './DetectionCardSuccess';
import DetectionCardSuspicious from './DetectionCardSuspicious';

import style from '../scss/index-plugin.scss';

function detectFeatures(url) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      {
        message: 'detect_features',
        url,
      },
      (features) => {
        resolve(features);
      },
    );
  });
}

function getErrorTitle(features) {
  try {
    return features.map(feature => feature.error).join('\n');
  } catch (e) {
    return '';
  }
}

function getInfoUrl() {
  return 'http://cliqz.s3-website.eu-central-1.amazonaws.com/website/';
}

class DetectionCard extends React.Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.state = {
      closed: false,
      status: 'scanning',
      features: [],
      errors: [],
    };
  }

  async componentDidMount() {
    const features = await detectFeatures(String(window.location));
    const errors = features.filter(feature => feature.error);
    const suspicious = features.some(feature => feature.suspicious);
    const status = suspicious ? 'suspicious' : 'success';

    this.setState({ status, features, errors }); // eslint-disable-line react/no-did-mount-set-state
  }

  onClose() {
    this.setState({ closed: true });
  }

  render() {
    const {
      closed,
      status,
      features,
      errors,
    } = this.state;

    if (closed) {
      return null;
    }

    const infoUrl = getInfoUrl(features);

    let component = null;

    if (status === 'scanning') {
      component = <DetectionCardScanning onClose={this.onClose} />;
    } else if (status === 'suspicious') {
      component = (
        <DetectionCardSuspicious
          onClose={this.onClose}
          infoUrl={infoUrl}
          features={features}
        />
      );
    } else if (status === 'success') {
      component = <DetectionCardSuccess onClose={this.onClose} infoUrl={infoUrl} />;
    }

    return (
      <div className={style['detection-card-wrapper']}>
        {component}

        {!!errors.length && (
          <div className={style['detection-card-wrapper__error']} title={getErrorTitle(errors)}>
            {errors.length} {errors.length === 1 ? 'error' : 'errors'}
          </div>
        )}
      </div>
    );
  }
}

export default DetectionCard;
