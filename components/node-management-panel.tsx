"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useWeb3 } from "@/hooks/use-web3"
import { AlertCircle, Check, Database, HardDrive, Server, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function NodeManagementPanel() {
  const { isConnected } = useWeb3()
  const [isNodeRunning, setIsNodeRunning] = useState(false)

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>You need to connect your wallet to manage your nodes</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Wallet Required</AlertTitle>
            <AlertDescription>Please connect your wallet using the button in the header to continue.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="compute">Compute</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Storage Contribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128 GB</div>
                <p className="text-xs text-muted-foreground">of 500 GB allocated</p>
                <div className="mt-2">
                  <Progress value={25.6} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Compute Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4 Cores</div>
                <p className="text-xs text-muted-foreground">8 GB RAM allocated</p>
                <div className="mt-2">
                  <Progress value={40} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rewards Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.15 ETH</div>
                <p className="text-xs text-muted-foreground">+ 250 Platform Tokens</p>
                <div className="mt-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    +0.02 ETH this week
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Node Status</CardTitle>
              <CardDescription>Manage your node's operational status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${isNodeRunning ? "bg-green-500" : "bg-red-500"}`}></div>
                  <span className="font-medium">{isNodeRunning ? "Node Running" : "Node Offline"}</span>
                </div>
                <Button
                  variant={isNodeRunning ? "destructive" : "default"}
                  onClick={() => setIsNodeRunning(!isNodeRunning)}
                >
                  {isNodeRunning ? "Stop Node" : "Start Node"}
                </Button>
              </div>

              {isNodeRunning && (
                <div className="mt-4 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Active Connections</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Connected Peers</span>
                        <span className="text-sm">24</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Network Health</span>
                        <span className="text-sm">Good</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Uptime</span>
                        <span className="text-sm">3d 14h 22m</span>
                      </div>
                    </div>
                  </div>

                  <Alert variant="default" className="border-green-500 bg-green-500/10">
                    <Check className="h-4 w-4 text-green-500" />
                    <AlertTitle>Node Verified</AlertTitle>
                    <AlertDescription>Your node has been verified and is contributing to the network.</AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Storage Management</CardTitle>
              <CardDescription>Manage your storage contribution to the network</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Total Allocated</span>
                  <span>500 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Currently Used</span>
                  <span>128 GB (25.6%)</span>
                </div>
                <Progress value={25.6} />
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Storage Settings</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Max Storage</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">500 GB</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Storage Path</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono">/data/ipfs</span>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stored Model Shards</CardTitle>
              <CardDescription>Model fragments stored on your node</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shard ID</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">0x7a3b...f12e</TableCell>
                    <TableCell>2.4 GB</TableCell>
                    <TableCell>NeuralNet-7B</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Healthy
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Verify
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">0x9c2d...e45a</TableCell>
                    <TableCell>1.8 GB</TableCell>
                    <TableCell>VisionTransformer-L</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Healthy
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Verify
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">0x3f5e...b78c</TableCell>
                    <TableCell>3.2 GB</TableCell>
                    <TableCell>AudioGen-XL</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                        Syncing
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Verify
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compute" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Compute Resources</CardTitle>
              <CardDescription>Manage your compute contribution to the network</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">CPU Cores</span>
                    <span>4 / 8 cores</span>
                  </div>
                  <Progress value={50} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Memory</span>
                    <span>8 / 16 GB</span>
                  </div>
                  <Progress value={50} />
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Compute Settings</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Max CPU Usage</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">50%</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Max Memory</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">8 GB</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">GPU Acceleration</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Disabled</span>
                      <Button variant="outline" size="sm">
                        Enable
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Inference Tasks</CardTitle>
              <CardDescription>Current model inference tasks running on your node</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task ID</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>CPU Usage</TableHead>
                    <TableHead>Memory</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">task_0x7a3b</TableCell>
                    <TableCell>NeuralNet-7B</TableCell>
                    <TableCell>25%</TableCell>
                    <TableCell>2.1 GB</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Running
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">task_0x9c2d</TableCell>
                    <TableCell>VisionTransformer-L</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>1.5 GB</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Running
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {isNodeRunning ? (
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    View All Tasks
                  </Button>
                </div>
              ) : (
                <div className="mt-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Node Offline</AlertTitle>
                    <AlertDescription>Start your node to begin processing inference tasks.</AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reward Summary</CardTitle>
              <CardDescription>Overview of your earnings for contributing to the network</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">ETH Rewards</h3>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">0.15 ETH</div>
                    <p className="text-sm text-muted-foreground">≈ $300 USD</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">This Week</span>
                      <span className="text-sm">0.02 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <span className="text-sm">0.08 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">All Time</span>
                      <span className="text-sm">0.15 ETH</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Platform Tokens</h3>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">250 PTK</div>
                    <p className="text-sm text-muted-foreground">≈ $125 USD</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">This Week</span>
                      <span className="text-sm">35 PTK</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <span className="text-sm">150 PTK</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">All Time</span>
                      <span className="text-sm">250 PTK</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Claim Rewards</Button>
                <Button variant="outline">View History</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reward Breakdown</CardTitle>
              <CardDescription>Details of how your rewards are calculated</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contribution Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead className="text-right">Reward</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span>Storage</span>
                      </div>
                    </TableCell>
                    <TableCell>128 GB</TableCell>
                    <TableCell>0.0001 ETH/GB/month</TableCell>
                    <TableCell className="text-right">0.0128 ETH</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-muted-foreground" />
                        <span>Compute</span>
                      </div>
                    </TableCell>
                    <TableCell>4 Cores</TableCell>
                    <TableCell>0.005 ETH/core/month</TableCell>
                    <TableCell className="text-right">0.02 ETH</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span>Key Management</span>
                      </div>
                    </TableCell>
                    <TableCell>15 Keys</TableCell>
                    <TableCell>0.001 ETH/key/month</TableCell>
                    <TableCell className="text-right">0.015 ETH</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span>Verification</span>
                      </div>
                    </TableCell>
                    <TableCell>25 Verifications</TableCell>
                    <TableCell>0.0005 ETH/verification</TableCell>
                    <TableCell className="text-right">0.0125 ETH</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

