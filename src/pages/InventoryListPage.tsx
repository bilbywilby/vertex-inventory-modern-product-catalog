import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Search, Plus, Filter, MoreHorizontal, Eye, Tag, MapPin } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MOCK_INVENTORY_ITEMS } from '@shared/mock-data';
import { CategoryType, ConditionType } from '@shared/types';
export function InventoryListPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [condition, setCondition] = useState<string>("all");
  const filteredItems = MOCK_INVENTORY_ITEMS.filter(item => {
    const matchesSearch = item.product_name.toLowerCase().includes(search.toLowerCase()) || 
                         item.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || item.category === category;
    const matchesCondition = condition === "all" || item.condition === condition;
    return matchesSearch && matchesCategory && matchesCondition;
  });
  const categories: CategoryType[] = ["electronics", "tools", "appliances", "furniture", "vehicles", "other"];
  const conditions: ConditionType[] = ["new", "refurbished", "used"];
  return (
    <AppLayout container>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
            <p className="text-muted-foreground mt-1">Manage and track all your cataloged assets.</p>
          </div>
          <Button asChild className="btn-gradient">
            <Link to="/inventory/new">
              <Plus className="mr-2 h-4 w-4" /> Add New Item
            </Link>
          </Button>
        </div>
        {/* Search & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or brand..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="md:col-span-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(c => (
                  <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-3">
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {conditions.map(c => (
                  <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Table */}
        <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[300px]">Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Warranty End</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{item.product_name}</span>
                        <span className="text-xs text-muted-foreground">{item.brand} {item.model_number}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize font-normal">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize font-normal">
                        {item.condition}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(item.purchase_date), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      {item.warranty?.end_date ? (
                        <span className="text-sm text-muted-foreground">
                           {format(new Date(item.warranty.end_date), 'MMM dd, yyyy')}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground/50 italic">None</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link to={`/inventory/${item.id}`} className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2">
                      <Filter className="h-8 w-8 opacity-20" />
                      <p>No items found matching your filters.</p>
                      <Button variant="link" onClick={() => {setSearch(""); setCategory("all"); setCondition("all");}}>
                        Clear all filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}