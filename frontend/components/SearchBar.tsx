import * as React from "react"

import { cn } from "@/lib/utils"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export interface SearchBarProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional class name for the outer container element.
   */
  containerClassName?: string
}

/**
 * SearchBar renders a liquid glass search input with a Cmd+I shortcut hint.
 */
export function SearchBar({
  className,
  containerClassName,
  type = "search",
  ...props
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "relative flex items-center rounded-full border border-border/40 bg-background/40 px-3 py-1",
        "shadow-sm backdrop-blur-md",
        "focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/30",
        containerClassName
      )}
    >
      <input
        type={type}
        placeholder="Search"
        className={cn(
          "h-9 w-full border-none bg-transparent px-0 text-m leading-none text-foreground",
          "placeholder:text-foreground",
          "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
          "pr-16",
          className
        )}
        aria-label={props["aria-label"] ?? "Search"}
        {...props}
      />
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <KbdGroup>
          <Kbd>⌘ I</Kbd>
        </KbdGroup>
      </div>
    </div>
  )
}

