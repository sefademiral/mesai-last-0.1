// views/StatisticsView.tsx

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { CompletedJob } from '../types';
import { ChevronLeftIcon, DollarSignIcon, ClockIcon, BriefcaseIcon } from '../components/Icons';

interface StatisticsViewProps {
  completedJobs: CompletedJob[];
  onClose: () => void;
}

// Helper function to get the start of the week (Monday) for a given date.
const getWeekStart = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust to make Monday the start of the week
    const monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0, 0); // Normalize to start of day
    return monday;
};

export const StatisticsView: React.FC<StatisticsViewProps> = ({ completedJobs, onClose }) => {
    const { totalEarnings, totalHours, completedJobsCount, averageHourlyRate, weeklyData, categoryData } = useMemo(() => {
        let totalE = 0;
        let totalH = 0;
        const weekly: { [key: string]: number } = {};
        const categories: { [key: string]: number } = {};

        completedJobs.forEach(job => {
            totalE += job.earnings;
            totalH += job.hoursWorked;

            // Weekly earnings
            const jobDate = new Date(job.date);
            const weekStartDate = getWeekStart(jobDate);
            const weekKey = weekStartDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            weekly[weekKey] = (weekly[weekKey] || 0) + job.earnings;

            // Category earnings
            categories[job.category] = (categories[job.category] || 0) + job.earnings;
        });

        const sortedWeekly = Object.keys(weekly).sort((a,b) => new Date(a).getTime() - new Date(b).getTime())
            .map(weekKey => {
                const date = new Date(weekKey);
                return {
                    name: `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`, // Short date for XAxis
                    Kazanç: weekly[weekKey],
                };
            });

        const sortedCategories = Object.keys(categories).map(cat => ({
            name: cat,
            value: categories[cat],
        }));

        const avgHourly = totalH > 0 ? (totalE / totalH) : 0;

        return {
            totalEarnings: totalE,
            totalHours: totalH,
            completedJobsCount: completedJobs.length,
            averageHourlyRate: avgHourly,
            weeklyData: sortedWeekly,
            categoryData: sortedCategories,
        };
    }, [completedJobs]);

    const PIE_COLORS = ['#39FF14', '#00C49F', '#FFBB28', '#FF8042', '#A2D9CE', '#E892A2', '#8ECDDD'];

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-y-auto no-scrollbar">
            <header className="flex items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
                <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 ml-2">İstatistiklerim</h1>
            </header>

            <div className="p-4 space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                        <div className="p-2 rounded-full bg-green-100 mb-2"> <DollarSignIcon className="w-5 h-5 text-green-600" /></div>
                        <p className="text-lg font-bold text-gray-800">${totalEarnings.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Toplam Kazanç</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                        <div className="p-2 rounded-full bg-blue-100 mb-2"> <ClockIcon className="w-5 h-5 text-blue-600" /></div>
                        <p className="text-lg font-bold text-gray-800">{totalHours}</p>
                        <p className="text-sm text-gray-500">Toplam Saat</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                        <div className="p-2 rounded-full bg-purple-100 mb-2"> <BriefcaseIcon className="w-5 h-5 text-purple-600" /></div>
                        <p className="text-lg font-bold text-gray-800">{completedJobsCount}</p>
                        <p className="text-sm text-gray-500">Tamamlanan İş</p>
                    </div>
                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                        <div className="p-2 rounded-full bg-yellow-100 mb-2"> <DollarSignIcon className="w-5 h-5 text-yellow-600" /></div>
                        <p className="text-lg font-bold text-gray-800">${averageHourlyRate.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Ort. Saatlik Kazanç</p>
                    </div>
                </div>

                {/* Weekly Earnings Chart */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="font-bold text-lg mb-4 text-gray-800">Haftalık Kazançlar</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                            <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} />
                            <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 10, fill: '#6b7280' }} />
                            <Tooltip
                                cursor={{ fill: 'rgba(57, 255, 20, 0.1)' }}
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '8px 12px' }}
                                labelStyle={{ fontWeight: 'bold', color: '#111827', fontSize: '12px' }}
                                itemStyle={{ fontSize: '12px' }}
                                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Kazanç']}
                            />
                            <Bar dataKey="Kazanç" fill="#39FF14" radius={[4, 4, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Earnings by Category Chart */}
                {categoryData.length > 0 && (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="font-bold text-lg mb-4 text-gray-800">Kategoriye Göre Kazanç Dağılımı</h2>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={70}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                     contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '8px 12px' }}
                                     labelStyle={{ fontWeight: 'bold', color: '#111827', fontSize: '12px' }}
                                     itemStyle={{ fontSize: '12px' }}
                                     formatter={(value: number) => [`$${value.toFixed(2)}`, 'Kazanç']}
                                />
                                <Legend
                                    layout="vertical" align="right" verticalAlign="middle"
                                    wrapperStyle={{ fontSize: '12px', lineHeight: '18px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};
