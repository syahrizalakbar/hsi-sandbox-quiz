type FormTitleProps = {
  title: string
  desc: string
}

export default function FormTitle({ title, desc }: FormTitleProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-base mt-4 mb-8 text-gray-500">{desc}</p>
    </div>
  )
}
