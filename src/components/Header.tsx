type Props = {
  title: string
}

export function Header({ title }: Props) {
  return (
    <div className="w-full h-24 bg-purple-700 flex items-end py-6 justify-center">
        <h1 className="text-gray-200 font-semibold text-xl">{title}</h1>
      </div>
  )
}