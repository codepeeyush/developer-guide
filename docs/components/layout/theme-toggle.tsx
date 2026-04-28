"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";
import { ComponentProps, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className, ...props }: ComponentProps<"button">) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center size-8 rounded-md text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground transition-colors hover:cursor-pointer",
        className
      )}
      aria-label="Toggle Theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      data-theme-toggle=""
      {...props}
    >
      {mounted ? (
        isDark ? <HugeiconsIcon icon={Sun01Icon} className="size-4" /> : <HugeiconsIcon icon={Moon02Icon} className="size-4" />
      ) : (
        <HugeiconsIcon icon={Sun01Icon} className="size-4" />
      )}
    </button>
  );
}
