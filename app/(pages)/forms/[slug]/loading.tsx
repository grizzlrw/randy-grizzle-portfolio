import PageSkeleton from "@/app/components/skeletons/PageSkeleton";

/**
 * Loading state for dynamic form pages.
 * Automatically shown by Next.js while the page is being rendered.
 */
export default function Loading() {
  return <PageSkeleton hasTitle hasSubtitle maxWidth={960} />;
}
