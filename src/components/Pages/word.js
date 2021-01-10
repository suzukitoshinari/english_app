import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import StickyTable from '../List/list';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#e0f7fa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '85vh'
  },
  text: {
    textAlign: 'center'
  },
});

function Word() {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.text} variant="h1" component="h2">
        単語帳
      </Typography>
      <Container className={classes.root}>
        <StickyTable />
      </Container>
    </>
  );
}
export default Word