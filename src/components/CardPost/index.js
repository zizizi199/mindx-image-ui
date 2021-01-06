import { Card } from 'react-bootstrap';

export default function CardPost(props) {
  const {
    src,
    title,
    description,
    createdBy,
    onClick = () => {}
  } = props;
  return (
    <Card onClick={onClick}>
      <Card.Img variant="top" src={src} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Text>
          {createdBy}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}