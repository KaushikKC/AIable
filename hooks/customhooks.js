"use client"
import React from 'react'
import { useState } from 'react'

const useModel = () => {
    const [model,setModel] = useState('');

    return [model,setModel]
}
export default useModel