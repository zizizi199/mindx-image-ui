import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import MainLayout from '../../components/Layout/MainLayout';
import api from '../../api';
import DetailPost from '../../components/DetailPost';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  
  const fetchDetailPost = async (postId) => {
    try {
      const res = await api({
        url: `/posts/${postId}`,
        method: 'GET'
      });
      if (res.success) {
        setPost(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const addComment = (comment) => {
    const { comments } = post;
    const newComments = [...comments, comment];
    setPost({
      ...post,
      comments: newComments
    })
  }

  useEffect(() => {
    fetchDetailPost(id)
  }, [id]);

  return (
    <MainLayout>
      <Container>
        <div className="d-flex justify-content-center">
          {post && <DetailPost {...post} addComment={addComment} />}
        </div>
      </Container>
    </MainLayout>
  )
}

/**
 * children = (
 *  <div>PostDetail</div>
 */

export default PostDetail;