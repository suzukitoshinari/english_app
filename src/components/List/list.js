import React, { useState, useEffect }　from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, List, ListItem, Checkbox } from '@material-ui/core';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import AddBox from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { v4 as uuidv4 } from 'uuid';
import db from './firebase';

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
      // check: {
      //   marginRight: 20
      // },
      // .app__logout {
      //   cursor: pointer;
      //   background-color: transparent;
      //   border: none;
      //   outline: none;
      //   color: dimgray;
      //   margin-left: 10px;
      // }
});

const StickyTable = () => {
  const classes = useStyles();

  const [items, setItems] = useState([]),
        [newWord, setNewWord] = useState(''),
        [newMeaning, setNewMeaning] = useState('');

  // useEffect(() => {
  //   (async () => {
  //     const resTodo = await db.collection("e-todo").doc("rrYNojj9IQaczCNVeLSc").get();
  //     setItems(resTodo.data().items);
  //     // const resFinishedTodo = await db.collection("e-todo").doc("w3werKruvoimxVN64d3P").get();
  //   })()
  // }, [db])

  useEffect (() => {
    const unSub = db.collection('e-todo').onSnapshot((snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({id: doc.id, item: doc.data().item}))
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
    setItems([...items, {
      id: uuidv4(), word: newWord, meaning: newMeaning, isCompleted: false
    }]);
    setNewWord('');
    setNewMeaning('');
  }

  const onClickDelete = () => {
    setItems(items.filter((item) => !item.isCompleted));
  }

  const toggleCompleted = (id) => {
    setItems(items.map(item => {
        if (item.id === id) {
          return {...item, isCompleted: !item.isCompleted}
        }
        return item
      }));
  }

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
          <button type='button' onClick={onClickAdd}>
            <AddBox />
          </button>
          <button type='button' onClick={onClickDelete}>
            <DeleteForeverIcon />
          </button>
          <div>
             {items.length} items
          </div>
        </form>
        <div className={classes.container}>
          <List component='ul' className={classes.list} >
            {items.map((item) => (
              <ListItem key={item.id} component='li' className={classes.item}>
                {items.length}
                <Checkbox
                  // className={classes.check}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  onClick={e => toggleCompleted(item.id)}
                  value={item.isCompleted}
                />
                {item.word}
                <button type='button' onClick={() => speak(item.word)}>
                  <AudiotrackIcon fontSize='small'/>
                </button>
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







