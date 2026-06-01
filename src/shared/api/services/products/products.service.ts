import { BasicAPI } from '@/shared/api/core/basic/basic-api.instance';
import {
  Product_List_Response,
  Product_Response,
} from '@/shared/api/services/products/products.model';

export class ProductsService {
  static find(): Promise<Product_List_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: '/common/products',
    });
  }

  static findByCategoryId(categoryId: string): Promise<Product_List_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: `/common/products/category/${categoryId}`,
    });
  }

  static findById(id: string): Promise<Product_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: `/common/products/${id}`,
    });
  }
}
