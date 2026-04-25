"use client";

import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  HelpCircle,
  Sun,
  type LucideProps,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  "cloud-rain": CloudRain,
  "cloud-drizzle": CloudDrizzle,
  "cloud-lightning": CloudLightning,
  "cloud-sun": CloudSun,
  "cloud-fog": CloudFog,
  "cloud-moon-rain": CloudMoon,
  cloud: Cloud,
  sun: Sun,
  snowflake: CloudSnow,
  "help-circle": HelpCircle,
};

interface WeatherIconProps extends LucideProps {
  iconKey: string;
}

export function WeatherIcon({ iconKey, ...props }: WeatherIconProps) {
  const Icon = ICON_MAP[iconKey] ?? HelpCircle;
  return <Icon {...props} />;
}
