import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface Params {
    params: {
        courseId: string
        attachmentId: string
    }
}

export async function DELETE(
    req: Request,
    { params }: Params
) {
    try {
        const { userId } = auth();
        const { courseId, attachmentId } = params;

        if (!userId) return new NextResponse("Unauthorized", { status: 401 });

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                userId
            }
        })

        if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });


        const attachment = await db.attachment.delete({
            where: {
                id: attachmentId,
                courseId
            }
        })

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("ATTACHMENT_ID", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}