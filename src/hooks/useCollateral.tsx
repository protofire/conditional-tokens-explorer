import React from 'react'

import { useWeb3ConnectedOrInfura } from 'contexts/Web3Context'
import { getTokenSummary } from 'util/tools'
import { Token } from 'util/types'

export const useCollateral = (
  collateralAddress: string
): { collateral: Maybe<Token>; error: Maybe<Error>; loading: boolean } => {
  const { _type: status, networkConfig, provider } = useWeb3ConnectedOrInfura()

  const [collateral, setCollateral] = React.useState<Maybe<Token>>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Maybe<Error>>(null)

  React.useEffect(() => {
    let cancelled = false

    const fetchToken = async (collateral: string) => {
      if (!collateralAddress) {
        return null
      }
      return await getTokenSummary(networkConfig, provider, collateral)
    }

    setLoading(true)

    fetchToken(collateralAddress)
      .then((token) => {
        if (!cancelled) {
          setCollateral(token)
          setLoading(false)
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setLoading(false)
          setCollateral(null)
          if (err.message.indexOf('(') !== -1) {
            err.message = err.message.split('(')[0]
          }
          setError(err)
        }
      })

    return () => {
      cancelled = true
    }
  }, [status, provider, collateralAddress, networkConfig])

  return { loading, error, collateral }
}
