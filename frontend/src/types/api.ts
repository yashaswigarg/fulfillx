export interface Product {
    id: number;
    name: string;
    description: string | null;
    sku: string;
    price: number;
    category: string;
    stockQuantity: number;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductPage {
    content: Product[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
    number: number;
}

export interface CartItem {
    id: number;
    productId: number;
    productName: string;
    sku: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
}

export interface Cart {
    id: number;
    items: CartItem[];
    totalAmount: number;
}

export interface AuthResponse {
    accessToken: string;
    tokenType: string;
    userId: number;
    email: string;
    role: string;
}

export interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    sku: string;
    unitPrice: number;
    quantity: number;
    subtotal: number;
}

export interface Order {
    id: number;
    status: string;
    totalAmount: number;
    items: OrderItem[];
    fulfillmentStatus?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderPage {
    content: Order[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
    number: number;
}