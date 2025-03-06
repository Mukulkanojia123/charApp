import { AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'
import { transforImage } from '../../lib/features'

const AvatarCard = ({avatar = [], max=4}) => {
  return (
    <Stack direction={'row'} spacing={0.5}>
        {
            <AvatarGroup max={max}
            sx={{
                position : "relative"  //otherwise it take position not to the parent
            }}
            >
                <Box width={'5rem'} height={"3rem"}>
                {
                    avatar.map((src, index) =>(
                        <img
                        key = {Math.random() *100}
                        src = {transforImage(src)}
                        alt = {`Avatar ${index}`}
                        style={{
                            width : '2rem',
                            height : '2rem',
                            position : 'absolute',
                            borderRadius : "50%",
                            left : {
                                xs : `${0.5 + index}rem`,
                                sm : `${index}rem`
                            },
                        }}
                        />
                    ))
                }
                </Box>
            </AvatarGroup>
        }
    </Stack>
  )
}

export default AvatarCard