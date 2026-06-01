import { BasicAPIResponse } from '@/shared/api/core/basic/basic.models';
import { AxiosResponse } from 'axios';

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type Product_Response = AxiosResponse<BasicAPIResponse<Product>>;
export type Product_List_Response = AxiosResponse<BasicAPIResponse<Product[]>>;
