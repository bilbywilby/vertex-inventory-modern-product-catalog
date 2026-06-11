import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppLayout } from '@/components/layout/AppLayout';
import { api } from '@/lib/api-client';
import { InventoryItem } from '@shared/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ChevronLeft, 
  Edit, 
  Trash2, 
  Calendar, 
  Tag, 
  MapPin, 
  Info, 
  Package, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
export function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: item, isLoading, error } = useQuery<InventoryItem>({
    queryKey: ['item', id],
    queryFn: () => api<InventoryItem>(`/api/items/${id}`),
    enabled: !!id,
  });
  const deleteMutation = useMutation({
    mutationFn: () => api(`/api/items/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      toast.success('Item deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['items'] });
      navigate('/inventory');
    },
    onError: (err: any) => {
      toast.error(`Failed to delete item: ${err.message}`);
    }
  });
  if (isLoading) {
    return (
      <AppLayout container>
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-64 md:col-span-2" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </AppLayout>
    );
  }
  if (error || !item) {
    return (
      <AppLayout container>
        <div className="text-center py-20 space-y-4">
          <Info className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
          <h2 className="text-2xl font-bold">Item not found</h2>
          <Button asChild variant="outline">
            <Link to="/inventory">Back to Inventory</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout container>
      <div className="space-y-8 animate-fade-in">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Button variant="ghost" size="sm" asChild className="-ml-2 mb-2 h-8">
              <Link to="/inventory" className="flex items-center text-muted-foreground hover:text-foreground">
                <ChevronLeft className="mr-1 h-4 w-4" /> Back to Inventory
              </Link>
            </Button>
            <h1 className="text-4xl font-extrabold text-primaryBrand flex items-center gap-3">
              {item.product_name}
            </h1>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary" className="capitalize">{item.category}</Badge>
              <Badge variant="outline" className="capitalize">{item.condition}</Badge>
              {item.brand && <Badge variant="secondary" className="bg-appAccent/10 text-appAccent border-none">{item.brand}</Badge>}
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to={`/inventory/${item.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" /> Edit Item
              </Link>
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                if (confirm('Are you sure you want to delete this item?')) {
                  deleteMutation.mutate();
                }
              }}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Section */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-soft-sm overflow-hidden">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="h-5 w-5 text-appAccent" /> Product Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Brand</span>
                  <p className="text-lg font-semibold">{item.brand || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Model Number</span>
                  <p className="text-lg font-semibold">{item.model_number || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Serial Number</span>
                  <p className="text-lg font-mono font-medium">{item.serial_number || 'N/A'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Location</span>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-appAccent" /> {item.location || 'Not set'}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-soft-sm overflow-hidden">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-appAccent" /> Notes & Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {item.notes ? (
                    <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                      {item.notes}
                    </p>
                  ) : (
                    <p className="text-muted-foreground italic">No additional notes provided for this item.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar Info Section */}
          <div className="space-y-8">
            <Card className="border-none shadow-soft-sm overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-indigo-950">
              <CardHeader className="border-b border-indigo-100 dark:border-indigo-900/50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-appAccent" /> Purchase Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Date
                  </span>
                  <span className="font-semibold">{format(new Date(item.purchase_date), 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Tag className="h-4 w-4" /> Price
                  </span>
                  <span className="text-2xl font-bold text-appAccent">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.currency || 'USD' }).format(item.price)}
                  </span>
                </div>
                <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/50">
                  <p className="text-sm text-muted-foreground">Retailer: <span className="font-medium text-foreground">{item.retailer || 'N/A'}</span></p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-soft-sm overflow-hidden border-l-4 border-l-orange-400">
              <CardHeader className="bg-orange-50/50 dark:bg-orange-950/20">
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-orange-500" /> Warranty Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {item.warranty?.end_date ? (
                  <>
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase">Expires On</span>
                      <p className="font-semibold text-lg">{format(new Date(item.warranty.end_date), 'MMMM dd, yyyy')}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase">Provider</span>
                      <p className="font-medium">{item.warranty.provider || 'N/A'}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground text-sm flex items-center gap-2">
                    <Info className="h-4 w-4" /> No warranty information tracked for this item.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}