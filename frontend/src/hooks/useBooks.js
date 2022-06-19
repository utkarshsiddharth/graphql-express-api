import { useQuery, gql } from "@apollo/client"
const GET_BOOKS = gql`
  {
    books {
      id
      name
    }
  }
`
export const useBooks = () => {
  const { error, loading, data } = useQuery(GET_BOOKS)

  return { error, loading, data }
}
