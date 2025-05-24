import { Admin } from "../../entities/Admin";

export interface IAdminRepository{
    fetchAdmin(email:string,password:string):Promise<Admin>
}