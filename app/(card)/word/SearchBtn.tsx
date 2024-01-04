
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {useState} from "react";
import { useToast } from "@/components/ui/use-toast"

import {z, ZodError} from "zod";

export default function SearchBtn({onSearch}:{onSearch:any}) {
    const [searchTerm, setSearchTerm] =
        useState('');

    const { toast } = useToast()

    const handleInputChange = (event:any) => {

        setSearchTerm(event.target.value);
    };

    const isAllChineseCharacters = (str: string): boolean => {
        for (let i = 0; i < str.length; i++) {
            const char = str[i]
            const charCode = char.charCodeAt(0)
            if (charCode < 19968 || charCode > 40959) {
                return false
            }
        }
        return true
    }

    const checkWord = (words:string) => {
        const schema = z.string().min(1,"输入不能为空")
            .refine(isAllChineseCharacters,"输入非汉字")

        try {
            schema.parse(words);
        }catch (error) {
            if (error instanceof ZodError) {
                toast({
                    description: error.issues[0].message
                })
            }

            return false;
        }
        return true
    }

    const handleSearch = () => {
        if (checkWord(searchTerm))
        {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="flex w-full items-center space-x-2 ">
            <Input value={searchTerm} onChange={handleInputChange} className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0" type="text" placeholder="请输入文字" />
            <Button onClick={handleSearch} type="submit">查找</Button>
        </div>
    )

}