import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          name
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          openIssuesCount
          url
          ownerAvatarUrl
          description
          language
        }
      }
    }
  }
`;

export const GET_USER_SIGNED_IN = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      id
      name
      fullName
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      openIssuesCount
      url
      ownerAvatarUrl
      description
      language
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
