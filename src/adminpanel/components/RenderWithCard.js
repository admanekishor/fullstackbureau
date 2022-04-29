import React from 'react'
import { Card } from 'react-bootstrap'

function RenderWithCard({children}) {
  return (
    <Card border="secondary">
      {children}
    </Card>
  )
}

export default RenderWithCard