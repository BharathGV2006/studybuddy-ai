import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";

import { Skeleton } from "@/components/ui/skeleton";
// Lazy imports for pages
import { Suspense, lazy } from "react";

const OnboardingPage = lazy(() => import("./pages/Onboarding"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const AnalyticsPage = lazy(() => import("./pages/Analytics"));
const ResourcesPage = lazy(() => import("./pages/Resources"));
const ResourceDetailPage = lazy(() => import("./pages/ResourceDetail"));
const FlashcardsPage = lazy(() => import("./pages/Flashcards"));

function PageLoader() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {["a", "b", "c", "d", "e", "f"].map((k) => (
          <Skeleton key={k} className="h-48 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// Single root — just renders Outlet for all routes
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

// Full-screen onboarding — no Layout shell
const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: OnboardingPage,
});

// Layout shell route — wraps all app routes with header/nav
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: DashboardPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const analyticsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/analytics",
  component: AnalyticsPage,
});

const resourcesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/resources",
  component: ResourcesPage,
});

const resourceDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/resources/$id",
  component: ResourceDetailPage,
});

const flashcardsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/flashcards",
  component: FlashcardsPage,
});

const routeTree = rootRoute.addChildren([
  onboardingRoute,
  layoutRoute.addChildren([
    indexRoute,
    dashboardRoute,
    analyticsRoute,
    resourcesRoute,
    resourceDetailRoute,
    flashcardsRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
