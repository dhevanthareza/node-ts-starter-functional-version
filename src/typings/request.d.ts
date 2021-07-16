import { Request } from "express"
import Role from "../modules/management/role/role.model"
import User from "../modules/management/user/user.model"
export interface AppRequest extends Request {
  query: any;
  user: User;
  role: Role;
  swaggerDoc: any;
}
