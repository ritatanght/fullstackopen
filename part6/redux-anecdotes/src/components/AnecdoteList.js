import { useDispatch, useSelector } from "react-redux";
import { makeVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const vote = (id) => {
    dispatch(makeVote(id));
  };

  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    );
  });
  const dispatch = useDispatch();
  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
