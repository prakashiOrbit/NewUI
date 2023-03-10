import React from 'react'
import { Navigate } from 'react-router-dom'
function Protected({ isSignedIn, children }) {
  var id = localStorage.getItem('sessionId');
  if ((id === undefined || id === '' || id === null)) {
    return <Navigate to="/login" replace />
  }
  return children
}
export default Protected