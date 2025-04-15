"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Web3ContextType {
  connect: (walletType: string) => Promise<void>
  disconnect: () => void
  account: string | null
  isConnected: boolean
  chainId: number | null
  balance: string | null
}

const Web3Context = createContext<Web3ContextType>({
  connect: async () => {},
  disconnect: () => {},
  account: null,
  isConnected: false,
  chainId: null,
  balance: null,
})

export function Web3Provider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  const connect = async (walletType: string) => {
    try {
      // This is a mock implementation
      console.log(`Connecting to ${walletType}...`)

      // In a real implementation, you would use ethers.js or web3.js to connect
      // to the user's wallet and get their account information

      // Mock successful connection
      setAccount("0x1234567890123456789012345678901234567890")
      setChainId(1) // Ethereum Mainnet
      setBalance("1.5 ETH")
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  const disconnect = () => {
    setAccount(null)
    setChainId(null)
    setBalance(null)
  }

  return (
    <Web3Context.Provider
      value={{
        connect,
        disconnect,
        account,
        isConnected: !!account,
        chainId,
        balance,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => useContext(Web3Context)

