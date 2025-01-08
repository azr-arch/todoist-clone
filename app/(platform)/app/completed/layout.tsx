import { PageLayout } from "@/components/layout/page-layout";

export default function CompletedLayout({ children }: { children: React.ReactNode }) {
    return <PageLayout title="Activity">{children}</PageLayout>;
}
