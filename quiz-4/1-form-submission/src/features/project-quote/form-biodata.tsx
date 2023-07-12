import { UseFormReturn } from "react-hook-form"
import FormTitle from "../../components/form/form-title"
import TextField from "../../components/form/text-field"
import { patternEmail, patternPhone } from "@/lib/constants"
// import { DevTool } from "@hookform/devtools"

export type InputBiodata = {
  name: string
  phone: string
  email: string
  company: string
}

type PropsFormBiodata = {
  form: UseFormReturn<InputBiodata>
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
            required: "Phone is required",
            pattern: {
              value: patternPhone,
              message: "Phone number is invalid",
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
