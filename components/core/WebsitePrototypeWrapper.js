import * as React from "react";

import Head from "next/head";

export default class WebsitePrototypeWrapper extends React.Component {
  static defaultProps = {
    image:
      "https://slate.textile.io/ipfs/bafybeihtmqpx2lnlvaerfhq5imi2y3jzuf4jqspmmqbth3ebim4ebc2lqy",
    title: "Slate",
    url: "https://slate.host/_",
    description:
      "Slate is the place to save and share any content on the web. Discover curated collections of links and files, and create your own. Get started with 30GB of free storage.",
  };

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>{this.props.title}</title>
          <meta name="title" content={this.props.title} />
          <meta name="description" content={this.props.description} />
          <meta
            name="google-site-verification"
            content="INHmYWYLRrINvdmu9BXrXaJnphG0-wF5e2YGaDx2v7k"
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={this.props.url} />
          <meta property="og:title" content={this.props.title} />
          <meta property="og:description" content={this.props.description} />
          <meta property="og:image" content={this.props.image} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={this.props.url} />
          <meta property="twitter:title" content={this.props.title} />
          <meta property="twitter:description" content={this.props.description} />
          <meta property="twitter:image" content={this.props.image} />

          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />

          <link rel="shortcut icon" href="/static/favicon.ico" />

          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/static/icon-96x96.png" />
        </Head>
        {this.props.children}
      </React.Fragment>
    );
  }
}
