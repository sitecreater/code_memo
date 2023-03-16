import { Card, Form, Grid, Button, Icon, Confirm } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Task } from "@/interfaces/Task";

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const inititalState = {
  title: "",
  description: "",
};
export default function NewPage() {
  const [task, setTask] = useState<Task>(inititalState);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const router = useRouter();

  const createTask = async (task: Task) =>
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const updateTask = async (id: string, task: Task) =>
    await fetch("http://localhost:3000/api/tasks/" + id, {
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
        updateTask(router.query.id, task);
      } else {
        createTask(task);
      }
      setTask(inititalState);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = ({ target: { name, value } }: ChangeInputHandler) => setTask({ ...task, [name]: value });

  const loadTask = async (id: string) => {
    const res = await fetch("http://localhost:3000/api/tasks/" + id);
    const task = await res.json();
    setTask({ title: task.title, description: task.description });
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks/" + id, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") loadTask(router.query.id);
  }, [router.query]);
  return (
    <div>
      <Card>
        <Card.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label htmlFor="title">Title:</label>
              <input type="text" placeholder="Write your title" name="title" onChange={handleChange} />
            </Form.Field>
            <Form.Field>
              <label htmlFor="description">description:</label>
              <textarea name="description" rows={2} placeholder="Write a description" onChange={handleChange} />
              <Button>
                <Icon name="save" />
                Save
              </Button>
            </Form.Field>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
