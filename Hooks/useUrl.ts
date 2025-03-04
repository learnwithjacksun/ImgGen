"use client"
import { useContext } from 'react'
import { UrlContext } from '../Context/UrlContext'


export default function useUrl() {
    const context = useContext(UrlContext)  

    if (!context) {
        throw new Error('useUrl must be used within a UrlProvider')
    }

    return {...context}
}
