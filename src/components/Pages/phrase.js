import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PhraseList from '../List/FhraseList';
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#e0f7fc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  text: {
    textAlign: 'center'
  }
});

function Phrase() {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.text} variant='h1' component='h2'>
          例文帳
        <Button href='/' className={classes.btn} variant='contained' disableElevation>
          <HomeIcon />
        </Button>
      </Typography>
      <Container className={classes.root}>
        <PhraseList />
      </Container>
    </>
  );
}

export default Phrase;