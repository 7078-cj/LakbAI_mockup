import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import type { Location } from '../App';

interface PermitSystemProps {
  location: Location | null;
  onBack: () => void;
}

const timeSlots = [
  { id: '1', time: '8:00 AM - 10:00 AM', remaining: 12, max: 20 },
  { id: '2', time: '10:00 AM - 12:00 PM', remaining: 5, max: 20 },
  { id: '3', time: '12:00 PM - 2:00 PM', remaining: 0, max: 20 },
  { id: '4', time: '2:00 PM - 4:00 PM', remaining: 8, max: 20 },
  { id: '5', time: '4:00 PM - 6:00 PM', remaining: 15, max: 20 },
];

export function PermitSystem({ location, onBack }: PermitSystemProps) {
  const [selectedDate, setSelectedDate] = useState('2026-03-15');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [permitSecured, setPermitSecured] = useState(false);

  if (!location) return null;

  const handleSecurePermit = () => {
    setPermitSecured(true);
  };

  if (permitSecured) {
    return (
      <div className="size-full bg-background flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="size-12 text-green-600" />
          </div>
          <h2 className="text-2xl text-primary">Permit Secured!</h2>
          <p className="text-muted-foreground">
            Your digital permit for {location.name} has been confirmed.
          </p>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date:</span>
              <span className="text-primary">March 15, 2026</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Time Slot:</span>
              <span className="text-primary">
                {timeSlots.find((s) => s.id === selectedSlot)?.time}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Permit ID:</span>
              <span className="text-primary font-mono">LKB-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
          </div>
          <button
            onClick={onBack}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
          >
            Return to Location
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full bg-background overflow-y-auto pb-20">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 z-10">
        <button onClick={onBack} className="size-10 flex items-center justify-center">
          <ArrowLeft className="size-5 text-primary" />
        </button>
        <div>
          <h1 className="text-lg text-primary">Permit System</h1>
          <p className="text-xs text-muted-foreground">{location.name}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <h3 className="text-amber-900 mb-2 flex items-center gap-2">
            <Users className="size-5" />
            Protected Ecosystem
          </h3>
          <p className="text-sm text-amber-800">
            This location has a Hidden Score of {location.hiddenScore}/10 and requires visitor management
            to preserve its natural state.
          </p>
        </div>

        <div className="space-y-3">
          <label className="text-primary flex items-center gap-2">
            <Calendar className="size-5" />
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min="2026-03-10"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-3">
          <label className="text-primary flex items-center gap-2">
            <Clock className="size-5" />
            Select Time Slot
          </label>
          <div className="space-y-2">
            {timeSlots.map((slot) => {
              const isAvailable = slot.remaining > 0;
              const isSelected = selectedSlot === slot.id;

              return (
                <button
                  key={slot.id}
                  onClick={() => isAvailable && setSelectedSlot(slot.id)}
                  disabled={!isAvailable}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : isAvailable
                      ? 'border-gray-200 hover:border-gray-300 bg-white'
                      : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${isAvailable ? 'text-primary' : 'text-gray-400'}`}>
                      {slot.time}
                    </span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        slot.remaining === 0
                          ? 'bg-red-100 text-red-700'
                          : slot.remaining < 5
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {slot.remaining > 0 ? `${slot.remaining} slots left` : 'Full'}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        slot.remaining === 0
                          ? 'bg-red-500'
                          : slot.remaining < 5
                          ? 'bg-amber-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${(slot.remaining / slot.max) * 100}%` }}
                    ></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSecurePermit}
          disabled={!selectedSlot}
          className="w-full py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Secure Digital Permit
        </button>
      </div>
    </div>
  );
}
