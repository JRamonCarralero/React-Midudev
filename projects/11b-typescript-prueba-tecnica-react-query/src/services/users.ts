export const fetchUsers = async ({ pageParam  = 1}: { pageParam?: number | undefined }) => {
  return await fetch(`https://randomuser.me/api/?results=10&seed=jrc&page=${pageParam}`)
    .then(res =>{
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      return res.json()
    })
    .then(data => {
      const currentPage = Number(data.info.page)
      const nextCursor = currentPage > 10 ? undefined : Number(data.info.page) + 1
      return {
        users: data.results,
        nextCursor
      }
    })
}