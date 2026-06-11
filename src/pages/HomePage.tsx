import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Package, CalendarDays, Plus, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { api } from '@/lib/api-client';
import { InventoryItem } from '@shared/types';
export function HomePage() {
  const { data: stats, isLoading: statsLoading } = useQuery<{
    totalItems: number;
    categoryStats: Record<string, number>;
    expiringSoonCount: number;
  }>({
    queryKey: ['dashboard-stats'],
    queryFn: () => api('/api/stats'),
  });
  const { data: recent, isLoading: itemsLoading } = useQuery<{ items: InventoryItem[] }>({
    queryKey: ['recent-items'],
    queryFn: () => api('/api/items?limit=4'),
  });
  const isLoading = statsLoading || itemsLoading;
  return (
    <AppLayout container>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl hero-gradient p-12 md:p-20 shadow-soft-md">
          <div className="relative z-10 max-w-2xl space-y-6">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-primaryBrand leading-tight">
              Your Inventory, <span className="text-appAccent">Simplified.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Effortlessly track, manage, and monitor your personal and business assets with Vertex Inventory.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="btn-gradient">
                <Link to="/inventory">
                  View Inventory <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/50 backdrop-blur-sm border-white/20">
                <Link to="/inventory/new" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" /> Add New Item
                </Link>
              </Button>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-10">
            <Package className="w-full h-full text-appAccent" />
          </div>
        </section>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-soft-sm bg-white dark:bg-slate-900 transition-all hover:shadow-soft-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Items</span>
              <Package className="h-4 w-4 text-appAccent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.totalItems ?? 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-soft-sm bg-white dark:bg-slate-900 transition-all hover:shadow-soft-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Warranty Alerts</span>
              <CalendarDays className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.expiringSoonCount ?? 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Expiring within 90 days</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-soft-sm bg-white dark:bg-slate-900 transition-all hover:shadow-soft-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Protection</span>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground mt-1">Data backed up to cloud</p>
            </CardContent>
          </Card>
        </div>
        {/* Recent Items Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Recently Added</h2>
            <Link to="/inventory" className="text-sm font-medium text-appAccent hover:underline">
              View all
            </Link>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-appAccent" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recent?.items?.length ? recent.items.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:border-appAccent/50 transition-colors cursor-pointer group" asChild>
                  <Link to={`/inventory/${item.id}`}>
                    <div className="aspect-video bg-muted flex items-center justify-center">
                       <Package className="h-8 w-8 text-muted-foreground/30 group-hover:scale-110 transition-transform" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold truncate">{item.product_name}</h3>
                      <p className="text-sm text-muted-foreground">{item.brand}</p>
                    </CardContent>
                  </Link>
                </Card>
              )) : (
                <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                  No items in inventory yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Toaster richColors />
    </AppLayout>
  );
}