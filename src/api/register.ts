import { db, auth, firebase } from "../firebase/firebase";
import { useRouter } from "vue-router";
import { Ref } from "vue";

export default function userRegistration(
  email: Ref<string>,
  password: Ref<string>,
  confirmPassword: Ref<string>,
  errorMsg: Ref<string | unknown>
) {
  const router = useRouter();
  const register = async () => {
    if (password.value === confirmPassword.value) {
      try {
        console.log(email.value, password.value);
        const createUser: firebase.auth.UserCredential | null = await auth.createUserWithEmailAndPassword(
          email.value,
          password.value
        );
        // firebase.auth.UserCredential;

        const result = createUser.user?.uid;
        const dataBase = db.collection("users").doc(result);
        await dataBase.set({
          login: email.value,
        });
        router.push({ name: "Login" });
      } catch (error) {
        errorMsg.value = error;
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
