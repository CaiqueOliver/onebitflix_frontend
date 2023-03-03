import HeaderAuth from "@/src/components/common/headerAuth";
import UserForm from "@/src/components/profile/user";
import Head from "next/head";
import { Button, Col, Container, Row } from "reactstrap";
import styles from "..//styles/profile.module.scss";

const UserInfo = () => {
  return (
    <>
      <Head>
        <title>Onebitflix - Meus Dados</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
        <Container className="py-5">
          <p className={styles.title}>Minha conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button className={styles.renderForm}>Dados pessoais</Button>
              <Button className={styles.renderForm}>Senha</Button>
            </Col>
            <Col md>
              <UserForm />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default UserInfo;
