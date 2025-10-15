// Project-specific JavaScript functionality

// Tab functionality for code examples
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Demo functionality
document.addEventListener('DOMContentLoaded', function() {
    const reviewBtn = document.getElementById('review-btn');
    const codeInput = document.getElementById('code-input');
    const languageSelect = document.getElementById('language-select');
    const resultsContent = document.getElementById('results-content');
    const issuesCount = document.getElementById('issues-count');
    const securityCount = document.getElementById('security-count');
    const suggestionsCount = document.getElementById('suggestions-count');

    if (reviewBtn) {
        reviewBtn.addEventListener('click', function() {
            const code = codeInput.value.trim();
            const language = languageSelect.value;

            if (!code) {
                showNotification('Please enter some code to review', 'error');
                return;
            }

            // Simulate API call
            simulateCodeReview(code, language);
        });
    }

    function simulateCodeReview(code, language) {
        // Show loading state
        reviewBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        reviewBtn.disabled = true;

        // Simulate API delay
        setTimeout(() => {
            // Generate mock results based on code content
            const results = generateMockResults(code, language);
            displayResults(results);
            
            // Reset button
            reviewBtn.innerHTML = '<i class="fas fa-search"></i> Review Code';
            reviewBtn.disabled = false;
        }, 2000);
    }

    function generateMockResults(code, language) {
        const issues = [];
        const securityIssues = [];
        const suggestions = [];

        // Simple pattern matching for demo purposes
        if (code.includes('SELECT') && code.includes('+')) {
            securityIssues.push({
                type: 'security',
                severity: 'high',
                message: 'Potential SQL injection vulnerability detected',
                line: 2,
                suggestion: 'Use parameterized queries or prepared statements'
            });
        }

        if (code.includes('eval(') || code.includes('exec(')) {
            securityIssues.push({
                type: 'security',
                severity: 'critical',
                message: 'Use of eval() or exec() detected - major security risk',
                line: 1,
                suggestion: 'Avoid using eval() or exec() with user input'
            });
        }

        if (code.includes('var ') && language === 'javascript') {
            suggestions.push({
                type: 'suggestion',
                severity: 'low',
                message: 'Consider using let or const instead of var',
                line: 1,
                suggestion: 'Use let for block-scoped variables or const for constants'
            });
        }

        if (code.includes('print(') && language === 'python') {
            suggestions.push({
                type: 'suggestion',
                severity: 'low',
                message: 'Consider using logging instead of print statements',
                line: 1,
                suggestion: 'Use logging module for better debugging and production code'
            });
        }

        // Add some general issues
        if (code.length > 100) {
            issues.push({
                type: 'issue',
                severity: 'medium',
                message: 'Function is quite long - consider breaking it down',
                line: 1,
                suggestion: 'Split into smaller, more focused functions'
            });
        }

        if (!code.includes('//') && !code.includes('#')) {
            suggestions.push({
                type: 'suggestion',
                severity: 'low',
                message: 'Consider adding comments to explain complex logic',
                line: 1,
                suggestion: 'Add meaningful comments to improve code readability'
            });
        }

        return {
            issues: [...issues, ...securityIssues, ...suggestions],
            summary: {
                total: issues.length + securityIssues.length + suggestions.length,
                security: securityIssues.length,
                suggestions: suggestions.length,
                issues: issues.length
            }
        };
    }

    function displayResults(results) {
        // Update summary counts
        issuesCount.textContent = results.summary.issues;
        securityCount.textContent = results.summary.security;
        suggestionsCount.textContent = results.summary.suggestions;

        // Display results
        if (results.issues.length === 0) {
            resultsContent.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-check-circle" style="color: #10b981;"></i>
                    <p>Great! No issues found in your code.</p>
                </div>
            `;
        } else {
            let resultsHTML = '<div class="results-list">';
            
            results.issues.forEach((issue, index) => {
                const severityClass = getSeverityClass(issue.severity);
                const icon = getSeverityIcon(issue.type);
                
                resultsHTML += `
                    <div class="result-item ${severityClass}">
                        <div class="result-header">
                            <div class="result-icon">
                                <i class="${icon}"></i>
                            </div>
                            <div class="result-info">
                                <span class="result-severity">${issue.severity.toUpperCase()}</span>
                                <span class="result-type">${issue.type.toUpperCase()}</span>
                            </div>
                            <div class="result-line">Line ${issue.line}</div>
                        </div>
                        <div class="result-message">${issue.message}</div>
                        <div class="result-suggestion">
                            <strong>Suggestion:</strong> ${issue.suggestion}
                        </div>
                    </div>
                `;
            });
            
            resultsHTML += '</div>';
            resultsContent.innerHTML = resultsHTML;
        }
    }

    function getSeverityClass(severity) {
        switch (severity) {
            case 'critical': return 'severity-critical';
            case 'high': return 'severity-high';
            case 'medium': return 'severity-medium';
            case 'low': return 'severity-low';
            default: return 'severity-low';
        }
    }

    function getSeverityIcon(type) {
        switch (type) {
            case 'security': return 'fas fa-shield-alt';
            case 'suggestion': return 'fas fa-lightbulb';
            case 'issue': return 'fas fa-exclamation-triangle';
            default: return 'fas fa-info-circle';
        }
    }
});

// Add CSS for result items
const resultStyles = document.createElement('style');
resultStyles.textContent = `
    .results-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .result-item {
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid;
        background: #f8f9fa;
    }
    
    .severity-critical {
        border-left-color: #dc3545;
        background: #f8d7da;
    }
    
    .severity-high {
        border-left-color: #fd7e14;
        background: #fff3cd;
    }
    
    .severity-medium {
        border-left-color: #ffc107;
        background: #fff3cd;
    }
    
    .severity-low {
        border-left-color: #17a2b8;
        background: #d1ecf1;
    }
    
    .result-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }
    
    .result-icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.875rem;
    }
    
    .severity-critical .result-icon {
        background: #dc3545;
    }
    
    .severity-high .result-icon {
        background: #fd7e14;
    }
    
    .severity-medium .result-icon {
        background: #ffc107;
    }
    
    .severity-low .result-icon {
        background: #17a2b8;
    }
    
    .result-info {
        flex: 1;
        display: flex;
        gap: 0.5rem;
    }
    
    .result-severity,
    .result-type {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .result-severity {
        background: rgba(0, 0, 0, 0.1);
        color: #333;
    }
    
    .result-type {
        background: #6366f1;
        color: white;
    }
    
    .result-line {
        font-size: 0.875rem;
        color: #6b7280;
        font-weight: 500;
    }
    
    .result-message {
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: #1f2937;
    }
    
    .result-suggestion {
        font-size: 0.875rem;
        color: #6b7280;
        line-height: 1.5;
    }
    
    .result-suggestion strong {
        color: #374151;
    }
`;

document.head.appendChild(resultStyles);

// Notification system (reuse from main script)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#6366f1';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
