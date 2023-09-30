import { UserResponse } from "@supabase/supabase-js";
import { products } from "./types/Products";
import { StringMappingType } from "typescript";

export interface Users {
  data: UserResponse["data"];
  extra_data: {
    id: string;
    created_at: string;
    user: string;
    name: string;
    super_admin: boolean;
  };
}
export interface Cart {
  id: string;
  created_at: string;
  product: products[];
  how_many: number;
  user: string;
}

export interface Order {
  id: string;
  user: string;
  product: products[];
  created_at: string;
  cancel: boolean;
  payment_confirm: boolean;
  locality: string;
  state: string;
  pincode: string;
  more_info: string;
  city: string;
  region: string;
  phone: string;
  address: string;
  order_id: string;
  name: string;
}
export interface Redux {
  id: string;
  created_at: string;
  user: string;
  Redux: {
    CardReducer: {
      value: products[];
    };
    userSlice: {
      value: {
        name: string;
        address: string;
        locality: string;
        state: string;
        pincode: string;
        more_info: string;
        city: string;
        phone: string;
        id: number;
      }[];
    };
  };
}
