import { useDispatch, useSelector } from 'react-redux';
import PostItem from '../components/PostItem';
import PopularPost from '../components/PopularPost';
import { useEffect } from 'react';
import { getAllPosts } from '../redux/features/posts/postSlice';

function MainPage() {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return <div>Постов не существует1</div>;
  }

  return (
    <div>
      <section className="main">
        <div className="container">
          <div className="main__inner">
            <div className="main-post">
              {posts?.map((item, index) => (
                <PostItem key={index} post={item} />
              ))}
            </div>
            <div className="main__popular-post">
              <p>Популярное:</p>
              <div className="popular-list">
                {popularPosts?.map((item, index) => (
                  <PopularPost key={index} post={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainPage;
