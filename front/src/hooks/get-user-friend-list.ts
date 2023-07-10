import { gql, useQuery } from '@apollo/client';





export const GET_USER_FRIEND_LIST =  gql`
query Query($userId: Float!) {
    getUserFriendList(userId: $userId) {
        userFriend {
            userId
            lastname
            firstname
        }
    }
}
`

export const useGetUserFriendList = (userId: number) => {
    const {data, error, loading } = useQuery(GET_USER_FRIEND_LIST , {variables: {userId}})
    return {
        userFriendsLists: data || [],
        error,
        loading
    }

}