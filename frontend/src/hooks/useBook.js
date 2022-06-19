import { useQuery, gql } from "@apollo/client"
const GET_BOOK = gql`
  query {
    book(id: 1) {
      id
      name
    }
  }
`

export const useBook = (id) => {
  const { error, loading, data } = useQuery(GET_BOOK, {
    variables: {
      id: id,
    },
  })

  if (error) {
    console.log({ error })
  }

  return { error, loading, data }
}
