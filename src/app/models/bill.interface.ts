import { ProductInterface } from './product.interface';

export interface BillInterface {
    id?:string;
    user:string;
    date:string;
    warehouse?:string;
    provider?:string;
    client?:string;
    tax?:number;
    subTotal?:number;
    products?:ProductInterface[];
}