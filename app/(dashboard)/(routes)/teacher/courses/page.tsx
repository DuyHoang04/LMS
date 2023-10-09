import Link from 'next/link'
import React from 'react'

const CoursePage = () => {
    return (
        <div className='p-6'>
            <Link href={"/teacher/create"}>
                CREATE
            </Link>
        </div>
    )
}

export default CoursePage