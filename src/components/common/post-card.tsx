export interface PostCardProps {
  title: string
  content: string
}

const PostCard: React.FC<PostCardProps> = ({ title, content }) => (
  <div className="w-48 h-24 bg-gray-100 lg:max-w-sm flex flex-col gap-2 justify-center items-center text-base leading-5 text-center p-3">
    <h4 className="text-16 font-normal text-black  justify-center items-center">{title}</h4>
    <p className="mb-2 leading-normal justify-center items-center">{content}</p>
  </div>
)

export default PostCard
