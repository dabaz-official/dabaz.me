'use client';

import * as React from 'react';

import { cn } from '@dabaz/lib/utils';

type ButtonVariant =
  | "default"
  | "outline"
  | "ghost"
  | "link"
  | "navlink"
  | "mobilelink";

const baseClasses =
  "inline-flex items-center justify-center font-medium rounded-full transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bg-dark-2/20 dark:focus-visible:ring-bg-light-2/30 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "px-3 py-2 text-copy-14 lg:text-copy-16 bg-bg-dark-2 text-gray-dark-10 hover:bg-gray-dark-2 active:bg-gray-dark-3 dark:bg-bg-light-2 dark:text-gray-light-10 dark:hover:bg-gray-light-2 dark:active:bg-gray-light-3",
  outline:
    "px-3 py-2 border border-gray-light-4 text-gray-light-10 hover:border-gray-light-5 active:border-gray-light-6 dark:border-gray-dark-4 dark:text-gray-dark-10 dark:hover:border-gray-dark-5 dark:active:border-gray-dark-6",
  ghost: "bg-transparent text-copy-16 hover:text-gray-light-9 dark:hover:text-gray-dark-9",
  link:
    "bg-transparent underline underline-offset-4 text-bg-dark-2 dark:text-bg-light-2",
  navlink:
    "px-3 py-1 text-copy-16 tracking-tight text-gray-light-10 dark:text-gray-dark-10 hover:bg-gray-light-1 dark:hover:bg-gray-dark-1 active:bg-gray-light-2 dark:active:bg-gray-dark-2",
  mobilelink:
    "text-copy-20 font-semibold text-gray-light-10 dark:text-gray-dark-10 tracking-tight",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
}

const ButtonInner = (
  { variant = "default", className, ...props }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
) => {
  return (
    <button
      ref={ref}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ButtonInner
);

Button.displayName = "Button";

export default Button;