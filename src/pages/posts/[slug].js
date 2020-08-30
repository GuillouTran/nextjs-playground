/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import matter from "gray-matter";
import Link from "next/link";
import React from "react";
import {BookOpen} from "react-feather";
import {Col, Row} from "react-flexbox-grid";
import ReactMarkdown from "react-markdown";
import ProgressBar from "react-scroll-progress-bar";
import readingTime from "reading-time";

import CodeBlock from "../../components/CodeBlock";
import Layout from "../../components/Layout";

function Posts({content, data}) {
  const frontmatter = data;
  const {title, author} = frontmatter;
  const avatar =
      `https://images.weserv.nl/?url=https://unavatar.now.sh/twitter/${
          author.twitter}&w=40`;
  const {text} = readingTime(content);

  return (
    <>
      <div className="writing-progress">
        <ProgressBar height="5px" />
      </div>

      <Layout secondaryPage noHead>
        <div style={{ marginTop: 50 }}>
          <Link href="/" as="/">
            <a className="back-button">back</a>
          </Link>
          <h1 className="main-h1">{title}</h1>

          <div className="reading-time">
            <BookOpen size="16px" />
            {text}
          </div>

          <div className="author">
            <a
              href={`https://twitter.com/${
    author.twitter}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <img src={avatar} />
              {author.name}
            </a>
          </div>

          <div className="writing-container">
            <ReactMarkdown
              source={content}
              escapeHtml={false}
              renderers={{
                code: CodeBlock,
                link: (props) => {
                  if (!props.href.startsWith("http")) {
                    return (
                      <a href={props.href} rel="nofollow noreferrer noopener">
                        {props.children}
                      </a>
                    );
                  }

                  return (
                    <a
                      href={props.href}
                      rel="nofollow noreferrer noopener"
                      target="_blank"
                    >
                      {props.children}
                    </a>
                  );
                },
              }}
            />

            <div className="twitter-follow">
              If you liked this writing don't follow me on{" "}
              <a
                href="https://twitter.com/guilloutran"
                rel="noopener noreferrer nofollow"
              >
                Twitter
              </a>
              , I only shitpost over there.
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

Posts.getInitialProps = async (context) => {
  const { slug } = context.query;
  const content = await import(`../../../posts/${slug}.md`);
  const data = matter(content.default);

  return { ...data };
};

export default Posts;
