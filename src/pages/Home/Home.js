import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from '../../components/Layout/MainLayout';
import api from '../../api';
import CardPost from '../../components/CardPost';
import CustomPagination from '../../components/Pagination';

function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  const onChangePage = (page) => {
    setPage(page);
  }

  const fetchPosts = async () => {
    try {
      const res = await api({
        url: '/posts',
        method: 'GET',
        params: {
          page,
          limit: 4
        }
      });
      if (res.success) {
        setPosts(res.data.data);
        setTotal(res.data.total);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const redirectDetail = (postId) => {
    history.push(`/posts/${postId}`);
  }

  const renderPosts = (posts) => {
    return posts.map(post => (
      <Col md="3" xs="12">
        <CardPost
          key={post._id}
          onClick={() => redirectDetail(post._id)}
          src={post.imageUrl}
          title={post.title}
          description={post.description}
          createdBy={post.userId.username}
        />
      </Col>
    ))
  }

  return (
    <MainLayout>
      <Container>
        <Row>
          {renderPosts(posts)}
        </Row>
        <CustomPagination
          current={page}
          total={total}
          onChangePage={onChangePage}
        />
      </Container>
    </MainLayout>
  )
}

export default Home;