import React from 'react';
import { Link } from 'react-router-dom';
import { Package, CalendarDays, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { MOCK_INVENTORY_ITEMS } from '@shared/mock-data';
export function HomePage() {
  const totalItems = MOCK_INVENTORY_ITEMS.length;
  const expiringWarranties = MOCK_INVENTORY_ITEMS.filter(item => {
    if (!item.warranty?.end_date) return false;
    const expiry = new Date(item.warranty.end_date);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    return diff > 0 && diff < (90 * 24 * 60 * 60 * 1000); // 90 days
  }).length;
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
              <Package className="h-4 w-4 text-appAccent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalItems}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-soft-sm bg-white dark:bg-slate-900 transition-all hover:shadow-soft-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Warranty Alerts</CardTitle>
              <CalendarDays className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{expiringWarranties}</div>
              <p className="text-xs text-muted-foreground mt-1">Expiring within 90 days</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-soft-sm bg-white dark:bg-slate-900 transition-all hover:shadow-soft-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Protection</CardTitle>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground mt-1">Data backed up to cloud</p>
            </CardContent>
          </Card>
        </div>
        {/* Recent Items Preview (Static for Phase 1) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Recently Added</h2>
            <Link to="/inventory" className="text-sm font-medium text-appAccent hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_INVENTORY_ITEMS.slice(0, 4).map((item) => (
              <Card key={item.id} className="overflow-hidden hover:border-appAccent/50 transition-colors cursor-pointer group">
                <div className="aspect-video bg-muted flex items-center justify-center">
                   <Package className="h-8 w-8 text-muted-foreground/30 group-hover:scale-110 transition-transform" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate">{item.product_name}</h3>
                  <p className="text-sm text-muted-foreground">{item.brand}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Toaster richColors />
    </AppLayout>
  );
}