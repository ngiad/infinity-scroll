import { memo, useEffect } from "react";
import { Skeleton, Col, Row } from "antd";
import { debound } from "../../helper/debound";
const Contents = ({ getdata,loading, data, totalPage }) => {

  const _debound = debound(getdata);

  const handleScroll = () => {
    if (loading) return;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
      totalPage.current < 10
    ) {
      _debound();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Row>
      {data.map((item, index) => (
        <Col
          key={index}
          xs={{ span: 12, offset: 1 }}
          lg={{ span: 12, offset: 2 }}
        >
          <h1>
            <strong>{item?.id}</strong>
          </h1>
          <h5>{item?.title}</h5>
          <p>{item?.price}</p>
        </Col>
      ))}
      {loading &&
        "abvn".split("").map((item, index) => <Skeleton key={index} />)}
    </Row>
  );
};

export default memo(Contents);
