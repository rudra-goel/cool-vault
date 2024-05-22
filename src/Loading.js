import React from 'react'
import  loadingGIF from "./LoadingGIF.gif"
export default function Loading() {
  return (
    <div className="loading-container">
        <img className="loading-img" src={loadingGIF} alt="Loading" />
    </div>
  )
}
