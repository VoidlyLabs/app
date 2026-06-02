import { BasicAPI } from '@/shared/api/core/basic/basic-api.instance';
import {
  Auth_Me_Response,
  Auth_SignIn_Request,
  Auth_SignIn_Response,
  Auth_SignUp_Request,
  Auth_SignUp_Response,
  Auth_SignOut_Response,
} from '@/shared/api/services/auth/auth.model';

export class AuthService {
  static signIn(data: Auth_SignIn_Request): Promise<Auth_SignIn_Response> {
    return BasicAPI.request({
      method: 'POST',
      url: '/common/auth/sign-in',
      data,
    });
  }

  static signUp(data: Auth_SignUp_Request): Promise<Auth_SignUp_Response> {
    return BasicAPI.request({
      method: 'POST',
      url: '/common/auth/sign-up',
      data,
    });
  }

  static getMe(): Promise<Auth_Me_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: '/common/auth/me',
    });
  }

  static signOut(): Promise<Auth_SignOut_Response> {
    return BasicAPI.request({
      method: 'POST',
      url: '/common/auth/sign-out',
    });
  }
}
