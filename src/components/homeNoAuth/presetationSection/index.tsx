import Link from "next/link";
import { Button, Col, Container, Row } from "reactstrap";
import styles from "./styles.module.scss";

const PresentationSection = () => {
  return (
    <>
      <Container className="py-4">
        <Row>
          <Col
            md
            className="d-flex flex-column justify-content-center align-itens-start"
          >
            <p className={styles.subTitle}>Acesso Ilimitado</p>
            <p className={styles.title}>
              Tenha acesso aos melhores
              <br /> tutoriais de programação.
            </p>
            <p className={styles.description}>
              Estude de onde estiver a qualquer momento e continue <br />{" "}
              evoluindo como programador.
            </p>
            <Link href="/register">
              <Button outline className={styles.btnCta}>
                Acesse agora{" "}
                <img
                  src="/buttonPlay.svg"
                  alt="buttonImg"
                  className={styles.btnImg}
                />
              </Button>
            </Link>
          </Col>
          <Col md>
            <img
              src="/homeNoAuth/imgPresentation.png"
              alt="imgIndex"
              className={styles.imgPresentation}
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center pt-5">
            <img
              src="/homeNoAuth/iconArrowDown.svg"
              alt="arrowDown"
              className={styles.arrowDown}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PresentationSection;
