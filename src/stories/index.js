/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { APPLICATION_STATE } from '../constants';
import { IconCogWheel } from '../components/Icons';
import PopupHeader from '../components/popup/PopupHeader';
import PopupFooter from '../components/popup/PopupFooter';
import PopupListItemCheckbox from '../components/popup/PopupListItemCheckbox';
import PopupListItemButton from '../components/popup/PopupListItemButton';
import PopupList from '../components/popup/PopupList';
import Popup from '../components/popup/Popup';

import consentFixture from './fixtures/consent.json';
import featuresFixture from './fixtures/features.json';

import '../scss/index.scss';

const longTextFixture = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').join(' ');

storiesOf('Label', module)
  .add('active', () => (
    <span className="label label--active">
      Active
    </span>
  ))
  .add('inactive', () => (
    <span className="label label--inactive">
      Deactivated
    </span>
  ));


storiesOf('Popup', module)
  .add('Scanning', () => (
    <Popup
      applicationState={APPLICATION_STATE.SCANNING}
      changeConsent={action('Change Consent')}
      siteName="Facebook.com"
    />
  ))
  .add('Settings detected with disabled consent', () => (
    <Popup
      applicationState={APPLICATION_STATE.SETTINGS_DETECTED}
      features={featuresFixture}
      consent={consentFixture}
      changeConsent={action('Change Consent')}
      siteName="Facebook.com"
    />
  ))
  .add('Settings detected with enabled consent', () => (
    <Popup
      applicationState={APPLICATION_STATE.SETTINGS_DETECTED}
      features={featuresFixture}
      consent={{ ...consentFixture, storageName: 'some-storage-name' }}
      changeConsent={action('Change Consent')}
      siteName="Facebook.com"
    />
  ))
  .add('Settings detected with features only', () => (
    <Popup
      applicationState={APPLICATION_STATE.SETTINGS_DETECTED}
      features={featuresFixture}
      changeConsent={action('Change Consent')}
      siteName="Facebook.com"
    />
  ))
  .add('Settings changed', () => (
    <Popup
      applicationState={APPLICATION_STATE.SETTINGS_CHANGED}
      features={featuresFixture}
      consent={{ ...consentFixture, storageName: 'some-storage-name' }}
      changeConsent={action('Change Consent')}
      siteName="Facebook.com"
    />
  ))
  .add('Settings well set', () => (
    <Popup
      applicationState={APPLICATION_STATE.SETTINGS_WELL_SET}
      changeConsent={action('Change Consent')}
      siteName="Facebook.com"
    />
  ))
  .add('No Concerns', () => (
    <Popup
      applicationState={APPLICATION_STATE.NO_CONCERNS}
      changeConsent={action('Change Consent')}
      siteName="Facebook.com"
    />
  ));

storiesOf('PopupHeader', module)
  .add('Scanning', () => (
    <PopupHeader
      applicationState={APPLICATION_STATE.SCANNING}
      siteName="Facebook.com"
    />
  ))
  .add('Settings detected', () => (
    <PopupHeader
      applicationState={APPLICATION_STATE.SETTINGS_DETECTED}
      siteName="Facebook.com"
    />
  ))
  .add('Settings changed', () => (
    <PopupHeader
      applicationState={APPLICATION_STATE.SETTINGS_CHANGED}
      siteName="Facebook.com"
    />
  ))
  .add('Settings well set', () => (
    <PopupHeader
      applicationState={APPLICATION_STATE.SETTINGS_WELL_SET}
      siteName="Facebook.com"
    />
  ))
  .add('No Concerns', () => (
    <PopupHeader
      applicationState={APPLICATION_STATE.NO_CONCERNS}
      siteName="Facebook.com"
    />
  ));

storiesOf('PopupFooter', module)
  .add('PopupFooter', () => (
    <PopupFooter detailPageUrl="http://some-link" />
  ));


storiesOf('PopupList', module)
  .add('PopupList', () => (
    <PopupList
      title="Some title"
      icon={<IconCogWheel />}
    >
      <PopupListItemButton
        title="Some title"
        description="some description"
        isActive
        deactivateButtonText="Deactivate"
        changeUrl="some-url"
        labels={{ true: 'active', false: 'inactive' }}
      />
      <PopupListItemCheckbox
        title="Some title"
        description="some description"
        checked
        onChange={action('Checkbox changed')}
      />
    </PopupList>
  ))
  .add('PopupList stacked', () => (
    <div>
      <PopupList
        title="List one"
        icon={<IconCogWheel />}
      >
        <PopupListItemButton
          title="Some title"
          description="some description"
          isActive
          deactivateButtonText="Deactivate"
          changeUrl="some-url"
          labels={{ true: 'active', false: 'inactive' }}
        />
      </PopupList>
      <PopupList
        title="List two"
        icon={<IconCogWheel />}
      >
        <PopupListItemCheckbox
          title="Some title"
          description="some description"
          checked
          onChange={action('Checkbox changed')}
        />
      </PopupList>
    </div>
  ));

storiesOf('PopupListItemButton', module)
  .add('PopupListItemButton active', () => (
    <PopupListItemButton
      title="Some title"
      description="some description"
      isActive
      deactivateButtonText="Deactivate"
      changeUrl="some-url"
      labels={{ true: 'active', false: 'inactive' }}
    />
  ))
  .add('PopupListItemButton inactive', () => (
    <PopupListItemButton
      title="Some title"
      description={longTextFixture}
      isActive={false}
      changeUrl="some-url"
      labels={{ true: 'active', false: 'inactive' }}
    />
  ))
  .add('PopupListItemButton long description & narrow container', () => (
    <div style={{ width: '300px' }}>
      <PopupListItemButton
        title="title"
        description={longTextFixture}
        isActive
        deactivateButtonText="Deactivate"
        changeUrl="some-url"
        labels={{ true: 'active', false: 'inactive' }}
      />
    </div>
  ))
  .add('PopupListItemButton long title & narrow container', () => (
    <div style={{ width: '300px' }}>
      <PopupListItemButton
        title={longTextFixture}
        description="some description"
        isActive
        deactivateButtonText="Deactivate"
        changeUrl="some-url"
        labels={{ true: 'active', false: 'inactive' }}
      />
    </div>
  ));

storiesOf('PopupListItemCheckbox', module)
  .add('PopupListItemCheckbox checked', () => (
    <PopupListItemCheckbox
      title="Some title"
      description="some description"
      checked
      disabled={false}
      onChange={action('Checkbox changed')}
    />
  ))
  .add('PopupListItemCheckbox unchecked', () => (
    <PopupListItemCheckbox
      title="Some title"
      description="some description"
      checked={false}
      disabled={false}
      onChange={action('Checkbox changed')}
    />
  ))
  .add('PopupListItemCheckbox disabled', () => (
    <PopupListItemCheckbox
      title="Some title"
      description="some description"
      checked
      disabled
      disabledHelpText="Some help text"
      onChange={action('Checkbox changed')}
    />
  ))
  .add('PopupListItemCheckbox without description', () => (
    <PopupListItemCheckbox
      title="Some title"
      checked
      onChange={action('Checkbox changed')}
    />
  ));
