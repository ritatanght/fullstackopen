import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req,res)=>{
    res.send('Hello Full Stack!');
});


app.get('/bmi',(req,res)=>{
    const parseArguments = (height:number, weight:number) => {
        if (!isNaN(height) && !isNaN(weight)) {
            return {height,weight};
        } else {
            throw new Error("malformatted parameters");
        }
    };
    try{
        const { height, weight } = parseArguments(Number(req.query.height),Number(req.query.weight));
        res.json({weight, height, bmi:calculateBmi(height,weight)});
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.json({error: error.message});
        }
    }
});

app.post('/exercises', (req,res)=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;
    console.log(target);
    console.log(daily_exercises);
    if(!target || !daily_exercises){
        return res.status(400).send({error:"parameters missing"});
    } else if (isNaN(Number(target)) || !Array.isArray(daily_exercises)|| daily_exercises.length===0){
        return res.status(400).send({error:"malformatted parameters"});
    }
    
    const length = daily_exercises.length;
    const dailyHours = [];
    for (let i = 0; i < length;i++){
        if (!isNaN(Number(daily_exercises[i]))) {
            dailyHours.push(Number(daily_exercises[i]));
        } else {
            return res.status(400).send({error:"malformatted parameters"});
        }
    }
    return res.send(calculateExercises(Number(target), dailyHours));   
    
});



const PORT = 3002;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});