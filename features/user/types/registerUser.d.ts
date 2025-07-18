export interface IRegisterUserPayload {
  name: string;
  birthDate: string;
  cpf: string;
  type: "elderly" | "donor";
}

export interface IRegisterUserResponse {
  id: string;
  name: string;
  birthDate: string;
  cpf: string;
  type: "elderly" | "donor";
}
