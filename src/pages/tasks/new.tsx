import { Card, Form, Button, Icon } from "semantic-ui-react";
import { ChangeEvent, useState } from "react";

export default function newPage() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTask({ ...task, [name]: value });

  return (
    <div>
      <Card>
        <Card.Content>
          <Form>
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
