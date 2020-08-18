import React, { Component } from 'react';

interface AnkiLayoutProps {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
}

class AnkiLayout extends Component<AnkiLayoutProps> {
  render() {}
}

export default AnkiLayout;
