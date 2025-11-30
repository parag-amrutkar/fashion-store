import Link from "next/link"
import { Store } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

export interface HeaderNavLink {
    href: string
    label: string
    active?: boolean
}

const defaultNavigationLinks: HeaderNavLink[] = [
    { href: "/", label: "Home", active: true },
]

/**
 * Header component for the storefront layout, displaying the brand
 * identity and primary navigation using the ShadCN navigation menu.
 */
export function Header() {
    return (
        <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b bg-background px-4 py-3 md:px-6">
            <Link href="/" className="flex items-center gap-2">
                <Store className="h-6 w-6" aria-hidden="true" />
                <span className="text-lg font-semibold tracking-tight">DIGITAL CONCIERGE</span>
            </Link>

            <NavigationMenu>
                <NavigationMenuList>
                    {defaultNavigationLinks.map((link) => (
                        <NavigationMenuItem key={link.href}>
                            <NavigationMenuLink
                                asChild
                                data-active={link.active ? "true" : undefined}
                            >
                                <Link href={link.href}>
                                    {link.label}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    )
}
