export interface RentalItem {
    _id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
    status: 'available' | 'rented' | 'maintenance';
}