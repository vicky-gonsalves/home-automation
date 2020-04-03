import { Card, CardContent, CardHeader } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const AppSkeleton = () => {
  const items = [1, 2, 3, 4, 5];
  return (
    <Grid container spacing={3}>
      {items.map(item => (
        <Grid key={`skeleton-${item}`} item xs={12} sm={12} md={6} xl={4}>
          <Card>
            <CardHeader>
              <Skeleton animation="wave" variant="rect" height={10} />
            </CardHeader>
            <CardContent>
              <div>
                <Grid container spacing={1}>
                  <Grid item xs={5} sm={4} md={5} lg={3}>
                    <Skeleton animation="wave" variant="rect" width={100} height={100} />
                  </Grid>
                  <Grid item xs={7} sm={8} md={7} lg={9}>
                    <div>
                      <Skeleton animation="wave" variant="rect" height={70} />
                      <br />
                      <Skeleton animation="wave" variant="rect" height={70} />
                      <br />
                      <Skeleton animation="wave" variant="rect" height={70} />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AppSkeleton;
