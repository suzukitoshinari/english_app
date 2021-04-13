import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import WordList from '../List/WordList';
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
  text: {
    textAlign: 'center'
  },
  btn: {
    marginLeft: 20
  },
  root: {
    backgroundColor: '#e0f7fa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  }
});

function Word() {
  const classes = useStyles();
  
  return (
    <>
      <Typography className={classes.text} variant='h1' component='h2'>
        単語帳
        <Button href='/' className={classes.btn} variant='contained' disableElevation>
          <HomeIcon />
        </Button>
      </Typography>
      <Container className={classes.root}>
        <WordList />
      </Container>
    </>
  );
}
export default Word;