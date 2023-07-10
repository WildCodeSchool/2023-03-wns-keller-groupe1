import { gql, useQuery } from '@apollo/client';



export const GET_USER_FRIEND_LIST =  gql`
query Query($userId: Float!) {
    getUserFriendList(userId: $userId) {
        userFriend {
            lastname
            firstname
      }
    }
  }
`

export const useGetUserFriendList = () => {
    const {data, error } = useQuery(GET_USER_FRIEND_LIST)
    return {
        data: data,
        error
    }

}