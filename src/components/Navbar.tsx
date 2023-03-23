import { Container, Menu, Button } from "semantic-ui-react";
import Image from "next/image";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();

  return (
    <Menu inverted attached style={{ padding: "0.5rem" }} color="yellow">
      <Container>
        <Menu.Item onClick={() => router.push("/")}>
          <div style={{ color: "black" }}>
            <h2>Memo✍️</h2>
          </div>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Button onClick={() => router.push("/tasks/new")} primary>
              메모 하기
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
