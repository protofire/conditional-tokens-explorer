import React from 'react'

import { useConditionContext } from '../../contexts/ConditionContext'
import { isConditionErrorInvalid, isConditionErrorNotFound } from '../../util/tools'

import { ConditionDetailItem } from './ConditionDetailItem'
import { ConditionDetailNotFound } from './ConditionDetailNotFound'

interface ConditionDetailWrapperProps {
  conditionId: string
}

export const ConditionDetail = (props: ConditionDetailWrapperProps) => {
  const { conditionId } = props

  const { condition, errors, loading, setConditionId } = useConditionContext()

  React.useEffect(() => {
    setConditionId(conditionId)
  }, [conditionId, setConditionId])

  const error = isConditionErrorNotFound(errors) || isConditionErrorInvalid(errors)

  return (
    <>
      <h3>Condition detail</h3>

      {loading && <div>Loading...</div>}
      {error && !loading && <ConditionDetailNotFound />}
      {condition && <ConditionDetailItem condition={condition} />}
    </>
  )
}