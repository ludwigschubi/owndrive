import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = (props) => {
    console.log(props.breadcrumbs);
    const root = 'https://' + props.webId.split('/')[2];
    let currentUrl = root;
    const breadcrumbMarkup = props.breadcrumbs
        ? props.breadcrumbs.map((currentBreadcrumb, currentIndex) => {
              if (currentBreadcrumb !== '/') {
                  currentUrl = currentUrl + currentBreadcrumb;
                  const thisUrl = currentUrl.slice();
                  return (
                      <Breadcrumb.Item
                          key={currentIndex}
                          onClick={() => {
                              props.onClick(thisUrl);
                          }}
                      >
                          {console.log(
                              'current breadcrumb',
                              currentUrl,
                              currentBreadcrumb
                          )}
                          {currentBreadcrumb.replace('/', '')}
                      </Breadcrumb.Item>
                  );
              } else {
                  return (
                      <Breadcrumb.Item
                          key={0}
                          onClick={() => props.onClick(root)}
                      >
                          Home
                      </Breadcrumb.Item>
                  );
              }
          })
        : undefined;

    return (
        <Container>
            <Breadcrumb className={styles.container}>
                {breadcrumbMarkup}
            </Breadcrumb>
        </Container>
    );
};

export default Breadcrumbs;
