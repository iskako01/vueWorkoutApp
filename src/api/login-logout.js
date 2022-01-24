import { ref } from "vue";
import { supabase } from "../supabase/init";
import { useRouter } from "vue-router";

export default function loginAndLogout(email, password) {
  const errorMsg = ref(null);
  const router = useRouter();
  //Login
  const login = async () => {
    try {
      let { error } = await supabase.auth.signIn({
        email: email.value,
        password: password.value,
      });
      if (error) throw error;
      router.push({ name: "Home" });
    } catch (error) {
      errorMsg.value = `Error:${error.message}`;
      setInterval(() => {
        errorMsg.value = null;
      }, 5000);
    }
  };

  //Logout
  const logout = async () => {
    await supabase.auth.signOut();
    router.push({ name: "Home" });
  };

  return { login, errorMsg, logout };
}
