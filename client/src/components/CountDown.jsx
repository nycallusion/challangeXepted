import React from 'react'
import Countdown from 'react-countdown';
export default function CountDown(props) {

  return (
    <div>
        {props.timerEnd ? <Countdown daysInHours={true} date={Number(props.timerEnd)} /> : <></>}
    </div>
  )
}
