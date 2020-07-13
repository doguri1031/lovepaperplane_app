//import { defaults,resolvers } from './LocalState';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { persistCache } from 'apollo-cache-persist';
import { AsyncStorage } from 'react-native';
<<<<<<< HEAD
=======
//import { AsyncStorage } from '@react-native-community/async-storage';
>>>>>>> react native cli

export const APOLLO_URI ="http://2f647f0501a8.ngrok.io";
export const APOLLO_URI_WS ="ws://localhost:4000";



export default async()=>{
    // Create an http link:
    const httpLink = new HttpLink({
        uri: APOLLO_URI,
       
    });
<<<<<<< HEAD

=======
    
>>>>>>> react native cli
    // Create a WebSocket link:
    const wsLink = new WebSocketLink({
        uri: APOLLO_URI_WS,
        options: {
            reconnect: true,
        }
    });
<<<<<<< HEAD

    const cache =new InMemoryCache();

=======
    
    const cache =new InMemoryCache();
>>>>>>> react native cli
    await persistCache({
        cache,
        storage: AsyncStorage,
    });
<<<<<<< HEAD
    const client = new ApolloClient({
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
=======
    
    const client = new ApolloClient({
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                graphQLErrors.forEach(({ message, locations, path }) =>
>>>>>>> react native cli
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
                );
                if (networkError) console.log(`[Network error]: ${networkError}`);
            }),
        split(
            // split based on operation type
            ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
<<<<<<< HEAD
            );
=======
                );
>>>>>>> react native cli
            },
            wsLink,
            httpLink,
            ),
        withClientState({
            //defaults,
            cache
        }),
<<<<<<< HEAD
        ]),
        //resolvers,
    cache
    });
=======
    ]),
    //resolvers,
    cache
});
>>>>>>> react native cli
    return client;
};