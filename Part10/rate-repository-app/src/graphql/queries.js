import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query repositories{
    repositories{
      edges {
        cursor
        node {
          id
          ownerName
          name
          createdAt
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          watchersCount
          forksCount
          openIssuesCount
          url
          ownerAvatarUrl
          description
          language
          userHasReviewed
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }`;

export const GET_USER_SIGNED_IN = gql`
  query me{
    me{
      id
      username
    }
  }`;

