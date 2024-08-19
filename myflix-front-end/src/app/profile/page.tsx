"use client";

import { Button, Col, Container, Form, Row } from "reactstrap";
import styles from "../../styles/profile.module.scss";
import { UserForm } from "@/components/profile/User/user";
import { HeaderAuth } from "@/components/common/HeaderAuth/headerAuth";
import { Footer } from "@/components/common/Footer/footer";
import { useState } from "react";
import { PasswordForm } from "@/components/profile/Password/password";

const Profile = () => {
  const [form, setForm] = useState("userForm");

  return (
    <>
      <main>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <Container calssName="py-5">
          <p className={styles.title}>Minha Conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button
                outline
                className={styles.renderFormBtn}
                style={{ color: form === "userForm" ? "#FF0044" : "white" }}
                onClick={() => {
                  setForm("userForm");
                }}
              >
                DADOS PESSOAIS
              </Button>
              <Button
                outline
                className={styles.renderFormBtn}
                style={{ color: form === "passwordForm" ? "#FF0044" : "white" }}
                onClick={() => {
                  setForm("passwordForm");
                }}
              >
                SENHA
              </Button>
            </Col>
            <Col md>
              {form === "userForm" ? <UserForm /> : <PasswordForm />}
            </Col>
          </Row>
        </Container>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Profile;
