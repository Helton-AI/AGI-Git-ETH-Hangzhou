"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useWeb3 } from "@/hooks/use-web3"

export function ConnectWallet() {
  const [open, setOpen] = useState(false)
  const { connect, disconnect, account, isConnected } = useWeb3()

  const handleConnect = async (walletType: string) => {
    await connect(walletType)
    setOpen(false)
  }

  return (
    <>
      {isConnected ? (
        <Button variant="outline" onClick={disconnect}>
          {account?.slice(0, 6)}...{account?.slice(-4)}
        </Button>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Connect Wallet</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Connect your wallet</DialogTitle>
              <DialogDescription>Connect your wallet to access the AI Model Marketplace.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button onClick={() => handleConnect("metamask")}>MetaMask</Button>
              <Button onClick={() => handleConnect("walletconnect")}>WalletConnect</Button>
              <Button onClick={() => handleConnect("coinbase")}>Coinbase Wallet</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

