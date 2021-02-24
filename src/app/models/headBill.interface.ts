import { ProductInterface } from './product.interface';

export interface HeadBillInterface {
    id?:string;
    salesman:string;
    date:string;
    warehouse?:string;
    provider?:string;
    tax?:number;
    subTotal?:number;
    products?:ProductInterface[];
}