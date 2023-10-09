import React, { useState } from 'react'
import { Search } from "lucide-react";
import { Input } from './ui/input';


export const SearchInput = () => {

    const [value, setValue] = useState("")

    return (
        <div className='relative'>
            <Search
                className="h-4 w-4 absolute top-3 left-3 text-slate-600"
            />
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                placeholder="Search for a course"
                className='w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200'
            />
        </div>
    )
}
