import Image from 'next/image'

const dimension = 100

const Loader = () => {
  return <Image src="/loadert.gif" alt="loader" height={dimension} width={dimension} className="m-auto" />
}
export default Loader
