import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Skill from './Skill';
import Asset from '../../components/Asset';


import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utlis";
import PopularProfiles from "../profiles/PopularProfiles";


function SkillsPage({ message, filter = ""}) {
  const [skills, setSkills] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await axiosReq.get(`/skills/?${filter}search=${query}`);
        console.log(data, "< ====data")
        setSkills(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
  
    setHasLoaded(false);
    /* to stop the search requests after every key typed - delay response */
    const timer = setTimeout(() => {
      fetchSkills();
    }, 1000)
    return () => {
        clearTimeout(timer)
    }
      
  }, [filter, query, pathname]);

  return (
    <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={8}>
            <PopularProfiles mobile />
            <i className={`fas fa-search ${styles.SearchIcon}`} />
            <Form className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
            >
                <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                className="mr-sm-2"
                placeholder="Search to learn new skills!"
                />
            </Form>

            {hasLoaded ? (
                <>
                    {skills.length ? (
                        <InfiniteScroll
                        children={
                            skills.map((skill) => (
                                <Skill key={skill.id} {...skill} setSkills={setSkills} />
                            ))
                        }
                        dataLength={skills.length}
                        loader={<Asset spinner />}
                        hasMore={!!skills.next}
                        next={() => fetchMoreData(skills, setSkills)} 
                        />
                    ) : (
                        <Container className={appStyles.Content}>
                            <Asset src={NoResults} message={message} />
                        </Container>
                    )}
                </>
            ) : (
                <Container className={appStyles.Content}>
                  <Asset spinner />
                </Container>
              )}
        </Col>
        <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
            <PopularProfiles />
        </Col>
    </Row>    
  );
}

export default SkillsPage;