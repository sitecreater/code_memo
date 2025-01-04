import { GetServerSideProps } from "next";
import { Button, Grid } from "semantic-ui-react";
import { Layout } from "@/components/Layout";
import { BiTaskX } from "react-icons/bi";
import { TaskList } from "@/components/tasks/TaskList";
import { useRouter } from "next/router";
import { Task } from "@/interfaces/Tasks";

interface Props {
  tasks: Task[];
}

const Home = ({ tasks }: Props) => {
  const { push } = useRouter();

  return (
    <Layout>
      {tasks.length === 0 ? (
        <Grid columns={3} centered verticalAlign="middle" style={{ height: "70%" }}>
          <Grid.Row>
            <Grid.Column>
              <div style={{ color: "#eee", textAlign: "center" }}>
                <BiTaskX size="15rem" />
                <h1>아무것도 없어요😢</h1>
                <Button onClick={() => push("/tasks/new")}>메모하기</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!process.env.API_URL) {
    throw new Error("API_URL 환경 변수가 설정되지 않았습니다.");
  }

  const apiUrl = process.env.API_URL;
  const res = await fetch(`${apiUrl}/api/tasks`);

  if (!res.ok) {
    return { notFound: true };
  }

  const tasks = await res.json();

  return {
    props: { tasks },
  };
};

export default Home;
