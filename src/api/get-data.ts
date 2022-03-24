// import { supabase } from "../supabase/init";
import { db } from "../firebase/firebase";
import { ref, Ref } from "vue";

export default function getDataFromDatabase() {
  const dataDB = ref<object>([]);
  const dataLoader = ref(false);
  const getDataDB = async () => {
    try {
      const dataBase = await db.collection("workouts").orderBy("date", "desc");
      const dbResult = await dataBase.get();
      const workouts: Array<object | string> = [];
      dbResult.forEach((doc: { id: string; data: () => object }) => {
        workouts.push({ workoutID: doc.id, data: doc.data() });
      });

      dataDB.value = workouts;
      console.log(dataDB);
      dataLoader.value = true;
    } catch (error) {
      console.log(error);
    }
  };

  return { getDataDB, dataDB, dataLoader };
}
