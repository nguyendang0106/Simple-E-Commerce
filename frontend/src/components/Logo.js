import React from 'react'
import LogoPic from '../assest/Logo.png'

const Logo = ({ w, h }) => {
  return (
    <img src={LogoPic} alt="logo" width={w} height={h} />
  )
}

export default Logo
