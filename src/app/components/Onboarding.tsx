import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    title: 'The LakbAI Oath',
    subtitle: 'You are entering a regenerative tourism ecosystem.',
    principle: 'Respect Local Communities',
    description: 'Honor traditions, culture, and the wisdom of indigenous peoples.',
  },
  {
    title: 'The LakbAI Oath',
    subtitle: 'You are entering a regenerative tourism ecosystem.',
    principle: 'Leave No Trace',
    description: 'Preserve nature for future generations by minimizing your impact.',
  },
  {
    title: 'The LakbAI Oath',
    subtitle: 'You are entering a regenerative tourism ecosystem.',
    principle: 'Support Rural Economies',
    description: 'Contribute to local micro-businesses and empower communities.',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [agreed, setAgreed] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="size-full relative bg-gradient-to-b from-[#1E3A34] to-[#2C5648] text-white flex flex-col">
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl tracking-tight">{slide.title}</h1>
            <p className="text-[#E8E1D4]/80 text-sm">{slide.subtitle}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="space-y-4">
              <div className="size-20 mx-auto rounded-full flex items-center justify-center overflow-hidden bg-black/30 ring-2 ring-white/20">
                <img src="/logo.png" alt="LakbAI" className="size-14 object-contain" />
              </div>
              <h2 className="text-xl">{slide.principle}</h2>
              <p className="text-[#E8E1D4]/90 text-sm leading-relaxed">{slide.description}</p>
            </div>
          </div>

          {isLastSlide && (
            <div className="flex items-start gap-3 justify-center">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 size-5 rounded border-white/30 bg-white/10 checked:bg-[#3A7CA5]"
              />
              <label htmlFor="agree" className="text-left text-sm text-[#E8E1D4]/90 cursor-pointer">
                I commit to responsible exploration
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 px-6 pb-8 space-y-6">
        <div className="flex justify-center gap-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentSlide ? 'w-8 bg-[#3A7CA5]' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          {currentSlide > 0 ? (
            <button
              onClick={prevSlide}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="size-5" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {isLastSlide ? (
            <button
              onClick={onComplete}
              disabled={!agreed}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#3A7CA5] hover:bg-[#3A7CA5]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Enter LakbAI</span>
            </button>
          ) : (
            <button
              onClick={nextSlide}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#3A7CA5] hover:bg-[#3A7CA5]/90 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="size-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
