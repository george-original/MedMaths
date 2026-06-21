export function AdSlot({
  size = "default",
  className = "",
}: { size?: "default" | "sidebar" | "inline"; className?: string }) {
  return (
    <div className={`ad-slot bg-muted/30 rounded-lg p-6 border border-dashed border-border ${className}`}>
      <div className="text-center">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Advertisement</div>
        <div className="rounded-lg bg-background p-8">
          <div className="text-sm text-muted-foreground">
            {size === "sidebar" && "Ad Slot - 300x250"}
            {size === "inline" && "Ad Slot - 728x90"}
            {size === "default" && "Ad Slot - Responsive"}
          </div>
        </div>
      </div>
      {/* AdSense script will be injected here when approved */}
    </div>
  )
}
