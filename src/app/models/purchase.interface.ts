import { ProductInterface } from './product.interface';
export interface PurchaseInterface {
    id?:string;
    client?:string;
    date:string;
    user:string;
    total:number;
    products?:ProductInterface[];
} 