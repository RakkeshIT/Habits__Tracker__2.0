<?php

namespace App\Http\Controllers;

use App\Models\Habits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class habitController extends Controller
{
    public function index(): Response{
        $user = Auth::user();
        $habits = Habits::where('user_id',$user->id)->get();
        return Inertia::render('Auth/Habits',[
            'habitsList' => $habits,
        ]);
    }
    public function store(Request $request){
       $request->validate([
        'name' => 'required|string|max:250',
        'description' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
       ]);

       $habit = Habits::create([
        'user_id' => Auth::id(),
        'name' => $request->name,
        'description' => $request->description,
        'start_date' => $request->start_date,
        'end_date' => $request->end_date,
       ]);
       return redirect(route('habit.list'));
    }
    public function list(): Response{
        $user = Auth::user();
        $habits = Habits::where('user_id',$user->id)->get();
        return Inertia::render('Auth/HabitList',[
            'habitsList' => $habits,
        ]);
    }

    public function chart(): Response {
        $user = Auth::user();
        $habits = Habits::where('user_id', $user->id)->get();
        return Inertia::render('Auth/Charts', ['habitsList' => $habits]);
    }

    public function togglecompleted($id ){
        $habit = Habits::findOrFail($id);
        $habit->completed = !$habit->completed;
        $habit->save();

        return response()->json(['success' => true, 'completed' => $habit->completed]);
    }
    public function deletehabit($id ){
        $habit = Habits::find($id);
        $habit->delete();

        return response()->json();
    }
}
