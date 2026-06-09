import { BasicAPI } from '@/shared/api/core/basic/basic-api.instance';
import {
  Category_List_Response,
  Category_Response,
} from '@/shared/api/services/category/category.model';
import { Locale } from '@/shared/lib/i18n/locales';

export class CategoryService {
  static find(lang: Locale): Promise<Category_List_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: '/common/category',
      params: { lang },
    });
  }

  static findById(id: string, lang: Locale): Promise<Category_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: `/common/category/${id}`,
      params: { lang },
    });
  }
}
