import { Button, Form, Input } from "antd";

import useNotification from "@/constant/hooks/useNotification";
import { TError } from "@/constant/types";
import { useLogin } from "@/services/api/users/useLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./LoginStyle.module.scss";
export type TFormLogin = {
  userName: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { openNotification, contextHolder } = useNotification();
  const { mutateAsync: login } = useLogin();
  const [form] = Form.useForm<TFormLogin>();
  const onFinish = (values: TFormLogin) => {
    login(values)
      .then(res => {
        openNotification("top", "Success", "Login success");
        localStorage.setItem("token", res.token);
        setTimeout(() => {
          navigate("/news");
        }, 1500);
      })
      .catch((error: TError) => {
        openNotification("top", "Error", error.response.data, "error");
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/news");
    }
  }, []);

  return (
    <div className={style.containerLogin}>
      <div className={style.containerLogin__form}>
        {contextHolder}
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
          className={style.login_form}
        >
          <div className={style.wrapper_form}>
            <h3 className={style.textLogin}>Đăng Nhập</h3>
            <Form.Item name="userName" label="Username">
              <Input placeholder="Nhập tài khoản" required />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password placeholder="Nhập mật khẩu" required />
            </Form.Item>
            <div className={style.buttonLogin}>
              <Button htmlType="submit">Đăng nhập</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
