import { supabase } from "../supabase/init";
import { uid } from "uid";

export default function createExercises(
  workoutType,
  exercises,
  workoutName,
  statusMsg,
  errorMsg
) {
  const addExercise = () => {
    if (workoutType.value === "strength") {
      exercises.value.push({
        id: uid(),
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
      });
      return;
    }
    if (workoutType.value === "cardio") {
      exercises.value.push({
        id: uid(),
        cardioType: "",
        distance: "",
        duration: "",
        pace: "",
      });
    }
  };

  //Create workout
  const createWorkout = async () => {
    try {
      const { error } = await supabase.from("workouts").insert([
        {
          workoutName: workoutName.value,
          workoutType: workoutType.value,
          exercises: exercises.value,
        },
      ]);
      if (error) throw error;
      statusMsg.value = "Succes: Workout Created!";
      workoutName.value = null;
      workoutType.value = "select-workout";
      exercises.value = [];

      setInterval(() => {
        statusMsg.value = null;
      }, 5000);
    } catch (error) {
      errorMsg.value = `Error: ${error.message}`;
      setInterval(() => {
        errorMsg.value = null;
      }, 5000);
    }
  };

  // Delete exercise
  const deleteWorkout = (id) => {
    if (exercises.value.length > 1) {
      exercises.value = exercises.value.filter((e) => e.id !== id);
      return;
    }
    errorMsg.value = "Error:Can't remove,need to at least have one exercise";
    setInterval(() => {
      errorMsg.value = null;
    }, 5000);
  };

  return { addExercise, createWorkout, deleteWorkout };
}
