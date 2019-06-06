import Head from 'next/head';
import React from 'react';
import { css } from '@emotion/core';
import { node, string, oneOfType, object } from 'prop-types';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import { Layout } from 'antd';
const layoutCls = css`
  background: #152530;
  color: #fff;
  font-family: Lato;
`;
const Container = ({ children, title = 'Movies Store' }) => (
  <Layout css={layoutCls} className='layout'>
    <Head>
      <title>{title}</title>
    </Head>
    <ReactiveBase
      app='movies-store-app-one' // Your app name for e.g movies-store-app
      credentials='Q14QJXGMr:bea0f800-4bc5-401f-a285-a7d6fd3f6c67' // API credentials
      theme={{
        typography: {
          fontFamily: 'Lato'
        }
      }}
      analytics
    >
      {children}
    </ReactiveBase>
  </Layout>
);
Container.propTypes = {
  children: oneOfType([node, string]),
  title: string
};
export default Container;
