import { createAnecdotes } from "../requests";
import { useMutation, useQueryClient } from "react-query";
import { useContext } from "react";
import AnecdoteContext from "../AnecdoteContext";
const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notification, notificationDispatch] = useContext(AnecdoteContext);
  const newAnecdoteMutation = useMutation(createAnecdotes, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });
  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onError: (err) => {
          // display error to <Notification>
          notificationDispatch({
            type: "ERROR",
            payload: { error: err.response.data.error },
          });
          setTimeout(
            () =>
              notificationDispatch({
                type: "CLEAR",
              }),
            5000
          );
        },
      }
    );
    // notify user on the new anecdote being successfully added
    notificationDispatch({
      type: "NEW",
      payload: { content },
    });
    setTimeout(
      () =>
        notificationDispatch({
          type: "CLEAR",
        }),
      5000
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
