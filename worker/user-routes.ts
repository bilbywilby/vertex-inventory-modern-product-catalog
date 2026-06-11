import { Hono } from "hono";
import type { Env } from './core-utils';
import { InventoryItemEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import type { InventoryItem } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // LIST ITEMS
  app.get('/api/items', async (c) => {
    await InventoryItemEntity.ensureSeed(c.env);
    const cursor = c.req.query('cursor');
    const limit = c.req.query('limit');
    const page = await InventoryItemEntity.list(
      c.env, 
      cursor ?? null, 
      limit ? Math.max(1, (Number(limit) | 0)) : 50
    );
    return ok(c, page);
  });
  // GET SINGLE ITEM
  app.get('/api/items/:id', async (c) => {
    const id = c.req.param('id');
    const entity = new InventoryItemEntity(c.env, id);
    if (!await entity.exists()) return notFound(c, 'Item not found');
    return ok(c, await entity.getState());
  });
  // CREATE ITEM
  app.post('/api/items', async (c) => {
    const data = await c.req.json() as InventoryItem;
    if (!data.product_name?.trim()) return bad(c, 'Product name is required');
    const id = data.id || crypto.randomUUID();
    const newItem = { ...data, id };
    const created = await InventoryItemEntity.create(c.env, newItem);
    return ok(c, created);
  });
  // UPDATE ITEM
  app.put('/api/items/:id', async (c) => {
    const id = c.req.param('id');
    const data = await c.req.json() as Partial<InventoryItem>;
    const entity = new InventoryItemEntity(c.env, id);
    if (!await entity.exists()) return notFound(c, 'Item not found');
    await entity.patch(data);
    return ok(c, await entity.getState());
  });
  // DELETE ITEM
  app.delete('/api/items/:id', async (c) => {
    const id = c.req.param('id');
    const deleted = await InventoryItemEntity.delete(c.env, id);
    return ok(c, { id, deleted });
  });
  // BATCH DELETE
  app.post('/api/items/delete-many', async (c) => {
    const { ids } = await c.req.json() as { ids: string[] };
    if (!Array.isArray(ids) || ids.length === 0) return bad(c, 'IDs array required');
    const count = await InventoryItemEntity.deleteMany(c.env, ids);
    return ok(c, { deletedCount: count });
  });
}