import { DeliveryType } from '../enums/deliveryType.enum';

export interface Course {
  id: string;
  name: string;
  productId?: string;
  defaultDeliveryType: DeliveryType;
}
