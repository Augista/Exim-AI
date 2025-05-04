import * as React from "react"
import { cn } from "@/lib/utils"

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-6", className)} {...props} />
))
Timeline.displayName = "Timeline"

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative pl-8", className)} {...props} />
))
TimelineItem.displayName = "TimelineItem"

interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineConnector = React.forwardRef<HTMLDivElement, TimelineConnectorProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute left-3 top-5 h-full w-[1px] -translate-x-1/2 bg-border", className)}
    {...props}
  />
))
TimelineConnector.displayName = "TimelineConnector"

interface TimelineHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineHeader = React.forwardRef<HTMLDivElement, TimelineHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
))
TimelineHeader.displayName = "TimelineHeader"

interface TimelineIconProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineIcon = React.forwardRef<HTMLDivElement, TimelineIconProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-6 w-6 items-center justify-center rounded-full border bg-background", className)}
    {...props}
  />
))
TimelineIcon.displayName = "TimelineIcon"

interface TimelineBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const TimelineBody = React.forwardRef<HTMLDivElement, TimelineBodyProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-2", className)} {...props} />
))
TimelineBody.displayName = "TimelineBody"

export { Timeline, TimelineItem, TimelineConnector, TimelineHeader, TimelineIcon, TimelineBody }
