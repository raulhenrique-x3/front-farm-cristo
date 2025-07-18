export interface IUser {
  id: number;
  name: string;
  birthDate: string;
  cpf: string;
  type: "elderly" | "donor";
}
