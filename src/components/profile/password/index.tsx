import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../..//styles/profile.module.scss";

const PasswordForm = () => {
  return (
    <>
      <Form className={styles.form}>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label for="currentPassword" className={styles.label}>
              Senha atual
            </Label>
            <Input
              name="currentPassword"
              type="password"
              id="currentPassword"
              placeholder="**********"
              required
              minLength={6}
              maxLength={12}
              className={styles.input}
            />
          </FormGroup>
        </div>
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label}>Nova Senha</Label>
            <Input
              name="newPassword"
              type="password"
              id="newPassword"
              placeholder="********"
              required
              minLength={6}
              maxLength={12}
              className={styles.inputFlex}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label}>Confirme nova senha</Label>
            <Input
              name="confirmNewPassword"
              type="password"
              id="confirmNewPassword"
              placeholder="********"
              required
              minLength={6}
              maxLength={12}
              className={styles.inputFlex}
            />
          </FormGroup>
          <Button className={styles.formBtn} outline>
            Salvar
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PasswordForm;
