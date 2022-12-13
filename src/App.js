import React, { useState, useEffect } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Loader from "./components/Loader";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Post from "./components/Post";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles({
//   root: {
//     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//     border: 0,
//     borderRadius: 3,
//     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//     color: "white",
//     height: 48,
//     padding: "0 30px",
//   },
// });

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
            bgcolor: "#cfe8fc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "14px",
            paddingBottom: "14px",
          }}
        >
          <InfiniteScroll
            dataLength={listItems.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all post</b>
              </p>
            }
          >
            {listItems?.length ? (
              listItems.map((post, index) => {
                return <Post post={post} />;
              })
            ) : (
              <></>
            )}
          </InfiniteScroll>
        </Box>
      </Container>
      {/* <div className="app">
        <div>
          <InfiniteScroll
            dataLength={listItems.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4 className="content__center">Loading post...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all post</b>
              </p>
            }
          >
            {listItems.map((data, index) => {
              return (
                <div key={index} className="wrapper__item">
                  <div className="wrapper__item--img">
                    <img
                      src={data.node.field_photo_image_section}
                      alt="images"
                    />
                  </div>
                  <div className="wrapper__item--text">
                    <h1 className="wrapper__item--text--main">
                      {data.node?.title ?? ""}
                    </h1>
                    <p className="wrapper__item--text--time">
                      {moment(data.node.last_update).format("ll, h:mm A")} IST
                    </p>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div> */}
      <ToastContainer />
    </>
  );
}

export default App;
