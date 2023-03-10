import React, { useEffect, useState } from "react";

import { Col, Row } from "react-bootstrap";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Job from "./Job";
import PopularProfiles from "../profiles/PopularProfiles";

function JobPage() {
    const { id } = useParams();
    const [job, setJob] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{data: job}] = await Promise.all([
                    axiosReq.get(`/jobs/${id}`)
                ])
                setJob({results: [job]})                
            } catch (err){
                
            }
        }
        handleMount();
    }, [id])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Job {...job.results[0]} setJob={setJob} jobPage />
      </Col>
    </Row>
  );
}

export default JobPage;