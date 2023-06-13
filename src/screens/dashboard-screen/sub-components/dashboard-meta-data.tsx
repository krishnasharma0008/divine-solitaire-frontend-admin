import PostCard from '@/components/common/post-card'

interface Item {
  title: string
  content: string
}

interface DashboardMetaDataProps {
  title: string
  items: Array<Item>
}

const DashboardMetaData: React.FC<DashboardMetaDataProps> = ({ items, title }) => (
  <div>
    <div className="flex text-xl leading-6 font-medium">
      <span>{title}</span>
    </div>
    <br />
    <div className="flex gap-4">
      {items.map((items, key) => (
        <PostCard title={items.title} content={items.content} key={key} />
      ))}
    </div>
  </div>
)

export default DashboardMetaData
