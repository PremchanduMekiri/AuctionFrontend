// Type definitions for the application

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'supplier' | 'buyer';
  company?: string;
  avatar?: string;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  material: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  startingPrice: number;
  currentBid: number;
  startDate: string;
  endDate: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  status: 'active' | 'pending' | 'closed';
  featured: boolean;
  bids: Bid[];
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  username: string;
  amount: number;
  timestamp: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'bid' | 'auction' | 'message';
  message: string;
  read: boolean;
  timestamp: string;
  linkTo?: string;
}