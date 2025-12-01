'use client'

import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "./ui/scroll-area"

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional class name for the outer container element.
   */
  containerClassName?: string
}

const suggestedQueries = [
  "Summer linen edit",
  "Office-ready essentials",
  "Occasion dresses",
]

type TrendingProduct = {
  name: string
  price: string
  product_image_url: string
}

const trendingProducts: TrendingProduct[] = [
  {
    name: "Architectural denim jacket",
    price: "$240",
    product_image_url: "https://cdn.shopify.com/s/files/1/0249/7784/files/OriginTee-FoggyTaupe-102142-022-010_1000x.jpg?v=1754185903&format=webp",
  },
  {
    name: "Column satin maxi dress",
    price: "$320",
    product_image_url: "https://cdn.shopify.com/s/files/1/0249/7784/files/OriginTee-FoggyTaupe-102142-022-010_1000x.jpg?v=1754185903&format=webp",
  },
  {
    name: "Tonal rib knit set",
    price: "$180",
    product_image_url: "https://cdn.shopify.com/s/files/1/0249/7784/files/OriginTee-FoggyTaupe-102142-022-010_1000x.jpg?v=1754185903&format=webp",
  },
]

/**
 * SearchBar renders a liquid glass search trigger that
 * expands into a full-screen search workspace with Cmd+I.
 */
export function SearchBar({
  className,
  containerClassName,
  type = "text",
  onFocus,
  onBlur,
  ...props
}: SearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isOverlayOpen, setIsOverlayOpen] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsOverlayOpen(true)
    if (onFocus) {
      onFocus(event)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(event)
    }
  }

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifierPressed = event.metaKey || event.ctrlKey
      const isIKey =
        event.key === "i" || event.key === "I" || event.code === "KeyI"

      if (isModifierPressed && isIKey) {
        event.preventDefault()
        setIsOverlayOpen(true)
        inputRef.current?.focus()
        return
      }

      if (event.key === "Escape") {
        setIsOverlayOpen(false)
        inputRef.current?.blur()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  /**
   * Closes the search overlay and blurs the trigger input.
   */
  const closeOverlay = () => {
    setIsOverlayOpen(false)
    inputRef.current?.blur()
  }

  /**
   * Handles clicks on the dimmed backdrop to exit search mode.
   */
  const handleBackdropClick = () => {
    closeOverlay()
  }

  let overlay: React.ReactPortal | null = null
  if (isOverlayOpen && isMounted) {
    overlay = createPortal(
      <div
        className="fixed inset-0 z-40 flex justify-center bg-background/40 backdrop-blur-xl transition-opacity duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Search workspace"
        onClick={handleBackdropClick}
      >
        <div
          className="pointer-events-auto flex w-full flex-col px-4 pb-8 pt-24 md:px-6"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="relative flex h-[min(640px,calc(100vh-128px))] flex-1 overflow-hidden rounded-3xl border border-border/60 bg-background/70 shadow-2xl backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-y-6 left-[16.67%] hidden lg:block">
              <Separator orientation="vertical" className="h-full" />
            </div>

            <div className="grid h-full w-full grid-cols-12 gap-0">
              <div className="col-span-12 flex flex-col p-6 lg:col-span-2 space-y-4">
                <h2 className="text-sm font-medium uppercase tracking-wide text-foreground/60">
                  Recently Searched
                </h2>
                <Separator />
                <ScrollArea className="h-full w-full">
                  <div>
                    <div className="text-sm py-2">Tailored blazer</div>
                    <div className="text-sm py-2">Minimal sneakers</div>
                    <div className="text-sm py-2">Silk evening dress</div>
                  </div>
                </ScrollArea>
              </div>

              <div className="col-span-12 flex flex-col px-6 py-6 lg:col-span-10">
                <section className="mb-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h2 className="text-sm font-medium uppercase tracking-wide text-foreground/60">
                      Trending products
                    </h2>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
                    {trendingProducts.map((product) => (
                      <Card
                        key={product.name}
                        className="group h-full border-border/60 bg-background/70 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg py-2 gap-2"
                      >
                        <CardContent className="px-2 py-0">
                          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-foreground/5">
                            <Image
                              src={product.product_image_url}
                              alt={`${product.name}`}
                              fill
                              sizes="(min-width: 1280px) 14vw, (min-width: 640px) 30vw, 50vw"
                              className="object-cover transition duration-300 group-hover:scale-[1.03]"
                              priority
                            />
                          </div>
                        </CardContent>
                        <CardFooter className="px-2 flex-col grid justify-items-start">
                          <p>{product.name}</p>
                          <p>{product.price}</p>
                        </CardFooter>
                        {/* <CardTitle className="text-base leading-tight">{product.name}</CardTitle>
                          <span className="text-sm font-semibold text-foreground">{product.price}</span> */}
                      </Card>
                    ))}
                  </div>
                </section>

                <div className="flex flex-1 flex-col">
                  <section className="flex-1">
                    <h2 className="text-sm font-medium uppercase tracking-wide text-foreground/60">
                      Suggested queries
                    </h2>
                    <div className="mt-1 flex flex-col overflow-hidden">
                      {suggestedQueries.map((query, index) => (
                        <React.Fragment key={query}>
                          <button
                            type="button"
                            className="w-full px-4 py-2 text-left text-base text-foreground/85 transition hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                          >
                            {query}
                          </button>
                          {index < suggestedQueries.length - 1 && (
                            <Separator className="bg-border/70" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </section>

                  <section className="flex items-center">
                    <div
                      className={cn(
                        "flex w-full items-center rounded-sm bg-background/70 px-4 py-2",
                        "shadow-sm backdrop-blur-md focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/30"
                      )}
                    >
                      <input
                        type={type}
                        placeholder="Ask products, brands, and styles"
                        className={cn(
                          "h-10 w-full border-none bg-transparent text-sm text-foreground",
                          "placeholder:text-foreground/70",
                          "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        )}
                        autoFocus
                        aria-label="Search products"
                      />

                    </div>
                  </section>
                </div>
              </div>

              <button
                type="button"
                onClick={closeOverlay}
                className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-foreground/80 shadow-sm backdrop-blur-md transition hover:bg-background"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    )
  }

  return (
    <React.Fragment>
      <div
        className={cn(
          "relative z-50 flex items-center rounded-full border border-border/40 bg-background/40 px-3 py-1",
          "shadow-sm backdrop-blur-md",
          "focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/30",
          containerClassName
        )}
      >
        <input
          ref={inputRef}
          type={type}
          placeholder="Search"
          className={cn(
            "h-9 w-full border-none bg-transparent px-0 text-sm leading-none text-foreground",
            "placeholder:text-foreground",
            "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            "pr-16",
            className
          )}
          aria-label={props["aria-label"] ?? "Search"}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {!isOverlayOpen && (
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <KbdGroup>
              <Kbd>⌘ I</Kbd>
            </KbdGroup>
          </div>
        )}
      </div>
      {overlay}
    </React.Fragment>
  )
}
