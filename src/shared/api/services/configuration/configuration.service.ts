import { BasicAPI } from '@/shared/api/core/basic/basic-api.instance';
import { Configuration_Response } from '@/shared/api/services/configuration/configuration.model';

export class ConfigurationService {
  static get(): Promise<Configuration_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: '/common/configuration',
    });
  }
}
