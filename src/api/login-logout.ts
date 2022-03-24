import { ref } from "vue";
import { auth } from "../firebase/firebase";
import { useRouter } from "vue-router";
import Ilogin from "../types/auth";

export default function loginAndLogout(
  email: string,
  password: string
) {
  const errorMsg = ref("");
  const router = useRouter();
  //Login
  const login = async () => {
    try {
      auth.signInWithEmailAndPassword(email, password).then(() => {
        const user = auth.currentUser;
        router.push({ name: "Home" });
      });
    } catch (error) {
      errorMsg.value = `Error:${error}`;
      setInterval(() => {
        errorMsg.value = "";
      }, 5000);
    }
  };

  //Logout
  const logout = async () => {
    await auth.signOut();
    window.location.reload();
    router.push({ name: "Home" });
  };

  return { login, errorMsg, logout };
}
