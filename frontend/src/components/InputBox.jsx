import React from 'react'

const InputBox = ({label,placeHolder}) => {
  return (
    <div>
      <div className='text-sm font-medium text-left py-2' >{label}</div>
      <input type="text" placeholder={placeHolder} className='w-full py-1 border rounded border-slate-200' />
    </div>
  )
}

export default InputBox
