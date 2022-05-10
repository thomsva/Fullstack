import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
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
  }
`;

