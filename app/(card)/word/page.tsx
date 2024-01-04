'use client'

import Menus from "@/app/(card)/Menus";
import React, {createRef, useEffect, useRef, useState} from "react";
import cnchar from 'cnchar';
import draw from 'cnchar-draw';
import 'cnchar-poly';
import 'cnchar-radical';
import SearchBtn from "@/app/(card)/word/SearchBtn";
import {IRadicalResult} from "cnchar-types/plugin/radical";
import ICnChar from "cnchar-types";

interface Word {
    text: string,
    spellArr: string[],
    radical: IRadicalResult,
    stroke: any
}

function WordCard({word, children}: { word: Word, children?: React.ReactNode }) {
    const drawRef = useRef<HTMLDivElement>(null)
    const drawStrokeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (drawRef.current)
        {
            cnchar.draw(word.text, {
                el: drawRef.current,
                type: cnchar.draw.TYPE.ANIMATION,
                animation: {
                    loopAnimate: true
                },
                style: {
                    length: 180
                }
            });
        }

        if (drawStrokeRef.current)
        {
            cnchar.draw(word.text,{
                el: drawStrokeRef.current,
                type: cnchar.draw.TYPE.STROKE
            })
        }
    }, [word])

    return (
        <div className="w-full flex flex-col items-center">
            <div ref={drawRef}>
            </div>
            <div className={"flex flex-col mt-2 px-2 flex-wrap"}>
                <div
                    className={"flex flex-col items-center justify-between text-sm font-semibold text-zinc-900 space-y-2"}>
                    <div>拼音：{word.spellArr}</div>
                    <div>部首:{word.radical.radical},笔画:{word.radical.radicalCount} 结构:{word.radical.struct}</div>
                    <div>整体笔画:共{word.stroke}笔</div>
                </div>
            </div>

            <div className={"mt-2 flex stroke"} ref={drawStrokeRef}></div>
        </div>
    );
}

export default function Word() {

    cnchar.use(draw);
    const [words, setWords] = useState<Word[]>([])

    const search = (searchTerm: string) => {
        const spellArr: string | any[] = cnchar.spell(searchTerm, "array", "tone", "poly")
        const radicalArr = cnchar.radical(searchTerm)
        const strokeArr = cnchar.stroke(searchTerm, 'array')
        let tmpWords: Word[] = [];
        for (let i = 0; i < searchTerm.length; i++) {
            let tmpWord: Word = {
                text: searchTerm[i],
                spellArr: spellArr[i],
                radical: radicalArr[i],
                stroke: typeof strokeArr === 'number' ? strokeArr : strokeArr[i]
            };
            tmpWords.push(tmpWord)
        }
        console.log(tmpWords)
        setWords((prevTodos) => {
            return [...tmpWords]
        });
    }


    return (
        <>
            <main className="flex min-h-screen flex-col w-full px-3 py-6">
                <SearchBtn onSearch={search}></SearchBtn>
                <div className="mt-4 flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
                    {
                        words.map((word: Word, index) => (
                            <WordCard key={index} word={word}>
                            </WordCard>
                        ))
                    }
                </div>
            </main>
        </>
    )
}