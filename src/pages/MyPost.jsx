import { useSelector } from "react-redux";
import { Container, Navigation, PostCard } from "../component/index";
import React from "react";
import { useListVirtualization } from "../CustomHooks/useListVirtualization";
function MyPost() {
  let posts = useSelector((state) => state.posts.posts);
  const userData = useSelector((state) => state.auth.userdata);
  posts = posts.filter((post) => post.userId === userData.$id && post);
  const visibleItems = useListVirtualization(posts,4);
  return (
    <Container>
      <Navigation />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        {visibleItems.map((post, key) => (
          <PostCard
            key={key}
            $id={post.$id}
            title={post.title}
            featureImage={post.featureImage}
            content={post.content}
          />
        ))}
      </div>
    </Container>
  );
}

export default MyPost;
