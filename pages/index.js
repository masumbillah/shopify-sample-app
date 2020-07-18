import { EmptyState, Layout, Page } from '@shopify/polaris';
import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
//import '@shopify/polaris/styles.css';


function Index(){
    return (

        <AppProvider i18n={translations}>
        <Page>
            <Layout>
            <EmptyState
                heading="Manage your inventory transfers"
                action={{content: 'Select products'}}
                secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}
                image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                >
                <p>Select product</p>
                </EmptyState>
            </Layout>
        </Page>
    </AppProvider>
    )
};

export default Index;