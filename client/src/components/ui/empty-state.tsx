import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const iconCircleVariants = cva(
  "grid size-20 shrink-0 place-items-center rounded-full",
  {
    variants: {
      variant: {
        purple:
          "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
        teal: "bg-teal-100 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400",
        blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
        amber:
          "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
        rose: "bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
        gray: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
      },
    },
    defaultVariants: { variant: "purple" },
  }
)

const primaryButtonVariants = cva("", {
  variants: {
    variant: {
      purple: "bg-purple-600 text-white hover:bg-purple-700",
      teal: "bg-teal-600 text-white hover:bg-teal-700",
      blue: "bg-blue-600 text-white hover:bg-blue-700",
      amber: "bg-amber-600 text-white hover:bg-amber-700",
      rose: "bg-rose-600 text-white hover:bg-rose-700",
      gray: "",
    },
  },
  defaultVariants: { variant: "purple" },
})

type EmptyStateVariant = NonNullable<
  VariantProps<typeof iconCircleVariants>["variant"]
>

interface EmptyStateAction {
  label: string
  onClick?: () => void
  href?: string
  icon?: LucideIcon
}

interface EmptyStateSecondaryAction {
  label: string
  onClick?: () => void
  href?: string
}

interface EmptyStateHint {
  icon: LucideIcon
  label: string
  href?: string
  onClick?: () => void
}

interface EmptyStateStep {
  icon: LucideIcon
  iconColor?: string
  title: string
  description: string
}

export interface EmptyStateProps {
  icon: LucideIcon
  variant?: EmptyStateVariant
  title: string
  description: string
  action?: EmptyStateAction
  secondaryAction?: EmptyStateSecondaryAction
  hints?: EmptyStateHint[]
  steps?: EmptyStateStep[]
  className?: string
}

function HintCard({ icon: Icon, label, href, onClick }: EmptyStateHint) {
  const hintClassName =
    "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-accent"

  if (href) {
    return (
      <Link href={href} className={hintClassName}>
        <Icon size={18} className="text-muted-foreground" />
        <span>{label}</span>
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={hintClassName}>
      <Icon size={18} className="text-muted-foreground" />
      <span>{label}</span>
    </button>
  )
}

function StepCard({ icon: Icon, iconColor, title, description }: EmptyStateStep) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 text-left">
      <Icon size={20} className={cn("mb-2", iconColor ?? "text-foreground")} />
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

export function EmptyState({
  icon: Icon,
  variant = "purple",
  title,
  description,
  action,
  secondaryAction,
  hints,
  steps,
  className,
}: EmptyStateProps) {
  const ActionIcon = action?.icon

  return (
    <section
      role="status"
      aria-label={title}
      className={cn("animate-in fade-in px-6 py-16 duration-500", className)}
    >
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className={iconCircleVariants({ variant })} aria-hidden="true">
          <Icon size={32} />
        </div>

        <h3 className="mt-6 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 max-w-[340px] text-sm text-muted-foreground">
          {description}
        </p>

        {action && (
          <Button
            asChild={Boolean(action.href)}
            onClick={action.href ? undefined : action.onClick}
            className={cn("mt-6", primaryButtonVariants({ variant }))}
          >
            {action.href ? (
              <Link href={action.href}>
                {ActionIcon && <ActionIcon />}
                {action.label}
              </Link>
            ) : (
              <>
                {ActionIcon && <ActionIcon />}
                {action.label}
              </>
            )}
          </Button>
        )}

        {secondaryAction && (
          <Button
            asChild={Boolean(secondaryAction.href)}
            variant="ghost"
            onClick={secondaryAction.href ? undefined : secondaryAction.onClick}
            className="mt-2"
          >
            {secondaryAction.href ? (
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            ) : (
              secondaryAction.label
            )}
          </Button>
        )}

        {hints && hints.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {hints.map((hint) => (
              <HintCard key={hint.label} {...hint} />
            ))}
          </div>
        )}

        {steps && steps.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {steps.map((step) => (
              <StepCard key={step.title} {...step} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * Usage examples
 * ---------------
 *
 * Explore Formations (no formations available):
 *
 * <EmptyState
 *   icon={BookOpen}
 *   variant="purple"
 *   title="No formations available yet"
 *   description="New formations are being prepared. Check back soon or explore other learning resources in the meantime."
 *   action={{
 *     label: "Notify me when available",
 *     icon: Bell,
 *     onClick: handleNotify,
 *   }}
 *   hints={[
 *     { icon: FileText, label: "Browse resources", href: "/student_dashboard/resources" },
 *     { icon: MessageSquare, label: "Ask a question", href: "/student_dashboard/messages" },
 *     { icon: Calendar, label: "Live classes", href: "/student_dashboard/live_classes" },
 *   ]}
 * />
 *
 * My Learning (no enrollments):
 *
 * <EmptyState
 *   icon={Rocket}
 *   variant="teal"
 *   title="Start your learning journey"
 *   description="You haven't enrolled in any formations yet. Browse the catalog to find courses that match your goals."
 *   action={{
 *     label: "Explore courses",
 *     icon: Compass,
 *     href: "/student_dashboard/course",
 *   }}
 *   steps={[
 *     {
 *       icon: Target,
 *       iconColor: "text-purple-600",
 *       title: "Set your goals",
 *       description: "Define what skills you want to develop.",
 *     },
 *     {
 *       icon: ListChecks,
 *       iconColor: "text-teal-600",
 *       title: "Enroll in a course",
 *       description: "Pick a formation that fits your schedule.",
 *     },
 *     {
 *       icon: Award,
 *       iconColor: "text-amber-600",
 *       title: "Earn your certificate",
 *       description: "Complete lessons and track your progress.",
 *     },
 *   ]}
 * />
 */
