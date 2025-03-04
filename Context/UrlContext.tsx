"use client"

import { createContext } from "react"
import { UrlContextType } from "./UrlProvider"

export const UrlContext = createContext<UrlContextType | undefined>(undefined)