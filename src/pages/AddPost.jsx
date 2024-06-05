import React from 'react'
import { Container } from '../components/index';
import { PostForm } from '../components/index';

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost