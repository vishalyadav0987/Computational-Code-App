// src/components/CodeEditor.jsx
import React, { useState, useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react'; // Correctly import the editor and hook
import axios from 'axios';

const CodeEditor = () => {
    const [code, setCode] = useState('// Write your code here');
    const [language, setLanguage] = useState('javascript');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const monaco = useMonaco(); // Use the Monaco hook to access the Monaco instance

    useEffect(() => {
        if (monaco) {
            // Define a custom theme
            monaco.editor.defineTheme('myCustomTheme', {
                base: 'vs-dark',
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
                    'editor.background': '#081216',
                    'editorLineNumber.foreground': '#44475a',
                },
            });
            // Set the editor theme after defining it
            monaco.editor.setTheme('myCustomTheme');
        }
    }, [monaco]); // Run this effect whenever the monaco instance is ready

    const handleCompile = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/compile', {
                code,
                language,
                input,
            });
            setOutput(response.data.output);
        } catch (error) {
            setOutput('Error compiling code.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div>
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
                    {/* Add more languages as needed */}
                </select>
            </div>
            <Editor
                height="400px"
                language={language}
                value={code}
                theme="myCustomTheme"
                onChange={(newValue) => setCode(newValue)}
            />
            <textarea
                rows="5"
                placeholder="Enter input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <button onClick={handleCompile} disabled={isLoading}>
                {isLoading ? 'Compiling...' : 'Compile and Run'}
            </button>
            <div>
                <h3>Output:</h3>
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default CodeEditor;
