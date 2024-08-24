// PaginationControls.jsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import './PaginationControls.css'

const PaginationControls = ({ hasNextPage, hasPrevPage,dataLength ,pageNumbers}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page = searchParams.get('per_page') ?? '5'

  return (
    <div className='flex gap-2' id='pagination__container'>

      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`)
         

          
        }}>
        &lt;&lt;&lt;
      </button>

      <div>
        {page} / {Math.ceil(dataLength / Number(per_page))}
      </div>

      <button
        className='bg-blue-500 text-white p-1'
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`)
        }}>
        &gt;&gt;&gt;
      </button>
    </div>
  )
}

export default PaginationControls