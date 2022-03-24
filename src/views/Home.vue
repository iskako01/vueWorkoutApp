<template>
  {{ dataLoader }}
  <div v-if="dataLoader" class="container mt-10 px-4 ">
    <!-- No Data -->
    <div v-if="dataDB.length === 0" class="flex w-full flex-col items-center">
      <h1 class="text-2xl">Looks empty here...</h1>
      <router-link
        :to="{ name: 'Create' }"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green "
        >Create Workout</router-link
      >
    </div>

    <!-- Data -->
    <div
      v-else
      class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 "
    >
      <router-link
        class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
        :to="{ name: 'View-Workout', params: { id: workout.workoutID } }"
        v-for="(workout, index) in dataDB"
        :key="index"
      >
        <!-- Img Cardio -->
        <img
          v-if="workout.data.workoutType === 'cardio'"
          src="@/assets/images/running-light-green.png"
          class="h-24 w-auto"
          alt=""
        />
        <!-- Img strength -->
        <img
          v-if="workout.data.workoutType === 'strength'"
          src="@/assets/images/dumbbell-light-green.png"
          class="h-24 w-auto"
          alt=""
        />

        <p
          class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg"
        >
          {{ workout.data.workoutType }}
        </p>

        <h1 class="mt-8 mb-2 text-center text-xl text-at-light-green">
          {{ workout.data.workoutName }}
        </h1>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import getDataFromDatabase from "../api/get-data";
export default {
  name: "Home",
  components: {},
  setup() {
    // Get data
    const { getDataDB, dataDB, dataLoader } = getDataFromDatabase();
    // Run data function
    onMounted(async () => {
      await getDataDB();
    });
    return { dataDB, dataLoader };
  },
};
</script>
