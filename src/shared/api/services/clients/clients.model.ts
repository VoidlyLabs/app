import { BasicAPIResponse } from '@/shared/api/core/basic/basic.models';
import { AxiosResponse } from 'axios';

export interface BasicClient {
  id: string;
  username: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Client_Create_Request {
  username: string;
  password: string;
  balance?: number;
}

export interface Client_Update_Request {
  id: string;
  username: string;
  balance?: number;
}

export type Clients_Response = AxiosResponse<BasicAPIResponse<BasicClient[]>>;
export type Client_Response = AxiosResponse<BasicAPIResponse<BasicClient>>;
export type Client_Delete_Response = AxiosResponse<
  BasicAPIResponse<{
    deleted: boolean;
  }>
>;
