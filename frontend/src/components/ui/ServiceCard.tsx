'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Button from './Button';

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  image?: string;
  features?: string[];
}

export default function ServiceCard({ title, description, price, features }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col h-full"
    >
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        {features && (
          <ul className="space-y-3 mb-8">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-8 border-t border-gray-100 mt-auto">
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-sm font-medium text-gray-500">A partir de</span>
          <span className="text-3xl font-extrabold text-blue-600">R$ {price.toFixed(2)}</span>
        </div>
        <Button className="w-full" size="lg">Solicitar Agora</Button>
      </div>
    </motion.div>
  );
}
