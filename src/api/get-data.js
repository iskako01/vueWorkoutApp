// import { supabase } from "../supabase/init";
import { db } from "../firebase/firebase";

export default function getDataFromDatabase(dataDB, dataLoader) {
  const getDataDB = async () => {
    try {
      console.log(dataDB.value, dataLoader.value);
      const dataBase = await db.collection("workouts").orderBy("date", "desc");
      const dbResult = await dataBase.get();
      const workouts = [];
      dbResult.forEach((doc) => {
        console.log(doc.id);
        workouts.push({ workoutID: doc.id, data: doc.data() });
      });
      //   const { data: workouts, error } = await supabase
      //     .from("workouts")
      //     .select("*");
      //   if (error) throw error;
      dataDB.value = workouts;
      console.log(dataDB.value);
      dataLoader.value = true;
    } catch (error) {
      console.warn(error.message);
    }
  };

  return { getDataDB };
}
