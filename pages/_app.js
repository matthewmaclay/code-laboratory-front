import { Provider as ReduxProvider } from 'react-redux';
import { Provider as BumbagProvider, css } from 'bumbag';
import { ApolloProvider } from '@apollo/client';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { useApollo } from 'lib/apolloClient';
import store from 'store/store';
import PageWithHeader from 'components/layout/withHeader';

const theme = {
  global: {
    styles: {
      base: css`
        .demo-editor {
          padding: 0 20px;
        }
        .bb-Button > a {
          color: inherit;
          font-size: inherit;
          text-decoration: none;
        }
      `,
    },
  },
};

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store={store}>
        <BumbagProvider theme={theme}>
          <PageWithHeader>
            <Component {...pageProps} />
          </PageWithHeader>
        </BumbagProvider>
      </ReduxProvider>
    </ApolloProvider>
  );
}

/*

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
*/
