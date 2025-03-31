import Link from "next/link"
import { ConnectWallet } from "@/components/connect-wallet"
import { ModeToggle } from "@/components/mode-toggle"
import { NavigationMenu } from "@/components/navigation-menu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">AI Model Marketplace</span>
          </Link>
          <NavigationMenu />
        </div>
        <div className="flex items-center gap-2">
          <ConnectWallet />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

