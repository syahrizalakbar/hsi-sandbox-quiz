import { UseFormReturn } from "react-hook-form"
import FormTitle from "../../components/form/form-title"
import TextField from "../../components/form/text-field"
import { patternEmail, patternPhone } from "@/lib/constants"
import { ProjectForm } from "./project-quote"
// import { DevTool } from "@hookform/devtools"

type PropsFormBiodata = {
  form: UseFormReturn<ProjectForm>
}

export default function FormBiodata({ form }: PropsFormBiodata) {
  const title = "Our services"
  const desc = "Please select which service you are interested in."

  return (
    <>
      <FormTitle title={title} desc={desc} />

      <form className="grid grid-cols-2 gap-x-4 gap-y-8 mb-8">
        <TextField
          label="Name"
          icon="ic ic-person"
          register={form.register("name", {
            required: "Name is required",
          })}
          error={form.formState.errors.name?.message}
        />
        <TextField
          label="Email"
          icon="ic ic-mail"
          register={form.register("email", {
            required: "Email is required",
            pattern: {
              value: patternEmail,
              message: "Email is invalid",
            },
          })}
          error={form.formState.errors.email?.message}
        />
        <TextField
          label="Phone"
          icon="ic ic-phone"
          register={form.register("phone", {
            required: "Phone number is required",
            pattern: {
              value: patternPhone,
              message: "Phone number is invalid",
            },
            minLength: {
              value: 12,
              message: "Min 12 characters",
            },
            maxLength: {
              value: 14,
              message: "Max 14 characters",
            },
          })}
          error={form.formState.errors.phone?.message}
        />
        <TextField
          label="Company"
          icon="ic ic-building"
          register={form.register("company", {
            required: "Company is required",
          })}
          error={form.formState.errors.company?.message}
        />
      </form>
      {/* <DevTool control={form.control} /> */}
    </>
  )
}
