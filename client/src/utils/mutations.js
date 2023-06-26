import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation loginUser($email: string!, $password: String!) {
    loginUser(email: $email, password: $password) {
        token
        user{
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation createUser($username: String!, $email: string!, $password: String!) {
    loginUser( username: $username email: $email, password: $password) {
        token
        user{
            _id
            username
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($BookData: BookInput!) {
    saveBook(BookData: $BookData){
        _id
        username
        email
        savedBooks {
            boodId
            title
            description
            authors
            image
            link
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId){
        _id
        username
        email
        savedBooks {
            boodId
            title
            description
            authors
            image
            link
    }
}
`;