import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import withData from '../lib/withData';
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <Page>
      <Component {...pageProps} />
    </Page>
  </ApolloProvider>
);

// If any of the pages have a getInitialProps method on them, (which they will because withData is adding it to them) then go fetch it
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
  apollo: PropTypes.any,
};
