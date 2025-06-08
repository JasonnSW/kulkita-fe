import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { register, createUnit, codeForm, InviteForm } from "../services/auth";
import { loginAction } from "../actions/auth";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginAction,
    onSuccess: () => {
      toast.success("Selamat datang kembali di Kulkita");
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Email atau password salah");
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Akun Anda telah dibuat. Silakan login.");
      router.push("/login");
    },
    onError: () => {
      toast.error("Terjadi kesalahan saat membuat akun");
    },
  });
}

export function useCreateUnit() {
  const router = useRouter();

  return useMutation({
    mutationFn: createUnit,
    onSuccess: () => {
      toast.success("Anda telah berhasil membuat unit SPPG baru");
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Terjadi kesalahan saat membuat unit SPPG");
    },
  });
}

export function useCodeForm() {
  const router = useRouter();

  return useMutation({
    mutationFn: codeForm,
    onSuccess: () => {
      toast.success("Anda telah berhasil membuat kode baru");
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Terjadi kesalahan saat membuat kode");
    },
  });
}

export function useInviteForm() {
  const router = useRouter();

  return useMutation({
    mutationFn: InviteForm,
    onSuccess: () => {
      toast.success("Anda telah berhasil membuat undangan baru");
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Terjadi kesalahan saat membuat undangan");
    },
  });
}
