import { db, firebase } from "../firebase/firebase";
import { useRouter, useRoute } from "vue-router";
import { uid } from "uid";
import { ref, Ref } from "vue";
import Iworkouts from "../types/workoutsData";
import Iexercise from "../types/workoutsData";

export default function createExercises(
  workoutType: Ref<string>,
  exercises: Ref<never[]>,
  workoutName: Ref<string>,
  statusMsg: Ref<string | unknown>,
  errorMsg: Ref<string | null | unknown>,
  edit: Ref<boolean>
) {
  const route = useRoute();
  const router = useRouter();
  const data = ref<Iworkouts[]>([]);
  const dataLoaded = ref(false);
  const workouts: Iworkouts[] = [];

  const addExercise = () => {
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
      const dataBase = db.collection("workouts").orderBy("date", "desc");
      const dbResult = await dataBase.get();

      dbResult.forEach((doc) => {
        if (doc.id === currentId) {
          console.log(doc.id);
          workouts.push({ workoutID: doc.id, data: doc.data() });
        }
      });

      data.value = workouts;
      console.log(data.value);
      dataLoaded.value = true;
    } catch (error) {
      errorMsg.value = error;
      setTimeout(() => {
        errorMsg.value = "";
      }, 5000);
    }
  };

  //Create workout
  const createWorkout = async () => {
    try {
      const dataBase = db.collection("workouts").doc();
      dataBase.set({
        workoutName: workoutName.value,
        workoutType: workoutType.value,
        exercises: exercises.value,
        date: Date.now(),
      });

      statusMsg.value = "Succes: Workout Created!";
      workoutName.value = "";
      workoutType.value = "select-workout";
      exercises.value = [];

      setInterval(() => {
        statusMsg.value = null;
      }, 5000);
    } catch (error) {
      errorMsg.value = `Error: ${error}`;
      setInterval(() => {
        errorMsg.value = null;
      }, 5000);
    }
  };

  // Delete exercise
  const deleteWorkout = (id: string) => {
    if (data.value[0].data.exercises.length > 1) {
      data.value[0].data.exercises = data.value[0].data.exercises.filter(
        (e: Iexercise) => e.id !== id
      );
      return;
    }

    if (data.value[0].data.exercises.length > 1) {
      data.value[0].data.exercises = data.value[0].data.exercises.filter(
        (exercise: Iexercise) => exercise.id !== id
      );
      return;
    }
    errorMsg.value = "Error:Can't remove,need to at least have one exercise";
    setInterval(() => {
      errorMsg.value = null;
    }, 5000);
  };
  const currentId: any = route.params.id;
  //Delete workout
  const deleteWorkoutView = async () => {
    try {
      const getWorkout = db.collection("workouts").doc(currentId);
      await getWorkout.delete();

      router.push({ name: "Home" });
    } catch (error) {
      errorMsg.value = `Error: ${error}`;
      setTimeout(() => {
        errorMsg.value = "";
      }, 5000);
    }
  };

  // Update Workout
  const update = async () => {
    try {
      const dataBase = db.collection("workouts").doc(currentId);
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
      errorMsg.value = `Error: ${error}`;
      setTimeout(() => {
        errorMsg.value = "";
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
