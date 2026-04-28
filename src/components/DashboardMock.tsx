import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const data = [
  { name: 'Mon', value: 400, efficiency: 240 },
  { name: 'Tue', value: 300, efficiency: 139 },
  { name: 'Wed', value: 200, efficiency: 980 },
  { name: 'Thu', value: 278, efficiency: 390 },
  { name: 'Fri', value: 189, efficiency: 480 },
  { name: 'Sat', value: 239, efficiency: 380 },
  { name: 'Sun', value: 349, efficiency: 430 },
];

export const DashboardMock = () => {
  return (
    <div className="w-full h-full p-4 glass rounded-2xl overflow-hidden flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">System Status: Optimal</div>
      </div>

      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="col-span-2 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef233c" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef233c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="value" stroke="#ef233c" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar dataKey="efficiency" fill="#2b2d42" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-24 flex flex-col justify-center gap-1">
          <div className="text-[10px] text-white/40 uppercase">Automation Rate</div>
          <div className="text-2xl font-display font-bold text-brand-primary">94.2%</div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[94%] h-full bg-brand-primary shadow-[0_0_10px_rgba(239,35,60,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  );
};
