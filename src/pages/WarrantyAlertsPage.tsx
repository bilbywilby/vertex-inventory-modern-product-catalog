import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { format, differenceInDays } from 'date-fns';
import { Clock, ShieldAlert, ArrowUpRight, Package, Info } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { api } from '@/lib/api-client';
import { InventoryItem } from '@shared/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
export function WarrantyAlertsPage() {
  const { data, isLoading } = useQuery<{ items: InventoryItem[] }>({
    queryKey: ['items-all'],
    queryFn: () => api('/api/items?limit=1000'),
  });
  const now = new Date();
  const expiringItems = data?.items?.filter(item => {
    if (!item.warranty?.end_date) return false;
    const expiry = new Date(item.warranty.end_date);
    const diff = differenceInDays(expiry, now);
    return diff >= 0 && diff <= 90;
  }).sort((a, b) => new Date(a.warranty!.end_date).getTime() - new Date(b.warranty!.end_date).getTime()) || [];
  return (
    <AppLayout container>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Warranty Alerts</h1>
          <p className="text-muted-foreground mt-1">Proactive tracking for assets nearing warranty expiration.</p>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full" />)}
          </div>
        ) : expiringItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expiringItems.map(item => {
              const daysLeft = differenceInDays(new Date(item.warranty!.end_date), now);
              const isCritical = daysLeft <= 30;
              return (
                <Card key={item.id} className={`border-none shadow-soft-sm relative overflow-hidden group transition-all hover:shadow-soft-md ${isCritical ? 'ring-1 ring-orange-500' : ''}`}>
                  <div className={`absolute top-0 right-0 p-3 ${isCritical ? 'text-orange-500' : 'text-muted-foreground'}`}>
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={isCritical ? "destructive" : "secondary"} className="text-[10px] uppercase font-bold tracking-wider">
                        {daysLeft} Days Remaining
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-1">{item.product_name}</CardTitle>
                    <CardDescription>{item.brand}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Expires On</p>
                      <p className="font-semibold">{format(new Date(item.warranty!.end_date), 'MMMM dd, yyyy')}</p>
                    </div>
                    <div className="pt-2 border-t flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Package className="h-3 w-3" /> {item.category}
                      </span>
                      <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-appAccent hover:text-appAccent hover:bg-appAccent/10">
                        <Link to={`/inventory/${item.id}`}>
                          View <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-muted/20 rounded-3xl border-2 border-dashed">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <Clock className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">All clear!</h2>
              <p className="text-muted-foreground max-w-sm">No items found with warranties expiring within the next 90 days.</p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}