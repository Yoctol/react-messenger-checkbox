# React Messenger Checkbox

> React component for messenger checkbox plugin

[![npm](https://img.shields.io/npm/v/react-messenger-checkbox.svg?style=flat-square)](https://www.npmjs.com/package/react-messenger-checkbox)
[![Build Status](https://travis-ci.org/Yoctol/react-messenger-checkbox.svg?branch=master)](https://travis-ci.org/Yoctol/react-messenger-checkbox)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Screenshot

![](https://user-images.githubusercontent.com/3382565/37448447-59db4a8a-2861-11e8-8be2-9f57d24e32f0.png)

## Prerequisite

Whitelist your domain to connect your Facebook Page to your website via the
Facebook tool.

* From UI: Facebook Page Settings > Messenger Platform > Whitelisted Domains
* From API: Use HTTP API or API client likes
  [messaging-api-messenger](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger#setwhitelisteddomainsdomains)

## Installation

```sh
npm install react-messenger-checkbox
```

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import MessengerCheckbox from 'react-messenger-checkbox';

ReactDOM.render(
  <div>
    <MessengerCheckbox
      pageId="<PAGE_ID>"
      appId="<APP_ID>"
      origin="<ORIGIN>"
      userRef="<USER_REF>"
    />,
    <input type="button" onClick={global.confirmOptIn} value="Confirm Opt-in" />
  </div>
  document.getElementById('demo')
);
```

> Note: It will handle sdk initialize automatically for you. See more details in
> [fbsdk official docs](https://developers.facebook.com/docs/javascript/quickstart/).

## Props

```js
static propTypes = {
  pageId: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  userRef: PropTypes.string.isRequired,

  prechecked: PropTypes.bool,
  allowLogin: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'standard', 'xlarge']),
  skin: PropTypes.oneOf(['light', 'dark']),
  centerAlign: PropTypes.bool,
  autoLogAppEvents: PropTypes.bool,
  xfbml: PropTypes.bool,
  version: PropTypes.string,
  language: PropTypes.string,
  debug: PropTypes.bool,
  onEvent: PropTypes.func,
};

static defaultProps = {
  prechecked: true,
  allowLogin: true,
  size: 'large',
  skin: 'light',
  centerAlign: false,
  autoLogAppEvents: true,
  xfbml: true,
  version: '2.11',
  language: 'en_US',
  debug: false,
  onEvent: () => {},
};
```

## Related

* [react-messenger-customer-chat](https://github.com/Yoctol/react-messenger-customer-chat) - React component for messenger customer chat plugin.
* [messaging-api-messenger](https://github.com/Yoctol/messaging-apis/tree/master/packages/messaging-api-messenger) - Messaging APIs for Messenger.
* [bottender](https://github.com/Yoctol/bottender) - Make Bots in Your Way, Fast and Flexibly.

## License

MIT © [Yoctol](https://github.com/Yoctol/react-messenger-checkbox)
