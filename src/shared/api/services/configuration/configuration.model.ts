import { BasicAPIResponse } from '@/shared/api/core/basic/basic.models';
import { AxiosResponse } from 'axios';

export interface BasicConfiguration {
  name: string;
  description: string;
  logoUrl: string;
  accentColor: string;
  backgroundColor: string;
  secondaryColor: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type Configuration_Response = AxiosResponse<
  BasicAPIResponse<BasicConfiguration>
>;
