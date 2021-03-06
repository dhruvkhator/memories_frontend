import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination/Pagination';

import useStyles from './styles.js';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchquery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const searchPost = () =>{
        if(search.trim() || tags){
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else{
            history.push('/');
        }
    }

    const handleKeyPRESS =(e) =>{
        if(e.keyCode === 13){
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagtoDelete) => setTags(tags.filter((tag) => tag !== tagtoDelete)); 

    return (
        <div>
            <Grow in>
                <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                                name="search" 
                                variant="outlined" 
                                onKeyPress = {handleKeyPRESS}
                                label="Search Memories" 
                                fullWidth value={search} 
                                onChange={(e)=>setSearch(e.target.value)} 
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) &&(
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} currentId={currentId}/>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home;
