import React from 'react';
import { useParams } from 'react-router-dom';
import { updateBook, useBook } from './AccessHooks';
import BookDetails from './BookDetails';
import { useAuth } from './useAuth';
import { CircularProgress } from '@mui/material';

const BookDetailsPage = () => {
    let url
    const {cid, operation} = useParams();
    const [book, loading] = useBook(cid);
    const [login] = useAuth();
    if(loading){
        return <CircularProgress/>
    }else{
        return <BookDetails 
            book={book} 
            startingMode={operation}
            action={(operation === "edit") ? (book) => updateBook(book, login, url) : undefined}
        />
    }
};

export default BookDetailsPage;