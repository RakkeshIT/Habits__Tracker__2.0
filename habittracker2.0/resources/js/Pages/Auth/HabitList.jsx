import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { CheckCircle, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { motion } from 'framer-motion'
import axios from 'axios'

const HabitList = ({ habitsList }) => {
    const [habits, setHabits] = useState(habitsList);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const toggleComplete =async (id) => {
        try {
            const response = await axios.patch(`/habitcomplete/${id}/toggle-complete`)
           if(response.status === 200){
            const updateHabit = habits.map((pre) => pre.id === id ? { ...pre, completed: !response.data.completed } : pre)
            setHabits(updateHabit)
            console.log("Habit is Completed");
            
           }else{
            console.log("Habit is Not Completed");
            
           }
          
        } catch (error) {
            console.log("Something Error", error);
            
        }
       
        // setHabits((previousState) => previousState.map((habit) => habit.id === id ? { ...habit, completed: !habit.completed } : habit))
    }

    const toggleDelete = async (id) => {
        try {
            const response = await axios.delete(`/habit/${id}`)
            if(response.status === 200) {
                setHabits(habits.filter((habit) => habit.id !== id));
                console.log("Deleted");
            }else{
                console.log("Habit Not Deleted");
                
            }
        } catch (error) {
            console.log("Some thing Error", error);
            
        }
    }


    const formateDate = selectedDate ? new Date(selectedDate).toLocaleDateString("en-CA") : null;

    const filterHabits = showAll ? habits : habits.filter(
        (habit) => {
            const habitDate = habit.created_at ? habit.created_at.split('T')[0] : '';
            return habitDate === formateDate
        })
    
    

    return (
        <AuthenticatedLayout>
            <Head title='My Habits' />
            <motion.div
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: .5 }}
            >
                <div className="overflow-x-auto mt-6">
                    <div className="flex flex-col items-center mb-6">
                        <h2 className="text-xl font-bold mb-2">Select Date</h2>
                        <motion.div
                            whileHover={{ scale: 0.97 }}
                            whileTab={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Calendar
                                className='p-4 rounded-md'
                                onChange={(date) => { setSelectedDate(date); setShowAll(false) }}
                                value={selectedDate}
                                tileClassName={({ date, view }) => {
                                    const formatedDate = date.toLocaleDateString("en-CA");
                                    return formatedDate === formateDate
                                        ? "bg-blue-500 text-white rounded-lg"
                                        : ''
                                }
                                }

                            />
                        </motion.div>
                    </div>
                    <button onClick={() => setShowAll(!showAll)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 ">
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            All Habits
                        </span>
                    </button>

                    <table className="min-w-full bg-white border border-gray-300 rounded shadow-md">
                        <thead className="bg-blue-500 text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Habit Name</th>
                                <th className="px-4 py-2 text-left">Description</th>
                                <th className="px-4 py-2 text-center">Start Date</th>
                                <th className="px-4 py-2 text-center">End Date</th>
                                <th className="px-4 py-2 text-center">Created Date</th>
                                <th className="px-4 py-2 text-center">Complete</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterHabits.length > 0 ? (
                                filterHabits.map((habit, index) => (
                                    <tr key={habit.id} className={`border-b hover:bg-gray-100 ${habit.completed ? 'text-green-500 line-through' : ''}`}>
                                        <td className={`px-4 py-2 ${habit.completed ? 'text-decoration-line-through' : ''}`}>{index + 1}</td>
                                        <td className="px-4 py-2">{habit.name}</td>
                                        <td className="px-4 py-2">{habit.description}</td>
                                        <td className="px-4 py-2 text-center">{habit.start_date}</td>
                                        <td className="px-4 py-2 text-center">{habit.end_date}</td>
                                        <td className="px-4 py-2 text-center"> {new Date(habit.created_at).toLocaleDateString()}</td>
                                        <td className="px-4 py-2 text-center">
                                            <button
                                                onClick={() => toggleComplete(habit.id)}
                                                className={`p-2 rounded-ful ${habit.completed ? 'text-green-500' : 'text-gray-400'}`}
                                            >
                                                <CheckCircle size={22} />
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <button
                                                className="p-2 text-red-500 hover:text-red-700"
                                                onClick={() => toggleDelete(habit.id)}
                                            >
                                                <Trash2 size={22} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-4 py-3 text-center text-gray-500">
                                        No habits found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </motion.div>


        </AuthenticatedLayout>
    )
}

export default HabitList