import { Color } from "../utils/constant.utils";

export interface IconThumb {
  iconName: string;
  color: Color;
}

export interface Goal {
  id?: string;
  name: string;
  endDate?: number;
  iconThumb: IconThumb;
}