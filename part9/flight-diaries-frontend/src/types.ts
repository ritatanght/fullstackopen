export interface DiaryEntry{
    id: number;
    date: string;
    weather: string;
    visibility: string;
}

export interface NewEntry{
    date: string;
    weather: string;
    visibility: string;
    comment:string;
}