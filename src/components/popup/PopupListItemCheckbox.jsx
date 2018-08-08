import PropTypes from 'prop-types';
import React from 'react';

import Toggle from 'react-toggle';

import Tooltip from '../Tooltip';
import { IconQuestionmark } from '../Icons';


const PopupListItemCheckbox = ({
  checked,
  description,
  disabled,
  disabledHelpText,
  onChange,
  title,
}) => {
  const toggle = (
    <Toggle
      defaultChecked={checked}
      disabled={disabled}
      icons={false}
      onChange={onChange}
      className="popup-list-item__toggle"
    />
  );

  return (
    <div className="popup-list-item">
      <div className="popup-list-item__title">
        {title}
        {description !== null && (
          <Tooltip placement="bottom" content={description}>
            <span className="popup-list-item__description-tooltip">
              <IconQuestionmark />
            </span>
          </Tooltip>
        )}
      </div>
      {disabledHelpText && (
        <Tooltip placement="left" content={disabledHelpText}>
          {toggle}
        </Tooltip>
      )}
      {!disabledHelpText && toggle}
    </div>
  );
};

PopupListItemCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  disabledHelpText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

PopupListItemCheckbox.defaultProps = {
  disabled: false,
  disabledHelpText: null,
  description: null,
};

export default PopupListItemCheckbox;
