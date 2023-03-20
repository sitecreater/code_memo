import { Container } from "semantic-ui-react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <div>
      <Navbar />
      <main
        style={{
          backgroundColor: "#white",
        }}
      >
        <Container
          style={{
            paddingTop: "2rem",
            height: "90vh",
          }}
        >
          {children}
        </Container>
      </main>
    </div>
  );
};
