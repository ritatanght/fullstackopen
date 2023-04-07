interface bodyMeasure{
    height:number;
    weight:number;
}

const parseArguments = (args: string[]): bodyMeasure => {
  if (args.length < 4) throw new Error('Not enough arguments. Usage: npm run calculateBmi height(cm) weight(kg)');
  if (args.length > 4) throw new Error('Too many arguments. Usage: npm run calculateBmi height(cm) weight(kg)');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight:number)=>{
    const bmi = (weight/ (height/100)**2);
    if( bmi<18.5){
        return "Underweight (Unhealthy)";
    } else if (bmi>=18.5 && bmi <23){
        return "Normal range (Healthy)";
    }else if (bmi>=23 && bmi <25){
        return "Overweight I (At risk)";
    }else if (bmi>=25 && bmi <30){
        return "Overweight II (Moderately obese)";
    }else{
        return "Overweight III (Severely obese)";
    }
};

try{
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Error...';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;

