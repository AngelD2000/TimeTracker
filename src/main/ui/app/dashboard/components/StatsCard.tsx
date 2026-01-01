import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
}

export default function StatsCard({ title, value, icon: Icon, gradient }: StatsCardProps) {
  return (
    <div className={`${gradient} rounded-lg p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <Icon className="w-12 h-12 opacity-75" />
      </div>
    </div>
  );
}

