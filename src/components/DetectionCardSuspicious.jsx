import PropTypes from 'prop-types';
import React from 'react';

import style from '../scss/index-plugin.scss';
import { IconClose, IconSkull } from './Icons';

const DetectionCardSuspicious = ({ onClose, infoUrl, features }) => (
  <div className={style['detection-card']}>
    <div className={style['detection-card__close']} onClick={onClose}>
      <IconClose />
    </div>
    <div className={[style['detection-card__icon'], style['detection-card__icon--suspicious']].join(' ')}>
      <IconSkull />
    </div>
    <div className={style['detection-card__title']}>
      Suspicious infringement of privacy detected!
    </div>
    <div className={style['detection-card__summary']}>
      <div className={style['detection-card__summary__items']}>
        {features.filter(feature => feature.suspicious).map(feature => (
          <div className={style['detection-card__summary__item']}>
            <div className={style['detection-card__summary__item__icon']}>
              {feature.icon}
            </div>
            <div className={style['detection-card__summary__item__title']}>
              {feature.title}
            </div>
            <div className={style['detection-card__summary__item__badge']}>
              <span className={[style.badge, style['badge-danger']].join(' ')}>
                Active
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className={style['detection-card__summary__cta']}>
        <a className={[style.btn, style['btn-info']].join(' ')} target="_blank" rel="noopener noreferrer" href={infoUrl}>
          How to Deactivate?
        </a>
      </div>
      <div className={style['detection-card__summary__ignore-link']}>
        <button className={[style.btn, style['btn-link']].join(' ')}>
          <span>Remind me later</span> &nbsp;
          <span className={style['arrow-down']} />
        </button>
      </div>
    </div>
  </div>
);

DetectionCardSuspicious.propTypes = {
  onClose: PropTypes.func,
  infoUrl: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.shape({
    suspicious: PropTypes.bool,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

DetectionCardSuspicious.defaultProps = {
  onClose: null,
  infoUrl: '#',
};

export default DetectionCardSuspicious;
