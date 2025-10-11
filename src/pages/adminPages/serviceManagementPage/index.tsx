import React from 'react';
import {AddNewService} from './components/AddNewService';
import {AddNewServiceCategory} from './components/AddNewServiceCategory';
import { serviceManagementPageStyles } from '@/styles/serviceManagementPageStyle';

export const ServiceManagementPage = () => {
    return (
        <div style={serviceManagementPageStyles.pageContainer}>
            <h1 style={serviceManagementPageStyles.mainHeading}>Service Management</h1>
            <div style={serviceManagementPageStyles.contentContainer}>
                <div style={serviceManagementPageStyles.addNewServiceWrapper}>
                    <AddNewService />
                </div>
                <div style={serviceManagementPageStyles.addNewCategoryWrapper}>
                    <AddNewServiceCategory
                        onCancel={() => {}}
                        onAddCategory={() => {}}
                    />
                </div>
            </div>
        </div>
    );
};