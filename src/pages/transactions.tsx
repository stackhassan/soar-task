import { Layout } from "@/components/layout/layout";

export default function Transactions() {
  return (
    <Layout title="Transactions">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
        <p className="text-muted-foreground">View and manage your transactions.</p>
      </div>
    </Layout>
  );
}
