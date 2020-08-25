import matter from "gray-matter";
import Link from "next/link";
import React from "react";
import {Col, Row} from "react-flexbox-grid";

import Layout from "../components/Layout";

function formatDate(date) {
  const options = {year : "numeric", month : "long", day : "numeric"};
  const today = new Date(date);

  return today.toLocaleDateString("en-US", options);
}

function freshWriting(date) {
  const writingDate = new Date(date).getTime();
  const today = new Date().getTime();

  return today - writingDate < 60 * 60 * 1000 * 24 * 2; // 2 days old
}

function Blog({posts}) {
  return (
    <>
      <Layout isBlog>
        <Row>
          {posts.map(({ document, slug }) => {
      const {
        data : {title, date},
      } = document;

      return (
          <Col md = {6} key = {slug}>
          <div className = "writing-row" key = {title}><Row><Col md = {12}>
          <div className = "writing-date">{
              formatDate(date)}</div>
                    </Col>

          <Col md = {12}><Link href = "/posts/[slug]" as = {`/posts/${slug}`}>
          <a>{freshWriting(date) &&
              <div className = "pulse" />}<span className = "writing-title">{
              title}</span>
                        </a>
          </Link>
                    </Col></Row>
                </div>
          </Col>
            );
          })}
        </Row></Layout>
    </>);
}

Blog.getInitialProps = async (context) => {
      const posts = ((context) => {
        const keys = context.keys();
        const values = keys.map(context);
        const data = keys.map((key, index) => {
          const slug =
              key.replace(/^.*[\\\/]/, "").split(".").slice(0, -1).join(".");
          const value = values[index];
          const document = matter(value.default);
          return {document, slug};
        });

        return data.slice().sort((a, b) => new Date(b.document.data.date) -
                                           new Date(a.document.data.date));
      })(require.context("../../posts", true, /\.md$/));

      return {posts};
};
export default Blog;
