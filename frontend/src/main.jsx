import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

// http://localhost:5000/graphql
const client = new ApolloClient({
  uri: "http://localhost:5000/grpahql",
  cache: InMemoryCache,
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
