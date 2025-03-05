import { Layout } from "@/components/layout/layout";

export default function CreditCards() {
  return (
    <Layout title="Credit Cards">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">My Cards</h2>
        <p className="text-muted-foreground">View and manage all your cards.</p>
      </div>
    </Layout>
  );
}
