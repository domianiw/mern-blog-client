import { MdRemoveRedEye } from 'react-icons/md';
import { MdOutlineMessage } from 'react-icons/md';
//import { REACT_APP_URL } from '../utils/axios'; //url сервера
//import { server } from '../utils/axios'; //url сервера
//import Moment from 'react-moment';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import TruncateMarkup from 'react-truncate-markup'; //обрезание текста

function PostItem({ post }) {
  if (!post) {
    return <p>Постов не существует</p>;
  }

  return (
    <Link to={`/${post._id}`}>
      <div className="post-item">
        <div className="post-image">
          {post.imageUrl && <img src={`${process.env.REACT_APP_URL}${post.imageUrl}`} alt="" />}
        </div>
        <div className="post-info">
          <p className="post-author">{post.username}</p>
          <p className="post-data">
            {format(new Date(), 'd MMM YYYY')}
            {/* <Moment date={post.createdAt} format="D MMM YYYY" /> */}
          </p>
        </div>

        <h4 className="post-title">{post.title}</h4>

        <TruncateMarkup lines={3}>
          <p className="post-text">{post.text}</p>
        </TruncateMarkup>

        <div className="post-icons">
          <div className="post-view">
            <button className="btn-icon">
              <MdRemoveRedEye />
            </button>
            <span>{post.vievs}</span>
            <button className="btn-icon">
              <MdOutlineMessage />
            </button>
            <span>{post.comments.length || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostItem;
