import { Box, styled} from '@mui/material'
import React from 'react'

const Image = styled("img")({
  maxWidth: "100%",
  // width:"80%",
  height: "100vh",
  display: 'block',
  marginLeft: "auto",
  marginRight: "auto",
   
})

const Home = () => {
  return (
    <Box style={{backgroundColor:"#fafafa"}}>
      <Box style={{backgroundColor:"#fafafa"}}>
        <Image src='https://cdn.dribbble.com/users/633193/screenshots/7052581/media/44a228e6ca9f6d6beb4f21cbca6ebfef.jpg' alt='Under Constructuion'/>
      </Box>
    </Box>
  )
}

export default Home