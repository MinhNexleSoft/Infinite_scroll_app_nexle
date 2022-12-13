import { Card, Box, CardMedia, CardContent, Typography } from "@mui/material";
import moment from "moment";

const Post = ({ post }) => {
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ flex: "1" }} mb={2}>
        <CardMedia
          sx={{ borderRadius: "20px" }}
          component="img"
          height="100%"
          width="100%"
          image={post.node.field_photo_image_section}
          alt="images"
        />
      </Box>
      <CardContent sx={{ flex: "1" }}>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": "3",
            "line-clamp": "2",
            "-webkit-box-orient": "vertical",
          }}
        >
          {post?.node?.title ?? ""}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            marginTop: "10px",
            color: "gray",
          }}
        >
          {post?.node?.last_update
            ? `${moment(post.node.last_update).format("ll, h:mm A")} IST`
            : ""}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
