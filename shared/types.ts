export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type ConditionType = "new" | "refurbished" | "used";
export type CategoryType = "electronics" | "tools" | "appliances" | "furniture" | "vehicles" | "other";
export type WarrantyProviderType = "manufacturer" | "extended" | "retailer" | "none";
export type CurrencyType = "USD" | "EUR" | "GBP" | "JPY";
export interface Warranty {
  end_date: string;
  provider: string;
  type: WarrantyProviderType;
  contact?: string;
}
export interface SoftwareLicense {
  key: string;
  provider: string;
  expiration_date?: string;
}
export interface InventoryItem {
  id: string;
  product_name: string;
  category: CategoryType;
  brand: string;
  model_number?: string;
  serial_number?: string;
  purchase_date: string;
  price: number;
  currency: CurrencyType;
  retailer?: string;
  condition: ConditionType;
  location?: string;
  warranty?: Warranty;
  tags?: string[];
  receipt_file?: string;
  notes?: string;
  software_license?: SoftwareLicense;
}