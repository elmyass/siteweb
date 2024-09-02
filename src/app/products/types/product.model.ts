export interface ProductRequest {
  id:number;
  name: string;
  price: number;
  description: string;
  categoryQuality: string;
  imageUrl: string;
  currency?: string;
  quantity?: number;
}

export interface ProductResponse {

  id: number;
  name: string;
  price: number;
  description: string;
  categoryQuality: string;
  imageUrl: string;
  currency?: string;
  imageData : string
}
