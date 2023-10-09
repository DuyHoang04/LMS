import React from 'react'

interface CourseIdPageProps {
    params: {
        courseId: string;
    }
}

const CourseIdPage = ({ params }: CourseIdPageProps) => {
    return (
        <div>{params.courseId}</div>
    )
}

export default CourseIdPage