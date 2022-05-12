import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

// export const CREATE_REVIEW = gql`
//   mutation CreateReview(
//     $ownerName: String!
//     $repositoryName: String!
//     $rating: String!
//     $text: String
//   ) {
//     createReview(
//       ownerName: $ownerName
//       repositoryName: $repositoryName
//       rating: $rating
//       text: $text
//     ) {
//       user {
//         username
//       }
//       rating
//       createdAt
//       text
//       repositoryId
//     }
//   }
// `;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      user {
        username
      }
      rating
      createdAt
      text
      repositoryId
    }
  }
`;
