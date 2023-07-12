import React from "react"
import Image from "next/image"

type OptionTextProps = {
  title: string
  value: string
  selected: string
  onClick: (value: string) => void
}

export default function OptionText(props: OptionTextProps) {
  return (
    <div
      onClick={() => props.onClick(props.value)}
      className={`${
        props.selected == props.value ? "border-primary " : "border-slate-200 "
      } flex items-center px-8 py-6 border-2 shadow-md rounded-2xl hover:cursor-pointer`}
    >
      <div className="h-16 flex items-center justify-center">
        <Image
          src={`/assets/${
            props.selected == props.value
              ? "option_selected"
              : "option_unselected"
          }.png`}
          width="20"
          height="20"
          alt={`Button ${props.title}`}
        />
      </div>
      <span className="grow ml-4">{props.title}</span>
    </div>
  )
}
