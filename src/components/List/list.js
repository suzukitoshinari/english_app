import React, { useState, useEffect }　from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, List, ListItem, Checkbox, Button } from '@material-ui/core';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import AddBox from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase';
import firebase from 'firebase';

const useStyles = makeStyles({
  root: {
        width: '100%',
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: 5,
        padding: 3
      },
      btn: {
        width: '100%'
      },
      main: {
        width: '70%',
        height: '70%'
      },
      list: {
        width: '80%',
        padding: 0,
        backgroundColor: 'white',
        border: '1px solid black'
      },
      container: {
        display: 'flex',
      },
      item: {
        borderBottom: '1px solid black',
        height: 40
      },
});

const StickyTable = () => {
  const classes = useStyles();

  const [items, setItems] = useState([]),
        [newWord, setNewWord] = useState(''),
        [newMeaning, setNewMeaning] = useState('');

  useEffect (() => {
    const unSub = db.collection('todo').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({id: doc.id, word: doc.data().word, meaning: doc.data().meaning, isCompleted: doc.data().isCompleted}))
        // snapshot.docs.map((doc) => ({id: doc.id, item: doc.data().item, isCompleted: doc.data().isCompleted}))
      );
    });
    return () => unSub();
  }, []);

  const handleNewWord = (e) => {
    setNewWord(e.target.value);
    // setItems(e.target.value);
  }
  const handleNewMeaning = (e) => {
    setNewMeaning(e.target.value);
    // setItems(e.target.value);
  };

  const onClickAdd = () => {
    if (newWord === '' || newMeaning === '') {
      alert('単語と意味の両方を入力してください。');
      return;
    } else if(newWord.match(/[^A-Za-z0-9]+/)) {
      alert('英語で入力してください。');
      return;
    }  else {
      handleAddWord();
    }
  }

  const handleAddWord = () => {
    db.collection("todo").add({word: newWord, meaning: newMeaning, isCompleted: false, 
    // db.collection("todo").add({item: item, isCompleted: false, 
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    // setNewWord('');
    // setNewMeaning('');
  };

  const onClickDelete = () => {
    db.collection("todo").doc(docid).delete();
    // db.collection("todo").get().then(function(snapshot){
    //   snapshot.forEach(function(doc){
    //     db.collection("todo").doc(doc.id).delete();
    //   })
    // })
  };

  const speak = (setNewWord) => {
    let options = new SpeechSynthesisUtterance(setNewWord);
    options.lang = 'en-US';
    speechSynthesis.speak(options);
    console.log('options')
  };

  return (
    <>
      <div className={classes.main}>
        <form className={classes.paper} autoComplete='off'>      
          <TextField label='単語' value={newWord} onChange={handleNewWord}/>
          <TextField label='意味' value={newMeaning} onChange={handleNewMeaning}/>
          <Button disabled={!newWord|!newMeaning} type='button' onClick={onClickAdd}>
            <AddBox />
          </Button>
          <Button type='button' onClick={onClickDelete}>
            <DeleteForeverIcon />
          </Button>
          <div>
             {items.length} items
          </div>
        </form>
        <div className={classes.container}>
          <List component='ul' className={classes.list} >
            {items.map((item) => (
              <ListItem key={item.id} component='li' className={classes.item}>
               ・
                <Button onClick={onClickDelete}>
                  x
                </Button>
                {item.word}
                <Button type='button' onClick={() => speak(item.word)}>
                  <AudiotrackIcon fontSize='small'/>
                </Button>
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

export default StickyTable;







