import axios from 'axios';
import { DiaryEntry, NewEntry } from '../types';
const BaseUrl = 'http://localhost:3001/api/diaries'

const getAll = async () =>{
    const {data} = await axios.get<DiaryEntry[]>(BaseUrl)
    return data;
}

const createEntry = async(object:NewEntry)=>{
    const response = await axios.post<DiaryEntry>(BaseUrl, object)
    return response.data;
}

export default { getAll, createEntry };