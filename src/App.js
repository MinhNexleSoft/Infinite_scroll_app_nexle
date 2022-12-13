import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Loader from "./components/Loader";
import Post from "./components/Post";

function App() {
  const [id, setId] = useState(2);
  const [listItems, setListItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMorePost = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `https://gallery-feed.vercel.app/gallery-feed/page/${id}`,
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      return data.nodes;
    } catch (error) {
      toast.error("Unable to load post !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const fetchData = async () => {
    const listPost = await fetchMorePost();

    setListItems([...listItems, ...listPost]);
    if (listPost.length === 0 || listPost.length < 20) {
      setHasMore(false);
    }
    setId((prev) => prev + 1);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: `https://gallery-feed.vercel.app/gallery-feed/page/1`,
          withCredentials: false,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        setListItems(data.nodes);
      } catch (error) {
        toast.error("Unable to load post !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    getPosts();
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: 2,
            pb: 2,
          }}
        >
          <InfiniteScroll
            dataLength={listItems.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<Loader />}
          >
            {listItems.map((post) => {
              return <Post post={post} key={post.node.nid} />;
            })}
          </InfiniteScroll>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
