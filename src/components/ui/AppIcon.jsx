import {
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  BriefcaseBusiness,
  BriefcaseMedical,
  CarFront,
  Check,
  ChevronRight,
  ClipboardList,
  Compass,
  GraduationCap,
  Heart,
  HeartPulse,
  House,
  Mail,
  MapPin,
  Menu,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";

const icons = {
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  badgeCheck: BadgeCheck,
  briefcaseBusiness: BriefcaseBusiness,
  briefcaseMedical: BriefcaseMedical,
  carFront: CarFront,
  check: Check,
  chevronRight: ChevronRight,
  clipboardList: ClipboardList,
  compass: Compass,
  graduationCap: GraduationCap,
  heart: Heart,
  heartPulse: HeartPulse,
  house: House,
  mail: Mail,
  mapPin: MapPin,
  menu: Menu,
  phone: Phone,
  plus: Plus,
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  stethoscope: Stethoscope,
  trendingUp: TrendingUp,
  usersRound: UsersRound,
  x: X,
};

export default function AppIcon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.9,
  ...props
}) {
  const Icon = icons[name];

  if (!Icon) {
    return null;
  }

  return <Icon className={className} strokeWidth={strokeWidth} {...props} />;
}
