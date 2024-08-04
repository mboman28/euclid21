import React from 'react'
import { DataContextType } from './types/types'
const DataContext = React.createContext({})
export const DataProvider = React.createContext<DataContextType | null>
export default DataContext 