import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, updateVotes } from "./requests";
import { useContext } from "react";
import AnecdoteContext from "./AnecdoteContext";

const App = () => {
  const queryClient = useQueryClient();
  const [notification, notificationDispatch] = useContext(AnecdoteContext);
  const updateAnecdoteMutation = useMutation(updateVotes, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const handleVote = (anecdote) => {
    notificationDispatch({
      type: "VOTE",
      payload: { content: anecdote.content },
    });
    setTimeout(
      () =>
        notificationDispatch({
          type: "CLEAR",
        }),
      5000
    );
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery("anecdotes", getAnecdotes, {
    retry: false,
  });
  //console.log(result);

  if (result.isLoading) {
    return <div>Loading data</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification} />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
