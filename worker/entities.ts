import { IndexedEntity } from "./core-utils";
import type { InventoryItem } from "@shared/types";
import { MOCK_INVENTORY_ITEMS } from "@shared/mock-data";
export class InventoryItemEntity extends IndexedEntity<InventoryItem> {
  static readonly entityName = "inventory-item";
  static readonly indexName = "inventory-items";
  static readonly initialState: InventoryItem = {
    id: "",
    product_name: "",
    category: "other",
    brand: "",
    purchase_date: new Date().toISOString().split('T')[0],
    price: 0,
    currency: "USD",
    condition: "new"
  };
  static seedData = MOCK_INVENTORY_ITEMS;
}