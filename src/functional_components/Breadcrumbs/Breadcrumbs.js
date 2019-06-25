import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = (props) => {
    const breadcrumbMarkup = props.breadcrumbs
        ? props.breadcrumbs.map((currentBreadcrumb, currentIndex) => {
              if (currentIndex !== 0) {
                  const breadcrumbsSoFar = [];
                  props.breadcrumbs.forEach((breadcrumb, index) => {
                      if (index <= currentIndex) {
                          breadcrumbsSoFar.push(breadcrumb);
                      }
                  });
                  const currentBreadcrumbs = breadcrumbsSoFar.join('');
                  const root = 'https://' + props.webId.split('/')[2];

                  return (
                      <Breadcrumb.Item
                          key={currentIndex}
                          onClick={() => {
                              props.onClick(
                                  root + currentBreadcrumbs,
                                  breadcrumbsSoFar
                              );
                          }}
                      >
                          {currentBreadcrumb.replace('/', '')}
                      </Breadcrumb.Item>
                  );
              } else {
                  return (
                      <Breadcrumb.Item
                          key={0}
                          onClick={() =>
                              props.onClick(
                                  'https://' + props.webId.split('/')[2] + '/',
                                  ['/']
                              )
                          }
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
