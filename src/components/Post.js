import { Card, Box, CardContent, Typography } from "@mui/material";
import moment from "moment";

const Post = ({ post }) => {
  return (
    <Card
      sx={{
        display: "flex",
        height: { xs: "20vh", sm: "30vh", md: "40vh" },
        boxShadow: "none",
      }}
    >
      <Box sx={{ flexBasis: "40%" }} mb={2}>
        <img
          src={post.node.field_photo_image_section}
          alt="images"
          loading="lazy"
        />
      </Box>
      <CardContent sx={{ flexBasis: "60%" }}>
        <Typography
          variant="h5"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            lineClamp: "2",
            WebkitBoxOrient: "vertical",
            fontSize: { xs: 15, sm: 20, md: 20 },
          }}
        >
          {post?.node?.title ?? ""}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: { xs: 0.5, sm: 1, md: 1 },
            color: "#424242",
            fontSize: { xs: 10, sm: 18, md: 20 },
          }}
        >
          {post?.node?.last_update
            ? `${moment(post.node.last_update).format("ll h:mm A")} IST`
            : ""}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
