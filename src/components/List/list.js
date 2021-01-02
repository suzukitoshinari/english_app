import React, { useState, useEffect }　from 'react';
import { makeStyles } from '@material-ui/core/styles';
import{ TextField, List, ListItem } from '@material-ui/core';

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
// const id = lists.length;

const StickyTable = () => {
  const classes = useStyles();

  const [words, setWord] = useState([]),
        [newWord, setNewWord] = useState(''),
        [meanings, setMeaning] = useState([]),
        [newMeaning, setNewMeaning] = useState('');

  // useEffect(() => {

        const handleNewWord = (e) => {
          setNewWord(e.target.value);
        }
        const handleNewMeaning = (e) => {
          setNewMeaning(e.target.value);
        };

        const koko = () => {
          if(words && newWord === '' || newMeaning === '') {
            alert('単語と意味の両方を入力してください。');
            setNewWord('');
            setNewMeaning('');
            return;
          } else if(newWord.match(/[^A-Za-z0-9]+/)) {
            alert('英語で入力してください。');
            setNewWord('');
            setNewMeaning('');
            return;
          }  else {
            handleAddWord();
            handleAddMeaning();
          }
        }

        const onClickAdd = () => {
        　koko();
        }

   const handleAddWord = () => {
    // e.preventDefault()
    // const id = words.length ? words[words.length - 1].id + 1 : 0;
    setWord([...words, {
      id: Date.now(), item: newWord, isCompleted: false
    }])
    setNewWord('');
  }

  const handleAddMeaning = () => {
    // e.preventDefault()
    // const id = meanings.length ? meanings[meanings.length - 1].id + 1 : 0;
    setMeaning([...meanings, {
      id: Date.now(), content: newMeaning, isCompleted: false
    }])
    setNewMeaning('');
  }

  const handleDeleteWord = () => {
    // const id = words.length ? words[words.length - 1].id + 1 : 0;
    setWord(words.filter((word) => word.id != id));
  }

  const handleDeleteMeaning = () => {
    setMeaning(meanings.filter((meaning) => meaning.id != id));
  }

  const onClickDelete = () => {
    handleDeleteWord();
    handleDeleteMeaning();
  }

// },[])
  // const [open, setOpen] = useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      <div className={classes.main}>
        <form className={classes.paper} autoComplete="off">      
          <TextField label="単語" value={newWord} onChange={handleNewWord}/>
          <TextField label="意味" value={newMeaning} onChange={handleNewMeaning}/>
          <button type="button" onClick={onClickAdd}>
            登録する
          </button>
          <button onClick={onClickDelete}>
            削除
          </button>
        </form>
        <div className={classes.container}>
          <List component='ol' className={classes.list}>
            {words.map((word, id) => (
              <ListItem key={id} component='li' className={classes.item}>
                <input type='checkbox'/>
                {word.item}
              </ListItem>
            ))}
          </List>
          <List component='ol' className={classes.list}>
              {meanings.map((meaning, id) => (
                <ListItem key={id} component='li' className={classes.item}>
                  {meaning.content}
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