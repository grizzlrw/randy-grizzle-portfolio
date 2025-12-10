// app/(pages)/clipped-drawer/layout.tsx
import ClippedDrawer from "@/app/components/clipped-drawer/clipped-drawer";

export default function ClippedDrawerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    { label: "Contact Form", href: "/clipped-drawer/contact" },
    { label: "Feedback Form", href: "/clipped-drawer/feedback" },
    { label: "Bug Report", href: "/clipped-drawer/bug-report" },
    // later: fetched from DB
  ];

  return (
    <div className="flex min-h-screen">
      <ClippedDrawer links={links} />
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}