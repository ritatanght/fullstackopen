import Part from './Part'
import { ContentProps } from '../types'

const Content = (props:ContentProps)=>{
const parts = props.course.map(part=><Part key={part.name} part={part}/>)
    return <>{parts}</>
}

export default Content;