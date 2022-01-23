<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <div
      v-if="statusMsg || errorMsg"
      class="md-10 p-4 bg-light-grey rounded-md shadow-lg"
    >
      <p class="text-at-light-green">{{ statusMsg }}</p>
      <p class="text-red-500">{{ errorMsg }}</p>
    </div>

    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg ">
      <form
        @submit.prevent="createWorkout"
        class="flex flex-col gap-y-5 w-full"
      >
        <h1 class="text-2xl text-at-light-green">Record Workout</h1>

        <!-- Workout Name -->
        <div class="flex flex-col">
          <label for="workout-type" class="md-1 text-sm text-at-light-green"
            >Workout Name</label
          >
          <input
            id="workout-name"
            type="text"
            required
            v-model="workoutName"
            class=" p-2 text-gray-500 focus:outline-none"
          />
        </div>
        <!-- Workout Type -->
        <div class="flex flex-col">
          <label for="workout-type" class="md-1 text-sm text-at-light-green"
            >Workout Type</label
          >
          <select
            @click="workoutChange"
            id="workout-type"
            v-model="workoutType"
            class="
            p-2 text-gray-500 focus:outline-none"
          >
            <option value="select-workout">Select Workout</option>
            <option value="strength">Strength Traning</option>
            <option value="cardio">Cardio Traning</option>
          </select>
        </div>
        <!-- Strength exercise -->
        <div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
          <div
            v-for="(exercise, index) in exercises"
            :key="index"
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
          >
            <div class="flex flex-col md:w-1/3">
              <label
                for="exercise-name"
                class="mb-1 text-sm text-at-light-green"
                >Exercise</label
              >
              <input
                id="exercise-name"
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none "
                v-model="exercise.exercise"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-light-green"
                >Sets</label
              >
              <input
                id="sets"
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none "
                v-model="exercise.sets"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-light-green"
                >Reps</label
              >
              <input
                id="reps"
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none "
                v-model="exercise.reps"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-at-light-green"
                >Weight</label
              >
              <input
                id="weight"
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none "
                v-model="exercise.weight"
              />
            </div>

            <img
              @click="deleteWorkout(exercise.id)"
              src="@/assets/images/trash-light-green.png"
              class="h-4 w-auto absolute -left-5 cursor-pointer "
            />
          </div>
          <button
            @click="addExercise"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green "
          >
            Add Exercise
          </button>
        </div>
        <!-- Cardio exercise -->
        <div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
          <div
            v-for="(exercise, index) in exercises"
            :key="index"
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
          >
            <div class="flex flex-col  flex-1">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green"
                >Type</label
              >
              <select
                id="cardio-type"
                class="p-2 w-full text-gray-500 focus:outline-none "
                v-model="exercise.cardioType"
              >
                <option value="#">Select Type</option>
                <option value="run">Runs</option>
                <option value="walk">Walk</option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-at-light-green"
                >Distance</label
              >
              <input
                id="distance"
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none "
                v-model="exercise.distance"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-at-light-green"
                >Duration</label
              >
              <input
                id="duration"
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none "
                v-model="exercise.duration"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-at-light-green"
                >Pace</label
              >
              <input
                id="pace"
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none "
                v-model="exercise.pace"
              />
            </div>

            <img
              @click="deleteWorkout(exercise.id)"
              src="@/assets/images/trash-light-green.png"
              class="h-4 w-auto absolute -left-5 cursor-pointer "
            />
          </div>
          <button
            @click="addExercise"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green "
          >
            Add Exercise
          </button>
        </div>

        <button
          type="submit"
          class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green "
        >
          Record Workout
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { uid } from "uid";
import { supabase } from "../supabase/init";

export default {
  name: "create",
  setup() {
    // Create data
    const workoutName = ref("");
    const workoutType = ref("select-workout");
    const exercises = ref([]);
    const statusMsg = ref(null);
    const errorMsg = ref(null);

    // Add exercise
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

    // Listens for chaging of workout type input
    const workoutChange = () => {
      exercises.value = [];
      addExercise();
    };

    // Create workout
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

    return {
      createWorkout,
      workoutType,
      workoutName,
      exercises,
      errorMsg,
      statusMsg,
      addExercise,
      workoutChange,
      deleteWorkout,
    };
  },
};
</script>
