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