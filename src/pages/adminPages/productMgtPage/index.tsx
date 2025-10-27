import React, { useEffect, useState } from 'react';
import { AddRentalItem } from '@/pages/adminPages/productMgtPage/components/Addproduct';
import { RentalInventory } from '@/pages/adminPages/productMgtPage/components/RentalInventory';
import { RentalItem } from "@/types";
import {apiClient, apiFileClient} from "@/api/apis.config";
import {LoaderComponent} from "@/components";

export const RentalMgtPage = () => {
    const [rentalItems, setRentalItems] = useState<RentalItem[]>([]);
    const [refreshInventory, setRefreshInventory] = useState(0);
    const [refreshCategory, setRefreshCategory] = useState<boolean>(false);
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
                await apiClient.post('/rent-items/create-category', {
                    category: category,
                });
            } else {
                await apiClient.delete('/rent-items/delete-category', {
                    data: { category: category },
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setRefreshCategory(!refreshCategory)
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
            const names = data?.map((c:{category:string}) => c.category) ?? [];
            setCategories(names);
        });
    }, []);

    useEffect(() => {
        fetchRentalItems().then(data => setRentalItems(data ?? []));
        fetchRentalCategories().then(data => {
            const names = data?.map((c:{category:string}) => c.category) ?? [];
            setCategories(names);
        });
    }, [refreshCategory]);

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

            images.forEach((image) => {
                formData.append("images", image);
            });

            setLoading(true);

            const response = await apiFileClient.post(
                "/rent-items/create-rent-item",
                formData
            );
            setLoading(false);

            if (!response.data.error) {
                const data = await fetchRentalItems();
                setRentalItems(data ?? []);
            } else {
                console.error("Failed to add rental item:", response.data.message);
                alert(`Failed to add rental item: ${response.data.message}`);
            }
        } catch (err) {
            console.error("Error adding rental item:", err || err);
            alert("Error adding rental item. Please try again.");
        }
    };


    const handleUpdateRentalItem = async (isStatus:boolean = false, updatedItem: RentalItem, newImages?: File[]) => {
        if(isStatus) {
            try{
                const statusCode =
                    updatedItem.status === "available" ? 1 :
                        updatedItem.status === "maintenance" ? 2 :
                            updatedItem.status === "rented" ? 3 :
                                0;
                setLoading(true);
                await apiClient.put(
                    `/rent-items/update-rent-item-status`,{
                        itemId:updatedItem._id,
                        status:statusCode,
                    });
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false);
                setRefreshCategory(!refreshCategory);
            }
            return
        }
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
                formData);

            if (!response.data.error) {
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
        } catch {
            console.error("Error updating rental item:");
            alert("Error updating rental item. Please try again.");
        }
    };


    const handleDeleteRentalItem = async(itemId: string) => {
        try{
            setLoading(true);
            const response = await apiClient.delete('/rent-items/delete-rent-item', {
                data: { itemId: itemId },
            });
            if (!response.data.error) {
                setRentalItems(prev => prev.filter(item => item._id !== itemId));
            }
            setLoading(false);
        }catch(err) {
            console.error("Error deleting rental item:", err);
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <LoaderComponent />
            ) : (
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
            )}
        </>
    );

};