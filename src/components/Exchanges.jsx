import React,{useEffect} from "react";
import millify from "millify";
import {Row, Col, Typography, Avatar } from "antd";

import { useGetExchangesQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text,Title } = Typography;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6} style={{paddingLeft:'1px'}}><Title level={4}>Exchanges</Title></Col>
        <Col span={6} style={{textAlign:'center'}}><Title level={4}>24h Trade Volume</Title></Col>
        <Col span={6} style={{textAlign:'center'}}><Title level={4}>Markets</Title></Col>
        <Col span={6} style={{textAlign:'center'}}><Title level={4}>Change</Title></Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24} style={{ marginTop: "7px" }}>
            <Row key={exchange.id}>
              <Col span={6}>
                <Text>
                  <strong>{exchange.rank}.</strong>
                </Text>
                <Avatar className="exchange-image" src={exchange.iconUrl} />
                <Text>
                  <strong>{exchange.name}</strong>
                </Text>
              </Col>
              <Col span={6} style={{textAlign:'center'}}>${millify(exchange.volume)}</Col>
              <Col span={6} style={{textAlign:'center'}}>{millify(exchange.numberOfMarkets)}</Col>
              <Col span={6} style={{textAlign:'center'}}>{millify(exchange.marketShare)}%</Col>
            </Row>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
