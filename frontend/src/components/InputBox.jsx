import React from 'react'

const InputBox = ({label,placeHolder}) => {
  return (
    <div>
      <div className='text-sm font-medium text-left py-2' >{label}</div>
      <input type="text" placeHolder={placeHolder} className='w-full px-' />
    </div>
  )
}

export default InputBox
