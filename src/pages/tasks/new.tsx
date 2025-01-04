import { Layout } from "@/components/Layout";
import { Card, Form, Grid, Button, Icon, Confirm } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Task } from "@/interfaces/Tasks";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const inititalState = {
  title: "",
  description: "",
};

const NewPage = (): JSX.Element => {
  const [task, setTask] = useState<Task>(inititalState);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();

  // API URL from environment variables
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const createTask = async (task: Task) =>
    await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const updateTask = async (id: string, task: Task) =>
    await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (typeof router.query.id === "string") {
        await updateTask(router.query.id, task);
      } else {
        await createTask(task);
      }
      setTask(inititalState);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const handleChange = ({ target: { name, value } }: ChangeInputHandler) => setTask({ ...task, [name]: value });

  const loadTask = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/tasks/${id}`);
      if (!res.ok) throw new Error("Failed to fetch task");
      const task = await res.json();
      setTask({ title: task.title, description: task.description });
    } catch (error) {
      console.error("Error loading task:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") loadTask(router.query.id);
  }, [router.query]);

  return (
    <Layout>
      <Grid centered columns={3} verticalAlign="middle" style={{ height: "80%" }}>
        <Grid.Column>
          <Card>
            <Card.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label htmlFor="title">제목</label>
                  <input type="text" placeholder="제목" name="title" onChange={handleChange} value={task.title} autoFocus />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="description">내용:</label>
                  <textarea name="description" id="description" rows={2} placeholder="내용" onChange={handleChange} value={task.description}></textarea>
                </Form.Field>
                {router.query.id ? (
                  <Button color="teal" loading={loading}>
                    <Icon name="save" />
                    수정하기
                  </Button>
                ) : (
                  <Button primary loading={loading}>
                    <Icon name="save" />
                    저장하기
                  </Button>
                )}
              </Form>
            </Card.Content>
          </Card>

          {router.query.id && (
            <Button inverted color="red" onClick={() => setOpenConfirm(true)}>
              <Icon name="trash" />
              삭제
            </Button>
          )}
        </Grid.Column>
      </Grid>
      <Confirm header="메모 삭제" content={`정말 삭제하시겠습니까?`} open={openConfirm} onCancel={() => setOpenConfirm(false)} onConfirm={() => typeof router.query.id === "string" && handleDelete(router.query.id)} />
    </Layout>
  );
};

export default NewPage;
