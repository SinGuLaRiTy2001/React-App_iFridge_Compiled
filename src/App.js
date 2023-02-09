import "./App.css"
import Pages from "./components/Pages/Pages";
function App() {
  return (
   <>
       <Pages />
   </>
  );
}

export default App;
/*
//1.识别常规变量
//2.原生js方法调用
//3.三元运算符（常用）
//列表的写法
const name = 'Hello-world'
const songs = [
    {id:1, name:'song1'},
    {id:2, name:'song2'},
    {id:3, name:'song3'}
]
const getAge = () =>{
    return 18
}
const flag=true
function App() {
  return (
    <div className="App">
    </div>
  );
}

 {name}
        {getAge()}
        {flag ? '真棒':'真菜'}
        <ul>
            {songs.map(song=><li key={song.id}>{song.name}</li>)}
        </ul>
 */
