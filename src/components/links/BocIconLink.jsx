import { FaQuestion } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function BocIconLink() {
  return (
    <div className='text-link'>
      {/* Link to -> to be changed when component is used */}
      <Link to='/about'>
        <FaQuestion size={30} />
      </Link>
    </div>
  )
}

export default BocIconLink