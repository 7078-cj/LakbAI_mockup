import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarPlannerProps {
  onBack: () => void;
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

const travelBlocks = [
  { start: 15, end: 17, destination: 'Calaguas Islands', color: 'bg-blue-500' },
  { start: 18, end: 18, destination: 'Danjugan Island', color: 'bg-green-500' },
  { start: 19, end: 21, destination: 'Batad Rice Terraces', color: 'bg-amber-500' },
];

export function CalendarPlanner({ onBack }: CalendarPlannerProps) {
  const [currentMonth, setCurrentMonth] = useState('March 2026');

  const getDayBlock = (day: number) => {
    return travelBlocks.find((block) => day >= block.start && day <= block.end);
  };

  return (
    <div className="size-full bg-background overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 z-10">
        <button onClick={onBack} className="size-10 flex items-center justify-center">
          <ArrowLeft className="size-5 text-primary" />
        </button>
        <div>
          <h1 className="text-lg text-primary">Calendar Planner</h1>
          <p className="text-xs text-muted-foreground">Drag to edit travel dates</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <button className="size-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="size-5 text-primary" />
            </button>
            <h2 className="text-lg text-primary">{currentMonth}</h2>
            <button className="size-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
              <ChevronRight className="size-5 text-primary" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {monthDays.map((day) => {
              const block = getDayBlock(day);
              const isToday = day === 10;

              return (
                <div key={day} className="relative aspect-square">
                  <div
                    className={`size-full rounded-lg flex items-center justify-center text-sm transition-all ${
                      block
                        ? `${block.color} text-white shadow-md`
                        : isToday
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    } ${day < 10 ? 'opacity-50' : ''}`}
                  >
                    {day}
                  </div>
                  {block && day === block.start && (
                    <div className="absolute -bottom-6 left-0 right-0 text-[0.6rem] text-center text-gray-600 truncate px-0.5">
                      {block.destination.split(' ')[0]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-md space-y-4">
          <h3 className="text-primary">Travel Timeline</h3>
          <div className="space-y-3">
            {travelBlocks.map((block, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className={`size-4 rounded-full ${block.color}`}></div>
                <div className="flex-1">
                  <div className="text-sm text-primary">{block.destination}</div>
                  <div className="text-xs text-muted-foreground">
                    Mar {block.start} - Mar {block.end}, 2026
                  </div>
                </div>
                <button className="px-3 py-1 text-xs border border-gray-200 rounded-lg text-primary hover:bg-gray-100 transition-colors">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#1E3A34] to-[#3A7CA5] text-white rounded-2xl p-5">
          <h3 className="text-lg mb-2">Trip Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl">7</div>
              <div className="text-xs text-white/80">Days</div>
            </div>
            <div>
              <div className="text-2xl">3</div>
              <div className="text-xs text-white/80">Destinations</div>
            </div>
            <div>
              <div className="text-2xl">9.0</div>
              <div className="text-xs text-white/80">Avg Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
