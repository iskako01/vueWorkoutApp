import { firebase } from "../firebase/firebase";
export default interface Iexercise {
  id?: string;
  exercise?: string;
  sets?: string;
  reps?: string;
  weight?: string;
  cardioType?: string;
  distance?: string;
  duration?: string;
  pace?: string;
}

interface IworkoutData {
  date: Date;
  exercises: Iexercise[];
  workoutName: string;
  workoutType: string;
}
export default interface Iworkouts {
  workoutID: string;
  data: IworkoutData | firebase.firestore.DocumentData;
}
