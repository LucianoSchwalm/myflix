import { HeaderGeneric } from "@/components/common/headerGeneric/headerGeneric";
import styles from "../../styles/registerLogin.module.scss";

const Register = () => {
  return (
    <>
      <main>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/login"
          btnContent="Quero fazer login"
        />
      </main>
    </>
  );
};

export default Register;
