import { useState } from 'react';
import { Compass, Route, Plus, Award, BarChart3, BookmarkCheck } from 'lucide-react';
import type { Screen } from '../App';

const NAV_TEAL = '#0F766E';
const NAV_TEAL_LIGHT = 'rgba(15, 118, 110, 0.25)';
const LOGO_URL = '/logo.png';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

function CenterPlanningButton({
  item,
  isActive,
  onNavigate,
}: {
  item: { id: Screen; icon: typeof Route; label: string };
  isActive: boolean;
  onNavigate: (screen: Screen) => void;
}) {
  const [logoError, setLogoError] = useState(false);
  const showLogo = !logoError;

  return (
    <button
      onClick={() => onNavigate(item.id)}
      className="flex flex-col items-center justify-end flex-1 min-w-0 -mt-4 pb-1 transition-transform active:scale-95"
      aria-label={item.label}
    >
      <div
        className="relative flex items-center justify-center size-[52px] rounded-full overflow-hidden shrink-0 bg-[#0F766E]"
        style={{
          boxShadow: `0 -2px 12px ${NAV_TEAL_LIGHT}, 0 4px 14px ${NAV_TEAL_LIGHT}`,
        }}
      >
        {showLogo ? (
          <img
            src={LOGO_URL}
            alt="LakbAI"
            className="absolute inset-0 size-full w-full h-full object-contain p-0.5"
            onError={() => setLogoError(true)}
          />
        ) : (
          <Plus className="size-7 stroke-[2.5] text-white" strokeWidth={2.5} />
        )}
      </div>
      <span
        className={`text-[10px] leading-tight font-medium mt-1 truncate w-full ${
          isActive ? 'text-[#0F766E]' : 'text-gray-400'
        }`}
      >
        {item.label}
      </span>
    </button>
  );
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const leftItems = [
    { id: 'discovery' as Screen, icon: Compass, label: 'Discover' },
    { id: 'impact' as Screen, icon: BarChart3, label: 'Impact' },
  ];
  const centerItem = { id: 'optimizer' as Screen, icon: Route, label: 'Planning' };
  const rightItems = [
    { id: 'rewards' as Screen, icon: Award, label: 'Rewards' },
    { id: 'saved' as Screen, icon: BookmarkCheck, label: 'Saved' },
  ];

  const renderTab = (
    item: { id: Screen; icon: typeof Compass; label: string },
    isCenter = false
  ) => {
    const Icon = item.icon;
    const isActive = currentScreen === item.id;

    if (isCenter) {
      return (
        <CenterPlanningButton
          key={item.id}
          item={item}
          isActive={isActive}
          onNavigate={onNavigate}
        />
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => onNavigate(item.id)}
        className={`flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 h-full rounded-lg transition-all active:scale-95 ${
          isActive ? '' : 'text-gray-400 active:text-gray-500'
        }`}
      >
        <span className="relative flex flex-col items-center">
          {isActive && (
            <span
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full -translate-y-full"
              style={{ background: NAV_TEAL }}
            />
          )}
          <Icon
            className="size-6 shrink-0"
            style={
              isActive
                ? { color: NAV_TEAL, fill: NAV_TEAL }
                : undefined
            }
          />
        </span>
        <span
          className={`text-[10px] leading-tight font-medium truncate w-full ${
            isActive ? '' : 'text-gray-400'
          }`}
          style={isActive ? { color: NAV_TEAL } : undefined}
        >
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50 safe-area-inset-bottom shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-1">
        {leftItems.map((item) => renderTab(item))}
        {renderTab(centerItem, true)}
        {rightItems.map((item) => renderTab(item))}
      </div>
    </div>
  );
}
