import * as Yup from "yup";

export let projectSchema = Yup.object({
  Title: Yup.string().required("Title is required"),
  Description: Yup.string()
    .required("Description is required")
    .max(100, "Description cannot exceed 100 characters"),
  Deadline: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Date is required")
    .min(new Date(), "Date must be later than today"),
  Importance: Yup.string(),
});
