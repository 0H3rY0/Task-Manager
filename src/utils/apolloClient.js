import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphql.datocms.com/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_DATOCMS_API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default client;
