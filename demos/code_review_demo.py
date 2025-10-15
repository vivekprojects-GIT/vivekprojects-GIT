"""
AI-Powered Code Review Demo using Gradio
This demonstrates the Code Review API functionality with an interactive interface
"""

import gradio as gr
import json
import re
from typing import Dict, List, Tuple

def analyze_code_security(code: str) -> List[Dict]:
    """Analyze code for security vulnerabilities"""
    issues = []
    
    # SQL Injection patterns
    sql_patterns = [
        (r"SELECT.*\+.*", "Potential SQL injection - string concatenation in query"),
        (r"INSERT.*\+.*", "Potential SQL injection - string concatenation in INSERT"),
        (r"UPDATE.*\+.*", "Potential SQL injection - string concatenation in UPDATE"),
        (r"DELETE.*\+.*", "Potential SQL injection - string concatenation in DELETE"),
    ]
    
    for pattern, message in sql_patterns:
        if re.search(pattern, code, re.IGNORECASE):
            issues.append({
                "type": "Security",
                "severity": "High",
                "message": message,
                "suggestion": "Use parameterized queries or prepared statements"
            })
    
    # Dangerous functions
    dangerous_functions = [
        ("eval(", "Use of eval() - major security risk"),
        ("exec(", "Use of exec() - major security risk"),
        ("system(", "Use of system() - potential command injection"),
        ("shell_exec(", "Use of shell_exec() - potential command injection"),
    ]
    
    for func, message in dangerous_functions:
        if func in code:
            issues.append({
                "type": "Security",
                "severity": "Critical",
                "message": message,
                "suggestion": f"Avoid using {func} with user input"
            })
    
    # Hardcoded credentials
    if re.search(r"(password|passwd|pwd)\s*=\s*['\"][^'\"]+['\"]", code, re.IGNORECASE):
        issues.append({
            "type": "Security",
            "severity": "High",
            "message": "Hardcoded credentials detected",
            "suggestion": "Use environment variables or secure credential storage"
        })
    
    return issues

