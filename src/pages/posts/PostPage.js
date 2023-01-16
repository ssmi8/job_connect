import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

function PostPage() {
    const { id } = useParams();
    // makes all future logic compatible with arrays of posts
    const [post, setPost] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
          try {
                // destructuring and renaming the variable in place
                const [{ data: post }] = await Promise.all([
                    axiosReq.get(`/posts/${id}`),
                  ]);
                  setPost({ results: [post] });
                  console.log(post);
                } catch (err) {
                  console.log(err);
                }
              };
              handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
            {/* spread the post object from the results array so key value pairs are passed in as props */}
            <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
} 

export default PostPage