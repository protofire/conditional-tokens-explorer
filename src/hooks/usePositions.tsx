import { useQuery } from '@apollo/react-hooks'
import React from 'react'

import { Web3ContextStatus, useWeb3ConnectedOrInfura } from 'contexts/Web3Context'
import { Position, marshalPositionListData } from 'hooks/utils'
import { PositionsListQuery, PositionsSearchQuery } from 'queries/positions'
import { UserWithPositionsQuery } from 'queries/users'
import { Positions, UserWithPositions } from 'types/generatedGQL'

/**
 * Return a array of positions, and the user balance if it's connected.
 */
export const usePositions = (searchPositionId: string) => {
  const { _type: status, address: addressFromWallet } = useWeb3ConnectedOrInfura()
  const [data, setData] = React.useState<Maybe<Position[]>>(null)
  const [address, setAddress] = React.useState<Maybe<string>>(null)

  const options = searchPositionId
    ? {
        variables: {
          positionId: searchPositionId,
        },
      }
    : undefined
  const { data: positionsData, error: positionsError, loading: positionsLoading } = useQuery<
    Positions
  >(searchPositionId ? PositionsSearchQuery : PositionsListQuery, options)

  const { data: userData, error: userError, loading: userLoading } = useQuery<UserWithPositions>(
    UserWithPositionsQuery,
    {
      skip: !address,
      variables: {
        account: address,
      },
    }
  )

  React.useEffect(() => {
    if (status === Web3ContextStatus.Connected && addressFromWallet) {
      setAddress(addressFromWallet.toLowerCase())
    }
  }, [status, addressFromWallet])

  React.useEffect(() => {
    if (positionsData) {
      setData(marshalPositionListData(positionsData.positions, userData?.user))
    }
  }, [positionsData, userData])

  return {
    data,
    error: positionsError || userError,
    loading: positionsLoading || userLoading,
  }
}
