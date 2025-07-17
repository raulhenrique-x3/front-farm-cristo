export interface ICreateProductPayload {
  name: string;
  quantity: number;
  category: string;
}

export interface ICreateProductResponse {
  id: string;
  name: string;
  quantity: number;
  category: string;
}
