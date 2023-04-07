import { PartProps } from "../types";
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}:PartProps) =>{
    switch(part.kind){
        case 'basic':
            return (<p><strong>{part.name} {part.exerciseCount}</strong><br/>
             <em>{part.description}</em>
            </p>)
        case 'group':
            return (<p><strong>{part.name} {part.exerciseCount}</strong><br/>
             project exercises {part.groupProjectCount}
            </p>)
        case 'background':
            return (<p><strong>{part.name} {part.exerciseCount}</strong><br/>
            <em>{part.description}</em><br/>
            {part.backgroundMaterial}
            </p>)
        case 'special':
            return (<p><strong>{part.name} {part.exerciseCount}</strong><br/>
            <em>{part.description}</em><br/>
            required skills: {part.requirements.join(', ')}
            </p>)    
        default:
            assertNever(part);
    }   
    return <h1>Part</h1>
};

export default Part;


