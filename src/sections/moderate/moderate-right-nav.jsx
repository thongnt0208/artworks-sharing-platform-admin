/* eslint-disable */
// ----------------------------------------------------------------------
import React from 'react'
// ------------------------------------------
import { Button } from 'primereact/button'

import ModerateCreator from './moderate-creator'

export default function ModerateRightNav() {
  return (
    <>
    <ModerateCreator/>
    <div className="btn-container">
        <Button rounded label="Chấp nhận bài " />
        <Button rounded label="Báo cáo vi phạm " />
    </div>
    </>
  )
}
