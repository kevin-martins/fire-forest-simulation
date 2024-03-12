type Props = {
  children: JSX.Element
  handleClick: any
  style?: React.CSSProperties
}

const Button = ({ children, handleClick, style }: Props) => {
  return (
    <button
      type='button'
      onClick={handleClick}
      className="px-7 py-2 relative z-0 overflow-hidden flex whitespace-nowrap rounded-lg border-[1px] 
      border-neutral-500 font-medium
      text-slate-100 transition-all duration-300
        before:absolute before:inset-0
        before:-z-10 before:translate-y-[200%]
        before:scale-[2.5]
        before:rounded-[100%] before:bg-yellow-600
        before:transition-transform before:duration-1000
        before:content-[&quot;&quot;]
        hover:scale-105 hover:border-yellow-600 hover:text-black
        hover:before:translate-y-[0%]
        active:scale-100"
      style={{ ...style }}
    >
      {children}
    </button>
  )
}

export default Button
