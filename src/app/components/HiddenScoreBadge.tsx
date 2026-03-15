interface HiddenScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function HiddenScoreBadge({ score, size = 'md', showLabel = false }: HiddenScoreBadgeProps) {
  const getColor = (score: number) => {
    if (score >= 8) return { bg: 'bg-gradient-to-br from-amber-400 to-orange-500', text: 'text-white' };
    if (score >= 4) return { bg: 'bg-gradient-to-br from-blue-400 to-blue-600', text: 'text-white' };
    return { bg: 'bg-gradient-to-br from-gray-400 to-gray-600', text: 'text-white' };
  };

  const sizes = {
    sm: { container: 'size-12', text: 'text-lg', label: 'text-xs' },
    md: { container: 'size-16', text: 'text-2xl', label: 'text-sm' },
    lg: { container: 'size-24', text: 'text-4xl', label: 'text-base' },
  };

  const color = getColor(score);
  const sizeClass = sizes[size];

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${sizeClass.container} ${color.bg} ${color.text} rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/50`}
      >
        <span className={sizeClass.text}>{score}</span>
      </div>
      {showLabel && (
        <span className={`${sizeClass.label} text-primary`}>Hidden Score</span>
      )}
    </div>
  );
}
