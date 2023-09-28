import {createOne} from '../controllers/generalController'
import { Delivery } from '../models/deliveryModel'

export const createDelivery = () => {
  createOne(Delivery);
}