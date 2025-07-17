export interface IRegisterUserPayload {
  name: string;
  birthDate: string;
  cpf: string;
  type: "eldery" | "donor";
}

export interface IRegisterUserResponse {
  id: string;
  name: string;
  birthDate: string;
  cpf: string;
  type: "eldery" | "donor";
}
