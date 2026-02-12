import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface BrandInfo {
    craftsmanship: string;
    mission: string;
    values: string;
    story: string;
    heritage: string;
}
export interface Currency {
    currencyCode: string;
    amount: number;
}
export interface Product {
    id: bigint;
    featured: boolean;
    inventory: bigint;
    name: string;
    createdAt: bigint;
    description: string;
    sizes: Array<string>;
    updatedAt: bigint;
    category: string;
    colors: Array<string>;
    price: Currency;
    images: Array<ExternalBlob>;
}
export interface Category {
    name: string;
    description: string;
}
export interface backendInterface {
    addCategory(name: string, description: string): Promise<void>;
    addProduct(name: string, description: string, price: Currency, category: string, images: Array<ExternalBlob>, sizes: Array<string>, colors: Array<string>, inventory: bigint, featured: boolean): Promise<bigint>;
    getAllCategories(): Promise<Array<Category>>;
    getBrandInfo(): Promise<BrandInfo>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
    updateBrandInfo(newInfo: BrandInfo): Promise<void>;
    uploadProductImage(productId: bigint, image: ExternalBlob): Promise<void>;
}
