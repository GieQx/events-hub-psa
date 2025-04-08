
import { useTheme } from "next-themes"
import { Toaster as SonnerToaster } from "sonner"

import * as React from "react"

const Toaster = React.forwardRef<
  React.ElementRef<typeof SonnerToaster>,
  React.ComponentPropsWithoutRef<typeof SonnerToaster>
>(({ ...props }, ref) => {
  const { theme = "system" } = useTheme()

  return (
    <SonnerToaster
      ref={ref}
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
})
Toaster.displayName = "Toaster"

export { Toaster }
