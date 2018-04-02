

import React from "react";
import ReactLoading from "react-loading";
import { Section, Title, Article, Prop, list } from "./generic";
import './app.css'

const ExampleETH = () => (
  <Section>
    <Title>Ethereum Arbitrage Calculations</Title>
    {list.map(l => (
      <Article key={l.prop}>
        <ReactLoading type={l.prop} color="#fff" />
        <Prop>{l.name}</Prop>
      </Article>
    ))}
  </Section>
);




export default ExampleETH;
