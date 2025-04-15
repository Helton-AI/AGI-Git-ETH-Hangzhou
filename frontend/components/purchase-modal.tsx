"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWeb3 } from "@/hooks/use-web3"
import { AlertCircle, Check, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PurchaseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  model: {
    id: number
    name: string
    price: string
    tokenPrice: string
  }
}

export function PurchaseModal({ open, onOpenChange, model }: PurchaseModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"eth" | "token">("eth")
  const [purchaseState, setPurchaseState] = useState<"idle" | "processing" | "success" | "error">("idle")
  const { account } = useWeb3()

  const handlePurchase = () => {
    setPurchaseState("processing")

    // Simulate purchase process
    setTimeout(() => {
      setPurchaseState("success")
    }, 3000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Purchase Model</DialogTitle>
          <DialogDescription>You are about to purchase {model.name}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="eth" onValueChange={(value) => setPaymentMethod(value as "eth" | "token")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="eth">Pay with ETH</TabsTrigger>
            <TabsTrigger value="token">Pay with Tokens</TabsTrigger>
          </TabsList>
          <TabsContent value="eth" className="space-y-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{model.price}</div>
              <p className="text-sm text-muted-foreground">Payment will be made from your connected wallet</p>
            </div>
          </TabsContent>
          <TabsContent value="token" className="space-y-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{model.tokenPrice}</div>
              <p className="text-sm text-muted-foreground">Platform tokens will be used for this purchase</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Transaction Details</h3>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Model ID</span>
                <span className="text-sm">{model.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">From</span>
                <span className="text-sm">{account || "0x1234...5678"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="text-sm">{paymentMethod === "eth" ? model.price : model.tokenPrice}</span>
              </div>
            </div>
          </div>

          {purchaseState === "success" && (
            <Alert variant="default" className="border-green-500 bg-green-500/10">
              <Check className="h-4 w-4 text-green-500" />
              <AlertTitle>Purchase Successful!</AlertTitle>
              <AlertDescription>Your decryption key has been securely delivered to your wallet.</AlertDescription>
            </Alert>
          )}

          {purchaseState === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Transaction Failed</AlertTitle>
              <AlertDescription>There was an error processing your transaction. Please try again.</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handlePurchase}
            disabled={purchaseState === "processing" || purchaseState === "success"}
            className="w-full"
          >
            {purchaseState === "processing" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : purchaseState === "success" ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Purchased
              </>
            ) : (
              `Purchase with ${paymentMethod === "eth" ? "ETH" : "Tokens"}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

