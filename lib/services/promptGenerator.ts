// Generate chapter prompt templates for chapters 12-30
export function generateChapterPrompt(chapterNumber: number, totalChapters: number): string {
  const basePrompt = `Objective:

To generate a high-quality book chapter for our client [SENDER_NAME], written in a style consistent with the client's voice and tone, ensuring a smooth and cohesive reading experience throughout the book. Each chapter should build upon the previous ones, avoiding duplication and maintaining consistency. The AI should plan the content to fit within a total of ${totalChapters} chapters, considering the progression and mapping of the book's layout. Note that there will be an introduction and a conclusion before and after the book content you write. Adjust your content accordingly.

First, Read Previous Chapters Thoroughly:

Carefully read all previous chapters to understand the content covered so far.
Ensure consistency in themes, messages, and narrative flow.
Identify what has been discussed and what new content can be introduced.
Avoid Duplication:

Do not repeat content or ideas already covered.
Build upon previous concepts, introducing new insights.

Instructions:

Keep the chapter title short, concise, benefit-oriented, and engaging, with maximum appeal. The content should be relevant to all readers interested in this book. It should provide the utmost value in an easy-to-understand and smooth manner, reading like a best-selling book. Present the content in a clear, actionable, and profitable way, with a seamless flow. Ensure the finished chapter reads like a polished piece, ready for the client, and evokes gratitude and admiration from readers. The chapter should be self-contained, with key insights extracted, leaving no reason to seek additional sources because all the key insights are here.

Create a Compelling Chapter Title:

Match the chapter number with the book theme.
Keep it short, concise, benefit-oriented, and engaging.
Use hooks to capture the reader's attention.
Write the Chapter Content:

Present the content in a helpful, clear, and actionable manner.
Ensure it reads like a polished piece, ready for publication.
The chapter should be self-contained with key insights.

Style Guidelines:

Tone: Blend inspiration and practicality. Be persuasive and passionate, yet grounded.
Language: Use sensory and emotive language. Keep it casual and approachable. Use the top 1000 most commonly used English words. Keep sentences short and punchy.
Metaphors and Analogies: Use creative and original metaphors. Weave the same metaphor throughout without mixing. Avoid generic metaphors; be creative.
Storytelling: Weave a narrative arc with an open loop at the beginning and close it at the end.
Audience-Centric: Position content around the reader's needs and desires. Make the reader the hero of the story.
Flow and Clarity: Minimize use of commas for better flow. Keep language clean and crisp.

Educational and Persuasive Principles:

Positive Reinforcement: Begin and end with uplifting and empowering messages.
Focus on Success: Emphasize success rather than failure.
Single Key Insight: Deliver one key message in multiple ways using stories, examples, facts, emotional appeals, and positive/negative juxtapositions.
Emotional Engagement: Attach strong emotions to enhance memory retention. Build tension before delivering the solution.
Subtle Suggestions: Avoid forcefully pushing ideas. Guide the reader with logic and subtlety.
Framing: Emphasize quick results or highlight long-term benefits.

Call to Action:

End with a motivating call to action, urging the reader to embrace the opportunity or solution presented.
Provide one small action the reader can take, detailed and easy to implement.
Include a sentence that ties off with an example of the benefits gained.

Avoid Numbered Lists:
Make it flow like a novel.

Write in First Person:
Write as the expert on the subject matter.

Final Prompt for the Reader:
At the end, provide a one-sentence prompt they can paste into ChatGPT to generate helpful insights or questions related to the chapter's teachings.
Make this prompt encourage critical thought and provide helpful, actionable replies.
Ensure it is concise and relevant to the chapter's content.

Additional Notes:
Use only the top 1000 most commonly used English words.
Keep language clean and crisp, not superfluous or verbose.
Do not mention any specific individuals or entities.
Ensure all content is original and ethical.
Employ the principles of persuasion to make the content compelling and actionable.
Keep your response within the character limit.

Chapter ${chapterNumber} Specific Context:
${getChapterSpecificContext(chapterNumber, totalChapters)}

Formatting Instructions:

Output Format:

H2 Series:
Create an h2 header for this chapter, labeled h2${chapterNumber}:
Add ### immediately after the header.
Example: h2${chapterNumber}:[Your Chapter Title]###

Content Series:
Create one content section labeled content${chapterNumber}:
Add ### immediately after the content.
Example: content${chapterNumber}:[Your Chapter Content]###

Important:
Only include one h2 header and one content block in your response.
Ensure numbering matches the chapter number.
Do not include additional headers or content sections.

!IMPORTANT: Do not add asterisks, produce all your writing with standard text only.

Parsing Patterns:
Header Parser Pattern: h2\\d+:([\\s\\S]*?)###
Content Parser Pattern: content\\d+:([\\s\\S]*?)###

Clean Parsing:
Ensure your content output can be cleanly parsed using the patterns.
Avoid extra characters, unnecessary formatting, or deviations.

Final Output Format (Do Not Include This Text in Your Response):
h2${chapterNumber}:[Your Chapter Title]###
content${chapterNumber}:[Your Chapter Content]###

Crucial Reminder:
This is Chapter ${chapterNumber} of ${totalChapters}. Format your output accordingly.

Please reply ONLY with the chapter title formatted like this:
h2${chapterNumber}:[Your Chapter title text]###

And ONLY the chapter content, formatted like this:
content${chapterNumber}:[Your Chapter content text]###

Do not add any other headers or body blocks. Your response should consist only of one chapter title formatted like that and one content block formatted like that, too. That's it.

IMPORTANT: Do not include any extra subheaders throughout your content. It should be text only. No extra formatting for bolds or italics, just plain writing following the parsing instructions above.

AGAIN, !IMPORTANT: Do not add asterisks, produce all your writing with standard text only.`;

  return basePrompt;
}

