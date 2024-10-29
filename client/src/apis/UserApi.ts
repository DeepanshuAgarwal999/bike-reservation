import { AxiosError } from "axios";
import { axiosInstance } from "../lib/axios.instance";
import to from "await-to-js";

type ToAxiosResult<T> = [AxiosError | null, T | null];

export default class UserApi {
  static async logIn(userCredentials: {
    email: string;
    password: string;
  }): Promise<ToAxiosResult<any>> {
    const [error, data] = await to(
      axiosInstance.post("/auth/login", userCredentials)
    );
    return [error as AxiosError | null, data];
  }

  static async register(userCredentials: {
    email: string;
    password: string;
    name: string;
  }): Promise<ToAxiosResult<any>> {
    const [error, data] = await to(
      axiosInstance.post("/auth/register", userCredentials)
    );
    return [error as AxiosError | null, data];
  }

  static async updateUser(userDetails: { isManager: boolean; name: string }) {
    const [error, response] = await to(
      axiosInstance.patch("/user", userDetails)
    );
    return [error as AxiosError | null, response?.data.data];
  }

  static async getAllUsers() {
    const [error, response] = await to(axiosInstance.get("/user"));
    return [error as AxiosError | null, response?.data];
  }
  
  static async deleteUser(id:number) {
    const [error, response] = await to(axiosInstance.delete("/user/"+id));
    console.log(response)
    return [error as AxiosError | null, response?.status];
  }
}
