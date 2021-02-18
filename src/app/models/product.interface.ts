export interface ProductInterface {
    id?:string;
    code?:string;
    name:string;
    cost:number;
    price:number;
    stock:number;
    status:boolean;
    category:string;
    description?:string;
    photo?:string;
}