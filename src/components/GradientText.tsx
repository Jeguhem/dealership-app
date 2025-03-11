import React, { ReactNode } from "react";

interface GredientTextProps {
  children: ReactNode;
  from: string;
  to: string;
  direction: string;
  className?: string;
}
const GradientText: React.FC<GredientTextProps> = ({
  children,
  className = "",
  from = "",
  to = "",
  direction = "",
}) => {
  return (
    <span
      className={`${className} bg-gradient-to-${direction} from-${from} to-${to} bg-clip-text text-transparent`}
    >
      {children}
    </span>
  );
};

export default GradientText;
