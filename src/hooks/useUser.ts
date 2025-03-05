import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { fetchUser } from '@/store/userSlice';
import type { AppDispatch } from '@/store/store';

export function useUser() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);

  return { data: user, isLoading: loading };
}
