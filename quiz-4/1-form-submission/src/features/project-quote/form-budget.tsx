import OptionText from "@/components/button/option-text"
import FormTitle from "@/components/form/form-title"
import { Controller, UseFormReturn } from "react-hook-form"

export type InputBudget = {
  budget: string
}

type PropsFormBudget = {
  form: UseFormReturn<InputBudget>
}

export default function FormBudget({ form }: PropsFormBudget) {
  const title = "What's your project budget?"
  const desc = "Please select the project budget range you have in mind."

  const handleChange = (value: string) => form.setValue("budget", value)

  return (
    <>
      <FormTitle title={title} desc={desc} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Controller
          render={({ field }) => (
            <OptionText
              title="$5.000 - $10.000"
              value="5000-10000"
              selected={field.value}
              onClick={handleChange}
            />
          )}
          name="budget"
          control={form.control}
        />
        <Controller
          render={({ field }) => (
            <OptionText
              title="$20.000 - $50.000"
              value="20000-50000"
              selected={field.value}
              onClick={handleChange}
            />
          )}
          name="budget"
          control={form.control}
        />
        <Controller
          render={({ field }) => (
            <OptionText
              title="$10.000 - $20.000"
              value="10000-20000"
              selected={field.value}
              onClick={handleChange}
            />
          )}
          name="budget"
          control={form.control}
        />
        <Controller
          render={({ field }) => (
            <OptionText
              title="$50.000 +"
              value="50000"
              selected={field.value}
              onClick={handleChange}
            />
          )}
          name="budget"
          control={form.control}
        />
      </div>
    </>
  )
}
