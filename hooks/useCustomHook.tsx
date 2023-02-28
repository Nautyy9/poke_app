import { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {appDispatch, appState} from '../types'

export const useAppSelector : TypedUseSelectorHook<appState> = useSelector
export const useAppDispatch = () => useDispatch<appDispatch>()