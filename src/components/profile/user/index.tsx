import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../..//styles/profile.module.scss";

const UserForm = () => {
  return (
    <>
      <Form className={styles.form}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>NT</p>
          <p className={styles.userName}>Name Test</p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="Profile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Membro desde <br />
            20 de Abril de 2020
          </p>
        </div>
        <hr />
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label}>Nome</Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Qual seu primeiro nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={"name"}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label}>Sobrenome</Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Qual seu ultimo nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={"test"}
            />
          </FormGroup>
        </div>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for="phone">
              Whatsapp / Telegram
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              placeholder="(xx) 9xxxx-xxxx"
              required
              className={styles.input}
              value={"+55 (21) 99999-9999"}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="email">
              E-mail
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="Coloque o seu email"
              required
              className={styles.input}
              value={"testeemail@gmail.com"}
            />
          </FormGroup>

          <Button className={styles.formBtn} outline>
            Salvar Alterações
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UserForm;
