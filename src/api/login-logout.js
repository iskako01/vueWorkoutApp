import { ref } from "vue";
import { auth } from "../firebase/firebase";
import { useRouter } from "vue-router";

export default function loginAndLogout(email, password) {
  const errorMsg = ref(null);
  const router = useRouter();
  //Login
  const login = async () => {
    try {
      auth.signInWithEmailAndPassword(email.value, password.value).then(() => {
        const user = auth.currentUser;
        console.log(user.uid);
        router.push({ name: "Home" });
      });
    } catch (error) {
      errorMsg.value = `Error:${error.message}`;
      setInterval(() => {
        errorMsg.value = null;
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
