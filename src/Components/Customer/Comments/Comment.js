import React from 'react'
import {Box, styled, Typography} from '@mui/material'


const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;
const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const Comment = ({ comment, setToggle }) => {
  let commentdate = new Date(comment.date).toDateString();
  let hh = new Date(comment.date).getHours();
  let mm = new Date(comment.date).getMinutes();
  let ss = new Date(comment.date).getSeconds();
  let session = "AM";
        if(hh == 0){
          hh = 12;
      }
      if(hh > 12){
          hh = hh - 12;
          session = "PM";
      }

      hh = (hh < 10) ? "0" + hh : hh;
      mm = (mm < 10) ? "0" + mm : mm;
      ss = (ss < 10) ? "0" + ss : ss;
  let commentdatetime = `${commentdate}  ${hh}:${mm}:${ss} ${session}`;
  return (
    <Component>
     <StyledDate>{commentdatetime}</StyledDate>
    <Typography>{comment.comments}</Typography>
</Component>
  )
}

export default Comment
