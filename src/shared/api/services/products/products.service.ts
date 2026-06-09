import { BasicAPI } from '@/shared/api/core/basic/basic-api.instance';
import {
  Product_List_Response,
  Product_Purchase_Request,
  Product_Purchase_Response,
  Product_Response,
} from '@/shared/api/services/products/products.model';
import { Locale } from '@/shared/lib/i18n/locales';

export class ProductsService {
  static find(lang: Locale): Promise<Product_List_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: '/common/products',
      params: { lang },
    });
  }

  static findByCategoryId(
    categoryId: string,
    lang: Locale,
  ): Promise<Product_List_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: `/common/products/category/${categoryId}`,
      params: { lang },
    });
  }

  static findById(id: string, lang: Locale): Promise<Product_Response> {
    return BasicAPI.request({
      method: 'GET',
      url: `/common/products/${id}`,
      params: { lang },
    });
  }

  static purchase(
    data: Product_Purchase_Request,
    lang: Locale,
  ): Promise<Product_Purchase_Response> {
    return BasicAPI.request({
      method: 'POST',
      url: '/common/products/purchase',
      data,
      params: { lang },
    });
  }
}
