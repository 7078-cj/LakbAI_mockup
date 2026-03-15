import { useState } from 'react';
import { ArrowLeft, MapPin, AlertTriangle, DollarSign, FileText, Users } from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

type TabType = 'map' | 'economic' | 'safety' | 'scouts';

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [safetyLevel, setSafetyLevel] = useState<'green' | 'yellow' | 'red'>('green');

  return (
    <div className="size-full bg-background flex">
      <div className="w-64 bg-[#1E3A34] text-[#E8E1D4] p-6 space-y-6 shrink-0">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={onBack} className="size-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="size-5" />
          </button>
          <div>
            <h1 className="text-lg">LGU Command</h1>
            <p className="text-xs text-[#E8E1D4]/70">Dashboard</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('map')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'map' ? 'bg-[#3A7CA5] text-white' : 'hover:bg-white/10'
            }`}
          >
            <MapPin className="size-5" />
            <span>Live Heat Map</span>
          </button>
          <button
            onClick={() => setActiveTab('economic')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'economic' ? 'bg-[#3A7CA5] text-white' : 'hover:bg-white/10'
            }`}
          >
            <DollarSign className="size-5" />
            <span>Economic Flow</span>
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'safety' ? 'bg-[#3A7CA5] text-white' : 'hover:bg-white/10'
            }`}
          >
            <AlertTriangle className="size-5" />
            <span>Trail Safety</span>
          </button>
          <button
            onClick={() => setActiveTab('scouts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'scouts' ? 'bg-[#3A7CA5] text-white' : 'hover:bg-white/10'
            }`}
          >
            <FileText className="size-5" />
            <span>Scout Submissions</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-white/20">
          <div className="bg-white/10 rounded-xl p-4 space-y-2">
            <div className="text-xs text-[#E8E1D4]/70">Real-time Visitors</div>
            <div className="text-3xl">1,247</div>
            <div className="text-xs text-green-400 flex items-center gap-1">
              <Users className="size-3" />
              <span>+12% from yesterday</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'map' && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl text-primary mb-1">Live Visitor Heat Map</h2>
              <p className="text-sm text-muted-foreground">Real-time tourist distribution</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-green-100 via-blue-100 to-red-100 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-8">
                  {Array.from({ length: 96 }).map((_, i) => {
                    const density = Math.random();
                    const color =
                      density > 0.7
                        ? 'bg-red-500'
                        : density > 0.4
                        ? 'bg-yellow-500'
                        : 'bg-green-500';
                    return (
                      <div
                        key={i}
                        className={`${color} m-0.5 rounded`}
                        style={{ opacity: density }}
                      ></div>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-4 bg-green-500 rounded"></div>
                  <span className="text-muted-foreground">Low Density</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-4 bg-yellow-500 rounded"></div>
                  <span className="text-muted-foreground">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-4 bg-red-500 rounded"></div>
                  <span className="text-muted-foreground">High (Alert)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="text-red-900 text-sm mb-1">Overcrowded</div>
                <div className="text-2xl text-red-600">3</div>
                <div className="text-xs text-red-700">Locations need intervention</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="text-yellow-900 text-sm mb-1">Moderate</div>
                <div className="text-2xl text-yellow-600">8</div>
                <div className="text-xs text-yellow-700">Locations to monitor</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="text-green-900 text-sm mb-1">Optimal</div>
                <div className="text-2xl text-green-600">15</div>
                <div className="text-xs text-green-700">Locations healthy</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'economic' && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl text-primary mb-1">Economic Flow</h2>
              <p className="text-sm text-muted-foreground">Capital distribution per municipality</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#3A7CA5] to-[#5FAD56] text-white rounded-xl p-5">
                  <div className="text-sm text-white/80 mb-2">Total Revenue</div>
                  <div className="text-3xl mb-1">₱2.4M</div>
                  <div className="text-xs text-white/90">This month</div>
                </div>
                <div className="bg-gradient-to-br from-[#1E3A34] to-[#2C5648] text-white rounded-xl p-5">
                  <div className="text-sm text-white/80 mb-2">Local Businesses</div>
                  <div className="text-3xl mb-1">287</div>
                  <div className="text-xs text-white/90">Active partners</div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { municipality: 'Batad', revenue: '₱850K', percentage: 85 },
                  { municipality: 'Calaguas', revenue: '₱620K', percentage: 62 },
                  { municipality: 'Danjugan', revenue: '₱480K', percentage: 48 },
                  { municipality: 'Sagada', revenue: '₱450K', percentage: 45 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-primary">{item.municipality}</span>
                      <span className="text-sm text-primary">{item.revenue}</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#3A7CA5] to-[#5FAD56]"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl text-primary mb-1">Trail Safety Panel</h2>
              <p className="text-sm text-muted-foreground">Monitor and broadcast alerts</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
              <div>
                <label className="text-primary mb-3 block">Safety Status</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSafetyLevel('green')}
                    className={`flex-1 py-4 rounded-xl transition-all ${
                      safetyLevel === 'green'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    Green
                  </button>
                  <button
                    onClick={() => setSafetyLevel('yellow')}
                    className={`flex-1 py-4 rounded-xl transition-all ${
                      safetyLevel === 'yellow'
                        ? 'bg-yellow-500 text-white shadow-lg'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }`}
                  >
                    Yellow
                  </button>
                  <button
                    onClick={() => setSafetyLevel('red')}
                    className={`flex-1 py-4 rounded-xl transition-all ${
                      safetyLevel === 'red'
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Red
                  </button>
                </div>
              </div>

              <button className="w-full py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                <AlertTriangle className="size-5" />
                <span>Emergency Broadcast</span>
              </button>

              <div className="space-y-3">
                <h3 className="text-primary">Recent Alerts</h3>
                <div className="space-y-2">
                  {[
                    { message: 'Weather warning: Heavy rain expected', time: '2 hours ago', level: 'yellow' },
                    { message: 'Trail closure: Batad North Route', time: '5 hours ago', level: 'red' },
                    { message: 'All clear: Routes reopened', time: '1 day ago', level: 'green' },
                  ].map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className={`size-2 rounded-full mt-1.5 ${
                        alert.level === 'red' ? 'bg-red-500' :
                        alert.level === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="text-sm text-primary">{alert.message}</div>
                        <div className="text-xs text-muted-foreground">{alert.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scouts' && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl text-primary mb-1">Scout Submissions</h2>
              <p className="text-sm text-muted-foreground">Review community discoveries</p>
            </div>

            <div className="space-y-4">
              {[
                { id: '1', user: 'Juan D.', location: 'Hidden Waterfall', status: 'pending', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&q=80' },
                { id: '2', user: 'Maria S.', location: 'Secret Beach', status: 'pending', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&q=80' },
                { id: '3', user: 'Pedro R.', location: 'Mountain Trail', status: 'approved', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80' },
              ].map((submission) => (
                <div key={submission.id} className="bg-white rounded-2xl p-5 shadow-md">
                  <div className="flex gap-4">
                    <img src={submission.image} alt={submission.location} className="size-24 rounded-xl object-cover shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-primary">{submission.location}</h3>
                          <p className="text-xs text-muted-foreground">Submitted by {submission.user}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          submission.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {submission.status}
                        </span>
                      </div>
                      {submission.status === 'pending' && (
                        <div className="flex gap-2 mt-3">
                          <button className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Approve
                          </button>
                          <button className="flex-1 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
