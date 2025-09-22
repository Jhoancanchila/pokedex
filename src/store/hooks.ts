import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
