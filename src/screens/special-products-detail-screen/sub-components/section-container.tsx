export interface SectionContainerProps {
  children: React.ReactNode
  className?: string
}
const SectionContainer: React.FC<SectionContainerProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg p-4 ${className}`}>{children}</div>
)

export default SectionContainer
