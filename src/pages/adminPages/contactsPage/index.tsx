import React from 'react';
import { serviceManagementPageStyles } from '@/styles/serviceManagementPageStyle';
import { ManageContacts } from './components/ManageContacts';

export const ManageContactsPage: React.FC = () => {
    return (
        <div style={serviceManagementPageStyles.pageContainer}>
            
            <div style={serviceManagementPageStyles.contentContainer}>
                <div style={serviceManagementPageStyles.addNewServiceWrapper}>
                    <ManageContacts />
                </div>
                <div style={serviceManagementPageStyles.addNewCategoryWrapper}>
                </div>
            </div>
        </div>
    );
};


