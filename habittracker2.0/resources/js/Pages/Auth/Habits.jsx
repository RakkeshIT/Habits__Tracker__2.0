import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Habits() {
  const [ habits, setHabits]  = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  // Get user Token
  // const userToken = localStorage.getItem('token');
  const handleChange = (e) => {
    setHabits({ ...habits, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      router.post('/habit',habits)
    } catch (error) {
      console.error('Error adding habit', error);

    }
  }

  return (
    <AuthenticatedLayout>
      <Head title="Create Habit" />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Habit</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div >
            <label className="block font-semibold">Habit Name:</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-md"
              value={habits.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Description:</label>
            <textarea
              name="description"
              className="w-full px-4 py-2 border rounded-md"
              value={habits.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold">Start Date:</label>
            <input
              type="date"
              name="start_date"
              className="w-full px-4 py-2 border rounded-md"
              value={habits.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">End Date:</label>
            <input
              type="date"
              name="end_date"
              className="w-full px-4 py-2 border rounded-md"
              value={habits.end_date}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save Habit
          </button>
        </form>
       
      </div>

    </AuthenticatedLayout>
  )
}