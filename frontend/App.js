import React, { useState } from "react";

function App() {
    const [resume, setResume] = useState("");
    const [skills, setSkills] = useState([]);

    const analyzeResume = async () => {
        const response = await fetch("http://127.0.0.1:5000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resume_text: resume }),
        });

        const data = await response.json();
        setSkills(data.skills || []);
    };

    return (
        <div>
            <h1>Resume Analyzer</h1>
            <textarea onChange={(e) => setResume(e.target.value)}></textarea>
            <button onClick={analyzeResume}>Analyze</button>
            <h3>Extracted Skills:</h3>
            <ul>{skills.map((skill, index) => <li key={index}>{skill}</li>)}</ul>
        </div>
    );
}

export default App;
