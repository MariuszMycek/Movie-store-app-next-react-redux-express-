import React from 'react';
import { Provider } from 'react-redux';
import { object, bool } from 'prop-types';
import configureStore from '../utils/store';

/**
 * Hoc to connect a nextjs page to redux store
 * @param {React.Component} Child
 * @param {(initialProps, store) => Promise} fetchBefore
 *
 */

const Page = (Child, fetchBefore) => {
  class PageWrapper extends React.Component {
    static async getInitialProps(initProps) {
      const isServer = !!initProps.req;
      const reduxStore = configureStore(isServer);
      const { store } = reduxStore;
      let propsToBeInject;
      if (fetchBefore) {
        propsToBeInject = await fetchBefore(initProps, store);
      }
      return { initialState: store.getState(), isServer, ...propsToBeInject };
    }

    constructor(props) {
      super(props);
      const reduxStore = configureStore(props.isServer, props.initialState);
      this.store = reduxStore.store;
    }

    render() {
      return (
        <Provider store={this.store}>
          <Child {...this.props} />
        </Provider>
      );
    }
  }
  PageWrapper.propTypes = {
    initialState: object,
    isServer: bool
  };
  return PageWrapper;
};

export default Page;
