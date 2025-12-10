import PageSkeleton from "@/app/components/skeletons/PageSkeleton";

/**
 * Loading state for modularity page.
 */
export default function Loading() {
  return <PageSkeleton hasTitle hasSubtitle maxWidth={1200} />;
}
