import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post.js';
import useStyles from './styles.js';

function Posts({  setCurrentId }) {
    const classes = useStyles();
    const { posts, isLoading } = useSelector(state => state.posts);

    if(!posts.length && !isLoading) return "No Posts";
    
    return (
        isLoading? <CircularProgress /> :(
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} md={6} sm={12} lg={3} >
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts;
