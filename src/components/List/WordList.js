import React, { useState, useEffect }　from 'react';
import useMedia from 'use-media';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, List, ListItem } from '@material-ui/core';
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
    padding: 12,
    border: '1px solid black',
    cursor: 'pointer'
  },
  btnContainer: {
    width: 80,
    marginRight: 5,
    borderRight: '1px solid black',
    display: 'flex'
  },
  btn: {
    border: '1px solid black',
    padding: 0,
    width: 20,
    height: 20,
    margin: 10,
    cursor: 'pointer'
  },
  container: {
    display: 'flex',
  },
  item: {
    borderBottom: '1px solid black',
    height: 40,
    padding: 5
  },
  list: {
    width: '80%',
    padding: 0,
    backgroundColor: 'white',
    border: '1px solid black'
  },
  words: {
    background: 'white',
    border: '1px solid black'
  },
  resContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  resList: {
    width: '100%',
    background: 'white',
    border: '1px solid black',
    padding: 0
  }
});

const WordList = () => {
  const classes = useStyles();
  const isWide = useMedia({minWidth: '907px'});

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
            <button className={classes.btnAdd} disabled={!newWord|!newMeaning} type='button' onClick={handleAddWord}>
              追加
            </button>
          </form>
          <div className={classes.words}>
            登録件数：{items.length} 単語
          </div>
          <div className={classes.container}>
            <List component='ul' className={classes.list} >
              {items.map((item) => (
                <ListItem key={item.id} component='li' className={classes.item}>
                  <div className={classes.btnContainer}>
                    <button className={classes.btn} type='button' onClick={() => {onClickDelete(item.id)}}>
                      x
                    </button>
                    <button　className={classes.btn} type='button' onClick={() => speak(item.word)}>
                      ♫
                    </button>
                  </div>
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
            <button className={classes.btnAdd} disabled={!newWord|!newMeaning} type='button' onClick={handleAddWord}>
              追加
            </button>
          </form>
          <div className={classes.words}>
            登録件数：{items.length} 単語
          </div>
          <div className={classes.resContainer}>
            <List component='ul' className={classes.resList} >
              {items.map((item) => (
                <ListItem key={item.id} component='li' className={classes.item}>
                  <button className={classes.btn} type='button' onClick={() => {onClickDelete(item.id)}}>
                    x
                  </button>
                  <button className={classes.btn} type='button' onClick={() => speak(item.word)}>
                    ♫
                  </button>
                  {item.word}
                </ListItem>
              ))}
              {/* {items.map((item) => (
                <ListItem key={item.id} component='li' className={classes.item}>
                  {item.meaning}
                </ListItem>
              ))} */}
            </List>
            <List component='ul' className={classes.resList}>
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







