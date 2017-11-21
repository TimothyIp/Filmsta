import React from 'react';

const Loading = (props) => {
  return (
    <div className={`loading ${props.loadStatus ? "fadeOut" : null}`}>
      <p>
       Filmsta
      </p>
    </div>
  )
}

export default Loading;