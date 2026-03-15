import { Compass, Route, Award, BarChart3, BookmarkCheck } from 'lucide-react';
import type { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'discovery' as Screen, icon: Compass, label: 'Discover' },
    { id: 'optimizer' as Screen, icon: Route, label: 'Plan' },
    { id: 'rewards' as Screen, icon: Award, label: 'Rewards' },
    { id: 'impact' as Screen, icon: BarChart3, label: 'Impact' },
    { id: 'saved' as Screen, icon: BookmarkCheck, label: 'Saved' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50 safe-area-inset-bottom shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 h-full rounded-lg transition-all active:scale-95 ${
                isActive
                  ? 'text-primary'
                  : 'text-gray-500 active:text-gray-700'
              }`}
            >
              <Icon className={`size-5 ${isActive ? 'fill-primary' : ''}`} />
              <span className={`text-[10px] leading-tight font-medium truncate w-full ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
