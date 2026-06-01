import { BasicAPIResponse } from '@/shared/api/core/basic/basic.models';
import { BasicClient } from '@/shared/api/services/clients/clients.model';
import { AxiosResponse } from 'axios';

export interface Auth_SignIn_Request {
  username: string;
  password: string;
}

export type Auth_SignIn_Response = AxiosResponse<
  BasicAPIResponse<{
    client: BasicClient;
  }>
>;

export type Auth_Me_Response = Auth_SignIn_Response;

export type Auth_SignOut_Response = AxiosResponse<
  BasicAPIResponse<Record<string, never>>
>;
