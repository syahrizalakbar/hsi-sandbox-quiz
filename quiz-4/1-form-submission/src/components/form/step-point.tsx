type StepPointProps = {
  number: number
  activeStep: number
  isLast: boolean
}

export default function StepPoint({
  number,
  activeStep,
  isLast,
}: StepPointProps) {
  const isActive = number == activeStep
  const isDone = activeStep > number

  return (
    <div className={`${!isLast && "grow"} flex space-x-4`}>
      <div
        className={
          "w-8 h-8 inline-block text-center align-middle rounded-full leading-0 " +
          (isActive || isDone ? "bg-primary text-white" : "bg-slate-200")
        }
      >
        <span className="leading-8">{number}</span>
      </div>

      {!isLast && (
        <div className="grow flex items-center">
          <div
            className={`w-full h-2 rounded-full overflow-hidden ${
              isDone ? "bg-primary" : "bg-slate-200"
            }`}
          >
            <div className={isActive ? "bg-primary w-1/2 h-2" : "hidden"}></div>
          </div>
        </div>
      )}
    </div>
  )
}
