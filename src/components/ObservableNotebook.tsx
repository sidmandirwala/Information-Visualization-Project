"use client";

import React, { useEffect, useRef } from "react";
import { Runtime } from "@observablehq/runtime";
import { Inspector } from "@observablehq/inspector";
import * as d3 from "d3";
// @ts-ignore
import notebook from "@/app/notebook";

interface ObservableNotebookProps {
    cellName: string;
}

export function ObservableNotebook({ cellName }: ObservableNotebookProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const runtime = new Runtime();
        const main = runtime.module(notebook, (name: string) => {
            if (name === cellName) {
                return new Inspector(ref.current!);
            }
        });

        // ... inside component ...
        main.define("d3", [], () => d3);

        return () => {
            runtime.dispose();
        };
    }, [cellName]);

    return <div ref={ref} className="w-full h-full" />;
}
