import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
const Charts = ({ habitsList }) => {
    const [monthlyData, setMonthyData] = useState([]);

    // Formate Date
    const monthYear = (date) => date.slice(0, 7);

    useEffect(() => {

        const habitsCount = habitsList.reduce((acc, habits) => {
            const months = monthYear(habits.start_date);
            acc[months] = (acc[months] || 0) + 1;
            return acc;
        }, {})

        const chartDate = Object.keys(habitsCount).map((month) => ({
            month,
            habits: habitsCount[month],
        }))
        setMonthyData(chartDate);
    }, [habitsList]);
    return (
        <AuthenticatedLayout>
            <Head title='Habbits Chart' />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg mt-20"
            >
                <h2 className="text-lg font-bold text-center mb-4">📈 Monthly Habit Progress</h2>

                <ResponsiveContainer width="100%" height={300} >
                    <LineChart data={monthlyData}>
                        <XAxis dataKey="month" stroke="#8884d8" />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="habits" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>
        </AuthenticatedLayout>
    )
}

export default Charts