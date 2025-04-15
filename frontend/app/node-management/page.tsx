import { NodeManagementPanel } from "@/components/node-management-panel"

export default function NodeManagementPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Node Management</h1>
        <p className="mt-2 text-muted-foreground">Manage your decentralized storage and compute nodes</p>
      </div>
      <NodeManagementPanel />
    </div>
  )
}

