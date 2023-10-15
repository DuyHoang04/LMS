import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'
import { DataTable } from './_component/data-table';
import { columns } from './_component/columns';

const CoursePage = async () => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className='p-6'>
            <DataTable data={courses} columns={columns} />
        </div>
    )
}

export default CoursePage