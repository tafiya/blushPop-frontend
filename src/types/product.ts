export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }
  export type TCategory = {
    slug: string;
    name: string;
    url: string;
  };
  export interface Dimensions {
    width: number;
    height: number;
    depth: number;
  }
  
  export interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  }

  
 export interface ProductTabsProps {
    description?: string;
    brand?: string;
    size?: string;
    sku: string;
    weight: string;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    returnPolicy: string;
    minimumOrderQuantity: string;
    category: string;
    dimensions: Dimensions;
    stock: number;
    rating: number;
    reviews?: Review[];
  }
  export interface Product {
    id?: number;
    title?: string;
    description?: string;
    category?: string;
    price?: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    tags?: string[];
    brand?: string;
    sku?: string;
    weight?: number;
    dimensions?: Dimensions;
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    reviews?: Review[];
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    meta?: Meta;
    images?: string[];
    thumbnail?: string;
  }
  