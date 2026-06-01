import { BasicAPI } from '@/shared/api/core/basic/basic-api.instance';
import {
  Category_List_Response,
  Category_Response,
} from '@/shared/api/services/category/category.model';

export class CategoryService {
  static find(): Promise<Category_List_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: '/common/category',
    });
  }

  static findById(id: string): Promise<Category_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: `/common/category/${id}`,
    });
  }
}
