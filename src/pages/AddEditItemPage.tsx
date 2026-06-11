import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AppLayout } from '@/components/layout/AppLayout';
import { InventoryItemForm } from '@/components/InventoryItemForm';
import { api } from '@/lib/api-client';
import { InventoryItem } from '@shared/types';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function AddEditItemPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!id;
  const { data: item, isLoading } = useQuery<InventoryItem>({
    queryKey: ['item', id],
    queryFn: () => api<InventoryItem>(`/api/items/${id}`),
    enabled: isEditMode,
  });
  const mutation = useMutation({
    mutationFn: (values: any) => {
      const url = isEditMode ? `/api/items/${id}` : '/api/items';
      const method = isEditMode ? 'PUT' : 'POST';
      return api<InventoryItem>(url, {
        method,
        body: JSON.stringify(values),
      });
    },
    onSuccess: (data) => {
      toast.success(isEditMode ? 'Item updated successfully' : 'Item created successfully');
      queryClient.invalidateQueries({ queryKey: ['items'] });
      if (id) queryClient.invalidateQueries({ queryKey: ['item', id] });
      navigate(id ? `/inventory/${id}` : '/inventory');
    },
    onError: (err: any) => {
      toast.error(`Error saving item: ${err.message}`);
    },
  });
  if (isEditMode && isLoading) {
    return (
      <AppLayout container>
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-[600px]" />
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout container>
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="-ml-2 mb-2 h-8">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? 'Edit Item' : 'Add New Item'}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode 
              ? `Updating information for ${item?.product_name || 'your item'}.` 
              : 'Enter the details of your new asset below.'}
          </p>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-soft-sm">
          <InventoryItemForm 
            initialData={item} 
            onSubmit={async (values) => { await mutation.mutateAsync(values); }}
            isLoading={mutation.isPending}
          />
        </div>
      </div>
    </AppLayout>
  );
}