import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface Params {
    params: {
        courseId: string,
        chapterId: string
    }
}

export async function PATCH(
    req: Request,
    { params }: Params
) {
    try {
        const { userId } = auth();
        const { courseId, chapterId } = params;
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log(chapterId, courseId)

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId
            }
        });

        console.log(ownCourse)

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                courseId,
            }
        })

        const muxData = await db.muxData.findUnique({
            where: {
                chapterId
            }
        })


        if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const publishedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data: {
                isPublished: true,
            }
        });

        return NextResponse.json(publishedChapter);


    } catch (error) {
        console.log("[CHAPTER_PUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}