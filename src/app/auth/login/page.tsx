"use client";

import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import Icon from "@/app/components/Icons/Icon";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { useFormik } from "formik";
import { loginUser } from "@/app/services/auth-services";
import { toast } from "sonner";
import { LoginFormValues } from "@/app/lib/types";
import Spinner from "@/app/components/Loader";
import Cookies from "js-cookie";
import Image from "next/image";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email Address is required")
    .email("Invalid email format"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (payload: LoginFormValues) => loginUser(payload),
    onSuccess: (data) => {
      toast.success(data.data.message);
      Cookies.set("access_token", data.data.data.token);
      router.push("/accounts");
    },
    onError: (error: any) => {
      toast.error(error.response.data.error.message);
    },
  });

  return (
    <div className="border-2 border-[#efefef] bg-white p-6 md:p-10 rounded-xl">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={130}
        height={34}
        className="md:hidden mb-5 mx-auto"
      />
      <div className="flex flex-col items-center">
        <Icon name="lock" />
        <h3 className="text-center text-xl font-semibold pb-10">Log In</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          label="Email Address"
          placeholder="Email address"
          formik={formik}
          {...formik.getFieldProps("email")}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Password"
          formik={formik}
          {...formik.getFieldProps("password")}
        />
        <Button
          className="w-full mt-5"
          disabled={!formik.isValid || isPending}
          primary
        >
          {isPending ? <Spinner forButton /> : "Login"}
        </Button>
      </form>
    </div>
  );
}
