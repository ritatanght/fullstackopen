import {useState, useEffect} from 'react';
import { DiaryEntry } from './types';
import diaryService from './services/diaries'
import axios from 'axios';


function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  useEffect(()=>{
    diaryService.getAll().then(data=>{
      setDiaries(data)
    })
  },[])

  const addDiary = async (e:React.SyntheticEvent)=>{
    e.preventDefault();
    try{
      const newEntry = await diaryService.createEntry({date, visibility, weather, comment})
      setDiaries(diaries.concat(newEntry));
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('')
      setMessage('')
    }catch(error: unknown) {
      if (axios.isAxiosError(error))  {   
        setMessage(error.response?.data)
    }
    }
  }
  
  return (
    <div className="App">
      <h2>Add new entry</h2>
      <div style={{color:'red'}}>{message}</div>
      <form onSubmit={addDiary}>
        date<input name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)}/><br/>
        visibility{" "}
        <label>great<input type="radio" name="visibility" value="great" checked={visibility==="great"} onChange={(e)=>setVisibility(e.target.value)}/></label>
        <label>good<input type="radio" name="visibility" value="good" checked={visibility==="good"} onChange={(e)=>setVisibility(e.target.value)} /></label>
        <label>ok<input type="radio" name="visibility" value="ok" checked={visibility==="ok"} onChange={(e)=>setVisibility(e.target.value)}/></label>
        <label>poor<input type="radio" name="visibility" value="poor" checked={visibility==="poor"} onChange={(e)=>setVisibility(e.target.value)}/></label>
        <br/>
        weather{" "}
        <label>sunny<input type="radio" name="weather" value="sunny" checked={weather==="sunny"} onChange={(e)=>setWeather(e.target.value)}/></label>
        <label>rainy<input type="radio" name="weather" value="rainy" checked={weather==="rainy"} onChange={(e)=>setWeather(e.target.value)} /></label>
        <label>cloudy<input type="radio" name="weather" value="cloudy" checked={weather==="cloudy"} onChange={(e)=>setWeather(e.target.value)}/></label>
        <label>stormy<input type="radio" name="weather" value="stormy" checked={weather==="stormy"} onChange={(e)=>setWeather(e.target.value)}/></label>
        <label>windy<input type="radio" name="weather" value="windy" checked={weather==="windy"} onChange={(e)=>setWeather(e.target.value)}/></label>
        <br/>
        comment<input name="comment" value={comment} onChange={(e) => setComment(e.target.value)}/><br/>
        <button type="submit">add</button>
      </form>
    <h2>Diary entries</h2>
    {diaries.map(entry=><div key={entry.id}><strong>{entry.date}</strong><p>visibility:{entry.visibility}<br/>weather:{entry.weather}</p></div>)}

    </div>
  );
}

export default App;