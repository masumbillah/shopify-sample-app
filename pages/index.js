import React, { useState } from 'react';
import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

function Index(){

    const [modal, setModal] = useState({open:false});

    return (
        <Page>
                 <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={modal.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => setModal({ open: false })}
        />
            <Layout>
            <EmptyState
                heading="Manage your inventory transfers"
                action={{
                    content: 'Select products',
                    onAction: () => setModal({ open: true }),
                }}
                secondaryAction={{url: 'https://help.shopify.com'}}
                image = {img}
                >
                </EmptyState>
            </Layout>
        </Page>
    )
};

export default Index;