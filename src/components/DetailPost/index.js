import { useContext, useState, useEffect } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { AuthContext } from '../../App';
import api from '../../api';
import { useSocket } from '../../App';
// props = post
function DetailPost({ imageUrl, _id, comments, addComment }) {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [otherTyping, setOtherTyping] = useState('');
  const socket = useSocket();

  useEffect(() => {
    if (_id) {
      socket.emit('join-room-post', { postId: _id });
      socket.on('user-typing', data => {
        const { user } = data;
        setOtherTyping(user);
      })
      socket.on('new-comment-added', data => {
        addComment(data);
        setOtherTyping('');
      });
      socket.on('notification-new-comment', data => {
        if (data.createdBy !== user._id) {
          addComment(data);
          setOtherTyping('');
        }
      })
    }
  }, [_id, socket])

  const onChangeContent = (event) => {
    if (!content) {
      socket.emit('someone-typing', { user: user.username, postId: _id });
    }
    setContent(event.target.value);
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const res = await api({
      url: '/comments',
      method: 'POST',
      data: {
        content,
        postId: _id
      }
    });
    if (res.success) {
      const newComment = { createdBy: { username: user.username }, content, postId: _id }
      addComment(newComment);
      // socket.emit('new-comment', newComment);
      setContent('');
    }
  };

  return (
    <Row>
      <Col xs="12" md="6">
        <Card>
          <Card.Img variant="top" src={imageUrl} />
        </Card>
      </Col>
      <Col xs="12" md="6">
        <div className="d-flex flex-column" style={{ height: '80vh' }}>
          <div className="list-comment flex-grow-1">
            {comments.map(comment => (
              <div key={comment._id}>
                {comment.createdBy.username} {comment.content}
              </div>
            ))}
          </div>
          { otherTyping && <div>{otherTyping} đang nhập bình luận</div> }
          <div className="form-comment">
            {
              user && (
                <Form onSubmit={onSubmitForm}>
                  <Form.Group>
                    <Form.Control
                      value={content}
                      placeholder="Enter your comment"
                      onChange={onChangeContent}
                    />
                  </Form.Group>
                </Form>
              )
            }
          </div>

        </div>
      </Col>
    </Row>
  )
}

export default DetailPost;