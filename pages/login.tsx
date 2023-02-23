import Footer from "@/src/components/common/footer";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import ToastComponent from "@/src/components/common/toast";
import authService from "@/src/services/authService";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../styles/register.module.scss";

const Login = () => {
  const router = useRouter();
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("onebitflix-token")) {
      router.push("/home");
    }
  }, []);

  useEffect(() => {
    const registerSucces = router.query.registred;
    if (registerSucces === "true") {
      setToastColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Cadastro com sucesso!");
    }
  }, [router.query]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const params = { email, password };
    const { status } = await authService.login(params);
    if (status === 200) {
      router.push("/home");
    } else {
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Email ou senha incorreto!");
    }
  };

  return (
    <>
      <Head>
        <title>Onebitflix - Login</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/register"
          btnContent="Quero fazer parte"
        />
        <Container className="py-5">
          <p className={styles.formTitle}>Bem-vindo(a)</p>
          <Form className={styles.form} onSubmit={handleLogin}>
            <p className="text.center">
              <strong>Bem-vindo(a) ao Onebitflix</strong>
            </p>
            <FormGroup>
              <Label for="email" className={styles.label}>
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Qual o seu email?"
                required
                className={styles.input}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                Senha
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Qual o sua senha?"
                required
                className={styles.input}
              ></Input>
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>
              Entrar
            </Button>
          </Form>
          <ToastComponent
            isOpen={toastIsOpen}
            message={toastMessage}
            color={toastColor}
          />
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default Login;
