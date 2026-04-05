'use client';

import { motion } from 'framer-motion';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export default function Container({ children, className = '', animate = true }: ContainerProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : false}
      viewport={{ once: true }}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}
