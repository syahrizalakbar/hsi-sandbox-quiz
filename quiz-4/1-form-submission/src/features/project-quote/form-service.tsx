import OptionImage from "@/components/button/option-image"
import FormTitle from "@/components/form/form-title"
import { Controller, UseFormReturn } from "react-hook-form"
import { ProjectForm } from "./project-quote"

type PropsFormService = {
  form: UseFormReturn<ProjectForm>
}

export default function FormService({ form }: PropsFormService) {
  const title = "Our services"
  const desc = "Please select which service you are interested in."

  const handleChange = (value: string) => form.setValue("service", value)

  return (
    <>
      <FormTitle title={title} desc={desc} />

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
        <Controller
          render={({ field }) => (
            <OptionImage
              title="Development"
              selected={field.value}
              icon="ic_development"
              onClick={handleChange}
            />
          )}
          name="service"
          control={form.control}
        />
        <Controller
          render={({ field }) => (
            <OptionImage
              title="Marketing"
              selected={field.value}
              icon="ic_marketing"
              onClick={handleChange}
            />
          )}
          name="service"
          control={form.control}
        />
        <Controller
          render={({ field }) => (
            <OptionImage
              title="Web Design"
              selected={field.value}
              icon="ic_web_design"
              onClick={handleChange}
            />
          )}
          name="service"
          control={form.control}
        />
        <Controller
          render={({ field }) => (
            <OptionImage
              title="Other"
              selected={field.value}
              icon="ic_setting"
              onClick={handleChange}
            />
          )}
          name="service"
          control={form.control}
        />
      </div>
    </>
  )
}
