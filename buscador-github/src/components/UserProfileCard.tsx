interface UserProps {
  user: {
    avatar_url: string
    name: string
    login: string
    bio: string
    followers: number
    following: number
  }
}

export const UserProfileCard = ({ user }: UserProps) => {
  const { avatar_url, name, login, bio, followers, following } = user

  return (
    <div>
      <h1>{name}</h1>
      <img src={avatar_url} alt="avatar" />
      <p>{login}</p>
      <p>{bio}</p>
      <p>{followers}</p>
      <p>{following}</p>
    </div>
  )
}
