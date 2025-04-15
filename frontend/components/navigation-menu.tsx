import Link from "next/link"
import { cn } from "@/lib/utils"

const links = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/upload", label: "Upload Model" },
  { href: "/demo", label: "Demo" },
  { href: "/node-management", label: "Node Management" },
]

export function NavigationMenu() {
  return (
    <nav className="hidden md:flex md:gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn("text-sm font-medium transition-colors hover:text-primary")}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

