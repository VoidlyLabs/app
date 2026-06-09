import { BasicAPI } from '@/shared/api/core/basic/basic-api.instance';
import { Configuration_Response } from '@/shared/api/services/configuration/configuration.model';
import { Locale } from '@/shared/lib/i18n/locales';

export class ConfigurationService {
  static get(lang: Locale): Promise<Configuration_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: '/common/configuration',
      params: { lang },
    });
  }
}
