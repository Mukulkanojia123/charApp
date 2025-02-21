import React from 'react'
import { fileFormat, transforImage } from '../../lib/features';
import {FileOpen as FileOpenIcon} from '@mui/icons-material'

const RenderAttachment = (file, url) => {
  // console.log(file)
  // console.log(url)
    switch (file){
        case 'video' :
            return <video src={url} preload='none' width={'200px'} control />
            
        case 'image' :
            return <img 
            src={transforImage(url, 200)} 
            alt='Attachment' 
            width={'200px'} 
            height={'200px'} 
            style={{
                objectFit : 'contain'
            }}/>
            
            case 'audio' :
                return <audio src={url} preload='none' control />
        default : 
       return <FileOpenIcon />
           
    }
  return (
    <div>RenderAttachment</div>
  )
}

export default RenderAttachment