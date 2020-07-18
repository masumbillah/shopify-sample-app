import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
//import { Provider } from '@shopify/app-bridge-react'
//import '@shopify/polaris/styles.css';
import translations from '@shopify/polaris/locales/en.json';


class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <React.Fragment>
                <link rel="stylesheet" href="https://unpkg.com/@shopify/polaris@5.0.0-alpha.2/dist/styles.css"/>
                <Head>
                    <title>Sample App</title>
                    <meta charSet="utf-8" />
                </Head>
                <AppProvider i18n={translations}>
                    <ApolloProvider client={client}>
                        <Component {...pageProps} />
                    </ApolloProvider>
                </AppProvider>
            </React.Fragment>
        );
    }
}

export default MyApp;