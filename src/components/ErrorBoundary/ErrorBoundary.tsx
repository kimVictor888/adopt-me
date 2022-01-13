import { Link, Redirect } from "react-router-dom";

import React, { Component, ErrorInfo } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    redirect: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    setTimeout(
      () =>
        this.setState({
          redirect: true,
        }),
      5000
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          This listing an error. <Link to="/">Click here</Link> to go back to
          the home page or wait five seconds.
        </h2>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
