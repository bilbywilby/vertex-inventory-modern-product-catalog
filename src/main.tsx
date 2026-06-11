import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { InventoryListPage } from '@/pages/InventoryListPage'
import { ItemDetailPage } from '@/pages/ItemDetailPage'
import { AddEditItemPage } from '@/pages/AddEditItemPage'
import { WarrantyAlertsPage } from '@/pages/WarrantyAlertsPage'
import { SettingsPage } from '@/pages/SettingsPage'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/inventory",
    element: <InventoryListPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/inventory/new",
    element: <AddEditItemPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/inventory/:id",
    element: <ItemDetailPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/inventory/:id/edit",
    element: <AddEditItemPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/alerts",
    element: <WarrantyAlertsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    errorElement: <RouteErrorBoundary />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)