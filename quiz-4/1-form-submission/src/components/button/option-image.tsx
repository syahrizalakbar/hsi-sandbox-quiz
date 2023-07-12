import React from "react"
import Image from "next/image"

type OptionImageProps = {
  title: string
  icon: string
  selected: string
  onClick: (value: string) => void
}

export default function OptionImage(props: OptionImageProps) {
  return (
    <div
      onClick={() => props.onClick(props.title)}
      className={`${
        props.selected == props.title ? "border-primary " : "border-slate-100 "
      } flex items-center px-8 py-6 border-2 shadow-md rounded-2xl hover:cursor-pointer`}
    >
      <div className="rounded-full w-16 h-16 bg-primary-100 flex items-center justify-center">
        <Image
          src={`/assets/${props.icon}.png`}
          width="30"
          height="30"
          alt={""}
        />
      </div>
      <span className="grow ml-4">{props.title}</span>
    </div>
  )
}
