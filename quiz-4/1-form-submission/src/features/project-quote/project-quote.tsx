import React from "react"
import StepPoint from "@/components/form/step-point"
import FormBiodata from "./form-biodata"
import { useForm } from "react-hook-form"
import FormService from "./form-service"
import FormBudget from "./form-budget"
import FormConfirm from "./form-confirm"

const availableSteps = [1, 2, 3, 4]

export type ProjectForm = {
  name: string
  phone: string
  email: string
  company: string
  service: string
  budget: string
}

function ProjectQuote() {
  /// Step
  const [step, setStep] = React.useState(() => 1)
  const lastStep = availableSteps[availableSteps.length - 1]

  /// Form Data
  const formProject = useForm<ProjectForm>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      service: "Development",
      budget: "50000",
    },
  })
  /// Navigation Button
  function onBack() {
    if (step - 1 < 1) {
      return
    }
    setStep(step - 1)
  }

  function onNext() {
    if (step == 1) {
      formProject.handleSubmit((_) => {
        console.log(formProject.getValues())
      })()
      if (formProject.formState.isValid) {
        setStep(2)
      }
    } else if (step == 2) {
      setStep(3)
    } else if (step == 3) {
      setStep(4)
    }
  }

  /// Final
  const handleSubmit = () => {
    alert(JSON.stringify(formProject.getValues()))
  }

  return (
    <>
      <div className="container mx-auto p-4 m-6 md:max-w-2xl">
        <div>
          <h1 className="text-4xl font-bold text-center">
            Get a project quote
          </h1>
          <p className="text-lg text-center mt-6 mx-16 text-gray-500">
            Please fill the form below to receive a quote for your project. Feel
            free to add as much detail as needed.
          </p>
        </div>
        <div className="mt-6 p-8 border rounded-3xl border-slate-200 shadow-lg">
          <div className="flex space-x-4 mx-4 mt-2">
            {availableSteps.map((item, index) => {
              return (
                <StepPoint
                  key={index}
                  number={item}
                  activeStep={step}
                  isLast={lastStep == item}
                />
              )
            })}
          </div>
          <div className="w-full my-8 h-0.5 bg-slate-200 rounded-full"></div>
          {step == 1 && <FormBiodata form={formProject} />}
          {step == 2 && <FormService form={formProject} />}
          {step == 3 && <FormBudget form={formProject} />}
          {step == 4 && <FormConfirm onSubmit={handleSubmit} />}
        </div>
        <div className="flex place-content-between mt-8">
          {step != 1 && (
            <button
              onClick={onBack}
              className="border-2 border-primary rounded-full shadow-lg px-8 py-4 text-xl text-primary"
            >
              Previous step
            </button>
          )}
          <div />
          {step != lastStep && (
            <button
              onClick={onNext}
              className="border-2 border-primary bg-primary text-white shadow-primary rounded-full px-8 py-4 text-xl"
            >
              Next step
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default ProjectQuote
