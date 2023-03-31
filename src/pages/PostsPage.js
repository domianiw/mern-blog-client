import axios from '../utils/axios';
import { useEffect, useState } from 'react';
import PostItem from '../components/PostItem';

function PostsPage() {
  const [posts, setPosts] = useState([]);

  // const fetchMyPosts = useCallback(async () => {
  //   const { data } = await axios.get('/posts/user/me');
  //   setPosts(data);
  // }, []);

  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get('/posts/user/me');
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (!posts) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <section className="main">
        <div className="container">
          <div className="main__inner-all">
            <div className="main-post-all">
              {posts?.map((item, index) => (
                <PostItem key={index} post={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostsPage;
