import React from 'react';

const FormAlert = ({ header, content }) => {

  return(
  <div>
    <h3>{header}</h3>
    <p>{content}</p>
  </div>
  )
}

export default FormAlert;