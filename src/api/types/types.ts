export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'super_admin' | 'brand_admin' | 'customer';
}

export interface BrandAttributes {
  id: number;
  name: string;
  description?: string;
  adminId: number;
}

export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  brandId: number;
  stock: number;
}

export interface CartAttributes {
  id: number;
  userId: number;
}

export interface OrderAttributes {
  id: number;
  userId: number;
  brandId: number;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface ChatMessage {
  role: string,
  content: string
}