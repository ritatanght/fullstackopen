interface result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface statistic{
    dailyTarget: number,
    dailyHours: number[]
}

const parseArguments = (args: string[]): statistic=> {
  if (args.length < 4) throw new Error('Not enough arguments. Usage: npm run calculateExercises target hours(separated by spaces)');
    const length = args.length;
    const dailyHours = [];
   
    for (let i = 3; i < length;i++){
        if(!isNaN(Number(args[i]))){
            if(i > 2){
                dailyHours.push(Number(args[i]));
            }
        }else{
            throw new Error('Provided values were not numbers!');
        }
    }
    return {
        dailyTarget: Number(args[2]),
        dailyHours
    };
};

const calculateExercises = ( dailyTarget:number, dailyHours: number[]):result =>{
    const days = dailyHours.length;
    const avg = dailyHours.reduce((hours:number, sum:number)=>hours+sum,0)/days;
    type rating = 1 |2 |3;
    let rating: number;
    let ratingDescription:string;
    if(avg<dailyTarget){
        rating = 1;
        ratingDescription="You should put in more effort";
    } else if (avg === dailyTarget){
        rating = 2;
        ratingDescription="Good job for meeting the target";
    }else{
        rating = 3;
        ratingDescription="Excellent! You have been working hard, keep it up!";
    }
    return {
        periodLength: days,
        trainingDays: dailyHours.filter((hours:number)=> hours !==0).length,
        success: avg >=dailyTarget,
        rating: rating,
        ratingDescription: ratingDescription,
        target: dailyTarget,
        average:avg
    };
};

try{
    const {dailyTarget, dailyHours} = parseArguments(process.argv);
    console.log(calculateExercises(dailyTarget, dailyHours));
}catch(error){
    let errorMessage = 'Error...';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

export default calculateExercises;