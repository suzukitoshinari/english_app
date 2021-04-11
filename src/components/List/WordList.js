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
    border: '2px solid black'
  },
  words: {
    background: 'white',
    border: '2px solid black'
  },
  resPaper: {
    backgroundColor: 'white',
    border: '2px solid #000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 150
  },
  input: {
    display: 'flex',
    flexDirection: 'column'
  },
  resBtnAdd: {
    margin: '90px 0px 0px 0px',
    padding: 12,
    width: 60,
    border: '1px solid black',
    cursor: 'pointer'
  },
  resItem: {
    borderBottom: '2px solid black',
    height: '90',
    padding: 10,
    wordBreak: 'break-all'
  },
  btnItem: {
    height: '100%',
    width: '100%'
  },
  resList: {
    width: '100%',
    background: 'white',
    border: '1px solid black',
    padding: 0,
    boxSizing: 'border-box'
  },
  itemBox: {
    display: 'flex'
  },
  btnBox: {
    width: 120,
    border: '2px solid black'
  },
  listBox: {
    width: '100%'
  },
  minResPaper: {
    backgroundColor: 'white',
    border: '2px solid #000',
    textAlign: 'center',
    padding: 20,
    height: 140
  },
  minResBtnAdd: {
    margin: '10px 0px 0px 0px',
    padding: 9,
    border: '1px solid black',
    cursor: 'pointer',
    height: 40,
    width: '100%'
  },
  minText: {
    width: '100%'
  },
  minBtnBox: {
    width: 40,
    border: '2px solid black'
  },
  minBtnItem: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between'
  },
  minBtn: {
    border: '1px solid black',
    padding: 0,
    width: 20,
    height: 20,
    cursor: 'pointer'
  }
});

const WordList = () => {
  const classes = useStyles();
  const isWide = useMedia({minWidth: '974px'});
  const isWidth = useMedia({minWidth: '542px'});

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
      : isWidth ?
        <div className={classes.main}>
          <form className={classes.resPaper} autoComplete='off'> 
            <div className={classes.input}>
              <TextField className={classes.text} label='単語' value={newWord} onChange={handleNewWord}/>
              <TextField className={classes.text} label='意味' value={newMeaning} onChange={handleNewMeaning}/>
            </div>
            <button className={classes.resBtnAdd} disabled={!newWord|!newMeaning} type='button' onClick={handleAddWord}>
              追加
            </button>
          </form>
          <div className={classes.words}>
            登録件数：{items.length} 単語
          </div>
          <List component='ul' className={classes.resList} >
            {items.map((item) => (
              <div className={classes.itemBox}>
                <div className={classes.btnBox}>
                  <ListItem key={item.id} component='li' className={classes.btnItem}>
                    <button className={classes.btn} type='button' onClick={() => {onClickDelete(item.id)}}>
                      x
                    </button>
                    <button className={classes.btn} type='button' onClick={() => speak(item.word)}>
                      ♫
                    </button>
                  </ListItem>
                </div>
                <div className={classes.listBox}>
                  <ListItem key={item.id} component='li' className={classes.resItem}>
                    {item.word}
                  </ListItem>
                  <ListItem key={item.id} component='li' className={classes.resItem}>
                    {item.meaning}
                  </ListItem>
                </div>
              </div>
            ))}
          </List>
        </div>
      : 
        <div className={classes.main}>
          <form className={classes.minResPaper} autoComplete='off'> 
            <div className={classes.input}>
              <TextField className={classes.minText} label='単語' value={newWord} onChange={handleNewWord}/>
              <TextField className={classes.minText} label='意味' value={newMeaning} onChange={handleNewMeaning}/>
            </div>
            <button className={classes.minResBtnAdd} disabled={!newWord|!newMeaning} type='button' onClick={handleAddWord}>
              追加
            </button>
          </form>
          <div className={classes.words}>
            登録件数：{items.length} 単語
          </div>
          <List component='ul' className={classes.resList} >
            {items.map((item) => (
              <div className={classes.itemBox}>
                <div className={classes.minBtnBox}>
                  <ListItem key={item.id} component='li' className={classes.minBtnItem}>
                    <button className={classes.minBtn} type='button' onClick={() => {onClickDelete(item.id)}}>
                      x
                    </button>
                    <button className={classes.minBtn} type='button' onClick={() => speak(item.word)}>
                      ♫
                    </button>
                  </ListItem>
                </div>
                <div className={classes.listBox}>
                  <ListItem key={item.id} component='li' className={classes.resItem}>
                    {item.word}
                  </ListItem>
                  <ListItem key={item.id} component='li' className={classes.resItem}>
                    {item.meaning}
                  </ListItem>
                </div>
              </div>
            ))}
          </List>
        </div>
      }
    </>
  );
}

export default WordList;







