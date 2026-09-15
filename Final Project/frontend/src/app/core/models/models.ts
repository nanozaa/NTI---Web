export interface MenuItem {
  _id?: string;
  id?: number;
  name: string;
  category: string;
  description?: string;
  price: number;
  available: boolean;
  imageUrl?: string;
}

export interface Reservation {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  guests: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
  user?: { firstName: string; lastName: string; email: string };
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface OrderItem {
  menuItem: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  user?: { firstName: string; lastName: string; email: string };
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'admin';
  imageUrl?: string;
  phone?: string;
  address?: { street?: string; city?: string; postalCode?: string };
}

export interface AuthResponse {
  status: string;
  token: string;
  data: { user: User };
}
