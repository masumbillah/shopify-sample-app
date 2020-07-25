import App from 'next/app';
import Head from 'next/head';
import '@shopify/polaris/styles.css';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import translations from '@shopify/polaris/locales/en.json';
import Cookies from 'js-cookie';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'

// const dotenv = require('dotenv');
// const { SHOPIFY_API_KEY } = process.env;

const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include'
    }
});

class MyApp extends App {
    render() {
        
        const { Component, pageProps } = this.props;
        const config = {apiKey: API_KEY, shopOrigin: Cookies.get('shopOrigin'), forceRedirect: true};

        return (
            <React.Fragment>
                <Head>
                    <title>Sample App</title>
                    <meta charSet="utf-8" />
                </Head>
                <Provider config={config}>
                    <AppProvider i18n={translations}>
                        <ApolloProvider client={client}>
                        <ApolloHooksProvider client={client}>
                            <Component {...pageProps} />
                        </ApolloHooksProvider>
                        </ApolloProvider>
                    </AppProvider>
                </Provider>
            </React.Fragment>
        );
    }
}

export default MyApp;