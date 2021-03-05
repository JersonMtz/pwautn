interface Photo {
    path:string,
    url:string
}

export interface ProductInterface {
    id?:string;
    code?:string;
    name?:string;
    amount?:number;
    cost?:number;
    price?:number;
    stock?:number;
    status?:boolean;
    category?:any;
    description?:string;
    total?:number;
    photo?:Photo,
    error?:boolean;
}


