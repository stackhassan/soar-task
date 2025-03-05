import { Layout } from "@/components/layout/layout";

export default function Account() {
  return (
    <Layout title="Account">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences.</p>
      </div>
    </Layout>
  );
}
