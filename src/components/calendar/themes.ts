export interface MonthTheme {
  name: string;
  accentHsl: string;       // HSL values for the accent/primary
  bgTint: string;          // subtle background tint
  overlayGradient: string; // gradient for the wave overlay
}

export const MONTH_THEMES: MonthTheme[] = [
  // January - Cool blue
  { name: "frost", accentHsl: "200 85% 45%", bgTint: "210 30% 97%", overlayGradient: "linear-gradient(135deg, hsl(200 85% 45%), hsl(210 70% 55%))" },
  // February - Rose
  { name: "rose", accentHsl: "340 75% 55%", bgTint: "340 30% 97%", overlayGradient: "linear-gradient(135deg, hsl(340 75% 55%), hsl(350 65% 60%))" },
  // March - Green
  { name: "spring", accentHsl: "140 60% 40%", bgTint: "140 20% 97%", overlayGradient: "linear-gradient(135deg, hsl(140 60% 40%), hsl(160 50% 50%))" },
  // April - Sky blue
  { name: "sky", accentHsl: "195 80% 50%", bgTint: "195 25% 97%", overlayGradient: "linear-gradient(135deg, hsl(195 80% 50%), hsl(210 70% 55%))" },
  // May - Lavender
  { name: "blossom", accentHsl: "270 50% 55%", bgTint: "270 20% 97%", overlayGradient: "linear-gradient(135deg, hsl(270 50% 55%), hsl(290 45% 60%))" },
  // June - Warm gold
  { name: "sunshine", accentHsl: "40 85% 50%", bgTint: "40 30% 97%", overlayGradient: "linear-gradient(135deg, hsl(40 85% 50%), hsl(30 80% 55%))" },
  // July - Fiery red
  { name: "fireworks", accentHsl: "0 75% 50%", bgTint: "0 20% 97%", overlayGradient: "linear-gradient(135deg, hsl(0 75% 50%), hsl(15 70% 55%))" },
  // August - Ocean teal
  { name: "ocean", accentHsl: "180 60% 40%", bgTint: "180 20% 97%", overlayGradient: "linear-gradient(135deg, hsl(180 60% 40%), hsl(190 55% 50%))" },
  // September - Amber
  { name: "harvest", accentHsl: "25 80% 50%", bgTint: "25 25% 97%", overlayGradient: "linear-gradient(135deg, hsl(25 80% 50%), hsl(35 75% 55%))" },
  // October - Deep orange
  { name: "autumn", accentHsl: "15 80% 48%", bgTint: "15 20% 97%", overlayGradient: "linear-gradient(135deg, hsl(15 80% 48%), hsl(25 75% 55%))" },
  // November - Warm brown
  { name: "cozy", accentHsl: "30 50% 40%", bgTint: "30 15% 97%", overlayGradient: "linear-gradient(135deg, hsl(30 50% 40%), hsl(20 45% 50%))" },
  // December - Festive red-green
  { name: "festive", accentHsl: "350 70% 45%", bgTint: "350 15% 97%", overlayGradient: "linear-gradient(135deg, hsl(350 70% 45%), hsl(140 50% 40%))" },
];
