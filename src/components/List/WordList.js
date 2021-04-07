import React, { useState, useEffect }　from 'react';
import useMedia from 'use-media';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, List, ListItem, Checkbox, Button } from '@material-ui/core';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
// import { v4 as uuidv4 } from 'uuid';
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

const WordList = () => {
  const classes = useStyles();
  const isWide = useMedia({minWidth: '1181px'});

  const [items, setItems] = useState([]),
        [newWord, setNewWord] = useState(''),
        [newMeaning, setNewMeaning] = useState('');

  useEffect (() => {
    const unSub = db.collection("word").orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({id: doc.id, word: doc.data().word, meaning: doc.data().meaning, isCompleted: doc.data().isCompleted}))
      );
    });
    return () => unSub();
  }, []);

  const handleNewWord = (e) => {
    setNewWord(e.target.value);
  }
  const handleNewMeaning = (e) => {
    setNewMeaning(e.target.value);
  };

  const handleAddWord = () => {
    db.collection("word").add({word: newWord, meaning: newMeaning, isCompleted: false, 
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((doc) => {
      console.log(`追加に成功しました (${doc.id})`);
    })
    .catch((error) => {
      console.log(`追加に失敗しました (${error})`);
    });
    setNewWord('');
    setNewMeaning('');
  };

  const onClickDelete = (id) => {
    db.collection("word").doc(id).delete();
  };

  // function toggleInProgress() {
  //   db.collection("word").doc(id).update({
  //     isCompleted: !isCompleted,
  //   });
  // }

  const speak = (setNewWord) => {
    let options = new SpeechSynthesisUtterance(setNewWord);
    options.lang = 'en-US';
    speechSynthesis.speak(options);
    console.log('options')
  };
 
  return (
    <>
      {isWide ? 
        <div className={classes.main}>
          <form className={classes.paper} autoComplete='off'>      
            <TextField className={classes.text} label='単語' value={newWord} onChange={handleNewWord}/>
            <TextField className={classes.text} label='意味' value={newMeaning} onChange={handleNewMeaning}/>
            <Button className={classes.btnAdd} disabled={!newWord|!newMeaning} type='button' onClick={handleAddWord}>
              追加
            </Button>
            <div>
              登録件数：{items.length} 単語
            </div>
          </form>
          <div className={classes.container}>
            <List component='ul' className={classes.list} >
              {items.map((item) => (
                <ListItem key={item.id} component='li' className={classes.item}>
                  <Button className={classes.btn} onClick={() => {onClickDelete(item.id)}}>
                    x
                  </Button>
                  <Button type='button' onClick={() => speak(item.word)}>
                    <AudiotrackIcon className={classes.btn} fontSize='small'/>
                  </Button>
                  {item.word}
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
      : 
        <div className={classes.main}>
          <form className={classes.paper} autoComplete='off'>      
            <TextField className={classes.text} label='単語' value={newWord} onChange={handleNewWord}/>
            <TextField className={classes.text} label='意味' value={newMeaning} onChange={handleNewMeaning}/>
            <Button className={classes.btnAdd} disabled={!newWord|!newMeaning} type='button' onClick={handleAddWord}>
              追加
            </Button>
            <div>
              登録件数：{items.length} 単語
            </div>
          </form>
          <div className={classes.container}>
            <List component='ul' className={classes.list} >
              {items.map((item) => (
                <ListItem key={item.id} component='li' className={classes.item}>
                  <Button className={classes.btn} onClick={() => {onClickDelete(item.id)}}>
                    x
                  </Button>
                  <Button type='button' onClick={() => speak(item.word)}>
                    <AudiotrackIcon className={classes.btn} fontSize='small'/>
                  </Button>
                  {item.word}
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
      }
    </>
  );
}

export default WordList;







