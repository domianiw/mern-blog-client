import { Link } from 'react-router-dom';

function PopularPost({ post }) {
  return (
    <div>
      <h6 className="popular-post">
        <Link to={`${post._id}`}>{post.title}</Link>
      </h6>
    </div>
  );
}

export default PopularPost;
