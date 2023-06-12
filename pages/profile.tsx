import Footer from "@/src/components/common/footer";
import HeaderAuth from "@/src/components/common/headerAuth";
import PasswordForm from "@/src/components/profile/password";
import UserForm from "@/src/components/profile/user";
import Head from "next/head";
import { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import styles from "..//styles/profile.module.scss";

const UserInfo = () => {
  const [form, setForm] = useState("userForm");
  return (
    <>
      <Head>
        <title>Onebitflix - Meus Dados</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div>
          <HeaderAuth />
        </div>
        <Container className={styles.gridContainer}>
          <p className={styles.title}>Minha conta</p>
          <Row className="pt-3 pb-5">
            <Col md={3} className={styles.btnColumn}>
              <Button
                className={styles.renderForm}
                style={{ color: form === "userForm" ? "#ff0044" : "white" }}
                onClick={() => {
                  setForm("userForm");
                }}
              >
                Dados pessoais
              </Button>
              <Button
                className={styles.renderForm}
                style={{ color: form === "passwordForm" ? "#ff0044" : "white" }}
                onClick={() => {
                  setForm("passwordForm");
                }}
              >
                Senha
              </Button>
            </Col>
            <Col md={7}>
              {form === "userForm" ? <UserForm /> : <PasswordForm />}
            </Col>
          </Row>
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default UserInfo;
