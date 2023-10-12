"use client"

import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
};


export const Actions = ({
    disabled,
    courseId,
    isPublished
}: ActionsProps) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {

    }

    const handleDelete = () => {

    }

    return (
        <div className='flex items-center gap-x-2'>
            <Button
                onClick={handleClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={handleDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    )
}
