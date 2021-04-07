import React, { useState, useEffect }　from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, List, ListItem, Button } from '@material-ui/core';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import { db } from '../../firebase';
import firebase from 'firebase';

const useStyles = makeStyles({
  main: {
    width: '70%',
    height: '70%'
  },
  paper: {
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 5,
    padding: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    margin: 20,
    width: 220
  },
  btnAdd: {
    margin: 35,
    padding: 5,
    border: '1px solid black'
  },
  btn: {
    border: '1px solid black'
  },
  container: {
    display: 'flex',
  },
  item: {
    borderBottom: '1px solid black',
    height: 40
  },
  list: {
    width: '80%',
    padding: 0,
    backgroundColor: 'white',
    border: '1px solid black'
  },
});

const PhraseList = () => {
  const classes = useStyles();

  const [items, setItems] = useState([]),
        [newPhrase, setNewPhrase] = useState(''),
        [newMeaning, setNewMeaning] = useState('');

  useEffect (() => {
    const unSub = db.collection("phrase").orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({id: doc.id, phrase: doc.data().phrase, meaning: doc.data().meaning, isCompleted: doc.data().isCompleted}))
      );
    });
    return () => unSub();
  }, []);

  const handleNewPhrase = (e) => {
    setNewPhrase(e.target.value);
  }
  const handleNewMeaning = (e) => {
    setNewMeaning(e.target.value);
  };

  const handleAddPhrase = () => {
    db.collection("phrase").add({phrase: newPhrase, meaning: newMeaning, isCompleted: false, 
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((doc) => {
      console.log(`追加に成功しました (${doc.id})`);
    })
    .catch((error) => {
      console.log(`追加に失敗しました (${error})`);
    });
    setNewPhrase('');
    setNewMeaning('');
  };

  const onClickDelete = (id) => {
    db.collection("phrase").doc(id).delete();
  };

  const speak = (setNewPhrase) => {
    let options = new SpeechSynthesisUtterance(setNewPhrase);
    options.lang = 'en-US';
    speechSynthesis.speak(options);
    console.log('options')
  };
 
  return (
    <>
      <div className={classes.main}>
        <form className={classes.paper} autoComplete='off'>      
          <TextField className={classes.text} label='フレーズ' value={newPhrase} onChange={handleNewPhrase}/>
          <TextField className={classes.text} label='意味' value={newMeaning} onChange={handleNewMeaning}/>
          <Button className={classes.btnAdd} disabled={!newPhrase|!newMeaning} type='button' onClick={handleAddPhrase}>
            追加
          </Button>
          <div>
             登録件数：{items.length} フレーズ
          </div>
        </form>
        <div className={classes.container}>
          <List component='ul' className={classes.list} >
            {items.map((item) => (
              <ListItem key={item.id} component='li' className={classes.item}>
                <Button className={classes.btn} onClick={() => {onClickDelete(item.id)}}>
                  x
                </Button>
                <Button type='button' onClick={() => speak(item.phrase)}>
                  <AudiotrackIcon className={classes.btn} fontSize='small'/>
                </Button>
                {item.phrase}
              </ListItem>
            ))}
          </List>
          <List component='ul' className={classes.list}>
            {items.map((item) => (
              <ListItem key={item.id} component='li' className={classes.item}>
                {item.meaning}
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </>
  );
}

export default PhraseList;







