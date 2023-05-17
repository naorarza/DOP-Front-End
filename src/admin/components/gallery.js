import React from 'react'
import Photos from './photos'

export default function Gallery() {
    return (
        <div>
        <div className="container">
            <h2 className='text-center m-3 display-3'>Gallery</h2>
            <div className="btn btn-info">הוסף תמונה</div>
            <hr />
                <Photos/>
            </div>
        </div>
    )
}
