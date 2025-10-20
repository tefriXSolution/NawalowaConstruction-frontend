import React, { useState } from 'react';
import { AddRentalItem } from '@/pages/adminPages/productMgtPage/components/Addproduct';
import { RentalInventory } from '@/pages/adminPages/productMgtPage/components/RentalInventory';
import { RentalItem } from "@/types";
import {dummyRentalItems, rentalCategories} from "@/pages/adminPages/productMgtPage/components/dummyData";

export const RentalMgtPage = () => {
    const [rentalItems, setRentalItems] = useState<RentalItem[]>(dummyRentalItems);
    const [refreshInventory, setRefreshInventory] = useState(0);
    const [categories, setCategories] = useState<string[]>(rentalCategories);

    const handleRentalItemAdd = (newItem: Omit<RentalItem, 'id' | 'status'>) => {
        const itemWithId: RentalItem = {
            ...newItem,
            id: Date.now().toString(),
            status: 'available'
        };
        setRentalItems(prev => [...prev, itemWithId]);
        setRefreshInventory(prev => prev + 1); // Trigger refresh
    };

    const handleUpdateRentalItem = (updatedItem: RentalItem) => {
        setRentalItems(prev =>
            prev.map(item => item.id === updatedItem.id ? updatedItem : item)
        );
    };

    const handleDeleteRentalItem = (itemId: string) => {
        setRentalItems(prev => prev.filter(item => item.id !== itemId));
    };

    const handleCategoriesUpdate = (updatedCategories: string[]) => {
        setCategories(updatedCategories);
    };

    return (
        <>
            <AddRentalItem
                onRentalItemAdd={handleRentalItemAdd}
                categories={categories}
                onCategoriesUpdate={handleCategoriesUpdate}
                rentalItems={rentalItems}
            />
            <RentalInventory
                rentalItems={rentalItems}
                onUpdateItem={handleUpdateRentalItem}
                onDeleteItem={handleDeleteRentalItem}
                categories={categories}
                refreshTrigger={refreshInventory}
            />
        </>
    );
};