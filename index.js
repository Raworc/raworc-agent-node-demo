/**
 * Simple Klingon-speaking Raworc Agent
 * 
 * This agent responds to all messages in Klingon using Claude.
 * Demonstrates basic LLM integration with zero Raworc dependencies.
 */

const Anthropic = require('@anthropic-ai/sdk');

/**
 * Main handler function called by Raworc.
 * Responds to all messages in Klingon using Claude.
 * 
 * @param {string} message - User's message/request
 * @param {Object} context - Session context (session_id, space, etc.)
 * @returns {string} Response in Klingon
 */
async function processMessage(message, context = {}) {
    try {
        // Get Claude API key from environment
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
            return "Error: ANTHROPIC_API_KEY not configured in space secrets.";
        }
        
        // Initialize Claude client
        const anthropic = new Anthropic({ apiKey });
        
        // System prompt to ensure Klingon responses
        const systemPrompt = `You are a helpful assistant that always responds in Klingon (tlhIngan Hol). 
        You are knowledgeable, friendly, and helpful. Always respond in Klingon regardless of the input language.
        Use proper Klingon vocabulary and grammar. You can help with any topic but always respond in Klingon.
        Include some basic translations or explanations in parentheses when helpful.`;
        
        // Call Claude
        const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 500,
            system: systemPrompt,
            messages: [
                { role: "user", content: message }
            ]
        });
        
        // Extract and return Claude's response
        const claudeResponse = response.content[0]?.text || "jup (no response generated)";
        
        return `${claudeResponse}\n\n[🖖 Klingon Agent - Claude lo'taHvIS]`;
        
    } catch (error) {
        return `Qagh: ${error.message}`;
    }
}

// For testing locally
if (require.main === module) {
    console.log("=== Testing Klingon Agent ===\n");
    
    const testContext = { session_id: "test", space: "demo" };
    
    const testMessages = [
        "Hello!",
        "How are you?",
        "Tell me about space exploration",
        "What is honor?",
        "Explain quantum physics"
    ];
    
    async function runTests() {
        for (let i = 0; i < testMessages.length; i++) {
            const msg = testMessages[i];
            console.log(`Test ${i + 1}: ${msg}`);
            console.log("-".repeat(40));
            try {
                // Note: This won't work without a real API key
                const response = await processMessage(msg, testContext);
                console.log(response);
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
            console.log("\n");
        }
    }
    
    // Uncomment to test with a real API key
    // runTests();
}

module.exports = { processMessage };