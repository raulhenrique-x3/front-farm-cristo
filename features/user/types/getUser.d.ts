export interface IUser {
  name: string;
  birthDate: string;
  cpf: string;
  type: "eldery" | "donor";
}

export interface IGetAllUsersResponse {
  users: IUser[];
}
