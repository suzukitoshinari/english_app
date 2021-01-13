import React, { useState }　from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, List, ListItem, Checkbox } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

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
        border: '1px solid black',
      },
      container: {
        display: 'flex',
      },
      item: {
        borderBottom: '1px solid black',
        height: 40
      }
});

const StickyTable = () => {
  const classes = useStyles();

  const [items, setItems] = useState([]),
        [newWord, setNewWord] = useState(''),
        [newMeaning, setNewMeaning] = useState('');

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
            登録する
          </button>
          <button type='button' onClick={onClickDelete}>
            削除
          </button>
        </form>
        <div className={classes.container}>
          <List component='ol' className={classes.list}>
            {items.map((item) => (
              <ListItem key={item.id} component='li' className={classes.item}>
                <Checkbox
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  onClick={e => toggleCompleted(item.id)}
                  value={item.isCompleted}
                />
                {item.word}
                <button type='button' onClick={() => speak(item.word)}>
                  発音を確認
                </button>
              </ListItem>
            ))}
          </List>
          <List component='ol' className={classes.list}>
            {items.map((item) => (
              <ListItem key={item.id} component='li' className={classes.item}>
                {item.meaning}
              </ListItem>
            ))}
          </List>
           {/* <div>
          //   {items.length} items
          // </div> */}
        </div>
      </div>
    </>
  );
}

export default StickyTable;







