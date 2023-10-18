"use client"

import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface CourseProgressButtonProps {
    chapterId: string;
    courseId: string;
    nextChapterId?: string;
    isCompleted?: boolean;
}


export const CourseProgressButton = ({
    chapterId,
    courseId,
    isCompleted,
    nextChapterId
}: CourseProgressButtonProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        setIsLoading(true)
        try {
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted
            });

            if (!isCompleted && !nextChapterId) {
                confetti.onOpen();
            }

            if (!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }

            toast.success("Progress updated");
            router.refresh();

        } catch (error: any) {
            toast.error("Something went wrong: ", error);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            type="button"
            variant={isCompleted ? "outline" : "success"}
            className="w-full md:w-auto"
        >
            {isCompleted ? "Not completed" : "Mark as complete"}
        </Button>
    )
}
