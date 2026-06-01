import { BasicAPI } from '@/shared/api/core/basic/basic-api.instance';
import {
  Client_Create_Request,
  Client_Delete_Response,
  Client_Response,
  Client_Update_Request,
  Clients_Response,
} from '@/shared/api/services/clients/clients.model';

export class ClientsService {
  static find(): Promise<Clients_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: '/common/clients',
    });
  }

  static findById(id: string): Promise<Client_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: `/common/clients/${id}`,
    });
  }

  static create(data: Client_Create_Request): Promise<Client_Response> {
    return BasicAPI.request({
      method: 'POST',
      url: '/common/clients',
      data,
    });
  }

  static update(data: Client_Update_Request): Promise<Client_Response> {
    const { id, ...body } = data;

    return BasicAPI.request({
      method: 'PATCH',
      url: `/common/clients/${id}`,
      data: body,
    });
  }

  static deleteById(id: string): Promise<Client_Delete_Response> {
    return BasicAPI.request({
      method: 'DELETE',
      url: `/common/clients/${id}`,
    });
  }
}
