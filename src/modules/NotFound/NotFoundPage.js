import { Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

function NotFoundPage() {
  return (
    <Container component="main" maxWidth="xs" data-test="notFoundPageContainer">
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            404 Page Not Found
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

NotFoundPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default NotFoundPage;
