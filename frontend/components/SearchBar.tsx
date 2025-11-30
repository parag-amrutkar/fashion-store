'use client'

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
  type = "text",
  onFocus,
  onBlur,
  ...props
}: SearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = React.useState(false)

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    if (onFocus) {
      onFocus(event)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
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
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

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
        ref={inputRef}
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
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {!isFocused && (
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <KbdGroup>
            <Kbd>⌘ I</Kbd>
          </KbdGroup>
        </div>
      )}
    </div>
  )
}
