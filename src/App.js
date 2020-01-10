import React, { Suspense, useRef } from "react";
import { Router } from "@reach/router";
import ErrorBoundary from "react-error-boundary";
import Header from "./shared/components/Header";
import { createGlobalStyle } from "styled-components";
import { StylesProvider } from "@material-ui/core";
import { StoreProvider } from "./shared/components/Store";
import LoadingIndicator from "./shared/components/LoadingIndicator";
import { SnackbarProvider } from "notistack";
import PropTypes from "prop-types";

//import Footer from "./shared/components/Footer";

const GlobalStyles = createGlobalStyle`
body {
  background-color:#333;
  overflow-x:hidden;
}
@media print {
  .MuiAppBar-root {
    display: none;
  }
  .pp-action-bar {
    display: none;
  }
}
`;

const Parts = React.lazy(() => import("./screens/parts"));
const Layout = React.lazy(() => import("./screens/layout"));
const About = React.lazy(() => import("./screens/about"));

function ErrorFallback({ error }) {
  return (
    <>
      <p>There was an error</p>
      <pre style={{ maxWidth: 700 }}>{JSON.stringify(error, null, 2)}</pre>
    </>
  );
}
ErrorFallback.propTypes = { error: PropTypes.object.isRequired };

export default function App() {
  const headerRef = useRef();
  return (
    <>
      <SnackbarProvider>
        <StoreProvider>
          <StylesProvider injectFirst>
            <GlobalStyles />
            <Header ref={headerRef} />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense
                fallback={<LoadingIndicator message="Loading Application" />}
              >
                <Router>
                  <Parts path="/" />
                  <Layout headerRef={headerRef} path="/layout" />
                  <About path="/about" />
                </Router>
              </Suspense>
            </ErrorBoundary>
          </StylesProvider>
        </StoreProvider>
      </SnackbarProvider>
    </>
  );
}
