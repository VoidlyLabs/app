import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { cn } from '@/shared/lib/classnames.utils.ts';

export interface ButtonProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  children?: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        'py-3.5 px-8 rounded-2xl cursor-pointer hover:bg-purple-600 transition bg-accent text-white',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
