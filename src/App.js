import React, { useState, useEffect } from "react";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Loader from "./components/Loader";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

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
            {listItems.map((data, index) => {
              return (
                <Card sx={{ display: "flex" }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image="data:image/png;base64,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"
                    alt="images"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This impressive paella is a perfect party dish and a fun
                      meal to cook together with your guests. Add 1 cup of
                      frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
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