function getChapterSpecificContext(chapterNumber: number, totalChapters: number): string {
  // Define progression themes based on chapter position
  const position = chapterNumber / totalChapters;

  if (position <= 0.2) {
    // Early chapters (1-20%): Foundation and problem awareness
    return `This is an early chapter focused on building foundation knowledge and creating awareness of the core problems your target audience faces. Focus on establishing credibility, building trust, and helping readers understand why this topic matters to them.`;
  } else if (position <= 0.4) {
    // Early-middle chapters (20-40%): Deepening understanding
    return `This chapter should deepen the reader's understanding of the concepts introduced earlier. Begin introducing more specific strategies and frameworks while maintaining accessibility. Start bridging from problem awareness to solution possibilities.`;
  } else if (position <= 0.6) {
    // Middle chapters (40-60%): Core strategies and implementation
    return `This is a core chapter where you deliver substantial value through actionable strategies and implementation guidance. Provide specific methodologies, step-by-step processes, and real-world applications. This is where transformation begins.`;
  } else if (position <= 0.8) {
    // Late-middle chapters (60-80%): Advanced techniques and optimization
    return `This chapter should cover more advanced techniques and optimization strategies. Assume readers have grasped the fundamentals and are ready for sophisticated approaches. Include troubleshooting common challenges and refinement strategies.`;
  } else {
    // Final chapters (80-100%): Mastery and future vision
    return `This is a concluding chapter focused on mastery, long-term success, and future vision. Help readers see the bigger picture, maintain momentum, and understand how to continue growing beyond this book. Inspire action and commitment to ongoing improvement.`;
  }
}

// Generate specific contexts for premium chapters (16-30)
export function getPremiumChapterThemes(chapterNumber: number): string {
  const premiumThemes = {
    16: "Scaling and Automation: Transform manual processes into scalable systems",
    17: "Advanced Analytics: Data-driven decision making and performance tracking",
    18: "Team Building: Creating and leading high-performance teams",
    19: "Strategic Partnerships: Leveraging relationships for exponential growth",
    20: "Innovation Frameworks: Staying ahead in rapidly changing markets",
    21: "Crisis Management: Turning challenges into opportunities",
    22: "Brand Authority: Establishing thought leadership in your industry",
    23: "Revenue Optimization: Maximizing profitability and lifetime value",
    24: "Global Expansion: Taking your success international",
    25: "Digital Transformation: Leveraging technology for competitive advantage",
    26: "Sustainable Growth: Building for long-term success",
    27: "Legacy Building: Creating lasting impact and influence",
    28: "Wealth Preservation: Protecting and growing what you've built",
    29: "Giving Back: Using success to make a difference",
    30: "The Next Chapter: Your roadmap for continued evolution"
  };

  return premiumThemes[chapterNumber] || `Chapter ${chapterNumber}: Advanced strategies for continued growth and success`;
}