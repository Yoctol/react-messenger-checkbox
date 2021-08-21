import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import React from 'react';

import MessengerCheckbox from '../MessengerCheckbox';

Enzyme.configure({ adapter: new Adapter() });

beforeEach(() => {
  MessengerCheckbox.prototype.loadSdkAsynchronously = jest.fn();
});

describe('<MessengerCheckbox />', () => {
  it('render page_id to DOM element', () => {
    const wrapper = mount(
      <MessengerCheckbox
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        origin="<ORIGIN>"
        userRef="<USER_REF>"
      />
    );
    expect(
      wrapper.render().find('.fb-messenger-checkbox').prop('page_id')
    ).toBe('<PAGE_ID>');
  });

  it('render origin to DOM element', () => {
    const wrapper = mount(
      <MessengerCheckbox
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        origin="<ORIGIN>"
        userRef="<USER_REF>"
      />
    );
    expect(wrapper.render().find('.fb-messenger-checkbox').prop('origin')).toBe(
      '<ORIGIN>'
    );
  });

  it('render messenger_app_id to DOM element', () => {
    const wrapper = mount(
      <MessengerCheckbox
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        origin="<ORIGIN>"
        userRef="<USER_REF>"
      />
    );
    expect(
      wrapper.render().find('.fb-messenger-checkbox').prop('messenger_app_id')
    ).toBe('<APP_ID>');
  });

  it('render user_ref to DOM element', () => {
    const wrapper = mount(
      <MessengerCheckbox
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        origin="<ORIGIN>"
        userRef="<USER_REF>"
      />
    );
    expect(
      wrapper.render().find('.fb-messenger-checkbox').prop('user_ref')
    ).toBe('<USER_REF>');
  });

  it('render prechecked, allow_login, size, skin and center_align to DOM element', () => {
    const wrapper = mount(
      <MessengerCheckbox
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        origin="<ORIGIN>"
        userRef="<USER_REF>"
        prechecked={false}
        allowLogin={false}
        size="small"
        skin="dark"
        centerAlign
      />
    );

    const checkbox = wrapper.render().find('.fb-messenger-checkbox');

    expect(checkbox.prop('prechecked')).toBe('false');
    expect(checkbox.prop('allow_login')).toBe('false');
    expect(checkbox.prop('size')).toBe('small');
    expect(checkbox.prop('skin')).toBe('dark');
    expect(checkbox.prop('center_align')).toBe('true');
  });

  it('define fbAsyncInit and call loadSdkAsynchronously when facebook-jssdk does not exist', () => {
    mount(
      <MessengerCheckbox
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        origin="<ORIGIN>"
        userRef="<USER_REF>"
      />
    );

    expect(global.fbAsyncInit).toBeDefined();
    expect(MessengerCheckbox.prototype.loadSdkAsynchronously).toBeCalled();
  });

  it('should not call loadSdkAsynchronously when facebook-jssdk exists', () => {
    const div = global.document.createElement('div');
    div.id = 'facebook-jssdk';
    global.document.body.appendChild(div);

    mount(
      <MessengerCheckbox
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        origin="<ORIGIN>"
        userRef="<USER_REF>"
      />
    );

    expect(MessengerCheckbox.prototype.loadSdkAsynchronously).not.toBeCalled();
  });

  it('define fbAsyncInit and call loadSdkAsynchronously when facebook-jssdk does not exist', () => {
    global.FB = {
      init: jest.fn(),
      Event: {
        subscribe: jest.fn(),
      },
    };

    mount(
      <MessengerCheckbox
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        origin="<ORIGIN>"
        userRef="<USER_REF>"
        autoLogAppEvents
        xfbml
        version="2.11"
      />
    );

    global.fbAsyncInit();

    expect(global.FB.init).toBeCalledWith({
      appId: '<APP_ID>',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.11',
    });
  });

  it('subscribe messenger_checkbox event with onEvent handler', () => {
    global.FB = {
      init: jest.fn(),
      Event: {
        subscribe: jest.fn(),
      },
      AppEvents: {
        logEvent: jest.fn(),
      },
    };

    const onEvent = () => {};

    mount(
      <MessengerCheckbox
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        origin="<ORIGIN>"
        userRef="<USER_REF>"
        autoLogAppEvents
        xfbml
        version="2.11"
        onEvent={onEvent}
      />
    );

    global.fbAsyncInit();

    expect(global.FB.Event.subscribe).toBeCalledWith(
      'messenger_checkbox',
      expect.any(Function)
    );
  });

  it('attach #confirmOptIn function to global', () => {
    global.FB = {
      init: jest.fn(),
      Event: {
        subscribe: jest.fn(),
      },
      AppEvents: {
        logEvent: jest.fn(),
      },
    };

    mount(
      <MessengerCheckbox
        pageId="<PAGE_ID>"
        appId="<APP_ID>"
        origin="<ORIGIN>"
        userRef="<USER_REF>"
        autoLogAppEvents
        xfbml
        version="2.11"
      />
    );

    global.fbAsyncInit();

    expect(global.confirmOptIn).toBeDefined();
    expect(typeof global.confirmOptIn).toBe('function');

    global.confirmOptIn('<REF>');

    expect(global.FB.AppEvents.logEvent).toBeCalledWith(
      'MessengerCheckboxUserConfirmation',
      null,
      {
        app_id: '<APP_ID>',
        page_id: '<PAGE_ID>',
        ref: '<REF>',
        user_ref: '<USER_REF>',
      }
    );
  });
});
