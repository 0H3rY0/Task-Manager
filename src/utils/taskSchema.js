import * as Yup from "yup";

export let taskSchema = Yup.object({
  content: Yup.string().required("Content is required"),
  deadline: Yup.date().required("Deadline is required"),
  importance: Yup.string().required("Pioriety is required"),
});
