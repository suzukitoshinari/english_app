import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#e0f7fa',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '85vh',
  },
  text: {
    textAlign: 'center'
  },
  gridContainer: {
    backgroundColor: 'white',
    height: '60%',
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '150px'
  },
  btn: {
    height: '80%',
    width: '65%',
    fontSize: 40,
    backgroundColor: 'pink'
  }
});

function Home() {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.text} variant="h1" component="h2">
        英語録
      </Typography> 
      <div className={classes.root}>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={12} className={classes.btnContainer}>
            <Button href='/word'　className={classes.btn} variant="contained" disableElevation>
              単語
            </Button>
          </Grid>             
          <Grid item xs={12} className={classes.btnContainer}>
            <Button href='/phrase' className={classes.btn} variant="contained" disableElevation>
              フレーズ
            </Button>
          </Grid>            
        </Grid>
      </div>
    </>
  );
}

export default Home;
