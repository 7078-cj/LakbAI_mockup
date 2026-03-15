import { useState } from 'react';
import { ArrowLeft, QrCode, Award, TrendingUp, Store, CheckCircle } from 'lucide-react';

interface RewardsWalletProps {
  onBack: () => void;
}

const recentScans = [
  { id: '1', merchant: "Aling Rosa's Eatery", points: 50, date: '2026-03-08', type: 'Restaurant' },
  { id: '2', merchant: 'Bayani Handicrafts', points: 75, date: '2026-03-07', type: 'Crafts' },
  { id: '3', merchant: 'Mountain View Lodge', points: 150, date: '2026-03-05', type: 'Accommodation' },
];

export function RewardsWallet({ onBack }: RewardsWalletProps) {
  const [showScanner, setShowScanner] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const totalPoints = 2450;

  const handleScan = () => {
    setScanComplete(true);
    setTimeout(() => {
      setScanComplete(false);
      setShowScanner(false);
    }, 3000);
  };

  if (scanComplete) {
    return (
      <div className="size-full bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="size-12 text-green-600" />
          </div>
          <h2 className="text-2xl text-primary">Payment Successful!</h2>
          <p className="text-muted-foreground">You supported Aling Rosa's Eatery</p>
          <div className="bg-gradient-to-r from-[#1E3A34] to-[#3A7CA5] text-white rounded-2xl p-6">
            <div className="text-sm text-white/80 mb-1">Points Earned</div>
            <div className="text-4xl">+50</div>
          </div>
        </div>
      </div>
    );
  }

  if (showScanner) {
    return (
      <div className="size-full bg-black flex flex-col">
        <div className="sticky top-0 bg-black/90 backdrop-blur-sm px-4 py-3 flex items-center gap-3 z-10">
          <button onClick={() => setShowScanner(false)} className="size-10 flex items-center justify-center">
            <ArrowLeft className="size-5 text-white" />
          </button>
          <h1 className="text-lg text-white">Scan QR Code</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="relative">
            <div className="size-72 border-4 border-white rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#3A7CA5] animate-pulse"></div>
              <div className="absolute top-4 left-4 size-8 border-t-4 border-l-4 border-[#3A7CA5] rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 size-8 border-t-4 border-r-4 border-[#3A7CA5] rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 size-8 border-b-4 border-l-4 border-[#3A7CA5] rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 size-8 border-b-4 border-r-4 border-[#3A7CA5] rounded-br-lg"></div>
            </div>
          </div>
          <p className="text-white/80 mt-8 text-center">
            Position the QR code within the frame
          </p>
          <button
            onClick={handleScan}
            className="mt-8 px-8 py-3 bg-[#3A7CA5] text-white rounded-xl hover:bg-[#3A7CA5]/90 transition-colors"
          >
            Simulate Scan
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
          <h1 className="text-lg text-primary">LakbAI Circular Economy</h1>
          <p className="text-xs text-muted-foreground">Your rewards wallet</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-br from-[#1E3A34] via-[#2C5648] to-[#3A7CA5] text-white rounded-3xl p-6 shadow-2xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-white/80 text-sm mb-1">Total Points</p>
              <h2 className="text-4xl">{totalPoints.toLocaleString()}</h2>
            </div>
            <div className="size-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Award className="size-6" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <TrendingUp className="size-4" />
            <span>+275 points this week</span>
          </div>
        </div>

        <button
          onClick={() => setShowScanner(true)}
          className="w-full py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 shadow-lg"
        >
          <QrCode className="size-6" />
          <span>Scan QR Code</span>
        </button>

        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="text-primary mb-4 flex items-center gap-2">
            <Store className="size-5" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentScans.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <div className="text-sm text-primary">{scan.merchant}</div>
                  <div className="text-xs text-muted-foreground">{scan.type} • {scan.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-600">+{scan.points}</div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="text-amber-900 mb-2">Redeem Points</h3>
          <p className="text-sm text-amber-800 mb-4">
            Convert your points to GCash or use them for discounts at partner businesses.
          </p>
          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors">
              GCash Payout
            </button>
            <button className="flex-1 py-3 border border-amber-600 text-amber-600 rounded-xl hover:bg-amber-50 transition-colors">
              View Rewards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
