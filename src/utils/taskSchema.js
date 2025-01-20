import * as Yup from "yup";

export let taskSchema = Yup.object({
  content: Yup.string().required("Content is required"),
  deadline: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Date is required")
    .min(new Date(), "Date must be later than today"),
  importance: Yup.string().required("Priority is required"),
});
