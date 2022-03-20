// import { supabase } from "../supabase/init";

export default function getDataFromDatabase(dataDB, dataLoader) {
  const getDataDB = async () => {
    try {
      console.log(dataDB.value, dataLoader.value);
      //   const { data: workouts, error } = await supabase
      //     .from("workouts")
      //     .select("*");
      //   if (error) throw error;
      //   dataDB.value = workouts;
      dataLoader.value = true;
    } catch (error) {
      console.warn(error.message);
    }
  };

  return { getDataDB };
}
