import profileService from "@/src/services/profileService";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../..//styles/profile.module.scss";
import ToastComponent from "../../common/toast";

const UserForm = () => {
  const router = useRouter();
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState(email);
  const [created_at, setCreated_at] = useState("");
  const date = new Date(created_at);
  const month = date.toLocaleDateString("default", { month: "long" });
  const [initials, setInitials] = useState("");

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      const firstNameInitial = user.firstName.slice(0, 1);
      const lastNameInitial = user.lastName.slice(0, 1);
      setInitials(firstNameInitial + lastNameInitial);
    });
  }, []);

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone);
      setEmail(user.email);
      setInitialEmail(user.email);
      setCreated_at(user.createdAt);
    });
  }, []);

  const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await profileService.userUpdate({
      firstName,
      lastName,
      phone,
      email,
      created_at,
    });
    if (res === 200) {
      setToastIsOpen(true);
      setErrorMessage("Informações alteradas com sucesso!");
      setColor("bg-success");
      setTimeout(() => setToastIsOpen(false), 3000);
      if (email != initialEmail) {
        sessionStorage.clear();
        router.push("/");
      }
    } else {
      setToastIsOpen(true);
      setErrorMessage("Você não pode mudar para este email!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 3000);
    }
  };

  return (
    <>
      <Form onSubmit={handleUserUpdate} className={styles.form}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>{initials}</p>
          <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="Profile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Membro desde <br />
            {`${date.getDate()} de ${month} de ${date.getFullYear()}`}
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
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
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
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
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
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
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
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </FormGroup>

          <Button className={styles.formBtn} outline>
            Salvar Alterações
          </Button>
        </div>
      </Form>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
};

export default UserForm;
