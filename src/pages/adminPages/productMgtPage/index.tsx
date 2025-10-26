import React, { useEffect, useState } from 'react';
import { AddRentalItem } from '@/pages/adminPages/productMgtPage/components/Addproduct';
import { RentalInventory } from '@/pages/adminPages/productMgtPage/components/RentalInventory';
import { RentalItem } from "@/types";
import {apiClient, apiFileClient} from "@/api/apis.config";

export const RentalMgtPage = () => {
    const [rentalItems, setRentalItems] = useState<RentalItem[]>([]);
    const [refreshInventory, setRefreshInventory] = useState(0);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchRentalCategories = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/rent-items/categories');
            if (response.data.error === false) {
                return response.data.data;
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const onClickOnCategoriesUpdate = async (isDelete: boolean, category: string) => {
        try {
            setLoading(true);
            if (!isDelete) {
                const response = await apiClient.post('/rent-items/create-category', {
                    category: category,
                });
                if (response.data.error === false) {
                    await fetchRentalCategories();
                }
            } else {
                const response = await apiClient.delete('/rent-items/delete-category', {
                    data: { name: category },
                });
                if (response.data.error === false) {
                    await fetchRentalCategories();
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRentalItems = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/rent-items');
            if (response.data.error === false) {
                console.log(response.data.data);
                return response.data.data;
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRentalItems().then(data => setRentalItems(data ?? []));
        fetchRentalCategories().then(data => {
            const names = data?.map((c: any) => c.category) ?? [];
            setCategories(names);
        });
    }, []);

    // Updated to handle array of File objects
    const handleRentalItemAdd = async (
        newItem: Omit<RentalItem, 'id' | 'status' | 'images'>,
        images: File[]
    ) => {
        try {
            const formData = new FormData();
            formData.append("name", newItem.name);
            formData.append("description", newItem.description || "");
            formData.append("price", newItem.price.toString());
            formData.append("availability", newItem.stock.toString());
            formData.append("category", newItem.category);

            // ✅ Append all files under the same key 'images'
            images.forEach((image) => {
                formData.append("images", image);
            });

            const response = await apiFileClient.post(
                "/rent-items/create-rent-item",
                formData
            );

            console.log("API Response:", response);

            if (!response.data.error) {
                const data = await fetchRentalItems();
                setRentalItems(data ?? []);
            } else {
                console.error("Failed to add rental item:", response.data.message);
                alert(`Failed to add rental item: ${response.data.message}`);
            }
        } catch (err: any) {
            console.error("Error adding rental item:", err || err);
            alert("Error adding rental item. Please try again.");
        }
    };


    const handleUpdateRentalItem = async (updatedItem: RentalItem, newImages?: File[]) => {
        try {
            const formData = new FormData();
            formData.append("name", updatedItem.name);
            formData.append("description", updatedItem.description || "");
            formData.append("price", updatedItem.price.toString());
            formData.append("availability", String(updatedItem.stock));
            formData.append("category", updatedItem.category);

            // Only append new images if provided
            if (newImages && newImages.length > 0) {
                newImages.forEach((image) => {
                    formData.append("images", image);
                });
            }

            // Send PUT or PATCH request to backend
            const response = await apiFileClient.put(
                `/rent-items/update/${updatedItem._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (!response.data.error) {
                // ✅ Update frontend state after successful backend update
                setRentalItems((prev) =>
                    prev.map((item) =>
                        item._id === updatedItem._id ? response.data.data : item
                    )
                );

                alert("Rental item updated successfully!");
            } else {
                console.error("Failed to update rental item:", response.data.message);
                alert(`Failed to update rental item: ${response.data.message}`);
            }
        } catch (err: any) {
            console.error("Error updating rental item:", err.message || err);
            alert("Error updating rental item. Please try again.");
        }
    };


    const handleDeleteRentalItem = (itemId: string) => {
        setRentalItems(prev => prev.filter(item => item._id !== itemId));
    };

    // console.log(categories);
    // console.log(rentalItems);

    return (
        <>
            <AddRentalItem
                onRentalItemAdd={handleRentalItemAdd}
                categories={categories}
                onCategoriesUpdate={onClickOnCategoriesUpdate}
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