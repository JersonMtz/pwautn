import { ProductBillInterface } from './product.bill.interface';

export interface PurchaseInterface {
    id?:string;
    salesman:string;
    date:string;
    provider?:string;
    tax?:number;
    subTotal?:number;
    products?:ProductBillInterface[];
}