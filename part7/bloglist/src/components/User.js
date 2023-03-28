const User = ({ userInfo }) => {
  if (!userInfo) {
    return null
  }
  return (
    <>
      <h2>{userInfo.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userInfo.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