def analyze_code_quality(code: str, language: str) -> List[Dict]:
    """Analyze code for quality issues"""
    issues = []
    
    # Long functions
    lines = code.split('\n')
    if len(lines) > 50:
        issues.append({
            "type": "Quality",
            "severity": "Medium",
            "message": "Function is quite long",
            "suggestion": "Consider breaking into smaller functions"
        })
    
    # Language-specific issues
    if language.lower() == "python":
        if "print(" in code:
            issues.append({
                "type": "Quality",
                "severity": "Low",
                "message": "Use of print() statements",
                "suggestion": "Consider using logging module for production code"
            })
        
        if "var " in code:
            issues.append({
                "type": "Quality",
                "severity": "Low",
                "message": "Use of 'var' keyword",
                "suggestion": "Use 'let' or 'const' instead of 'var'"
            })
    
    elif language.lower() == "javascript":
        if "var " in code:
            issues.append({
                "type": "Quality",
                "severity": "Low",
                "message": "Use of 'var' keyword",
                "suggestion": "Use 'let' or 'const' instead of 'var'"
            })
        
        if "===" not in code and "==" in code:
            issues.append({
                "type": "Quality",
                "severity": "Medium",
                "message": "Use of loose equality operator",
                "suggestion": "Use strict equality (===) instead of loose equality (==)"
            })
    
    # Missing comments for complex logic
    if len(code) > 200 and not any(line.strip().startswith(('#', '//', '/*')):
        issues.append({
            "type": "Quality",
            "severity": "Low",
            "message": "Complex code without comments",
            "suggestion": "Add meaningful comments to explain complex logic"
        })
    
    return issues

def analyze_code_performance(code: str) -> List[Dict]:
    """Analyze code for performance issues"""
    issues = []
    
    # Nested loops
    if code.count('for ') > 1 or code.count('while ') > 1:
        issues.append({
            "type": "Performance",
            "severity": "Medium",
            "message": "Multiple loops detected",
            "suggestion": "Consider optimizing nested loops or using more efficient algorithms"
        })
    
    # String concatenation in loops
    if 'for ' in code and '+' in code:
        issues.append({
            "type": "Performance",
            "severity": "Low",
            "message": "String concatenation in loop",
            "suggestion": "Consider using join() or StringBuilder for better performance"
        })
    
    return issues

def review_code(code: str, language: str) -> Tuple[str, str]:
    """Main function to review code and return results"""
    if not code.strip():
        return "Please enter some code to review.", ""
    
    # Analyze different aspects
    security_issues = analyze_code_security(code)
    quality_issues = analyze_code_quality(code, language)
    performance_issues = analyze_code_performance(code)
    
    all_issues = security_issues + quality_issues + performance_issues
    
    # Generate summary
    total_issues = len(all_issues)
    security_count = len(security_issues)
    quality_count = len(quality_issues)
    performance_count = len(performance_issues)
    
    summary = f"""
## Code Review Summary

**Total Issues Found:** {total_issues}
- 🔒 Security Issues: {security_count}
- 📝 Quality Issues: {quality_count}
- ⚡ Performance Issues: {performance_count}

"""
    
    if total_issues == 0:
        summary += "✅ **Great job!** No issues found in your code."
        return summary, ""
    
    # Generate detailed results
    detailed_results = "## Detailed Analysis\n\n"
    
    for i, issue in enumerate(all_issues, 1):
        severity_emoji = {
            "Critical": "🔴",
            "High": "🟠", 
            "Medium": "🟡",
            "Low": "🟢"
        }.get(issue["severity"], "🔵")
        
        detailed_results += f"""
### {i}. {severity_emoji} {issue['type']} Issue ({issue['severity']})

**Issue:** {issue['message']}

**Suggestion:** {issue['suggestion']}

---
"""
    
    return summary, detailed_results

# Create Gradio interface
def create_interface():
    with gr.Blocks(
        title="AI Code Review Demo",
        theme=gr.themes.Soft(),
        css="""
        .gradio-container {
            max-width: 1200px !important;
            margin: 0 auto !important;
        }
        .main-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .main-header h1 {
            color: #6366f1;
            margin-bottom: 0.5rem;
        }
        .main-header p {
            color: #6b7280;
            font-size: 1.1rem;
        }
        """
    ) as demo:
        
        gr.HTML("""
        <div class="main-header">
            <h1>🤖 AI-Powered Code Review</h1>
            <p>Get instant, comprehensive code analysis with security, quality, and performance insights</p>
        </div>
        """)
        
        with gr.Row():
            with gr.Column(scale=1):
                code_input = gr.Textbox(
                    label="Code to Review",
                    placeholder="// Paste your code here...\nfunction example() {\n    // Your code will be analyzed here\n    return 'Hello World';\n}",
                    lines=15,
                    max_lines=20
                )
                
                language_select = gr.Dropdown(
                    label="Programming Language",
                    choices=["Python", "JavaScript", "Java", "C++", "C#", "Go", "Rust"],
                    value="Python"
                )
                
                review_btn = gr.Button(
                    "🔍 Review Code",
                    variant="primary",
                    size="lg"
                )
            
            with gr.Column(scale=1):
                summary_output = gr.Markdown(
                    label="Review Summary",
                    value="Submit code above to see AI-powered review results"
                )
        
        with gr.Row():
            detailed_output = gr.Markdown(
                label="Detailed Analysis",
                value=""
            )
        
        # Examples section
        gr.HTML("<br><h3>📚 Example Code Snippets</h3>")
        
        with gr.Row():
            with gr.Column():
                gr.Examples(
                    examples=[
                        [
                            """def process_user_input(user_input):
    query = "SELECT * FROM users WHERE name = '" + user_input + "'"
    return execute_query(query)""",
                            "Python"
                        ],
                        [
                            """function validateUser(user) {
    if (user.password == "admin123") {
        return true;
    }
    return false;
}""",
                            "JavaScript"
                        ],
                        [
                            """import os
def run_command(cmd):
    result = os.system(cmd)
    return result""",
                            "Python"
                        ]
                    ],
                    inputs=[code_input, language_select],
                    label="Try these examples:"
                )
        
        # Event handlers
        review_btn.click(
            fn=review_code,
            inputs=[code_input, language_select],
            outputs=[summary_output, detailed_output]
        )
        
        # Auto-review on language change
        language_select.change(
            fn=lambda code, lang: review_code(code, lang) if code.strip() else ("", ""),
            inputs=[code_input, language_select],
            outputs=[summary_output, detailed_output]
        )
    
    return demo

if __name__ == "__main__":
    demo = create_interface()
    demo.launch(
        server_name="0.0.0.0",
        server_port=7860,
        share=True,
        show_error=True
    )
