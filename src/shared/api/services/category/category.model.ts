import { BasicAPIResponse } from '@/shared/api/core/basic/basic.models';
import { AxiosResponse } from 'axios';

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type Category_Response = AxiosResponse<BasicAPIResponse<Category>>;
export type Category_List_Response = AxiosResponse<
  BasicAPIResponse<Category[]>
>;
