import * as Yup from "yup";

export let taskSchema = Yup.object({
  content: Yup.string().required("Content is required"),
  deadline: Yup.date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Date is required")
    .min(new Date(), "Date must be later than today")
    .when("$projectDeadline", (projectDeadline, schema) =>
      projectDeadline
        ? schema.max(
            projectDeadline,
            "Task deadline cannot be later than project deadline"
          )
        : schema
    ),
  importance: Yup.string().required("Priority is required"),
});
