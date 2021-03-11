import { ProductInterface } from './product.interface';

export interface BillInterface {
    id?: string;
    user?: string;
    date?: number;
    status?: boolean;
    warehouse?: string;
    provider?: string;
    client?: string;
    tax?: number;
    subTotal?: number;
    products?: ProductInterface[];
}