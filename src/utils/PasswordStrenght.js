import React from 'react'

const PasswordStrenght = ({ score }) => {

  const getColor = () => {
    if (score >= 60) {
      return 'green'
    } else if (score > 30) {
      return 'orange'
    }

    return 'orangered'
  }

  return (
    <div className="pass-score" title={`Password is ${score}% valid`}>
      <div
        className="score"
        style={{
          width: `${score}%`,
          backgroundColor: getColor()
        }}
      />
    </div>
  )
}

export default PasswordStrenght