import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
    title?: string;
    code: string;
    output?: string;
}

const Terminal: React.FC<TerminalProps> = ({ title = "Terminal", code, output }) => {
    return (
        <div className="w-full mx-auto overflow-hidden bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <TerminalIcon className="w-5 h-5 text-slate-400" />
                    <span className="text-base font-bold text-slate-300 font-mono tracking-wide">{title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-sm" />
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 shadow-sm" />
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500 shadow-sm" />
                </div>
            </div>
            <div className="p-6 md:p-8 font-mono text-sm md:text-lg leading-relaxed overflow-x-auto bg-[#1e1e1e]">
                <div className="text-blue-300 font-medium whitespace-pre-wrap">
                    {code}
                </div>
                {output && (
                    <div className="pt-6 mt-6 border-t border-slate-700/50">
                        <div className="text-emerald-400 font-bold whitespace-pre-wrap">
                            <span className="opacity-50 select-none mr-2">➜</span>
                            {output}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Terminal;
