import { db, auth } from "../firebase/firebase";
import { useRouter } from "vue-router";

export default function userRegistration(
  email,
  password,
  confirmPassword,
  errorMsg
) {
  const router = useRouter();
  const register = async () => {
    if (password.value === confirmPassword.value) {
      try {
        console.log(email.value, password.value);
        const createUser = auth.createUserWithEmailAndPassword(
          email.value,
          password.value
        );
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);
        await dataBase.set({
          login: email.value,
        });
        router.push({ name: "Login" });
      } catch (error) {
        errorMsg.value = error.message;
        setInterval(() => {
          errorMsg.value = null;
        }, 5000);
      }
      return;
    }
    errorMsg.value = "Error:Passords do not match";
    setInterval(() => {
      errorMsg.value = null;
    }, 5000);
  };
  return { register };
}
