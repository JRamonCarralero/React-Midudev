import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";
import type { User } from "../types";

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<
    { nextCursor: number | undefined, users: User[] },
    Error,
    InfiniteData<{ nextCursor: number | undefined, users: User[] }, unknown>,
    readonly unknown[],
    number
  >({
    queryKey: ['users'],
    queryFn: fetchUsers,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
  })

  const users: User[] = data?.pages
  ? data.pages.flatMap(page => page.users)
  : [];

  return { isLoading, isError, refetch, fetchNextPage, hasNextPage, users }
}