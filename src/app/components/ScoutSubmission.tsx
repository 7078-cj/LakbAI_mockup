import { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Upload, CheckCircle, Clock, XCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ScoutSubmissionProps {
  onBack: () => void;
}

type SubmissionStatus = 'idle' | 'preview' | 'submitted';

export function ScoutSubmission({ onBack }: ScoutSubmissionProps) {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageCapture = () => {
    setImagePreview('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80');
    setStatus('preview');
  };

  const handleSubmit = () => {
    setStatus('submitted');
  };

  if (status === 'submitted') {
    return (
      <div className="size-full bg-background flex flex-col">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 z-10">
          <button onClick={onBack} className="size-10 flex items-center justify-center">
            <ArrowLeft className="size-5 text-primary" />
          </button>
          <h1 className="text-lg text-primary">Submission Status</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="size-12 text-green-600" />
            </div>
            <h2 className="text-2xl text-primary">Submitted Successfully!</h2>
            <p className="text-muted-foreground">
              Your discovery has been sent to the LGU Command Center for review.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
                <div className="size-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="size-5 text-amber-600" />
                </div>
                <div className="text-left flex-1">
                  <div className="text-sm text-primary">Pending Review</div>
                  <div className="text-xs text-muted-foreground">Awaiting approval</div>
                </div>
              </div>

              <div className="h-px bg-gray-200"></div>

              <div className="text-xs text-muted-foreground text-left space-y-1">
                <p>Pipeline Status:</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 flex items-center gap-2">
                    <div className="size-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="size-4 text-green-600" />
                    </div>
                    <span className="text-xs text-green-700">Submitted</span>
                  </div>
                  <div className="size-1 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="size-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Clock className="size-4 text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-400">Review</span>
                  </div>
                  <div className="size-1 bg-gray-300 rounded-full"></div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="size-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="size-4 text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-400">Approved</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onBack}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
            >
              Return to Discovery
            </button>
          </div>
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
          <h1 className="text-lg text-primary">Local Scout</h1>
          <p className="text-xs text-muted-foreground">Report new discoveries</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-[#1E3A34] to-[#5FAD56] text-white rounded-2xl p-5">
          <h2 className="text-lg mb-2">Become a Scout</h2>
          <p className="text-sm text-white/90">
            Help discover hidden gems and contribute to the community. Your submissions help other
            travelers find undiscovered destinations.
          </p>
        </div>

        {status === 'idle' ? (
          <button
            onClick={handleImageCapture}
            className="w-full aspect-video bg-gray-100 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300"
          >
            <Camera className="size-12 text-gray-400" />
            <span className="text-gray-600">Tap to Capture Photo</span>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <ImageWithFallback src={imagePreview!} alt="Preview" className="size-full object-cover" />
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md space-y-4">
              <h3 className="text-primary">AI Analysis</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Mountain</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Crowd Estimate:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Low (15%)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Hazard Detection:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">None</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md space-y-3">
              <h3 className="text-primary flex items-center gap-2">
                <MapPin className="size-5" />
                Location
              </h3>
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                <div className="size-full bg-gradient-to-br from-green-200 to-blue-200 flex items-center justify-center">
                  <MapPin className="size-12 text-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Coordinates: 14.5995° N, 120.9842° E
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStatus('idle')}
                className="flex-1 py-3 border border-gray-200 text-primary rounded-xl hover:bg-gray-50 transition-colors"
              >
                Retake
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
              >
                Submit to LGU
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
