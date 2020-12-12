// import { defaults,resolvers } from './LocalState';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {withClientState} from 'apollo-link-state';
import {ApolloLink, split} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {setContext} from 'apollo-link-context';
import {getMainDefinition} from 'apollo-utilities';
import {persistCache} from 'apollo-cache-persist';
import {AsyncStorage} from 'react-native';
// import { AsyncStorage } from '@react-native-community/async-storage';

export const APOLLO_URI = 'http://f05ad27a909a.ngrok.io';
export const APOLLO_URI_WS = 'ws://f05ad27a909a.ngrok.io';

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      userid: token || null,
    },
  };
});

export default async () => {
  // Create an http link:
  const httpLink = new HttpLink({uri: APOLLO_URI});

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: APOLLO_URI_WS,
    options: {
      reconnect: true,
      connectionParams: async () => ({userid: await AsyncStorage.getItem('token')}),
    },
  });

  const cache = new InMemoryCache();
  await persistCache({cache, storage: AsyncStorage});

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors) graphQLErrors.forEach(({message, locations, path}) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));

        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      split(
        // split based on operation type
        ({query}) => {
          const definition = getMainDefinition(query);
          return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        authLink.concat(httpLink),
      ),
      withClientState({
        // defaults,
        cache,
      }),
    ]),
    // resolvers,
    cache,
  });
  return client;
};
