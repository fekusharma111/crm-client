import React,{useState, useEffect} from 'react'
import { Box, styled, TextareaAutosize, Button } from '@mui/material'
import {API} from '../../../service/api'
import Comment from './Comment';
// import { getallcomments } from '../../../service/api';
import { useParams } from 'react-router-dom';
// import { newComment } from '../../../service/api';


const ViewCommentsBox = styled(Box)(({ theme }) => ({
    margin:"20px"
}))

    
// `
// margin: 100px;
// `

const AddCommentsBox = styled(Box)(({ theme }) => ({
    margin: "20px",
display: "flex",
    
    [theme.breakpoints.down('sm')]: {
      // display: "none",
      width:"90%",
        flexDirection: "column",
        alignItems: "center",
  
  },
  }))
// const AddCommentsBox = styled(Box)`
// margin: 100px;
// display: flex;
// `
const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 80%; 
    margin: 0 20px;
    padding:20px
`;
const Comments = () => {
    console.log(new Date());
    const { id } = useParams();
    const initialValue = {
        date: new Date(),
        comments: '',
        newid: id
    }
    
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    useEffect(() => {
        // console.log(`i am get comments called ${id}`);
        
        const loadAllComments = async () => {

            let response = await API.getallcomments(id);
            if (response.isSuccess) {
                setComments(response.data)
            }
          };
          loadAllComments();
    }, [toggle]);
    const handleChange = (e) => {
        setComment({
            ...comment,
            comments: e.target.value
        });
        // console.log(comment);
    }
    const addComment = async () => {
         await API.newComment(comment);
        // if (response.isSuccess) {
        //     alert(response.data.message);
        // }
        setComment(initialValue)
        setToggle(prev => !prev);
    }
    // const addComment = async () => {
        
    //     await API.newComment(comment);
    //     setComment(initialValue)
    //     setToggle(prev => !prev);
    // }
  return (
      <Box>
          <AddCommentsBox>
          <Image src={url} alt="dp" />   
                <StyledTextArea 
                    rowsmin={3} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    // value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>             
              </AddCommentsBox>
          <ViewCommentsBox>
              {
                  
                 
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                  
              }
             
          </ViewCommentsBox>
          
    </Box>
  )
}

export default Comments