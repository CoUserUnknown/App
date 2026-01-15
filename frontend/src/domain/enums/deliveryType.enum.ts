export enum DeliveryType { 
  TRAINER_LED = 'TRAINER_LED',
  SELF_GUIDED = 'SELF_GUIDED'
};

export interface Course {
  id: string;
  name: string;
  defaultDeliveryType: DeliveryType;
}
