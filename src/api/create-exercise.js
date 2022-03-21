// import { supabase } from "../supabase/init";
import { db } from "../firebase/firebase";
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
    console.log(data.value[0].data);
    if (data.value[0].data.workoutType === "strength") {
      data.value[0].data.exercises.push({
        id: uid(),
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
      });
      return;
    }
    if (data.value[0].data.workoutType === "cardio") {
      data.value[0].data.exercises.push({
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
      const dataBase = await db.collection("workouts").orderBy("date", "desc");
      const dbResult = await dataBase.get();
      const workouts = [];
      dbResult.forEach((doc) => {
        if (doc.id === currentId) {
          console.log(doc.id);
          workouts.push({ workoutID: doc.id, data: doc.data() });
        }
      });
      //   const { data: workouts, error } = await supabase
      //     .from("workouts")
      //     .select("*")
      //     .eq("id", currentId);

      data.value = workouts;
      console.log(data.value);
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
      const dataBase = await db.collection("workouts").doc();
      dataBase.set({
        workoutName: workoutName.value,
        workoutType: workoutType.value,
        exercises: exercises.value,
        date: Date.now(),
      });
      //   const { error } = await supabase.from("workouts").insert([
      //     {
      //       workoutName: workoutName.value,
      //       workoutType: workoutType.value,
      //       exercises: exercises.value,
      //     },
      //   ]);
      //   if (error) throw error;
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
    if (data.value[0].data.exercises.length > 1) {
      data.value[0].data.exercises = data.value[0].data.exercises.filter(
        (e) => e.id !== id
      );
      return;
    }

    if (data.value[0].data.exercises.length > 1) {
      data.value[0].data.exercises = data.value[0].data.exercises.filter(
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
      const getWorkout = await db.collection("workouts").doc(currentId);
      await getWorkout.delete();
      //   const { error } = await supabase
      //     .from("workouts")
      //     .delete()
      //     .eq("id", currentId);
      //   if (error) throw error;
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
      const dataBase = await db.collection("workouts").doc(currentId);
      const dbRes = await dataBase.get();
      console.log(data.value[0].data);
      console.log(data.value);
      console.log(dbRes);
      await dataBase
        .update({
          workoutName: data.value[0].data.workoutName,
          exercises: data.value[0].data.exercises,
        })
        .then(() => {
          edit.value = false;
          statusMsg.value = "Success: Workout Updated!";
          setTimeout(() => {
            statusMsg.value = false;
          }, 5000);
        });
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
