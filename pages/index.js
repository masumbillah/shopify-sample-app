import React, { useState } from 'react';
import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import PropductList from '../components/ProductList';

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";
const store = require("store-js");

function Index(){

    const [modal, setModal] = useState({open:false});
    const isEmptyState = !store.get('ids');

   const handleSelection = (resources) =>{
        const selection = resources && resources.selection? resources.selection:[];
        const productIds = selection.map(product=> { return product.id });
        setModal({open: false});
        store.set("ids", productIds);
    };
    
    return (
        <Page>
                 <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={modal.open}
          onSelection={(resources) => handleSelection(resources)}
          onCancel={() => setModal({ open: false })}
        />
            <Layout>
                {
                    isEmptyState? 
                    <EmptyState
                        heading="Manage your inventory transfers"
                        action={{
                            content: 'Select products',
                            onAction: () => setModal({ open: true }),
                        }}
                        secondaryAction={{url: 'https://help.shopify.com'}}
                        image = {img}
                        >
                    </EmptyState> : <PropductList/>
                }

            
            </Layout>
        </Page>
    )
};

export default Index;