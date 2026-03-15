import { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { DiscoveryDashboard } from './components/DiscoveryDashboard';
import { LocationDetail } from './components/LocationDetail';
import { RecommendedRoutes } from './components/RecommendedRoutes';
import { LocalStores } from './components/LocalStores';
import { ScoutSubmission } from './components/ScoutSubmission';
import { RewardsWallet } from './components/RewardsWallet';
import { ItineraryOptimizer } from './components/ItineraryOptimizer';
import { SmartItinerary } from './components/SmartItinerary';
import { SavedItineraries } from './components/SavedItineraries';
import { ImpactDashboard } from './components/ImpactDashboard';
import { PermitSystem } from './components/PermitSystem';
import { BottomNav } from './components/BottomNav';

export type Screen =
  | 'onboarding'
  | 'discovery'
  | 'location'
  | 'routes'
  | 'stores'
  | 'scout'
  | 'rewards'
  | 'optimizer'
  | 'itinerary'
  | 'saved'
  | 'impact'
  | 'permit';

export interface Location {
  id: string;
  name: string;
  province: string;
  hiddenScore: number;
  ecoHealth: number;
  crowdDensity: number;
  image: string;
  tags: string[];
  lat: number;
  lng: number;
}

export interface SavedTrip {
  id: string;
  name: string;
  destinations: number;
  days: number;
  avgHiddenScore: number;
  startDate: string;
  image: string;
  budget: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);

  const navigateTo = (screen: Screen, location?: Location) => {
    if (location) setSelectedLocation(location);
    setCurrentScreen(screen);
  };

  const handleSaveTrip = (trip: SavedTrip) => {
    setSavedTrips((prev) => [...prev, { ...trip, id: `${Date.now()}-${prev.length + 1}` }]);
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('discovery');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={completeOnboarding} />;
      case 'discovery':
        return <DiscoveryDashboard onNavigate={navigateTo} />;
      case 'location':
        return <LocationDetail location={selectedLocation} onNavigate={navigateTo} onBack={() => navigateTo('discovery')} />;
      case 'routes':
        return <RecommendedRoutes location={selectedLocation} onBack={() => navigateTo('location')} onNavigate={navigateTo} />;
      case 'stores':
        return <LocalStores onBack={() => navigateTo('discovery')} />;
      case 'scout':
        return <ScoutSubmission onBack={() => navigateTo('discovery')} />;
      case 'rewards':
        return <RewardsWallet onBack={() => navigateTo('discovery')} />;
      case 'optimizer':
        return <ItineraryOptimizer onNavigate={navigateTo} onBack={() => navigateTo('discovery')} />;
      case 'itinerary':
        return <SmartItinerary onNavigate={navigateTo} onBack={() => navigateTo('optimizer')} onSave={handleSaveTrip} />;
      case 'saved':
        return <SavedItineraries savedTrips={savedTrips} onNavigate={navigateTo} onBack={() => navigateTo('discovery')} />;
      case 'impact':
        return <ImpactDashboard onBack={() => navigateTo('discovery')} />;
      case 'permit':
        return <PermitSystem location={selectedLocation} onBack={() => navigateTo('location')} />;
      default:
        return <DiscoveryDashboard onNavigate={navigateTo} />;
    }
  };

  const showBottomNav = hasCompletedOnboarding && currentScreen !== 'onboarding';

  return (
    <div className="w-full h-screen bg-background overflow-hidden flex justify-center items-stretch">
      <div className="w-full max-w-md h-full flex flex-col bg-background shadow-[0_0_40px_rgba(0,0,0,0.15)]">
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>
        {showBottomNav && <BottomNav currentScreen={currentScreen} onNavigate={navigateTo} />}
      </div>
    </div>
  );
}
