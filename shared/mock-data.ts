import type { InventoryItem } from './types';
export const MOCK_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "1",
    product_name: "MacBook Pro 14-inch",
    category: "electronics",
    brand: "Apple",
    model_number: "A2442",
    purchase_date: "2023-05-15",
    price: 1999.00,
    currency: "USD",
    condition: "new",
    location: "Home Office",
    tags: ["work", "laptop"],
    warranty: {
      end_date: "2024-05-15",
      provider: "Apple",
      type: "manufacturer"
    },
    notes: "Primary work machine."
  },
  {
    id: "2",
    product_name: "Sony WH-1000XM5",
    category: "electronics",
    brand: "Sony",
    purchase_date: "2023-08-10",
    price: 349.99,
    currency: "USD",
    condition: "new",
    location: "Home Office",
    tags: ["audio", "anc"],
    warranty: {
      end_date: "2024-08-10",
      provider: "Sony",
      type: "manufacturer"
    }
  },
  {
    id: "3",
    product_name: "Dyson V15 Detect",
    category: "appliances",
    brand: "Dyson",
    purchase_date: "2023-12-01",
    price: 749.00,
    currency: "USD",
    condition: "new",
    location: "Laundry Room",
    tags: ["cleaning"],
    warranty: {
      end_date: "2025-12-01",
      provider: "Dyson",
      type: "manufacturer"
    }
  },
  {
    id: "4",
    product_name: "Herman Miller Aeron",
    category: "furniture",
    brand: "Herman Miller",
    purchase_date: "2024-01-20",
    price: 1200.00,
    currency: "USD",
    condition: "refurbished",
    location: "Home Office",
    tags: ["furniture", "ergonomic"],
    warranty: {
      end_date: "2036-01-20",
      provider: "Herman Miller",
      type: "manufacturer"
    }
  },
  {
    id: "5",
    product_name: "Dell UltraSharp U2723QE",
    category: "electronics",
    brand: "Dell",
    purchase_date: "2023-06-05",
    price: 580.00,
    currency: "USD",
    condition: "new",
    location: "Home Office",
    tags: ["monitor", "4k"],
    warranty: {
      end_date: "2026-06-05",
      provider: "Dell",
      type: "manufacturer"
    }
  },
  {
    id: "6",
    product_name: "Bose SoundLink Mini II",
    category: "electronics",
    brand: "Bose",
    purchase_date: "2022-11-15",
    price: 179.00,
    currency: "USD",
    condition: "used",
    location: "Bedroom",
    tags: ["audio", "portable"],
    warranty: {
      end_date: "2023-11-15",
      provider: "none",
      type: "none"
    }
  },
  {
    id: "7",
    product_name: "Honda CR-V",
    category: "vehicles",
    brand: "Honda",
    purchase_date: "2022-03-10",
    price: 32000.00,
    currency: "USD",
    condition: "new",
    location: "Garage",
    tags: ["car", "family"],
    warranty: {
      end_date: "2025-03-10",
      provider: "Honda",
      type: "manufacturer"
    }
  },
  {
    id: "8",
    product_name: "Dewalt DCD791D2",
    category: "tools",
    brand: "Dewalt",
    purchase_date: "2023-09-22",
    price: 199.00,
    currency: "USD",
    condition: "new",
    location: "Garage",
    tags: ["tools", "drill"],
    warranty: {
      end_date: "2026-09-22",
      provider: "Dewalt",
      type: "manufacturer"
    }
  },
  {
    id: "9",
    product_name: "Kindle Paperwhite",
    category: "electronics",
    brand: "Amazon",
    purchase_date: "2023-07-04",
    price: 139.99,
    currency: "USD",
    condition: "new",
    location: "Bedroom",
    tags: ["reading", "tablet"],
    warranty: {
      end_date: "2024-07-04",
      provider: "Amazon",
      type: "manufacturer"
    }
  },
  {
    id: "10",
    product_name: "KitchenAid Artisan Mixer",
    category: "appliances",
    brand: "KitchenAid",
    purchase_date: "2023-11-11",
    price: 449.00,
    currency: "USD",
    condition: "new",
    location: "Kitchen",
    tags: ["cooking", "baking"],
    warranty: {
      end_date: "2024-11-11",
      provider: "KitchenAid",
      type: "manufacturer"
    }
  }
];