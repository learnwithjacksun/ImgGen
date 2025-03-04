"use client"

import React from 'react'

export default function Container({children}: {children: React.ReactNode}) {
  return (
    <div className="grid md:grid-cols-2 gap-4 w-full mx-auto">
        {children}
    </div>
  )
}
