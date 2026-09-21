const allowedGames = ["2048","tetris","memory","minesweeper","puzzle15","sokoban","maze","match3","guessnumber","snake","flappy","breakout","spaceshooter","runner","ninjajump","fruitslice","knifehit","catchfruits","dodge","stack","pinball","racing","pong","football","basketball","tictactoe","reversi","typing","colorswitch","reaction"];
const id = new URLSearchParams(location.search).get('id');
let lang='zh';
try { lang=localStorage.getItem('gamezone-lang') || 'zh'; } catch(error) { console.warn('Language preference unavailable', error.name); }
if(allowedGames.includes(id)) location.replace((['en','ja'].includes(lang)?'/'+lang:'')+'/play/'+id+'/');
