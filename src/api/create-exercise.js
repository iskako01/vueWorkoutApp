import { supabase } from "../supabase/init";
import { useRouter, useRoute } from "vue-router";
import { uid } from "uid";
import { ref } from "vue";

export default function createExercises(
  workoutType,
  exercises,
  workoutName,
  statusMsg,
  errorMsg,
  edit
) {
  const route = useRoute();
  const router = useRouter();
  const data = ref(null);
  const dataLoaded = ref(null);

  const currentId = route.params.id;
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
  //Get data from database
  const getDataWorkout = async () => {
    try {
      const { data: workouts, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("id", currentId);
      if (error) throw error;
      data.value = workouts[0];
      dataLoaded.value = true;
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = false;
      }, 5000);
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

    if (data.value.exercises.length > 1) {
      data.value.exercises = data.value.exercises.filter(
        (exercise) => exercise.id !== id
      );
      return;
    }
    errorMsg.value = "Error:Can't remove,need to at least have one exercise";
    setInterval(() => {
      errorMsg.value = null;
    }, 5000);
  };

  //Delete workout
  const deleteWorkoutView = async () => {
    try {
      const { error } = await supabase
        .from("workouts")
        .delete()
        .eq("id", currentId);
      if (error) throw error;
      router.push({ name: "Home" });
    } catch (error) {
      errorMsg.value = `Error: ${error.message}`;
      setTimeout(() => {
        errorMsg.value = false;
      }, 5000);
    }
  };

  // Update Workout
  const update = async () => {
    try {
      const { error } = await supabase
        .from("workouts")
        .update({
          workoutName: data.value.workoutName,
          exercises: data.value.exercises,
        })
        .eq("id", currentId);
      if (error) throw error;
      edit.value = false;
      statusMsg.value = "Success: Workout Updated!";
      setTimeout(() => {
        statusMsg.value = false;
      }, 5000);
    } catch (error) {
      errorMsg.value`Error: ${error.message}`;
      setTimeout(() => {
        errorMsg.value = false;
      }, 5000);
    }
  };

  return {
    addExercise,
    createWorkout,
    deleteWorkout,
    getDataWorkout,
    deleteWorkoutView,
    update,
    data,
    dataLoaded,
  };
}
