const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <p>Total of {sum} exercises</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  const part = parts.map((part) => <Part key={part.id} part={part} />);
  return <>{part}</>;
};

const Course = ({ course }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)}
      />
    </>
  );
};

export default Course;
