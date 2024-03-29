import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MessengerCheckbox extends Component {
  componentDidMount() {
    if (document.getElementById('facebook-jssdk')) {
      return;
    }
    this.setFbAsyncInit();
    this.loadSdkAsynchronously();
  }

  setFbAsyncInit() {
    const {
      appId,
      pageId,
      autoLogAppEvents,
      xfbml,
      version,
      onEvent,
      userRef,
    } = this.props;
    window.fbAsyncInit = () => {
      window.FB.init({
        appId,
        autoLogAppEvents,
        xfbml,
        version: `v${version}`,
      });

      window.FB.Event.subscribe('messenger_checkbox', onEvent);

      window.confirmOptIn = function confirmOptIn(ref) {
        window.FB.AppEvents.logEvent(
          'MessengerCheckboxUserConfirmation',
          null,
          {
            app_id: appId,
            page_id: pageId,
            ref,
            user_ref: userRef,
          }
        );
      };
    };
  }

  loadSdkAsynchronously() {
    const { language, debug } = this.props;
    /* eslint-disable */
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/${language}/sdk${
        debug ? '/debug' : ''
      }.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    /* eslint-enable */
  }

  createMarkup() {
    const {
      appId,
      pageId,
      origin,
      userRef,
      prechecked,
      allowLogin,
      size,
      skin,
      centerAlign,
    } = this.props;

    return {
      __html: `<div class="fb-messenger-checkbox"
        origin="${origin}"
        page_id="${pageId}"
        messenger_app_id="${appId}"
        user_ref="${userRef}"
        prechecked="${prechecked}"
        allow_login="${allowLogin}"
        size="${size}"
        skin="${skin}"
        center_align="${centerAlign}"
      ></div>`,
    };
  }

  render() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }
}

MessengerCheckbox.propTypes = {
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

MessengerCheckbox.defaultProps = {
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
