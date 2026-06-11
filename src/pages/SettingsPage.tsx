import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Monitor, Moon, Sun, Settings, Database, Github } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { api } from '@/lib/api-client';
import { InventoryItem } from '@shared/types';
import { toast } from 'sonner';
export function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const { data: inventoryData } = useQuery<{ items: InventoryItem[] }>({
    queryKey: ['items-export'],
    queryFn: () => api('/api/items?limit=1000'),
  });
  const exportToCSV = () => {
    if (!inventoryData?.items?.length) {
      toast.error("No items to export");
      return;
    }
    const items = inventoryData.items;
    const headers = ["ID", "Product Name", "Brand", "Category", "Condition", "Price", "Purchase Date", "Location"];
    const csvRows = [
      headers.join(","),
      ...items.map(item => [
        item.id,
        `"${item.product_name}"`,
        `"${item.brand}"`,
        item.category,
        item.condition,
        item.price,
        item.purchase_date,
        `"${item.location || ''}"`
      ].join(","))
    ].join("\n");
    const blob = new Blob([csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vertex-inventory-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Inventory exported successfully");
  };
  return (
    <AppLayout container>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your application preferences and data.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card className="border-none shadow-soft-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-appAccent" /> Appearance
                </CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Theme Preference</p>
                    <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={toggleTheme}>
                    {isDark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                    {isDark ? 'Light' : 'Dark'} Mode
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-soft-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="h-5 w-5 text-appAccent" /> Data Portability
                </CardTitle>
                <CardDescription>Export your inventory data for backup or use in other apps.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="space-y-1">
                    <p className="font-medium">Export Inventory</p>
                    <p className="text-sm text-muted-foreground">Download all items as a CSV file compatible with Excel or Google Sheets.</p>
                  </div>
                  <Button onClick={exportToCSV} className="w-full sm:w-auto" variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Export as CSV
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-8">
            <Card className="border-none shadow-soft-sm bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-950">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5 text-appAccent" /> About Vertex
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Vertex Inventory is a modern asset tracking system designed for clarity and durability. 
                  Powered by Cloudflare Workers and Durable Objects, it ensures your data is always accessible and safe.
                </p>
                <div className="flex items-center gap-4 pt-2">
                  <Button variant="ghost" size="sm" className="h-8 px-3" asChild>
                    <a href="https://github.com" target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" /> Documentation
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}