'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, GitBranch, GitCommit, RefreshCw, Plus, MoreHorizontal, X, Minimize2, Square } from 'lucide-react';

// File Explorer Component
const FileExplorer = () => {
    const fileItems = [
        { name: 'src', type: 'folder', expanded: true, icon: '📁' },
        { name: 'components', type: 'folder', expanded: true, icon: '📁', indent: 1 },
        { name: 'Button.tsx', type: 'file', icon: '⚛️', indent: 2 },
        { name: 'Input.tsx', type: 'file', icon: '⚛️', indent: 2 },
        { name: 'Modal.tsx', type: 'file', icon: '⚛️', indent: 2 },
        { name: 'hooks', type: 'folder', expanded: true, icon: '📁', indent: 1 },
        { name: 'useAuth.ts', type: 'file', icon: '🔧', indent: 2 },
        { name: 'useApi.ts', type: 'file', icon: '🔧', indent: 2 },
        { name: 'utils', type: 'folder', expanded: false, icon: '📁', indent: 1 },
        { name: 'App.tsx', type: 'file', icon: '⚛️', indent: 1 },
        { name: 'index.ts', type: 'file', icon: '📄', indent: 1 },
        { name: 'package.json', type: 'file', icon: '📦' },
        { name: 'tsconfig.json', type: 'file', icon: '⚙️' },
        { name: 'README.md', type: 'file', icon: '📝' },
        { name: '.gitignore', type: 'file', icon: '🚫' },
    ];

    return (
        <div className="w-48 xs:w-52 sm:w-56 md:w-60 lg:w-64 xl:w-72 2xl:w-80 3xl:w-96 bg-[rgb(225,232,236)] border-r border-gray-300 flex flex-col">
            {/* Explorer Header */}
            <div className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 border-b border-gray-300 bg-gray-200">
                <div className="flex items-center justify-between text-[#0E1C29] text-[10px] xs:text-xs uppercase tracking-wider">
                    <span className="truncate">Explorer</span>
                    <div className="flex space-x-0.5 xs:space-x-1">
                        <button className="hover:bg-gray-300 p-0.5 xs:p-1 rounded text-xs transition-colors">📁</button>
                        <button className="hover:bg-gray-300 p-0.5 xs:p-1 rounded text-xs transition-colors">🔄</button>
                        <button className="hover:bg-gray-300 p-0.5 xs:p-1 rounded text-xs transition-colors">⋯</button>
                    </div>
                </div>
            </div>

            {/* Project Name */}
            <div className="px-1.5 xs:px-2 py-1 border-b border-gray-300 bg-gray-100">
                <div className="flex items-center text-[#0E1C29] text-xs xs:text-sm py-1">
                    <ChevronDown className="w-2.5 h-2.5 xs:w-3 xs:h-3 mr-1" />
                    <span className="truncate text-[10px] xs:text-xs sm:text-sm">MY-TYPESCRIPT-PROJECT</span>
                </div>
            </div>

            {/* File Tree */}
            <div className="flex-1 overflow-y-auto">
                {fileItems.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center px-1.5 xs:px-2 py-0.5 xs:py-1 hover:bg-gray-300 cursor-pointer text-xs xs:text-sm text-[#0E1C29] transition-colors ${item.name === 'Button.tsx' ? 'bg-gray-300 border-l-2 border-blue-400' : ''
                            }`}
                        style={{ paddingLeft: `${4 + (item.indent || 0) * 12}px` }}
                    >
                        {item.type === 'folder' && (
                            <div className="w-2.5 h-2.5 xs:w-3 xs:h-3 mr-1">
                                {item.expanded ? <ChevronDown className="w-2.5 h-2.5 xs:w-3 xs:h-3" /> : <ChevronRight className="w-2.5 h-2.5 xs:w-3 xs:h-3" />}
                            </div>
                        )}
                        {item.type === 'file' && <div className="w-2.5 h-2.5 xs:w-3 xs:h-3 mr-1" />}
                        <span className="mr-1 xs:mr-2 text-xs">{item.icon}</span>
                        <span className="truncate text-[10px] xs:text-xs sm:text-sm">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Code Editor Component
const CodeEditor = () => {
    const codeContent = `import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const CustomButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = 'font-medium rounded-lg transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};`;

    const renderCodeWithSyntaxHighlight = (code: string) => {
        const lines = code.split('\n');

        return lines.map((line, index) => {
            let highlightedLine = line;

            return (
                <div key={index} className="flex items-start">
                    <span className="text-gray-500 text-[10px] xs:text-xs w-6 xs:w-8 text-right mr-2 xs:mr-4 select-none">
                        {index + 1}
                    </span>
                    <span
                        className="text-[#0E1C29] flex-1 text-[10px] xs:text-xs sm:text-sm"
                        dangerouslySetInnerHTML={{ __html: highlightedLine || '&nbsp;' }}
                    />
                </div>
            );
        });
    };

    return (
        <div className="flex-1 flex flex-col bg-[rgb(225,232,236)]">
            {/* Tab Bar */}
            <div className="bg-gray-200 border-b border-gray-300 flex items-center overflow-x-auto">
                <div className="flex items-center bg-[rgb(225,232,236)] px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 border-r border-gray-300 text-xs xs:text-sm text-[#0E1C29] whitespace-nowrap">
                    <span className="mr-1 xs:mr-2">⚛️</span>
                    <span className="text-[10px] xs:text-xs sm:text-sm">Button.tsx</span>
                    <button className="ml-1 xs:ml-2 hover:bg-gray-300 p-0.5 xs:p-1 rounded transition-colors">
                        <X className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                    </button>
                </div>
                <div className="hidden sm:flex items-center px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 text-xs xs:text-sm text-gray-600 hover:text-[#0E1C29] hover:bg-gray-300 cursor-pointer whitespace-nowrap transition-colors">
                    <span className="mr-1 xs:mr-2">⚛️</span>
                    <span>Input.tsx</span>
                </div>
                <div className="hidden md:flex items-center px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 text-xs xs:text-sm text-gray-600 hover:text-[#0E1C29] hover:bg-gray-300 cursor-pointer whitespace-nowrap transition-colors">
                    <span className="mr-1 xs:mr-2">📄</span>
                    <span>README.md</span>
                </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 bg-gray-100 p-2 xs:p-3 sm:p-4 font-mono text-[10px] xs:text-xs sm:text-sm leading-relaxed">
                <div className="space-y-0.5 xs:space-y-1">
                    {renderCodeWithSyntaxHighlight(codeContent)}
                </div>
            </div>

            {/* Status Bar */}
            <div className="bg-gray-300 text-white text-[9px] xs:text-[10px] sm:text-xs px-2 xs:px-3 sm:px-4 py-1 flex items-center justify-between border-t border-gray-300">
                <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4">
                    <span className="hidden xs:inline">TypeScript React</span>
                    <span className="xs:hidden">TS React</span>
                    <span className="hidden sm:inline">UTF-8</span>
                    <span className="hidden sm:inline">LF</span>
                    <span className="hidden md:inline">Spaces: 2</span>
                </div>
                <div className="flex items-center space-x-2 xs:space-x-3 sm:space-x-4">
                    <span>Ln 23, Col 16</span>
                    <span className="hidden xs:inline">🔄 Prettier</span>
                    <span className="hidden sm:inline">✓ ESLint</span>
                </div>
            </div>
        </div>
    );
};

// Git Panel Component
const GitPanel = () => {
    const commits = [
        {
            hash: 'a7f3d2c',
            message: 'feat: add Button component with variants',
            author: 'John Doe',
            time: '2 hours ago',
            changes: '+47 -12'
        },
        {
            hash: 'b8e4f1d',
            message: 'refactor: improve TypeScript types',
            author: 'Jane Smith',
            time: '4 hours ago',
            changes: '+23 -8'
        },
        {
            hash: '9c2a5e7',
            message: 'fix: resolve hover state issues',
            author: 'John Doe',
            time: '6 hours ago',
            changes: '+15 -3'
        },
        {
            hash: 'd4b8f9a',
            message: 'docs: update README with examples',
            author: 'Alice Johnson',
            time: '1 day ago',
            changes: '+89 -21'
        },
        {
            hash: 'e1c6a3b',
            message: 'style: format code with Prettier',
            author: 'Bob Wilson',
            time: '1 day ago',
            changes: '+0 -0'
        }
    ];

    const stagedFiles = [
        { name: 'src/components/Button.tsx', status: 'M' },
        { name: 'src/types/index.ts', status: 'A' },
    ];

    const unstagedFiles = [
        { name: 'src/utils/classNames.ts', status: 'M' },
        { name: 'package.json', status: 'M' },
    ];

    return (
        <div className="w-60 xs:w-64 sm:w-72 md:w-80 lg:w-80 xl:w-96 2xl:w-[400px] 3xl:w-[450px] bg-[rgb(225,232,236)] border-l border-gray-300 flex flex-col">
            {/* Git Header */}
            <div className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 border-b border-gray-300 bg-gray-200">
                <div className="flex items-center justify-between text-[#0E1C29] text-[10px] xs:text-xs uppercase tracking-wider">
                    <span className="truncate">Source Control</span>
                    <div className="flex space-x-0.5 xs:space-x-1">
                        <button className="hover:bg-gray-300 p-0.5 xs:p-1 rounded transition-colors">
                            <RefreshCw className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                        </button>
                        <button className="hover:bg-gray-300 p-0.5 xs:p-1 rounded transition-colors">
                            <MoreHorizontal className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Branch Info */}
            <div className="px-2 xs:px-3 sm:px-4 py-2 xs:py-3 border-b border-gray-300 bg-gray-100">
                <div className="flex items-center text-[#0E1C29] text-xs xs:text-sm">
                    <GitBranch className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
                    <span>main</span>
                    <span className="ml-auto text-[10px] xs:text-xs text-gray-600">↑2 ↓1</span>
                </div>
            </div>

            {/* Changes Section */}
            <div className="flex-1 overflow-y-auto">
                {/* Staged Changes */}
                <div className="border-b border-gray-300">
                    <div className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-gray-200 text-[10px] xs:text-xs text-[#0E1C29] uppercase tracking-wider flex items-center justify-between">
                        <span className="truncate">Staged Changes ({stagedFiles.length})</span>
                        <button className="hover:bg-gray-300 p-0.5 xs:p-1 rounded transition-colors">
                            <Plus className="w-2.5 h-2.5 xs:w-3 xs:h-3" />
                        </button>
                    </div>
                    {stagedFiles.map((file, index) => (
                        <div key={index} className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 hover:bg-gray-300 cursor-pointer flex items-center text-xs xs:text-sm transition-colors">
                            <span className={`w-3 h-3 xs:w-4 xs:h-4 rounded-sm text-[10px] xs:text-xs flex items-center justify-center mr-2 xs:mr-3 ${file.status === 'M' ? 'bg-yellow-500 text-yellow-100' : 'bg-green-500 text-green-100'
                                }`}>
                                {file.status}
                            </span>
                            <span className="text-[#0E1C29] flex-1 truncate text-[10px] xs:text-xs sm:text-sm">{file.name}</span>
                        </div>
                    ))}
                </div>

                {/* Unstaged Changes */}
                <div className="border-b border-gray-300">
                    <div className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-gray-200 text-[10px] xs:text-xs text-[#0E1C29] uppercase tracking-wider">
                        Changes ({unstagedFiles.length})
                    </div>
                    {unstagedFiles.map((file, index) => (
                        <div key={index} className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 hover:bg-gray-300 cursor-pointer flex items-center text-xs xs:text-sm transition-colors">
                            <span className="w-3 h-3 xs:w-4 xs:h-4 rounded-sm bg-orange-500 text-orange-100 text-[10px] xs:text-xs flex items-center justify-center mr-2 xs:mr-3">
                                {file.status}
                            </span>
                            <span className="text-[#0E1C29] flex-1 truncate text-[10px] xs:text-xs sm:text-sm">{file.name}</span>
                        </div>
                    ))}
                </div>

                {/* Commit History */}
                <div>
                    <div className="px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 bg-gray-200 text-[10px] xs:text-xs text-[#0E1C29] uppercase tracking-wider">
                        Recent Commits
                    </div>
                    {commits.map((commit, index) => (
                        <div key={index} className="px-2 xs:px-3 sm:px-4 py-2 xs:py-3 hover:bg-gray-300 cursor-pointer border-b border-gray-200 transition-colors">
                            <div className="flex items-start space-x-2 xs:space-x-3">
                                <GitCommit className="w-3 h-3 xs:w-4 xs:h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs xs:text-sm text-[#0E1C29] truncate">{commit.message}</div>
                                    <div className="flex items-center text-[9px] xs:text-[10px] sm:text-xs text-gray-600 mt-1 space-x-1 xs:space-x-2">
                                        <span className="font-mono">{commit.hash}</span>
                                        <span className="hidden xs:inline">•</span>
                                        <span className="truncate max-w-20 xs:max-w-none">{commit.author}</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span className="hidden sm:inline">{commit.time}</span>
                                    </div>
                                    <div className="text-[9px] xs:text-[10px] sm:text-xs text-green-600 mt-1">{commit.changes}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Commit Input */}
            <div className="border-t border-gray-300 p-2 xs:p-3 sm:p-4 bg-gray-200">
                <textarea
                    className="w-full bg-white border border-gray-300 rounded px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm text-[#0E1C29] placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    rows={2}
                    placeholder="Message (press Ctrl+Enter to commit)"
                    defaultValue="Update Button component styling"
                />
                <div className="flex justify-between items-center mt-1 xs:mt-2">
                    <div className="flex space-x-1 xs:space-x-2">
                        <button className="text-[10px] xs:text-xs text-gray-600 hover:text-[#0E1C29] transition-colors">✓ Commit</button>
                        <button className="text-[10px] xs:text-xs text-gray-600 hover:text-[#0E1C29] transition-colors">↑ Push</button>
                    </div>
                    <span className="text-[9px] xs:text-[10px] sm:text-xs text-gray-500">2 staged, 2 unstaged</span>
                </div>
            </div>
        </div>
    );
};

// Main VSCode Window Component
export const VSCodeWindow = () => {
    const [showMobilePanels, setShowMobilePanels] = useState({ explorer: false, git: false });

    return (
        <div className="relative w-full rounded-2xl bg-[rgb(225,232,236)]">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 via-gray-200/50 to-gray-300/50"></div>
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-300/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-400/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gray-200/30 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] 3xl:h-[900px] max-w-7xl mx-auto bg-[rgb(225,232,236)] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-300 border border-gray-300"
                style={{
                    boxShadow: `
                        0 25px 50px -12px rgba(0, 0, 0, 0.2),
                        0 0 0 1px rgba(0, 0, 0, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8)
                    `
                }}>

                {/* Window Title Bar */}
                <div className="bg-gray-200 border-b border-gray-300 px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2 xs:space-x-3">
                        {/* Traffic Light Buttons */}
                        <div className="flex space-x-1 xs:space-x-2">
                            <div className="w-2.5 h-2.5 xs:w-3 xs:h-3 bg-red-500 rounded-full shadow-lg ring-1 ring-gray-300"></div>
                            <div className="w-2.5 h-2.5 xs:w-3 xs:h-3 bg-yellow-500 rounded-full shadow-lg ring-1 ring-gray-300"></div>
                            <div className="w-2.5 h-2.5 xs:w-3 xs:h-3 bg-green-500 rounded-full shadow-lg ring-1 ring-gray-300"></div>
                        </div>
                    </div>

                    {/* Window Title */}
                    <div className="flex-1 text-center text-[10px] xs:text-xs sm:text-sm text-[#0E1C29]">
                        <span className="hidden sm:inline">Button.tsx — my-typescript-project</span>
                        <span className="sm:hidden">Button.tsx</span>
                    </div>

                    {/* Mobile Panel Toggle Buttons */}
                    <div className="flex items-center space-x-1 md:hidden">
                        <button
                            className="p-1 hover:bg-gray-300 rounded text-[10px] xs:text-xs transition-colors"
                            onClick={() => setShowMobilePanels({ ...showMobilePanels, explorer: !showMobilePanels.explorer })}
                        >
                            📁
                        </button>
                        <button
                            className="p-1 hover:bg-gray-300 rounded text-[10px] xs:text-xs transition-colors"
                            onClick={() => setShowMobilePanels({ ...showMobilePanels, git: !showMobilePanels.git })}
                        >
                            🔄
                        </button>
                    </div>

                    {/* Window Controls */}
                    <div className="hidden md:flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-300 rounded transition-colors">
                            <Minimize2 className="w-3 h-3 xs:w-4 xs:h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-300 rounded transition-colors">
                            <Square className="w-3 h-3 xs:w-4 xs:h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-red-500/20 rounded transition-colors">
                            <X className="w-3 h-3 xs:w-4 xs:h-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex h-[calc(100%-32px)] xs:h-[calc(100%-40px)] sm:h-[calc(100%-48px)] relative">
                    {/* Desktop Layout */}
                    <div className="hidden md:flex w-full">
                        <FileExplorer />
                        <CodeEditor />
                        <GitPanel />
                    </div>

                    {/* Mobile/Tablet Layout */}
                    <div className="md:hidden flex w-full relative">
                        {showMobilePanels.explorer && (
                            <div className="absolute inset-0 z-20 bg-black/20">
                                <FileExplorer />
                                <button
                                    className="absolute top-2 right-2 p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                                    onClick={() => setShowMobilePanels({ ...showMobilePanels, explorer: false })}
                                >
                                    <X className="w-4 h-4 text-[#0E1C29]" />
                                </button>
                            </div>
                        )}

                        {showMobilePanels.git && (
                            <div className="absolute inset-0 z-20 bg-black/20">
                                <GitPanel />
                                <button
                                    className="absolute top-2 right-2 p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                                    onClick={() => setShowMobilePanels({ ...showMobilePanels, git: false })}
                                >
                                    <X className="w-4 h-4 text-[#0E1C29]" />
                                </button>
                            </div>
                        )}

                        {!showMobilePanels.explorer && !showMobilePanels.git && (
                            <CodeEditor />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};