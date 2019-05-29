import { NAME, PRICE, DESCRIPTION, QUANTITY, PICTURE, BARCODE } from '../constants';

export function create_json(product_info, id) {
   console.log("PRODUCT_INFO :", product_info);
   const product = {
      [NAME]: product_info.name,
      [PRICE]: product_info.price,
      [QUANTITY]: product_info.detail,
      [BARCODE]: id,
      [DESCRIPTION]: product_info.description,
      [PICTURE]: ""
   }

   return JSON.stringify(product);
}