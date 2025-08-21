# Klingon-Speaking Raworc Agent Demo

Simple Klingon-speaking agent powered by Claude that responds to all messages in Klingon (tlhIngan Hol).

## Architecture

- **Zero Dependencies**: No raworc imports needed
- **Pure Function**: Just implement `processMessage(message, context) -> response`
- **Claude Integration**: Direct Anthropic API integration for LLM responses
- **Language Focus**: Always responds in Klingon regardless of input
- **Git Deployment**: Deployed directly from GitHub repository

## Files

- `raworc.json` - Agent manifest (required)
- `index.js` - Agent implementation with `processMessage` function
- `package.json` - Node.js dependencies (only @anthropic-ai/sdk)

## Agent Capabilities

This Klingon agent can:
- Respond to any question or request in Klingon language
- Handle multiple languages as input but always respond in Klingon
- Provide helpful, knowledgeable responses on any topic
- Include basic translations in parentheses when helpful
- Demonstrate Node.js async/await LLM integration patterns

## Example Interactions

**Input (any language):**
- "Hello!"
- "How are you?"
- "Tell me about space exploration"
- "What is honor?"
- "Explain quantum physics"

**Output (always Klingon):**
- Responds in proper Klingon (tlhIngan Hol)
- Uses authentic Klingon vocabulary and grammar
- Includes helpful explanations when needed
- Maintains Klingon cultural context

## Testing Locally

```bash
export ANTHROPIC_API_KEY="your-api-key"
npm install
node index.js
```

This will run test cases with various input types.

## Deploying to Raworc

1. Create agent in your space:
```bash
raworc api spaces/demo/agents --method POST --body '{
  "name": "klingon-agent",
  "description": "Responds in Klingon language using Claude LLM",
  "purpose": "demonstrate Klingon-speaking agent with Node.js runtime",
  "source_repo": "Raworc/raworc-agent-js-demo",
  "source_branch": "main"
}'
```

2. Build the space:
```bash
raworc api spaces/demo/build --method POST
```

3. Create session and test:
```bash
raworc api sessions --method POST --body '{"space": "demo"}'
```

4. Send messages:
```bash
raworc api sessions/{session_id}/messages --method POST --body '{
  "content": "nuqneH! (Hello!)",
  "role": "user"
}'
```

The agent will automatically respond in Klingon with helpful and authentic responses!

## Key Features

- ✅ **Simple Integration**: Minimal Node.js code with async/await
- ✅ **Language Consistency**: Always Klingon output
- ✅ **Claude Powered**: Latest Claude 3.5 Sonnet model
- ✅ **Auto-Building**: npm install runs automatically during space build
- ✅ **Fast Execution**: Pre-built dependencies for instant responses
- ✅ **Cultural Authenticity**: Proper Klingon vocabulary and context

## Klingon Language Notes

The agent uses proper Klingon language constructs:
- `nuqneH` - Hello/What do you want?
- `jup` - No
- `Qagh` - Error/Mistake
- `lo'taHvIS` - While using (Claude)
- And many more authentic Klingon phrases and grammar!