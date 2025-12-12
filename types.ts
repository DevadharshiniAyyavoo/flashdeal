export interface Product {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discountPercentage: number;
  totalItems: number;
  claimedItems: number;
  viewers: number;
  timeLeft: number; // in seconds
  imageUrl: string;
  features: string[];
}

export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export enum DealStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  SOLD_OUT = 'SOLD_OUT'
}