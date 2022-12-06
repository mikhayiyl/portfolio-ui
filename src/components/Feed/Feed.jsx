import { useLocation } from "react-router-dom";
import Post from "../Post/Post";
import Share from "../Share/Share";
import { FeedWrapper } from "./FeedStyles";

const Feed = ({ posts, name, reportPost, profilePath, feedPath, theme, user }) => {
  const location = useLocation().pathname.split("/")[1];
  const path = location === "savedposts";



  console.count("FEED COMPONENT");

  return (
    <FeedWrapper>
      {(profilePath || feedPath) && <div>
        {!path && //not allowed to post savedposts page
          <Share name={name} theme={theme} user={user} />}
      </div>}
      {posts.map((post) => (
        <Post key={post._id} post={post} reportPost={reportPost} theme={theme} currentuser={user} />
      ))}
    </FeedWrapper>
  );
};

export default Feed;
