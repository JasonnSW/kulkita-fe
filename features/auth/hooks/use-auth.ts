import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  login,
  register,
  createUnit,
  codeForm,
  InviteForm,
} from "../services/auth";

export function useLogin() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast({
        title: "Login berhasil",
        description: "Selamat datang kembali di Kulkita",
      });
      router.push("/dashboard");
    },
    onError: () => {
      toast({
        title: "Gagal login",
        description: "Email atau password salah",
        variant: "destructive",
      });
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast({
        title: "Registrasi berhasil",
        description: "Akun Anda telah dibuat. Silakan login.",
      });
      router.push("/login");
    },
    onError: () => {
      toast({
        title: "Gagal registrasi",
        description: "Terjadi kesalahan saat membuat akun",
        variant: "destructive",
      });
    },
  });
}

export function useCreateUnit() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: createUnit,
    onSuccess: () => {
      toast({
        title: "Unit berhasil dibuat",
        description: "Anda telah berhasil membuat unit SPPG baru",
      });
      router.push("/dashboard");
    },
    onError: () => {
      toast({
        title: "Gagal membuat unit",
        description: "Terjadi kesalahan saat membuat unit SPPG",
        variant: "destructive",
      });
    },
  });
}

export function useCodeForm() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: codeForm,
    onSuccess: () => {
      toast({
        title: "Kode berhasil dibuat",
        description: "Anda telah berhasil membuat kode baru",
      });
      router.push("/dashboard");
    },
    onError: () => {
      toast({
        title: "Gagal membuat kode",
        description: "Terjadi kesalahan saat membuat kode",
        variant: "destructive",
      });
    },
  });
}

export function useInviteForm() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: InviteForm,
    onSuccess: () => {
      toast({
        title: "Undangan berhasil dibuat",
        description: "Anda telah berhasil membuat undangan baru",
      });
      router.push("/dashboard");
    },
    onError: () => {
      toast({
        title: "Gagal membuat undangan",
        description: "Terjadi kesalahan saat membuat undangan",
        variant: "destructive",
      });
    },
  });
}
