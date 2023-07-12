import FormTitle from "@/components/form/form-title"
import Image from "next/image"

type PropsFormConfirm = {
  onSubmit: () => void
}

export default function FormConfirm({ onSubmit }: PropsFormConfirm) {
  const title = "Submit your quote request"
  const desc =
    "Please review all the information you previously typed in the past steps, and if all is okay, submit your message to receive a project quote in 24 - 48 hours."

  return (
    <>
      <div>
        <center>
          <Image
            className="mb-6"
            src="/assets/image_success.png"
            width="100"
            height="100"
            alt={"Success"}
          />
          <FormTitle title={title} desc={desc} />
        </center>
      </div>
      <center>
        <button
          onClick={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          className="border-2 border-primary bg-primary text-white shadow-primary rounded-full px-8 py-4 text-xl font-bold"
        >
          Submit
        </button>
      </center>
    </>
  )
}
