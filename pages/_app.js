import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page';

const MyApp = ({ Component, pageProps }) => (
  <Page>
    <Component {...pageProps} />
  </Page>
);

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};
