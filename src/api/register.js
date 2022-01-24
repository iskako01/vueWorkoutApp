import { supabase } from "../supabase/init";
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
        let { error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
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
