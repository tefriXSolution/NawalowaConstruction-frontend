export interface RentalItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
    status: 'available' | 'rented' | 'maintenance';
}