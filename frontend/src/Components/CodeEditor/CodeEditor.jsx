import React, { useState, useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import axios from 'axios';
import { Box, Button, CardHeader } from '@chakra-ui/react';
import AgressiveCow from './code'
import useAnimation from '../../Animation/Animation';
import GradientCursor from '../GradientCursor/GradientCursor';

const CodeEditor = () => {
    const initialCode = AgressiveCow
    const { motion,
        handleMouseMove,
        handleMouseLeave,
        boxShadow,
        isHovered,
        setIsHovered,
        rotateX,
        rotateY,
    } = useAnimation("#6674cc");

    const [code, setCode] = useState(() => localStorage.getItem('code') || initialCode);
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showOutput, setShowOutput] = useState(false); // State to control output slider visibility

    const monaco = useMonaco();

    useEffect(() => {
        if (monaco) {
            monaco.editor.defineTheme('myCustomTheme', {
                base: 'hc-black',
                inherit: true,
                rules: [
                    { token: 'keyword', foreground: 'ff79c6' },
                    { token: 'identifier', foreground: '50fa7b' },
                    { token: 'number', foreground: 'bd93f9' },
                    { token: 'string', foreground: 'f1fa8c' },
                    { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
                    { token: 'type', foreground: '8be9fd' },
                ],
                colors: {
                    'editor.background': '#0000001a',
                    'editorLineNumber.foreground': '#44475a',
                },
            });
            monaco.editor.setTheme('myCustomTheme');
        }
    }, [monaco]);

    useEffect(() => {
        localStorage.setItem('code', code);
    }, [code]);

    const handleRunCode = async () => {
        setIsLoading(true);
        const payload = {
            language: language,
            version: "*",
            files: [
                {
                    name: "main." + (language === "javascript" ? "js" : language),
                    content: code
                }
            ]
        };

        try {
            const response = await axios.post('https://emkc.org/api/v2/piston/execute', payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            setOutput(response.data.run.output);
            setShowOutput(true); // Show the output slider when the code is executed
        } catch (error) {
            console.error('Error executing code:', error.message);
            setOutput('Error executing code.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    display: "flex",
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                    padding: '80px 0',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow,
                    // border:"1px solid #c5c5c5"
                    position: "relative",
                    zIndex: 5
                }}>
                <div style={{ width: '80%', position: 'relative', margin: "0 auto", overflow: "hidden" }}>
                    {/* <div>
                    <label>Language: </label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                        <option value="c">C</option>
                        <option value="php">PHP</option>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                        <option value="ruby">Ruby</option>
                        <option value="go">Go</option>
                        <option value="kotlin">Kotlin</option>
                    </select>
                </div> */}
                    <GradientCursor isVisible={isHovered} color1={"#6674cc"} />
                    <Box
                        borderRadius={"8px"}
                        overflow={"hidden"}
                        boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                    >
                        <Box width={"100%"}
                            height={"48px"}
                            bg={"#000000"}
                            borderBottom={"1px solid #c7c7c7"}
                            pt={"8px"}
                        >
                            <Button
                                mx={"10px"}
                                border={"1px solid #c7c7c7"}
                                borderRadius={"0"} borderTop={"3px solid #6674cc"} bg={"#0d0d0d"}>
                                Javascript
                            </Button>
                        </Box>
                        <Editor
                            height="400px"
                            language={language}
                            value={code}
                            theme="myCustomTheme"
                            onChange={(newValue) => setCode(newValue)}
                        />
                    </Box>
                    <div
                        style={{
                            width: "300px",
                            height: "100%",
                            position: "absolute",
                            top: "0px",
                            right: showOutput ? "0px" : "-320px", // Slide in/out based on showOutput state
                            transition: "right 0.5s ease",
                            border: "1px solid white",
                            backgroundColor: "#333",
                            color: "white",
                            padding: "15px",
                            zIndex: 1000,
                            borderRadius: "0 8px 8px 0"
                        }}
                    >
                        <h3>Output:</h3>
                        <pre>{output}</pre>
                        <Button onClick={() => setShowOutput(false)} mt={4}>Close</Button>
                    </div>
                </div>
                <Button onClick={handleRunCode} disabled={isLoading}
                    position={"absolute"}
                    left={"75%"}
                    hidden={showOutput}
                    bottom={"90px"}
                >
                    {isLoading ? 'Compiling...' : 'Compile and Run'}
                </Button>
                {/* Output Slider */}

            </motion.div>
        </>
    );
};

export default CodeEditor;
