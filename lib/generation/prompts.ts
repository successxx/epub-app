export interface BookPrompt {
  id: string
  name: string
  prompt: string
  variables: string[]
  outputKey: string
  estimatedPages: number
}

export const BOOK_GENERATION_PROMPTS: BookPrompt[] = [
  {
    id: 'intro',
    name: 'Introduction',
    prompt: `Create a compelling introduction for a lead magnet ebook for {companyName}.

Company description: {description}
Target audience: {targetAudience}
Value propositions: {valuePropositions}
Industry: {industryPositioning}

Write a comprehensive 8-10 page introduction that:
1. Opens with a powerful hook that addresses the reader's main pain point
2. Establishes immediate credibility and authority in the {industryPositioning} space
3. Previews the transformation the reader will experience
4. Outlines the key problems this book solves
5. Sets clear expectations for what readers will learn
6. Includes relevant statistics and industry insights
7. Creates urgency around why this information matters now
8. Ends with a clear roadmap of the book's contents

Make it engaging, professional, and focused on value delivery. Use subheadings for better readability.`,
    variables: ['companyName', 'description', 'targetAudience', 'valuePropositions', 'industryPositioning'],
    outputKey: 'introduction',
    estimatedPages: 10
  },

  {
    id: 'chapter1',
    name: 'Understanding Your Industry Landscape',
    prompt: `Write Chapter 1: "Understanding the {industryPositioning} Landscape" for {companyName}'s lead magnet.

Company: {companyName}
Industry: {industryPositioning}
Target Audience: {targetAudience}
Services: {services}

Create a comprehensive 12-15 page chapter covering:
1. Current state of the {industryPositioning} industry
2. Major trends shaping the future
3. Key challenges businesses face today
4. Opportunities for growth and innovation
5. Common mistakes to avoid
6. Industry benchmarks and KPIs
7. Competitive landscape analysis
8. Technology's impact on the industry
9. Regulatory considerations
10. Future predictions and preparations

Include specific examples, case studies, and actionable insights. Make it valuable for {targetAudience}.`,
    variables: ['companyName', 'industryPositioning', 'targetAudience', 'services'],
    outputKey: 'chapter1',
    estimatedPages: 15
  },

  {
    id: 'chapter2',
    name: 'Identifying Core Challenges',
    prompt: `Write Chapter 2: "Identifying and Overcoming Core Business Challenges" for {companyName}'s ebook.

Company: {companyName}
Value Props: {valuePropositions}
Target: {targetAudience}
Industry: {industryPositioning}

Create a detailed 12-15 page chapter that:
1. Identifies the top 10 challenges facing {targetAudience}
2. Deep dives into root causes of each challenge
3. Provides diagnostic tools and assessment frameworks
4. Shares real-world examples of these challenges
5. Explains the cost of inaction
6. Offers immediate tactical solutions
7. Presents long-term strategic approaches
8. Includes self-assessment checklists
9. Provides challenge prioritization matrix
10. Links challenges to opportunities

Make it highly practical with tools readers can implement immediately.`,
    variables: ['companyName', 'valuePropositions', 'targetAudience', 'industryPositioning'],
    outputKey: 'chapter2',
    estimatedPages: 15
  },

  {
    id: 'chapter3',
    name: 'Strategic Solutions Framework',
    prompt: `Write Chapter 3: "Building Your Strategic Solutions Framework" for {companyName}.

Company: {companyName}
Services: {services}
Products: {products}
Benefits: {benefits}

Develop a comprehensive 15-18 page chapter including:
1. Introduction to strategic thinking in {industryPositioning}
2. Framework for evaluating solutions
3. How to align solutions with business goals
4. Building vs. buying decisions
5. Implementation roadmap creation
6. Resource allocation strategies
7. Risk assessment and mitigation
8. Success metrics definition
9. Stakeholder buy-in strategies
10. Change management best practices
11. Quick wins vs. long-term investments
12. Solution scalability considerations

Relate everything back to how {companyName}'s approach addresses these needs.`,
    variables: ['companyName', 'services', 'products', 'benefits', 'industryPositioning'],
    outputKey: 'chapter3',
    estimatedPages: 18
  },

  {
    id: 'chapter4',
    name: 'Implementation Excellence',
    prompt: `Write Chapter 4: "Achieving Implementation Excellence" for {companyName}'s lead magnet.

Company: {companyName}
Features: {features}
Benefits: {benefits}
Target: {targetAudience}

Create a practical 15-18 page implementation guide covering:
1. Pre-implementation preparation checklist
2. Building your implementation team
3. Project planning and timeline creation
4. Communication strategies for all stakeholders
5. Training and capability building
6. Pilot program design and execution
7. Feedback loops and iteration processes
8. Common implementation pitfalls and solutions
9. Technology integration best practices
10. Process optimization techniques
11. Quality assurance frameworks
12. Post-implementation review processes

Include templates, checklists, and actionable tools.`,
    variables: ['companyName', 'features', 'benefits', 'targetAudience'],
    outputKey: 'chapter4',
    estimatedPages: 18
  },

  {
    id: 'chapter5',
    name: 'Measuring Success',
    prompt: `Write Chapter 5: "Measuring and Optimizing Success" for {companyName}.

Company: {companyName}
Industry: {industryPositioning}
Value Props: {valuePropositions}

Develop a data-driven 12-15 page chapter on:
1. Defining success metrics for {industryPositioning}
2. Building effective dashboards and reporting
3. Key Performance Indicators (KPIs) that matter
4. Data collection and analysis methods
5. Benchmarking against industry standards
6. ROI calculation frameworks
7. Continuous improvement methodologies
8. A/B testing and experimentation
9. Predictive analytics applications
10. Performance review cycles
11. Success story documentation
12. Scaling successful initiatives

Provide specific metrics and measurement tools relevant to {targetAudience}.`,
    variables: ['companyName', 'industryPositioning', 'valuePropositions', 'targetAudience'],
    outputKey: 'chapter5',
    estimatedPages: 15
  },

  {
    id: 'chapter6',
    name: 'Case Studies and Success Stories',
    prompt: `Write Chapter 6: "Real-World Success Stories and Case Studies" for {companyName}.

Company: {companyName}
Industry: {industryPositioning}
Services: {services}
Target: {targetAudience}

Create an inspiring 15-18 page chapter with:
1. 5-7 detailed case studies relevant to {targetAudience}
2. Before and after scenarios
3. Specific challenges faced and overcome
4. Step-by-step solution implementation
5. Quantifiable results and ROI achieved
6. Lessons learned from each case
7. Adaptation strategies for different contexts
8. Common success patterns identified
9. Failure analysis and recovery stories
10. Industry-specific examples
11. Small, medium, and large scale implementations
12. International and local perspectives

Make stories relatable and actionable for readers.`,
    variables: ['companyName', 'industryPositioning', 'services', 'targetAudience'],
    outputKey: 'chapter6',
    estimatedPages: 18
  },

  {
    id: 'chapter7',
    name: 'Advanced Strategies',
    prompt: `Write Chapter 7: "Advanced Strategies for Market Leadership" for {companyName}.

Company: {companyName}
Value Props: {valuePropositions}
Features: {features}
Industry: {industryPositioning}

Develop a sophisticated 15-18 page chapter covering:
1. Competitive differentiation strategies
2. Innovation frameworks and methodologies
3. Strategic partnerships and alliances
4. Market expansion tactics
5. Digital transformation roadmaps
6. Customer experience optimization
7. Operational excellence models
8. Talent strategy and team building
9. Financial optimization techniques
10. Sustainability and ESG considerations
11. Crisis management and resilience
12. Future-proofing your business

Position {companyName} as the partner for achieving these advanced strategies.`,
    variables: ['companyName', 'valuePropositions', 'features', 'industryPositioning'],
    outputKey: 'chapter7',
    estimatedPages: 18
  },

  {
    id: 'chapter8',
    name: 'Technology and Digital Tools',
    prompt: `Write Chapter 8: "Leveraging Technology and Digital Tools" for {companyName}.

Company: {companyName}
Products: {products}
Features: {features}
Industry: {industryPositioning}

Create a comprehensive 12-15 page technology guide including:
1. Essential technology stack for {industryPositioning}
2. Digital tool evaluation criteria
3. Integration strategies and best practices
4. Automation opportunities identification
5. Data management and analytics platforms
6. Cybersecurity considerations
7. Cloud vs. on-premise decisions
8. Mobile and remote capabilities
9. AI and machine learning applications
10. Cost-benefit analysis frameworks
11. Technology roadmap planning
12. Vendor selection and management

Focus on practical, implementable technology solutions.`,
    variables: ['companyName', 'products', 'features', 'industryPositioning'],
    outputKey: 'chapter8',
    estimatedPages: 15
  },

  {
    id: 'chapter9',
    name: 'Building High-Performance Teams',
    prompt: `Write Chapter 9: "Building and Leading High-Performance Teams" for {companyName}.

Company: {companyName}
Target: {targetAudience}
Industry: {industryPositioning}

Develop a people-focused 12-15 page chapter covering:
1. Hiring for success in {industryPositioning}
2. Onboarding and training excellence
3. Performance management systems
4. Culture building and values alignment
5. Remote and hybrid team management
6. Communication and collaboration tools
7. Leadership development programs
8. Employee engagement strategies
9. Retention and succession planning
10. Diversity, equity, and inclusion
11. Continuous learning frameworks
12. Recognition and reward systems

Include practical templates and assessment tools.`,
    variables: ['companyName', 'targetAudience', 'industryPositioning'],
    outputKey: 'chapter9',
    estimatedPages: 15
  },

  {
    id: 'chapter10',
    name: 'Financial Management Excellence',
    prompt: `Write Chapter 10: "Financial Management and Growth Strategies" for {companyName}.

Company: {companyName}
Industry: {industryPositioning}
Benefits: {benefits}

Create a finance-focused 12-15 page chapter including:
1. Financial planning fundamentals for {industryPositioning}
2. Budget creation and management
3. Cash flow optimization strategies
4. Investment decision frameworks
5. Cost reduction opportunities
6. Revenue growth tactics
7. Pricing strategy optimization
8. Financial risk management
9. Funding and capital raising options
10. Financial reporting best practices
11. Tax optimization strategies
12. Exit planning considerations

Make it accessible for non-financial executives while maintaining depth.`,
    variables: ['companyName', 'industryPositioning', 'benefits'],
    outputKey: 'chapter10',
    estimatedPages: 15
  },

  {
    id: 'chapter11',
    name: 'Marketing and Customer Acquisition',
    prompt: `Write Chapter 11: "Modern Marketing and Customer Acquisition" for {companyName}.

Company: {companyName}
Services: {services}
Target: {targetAudience}
Value Props: {valuePropositions}

Develop a marketing-focused 15-18 page chapter covering:
1. Understanding your ideal customer profile
2. Content marketing strategies that convert
3. Digital marketing channels and tactics
4. Social media strategy and execution
5. Email marketing automation
6. SEO and SEM best practices
7. Lead generation and nurturing
8. Conversion rate optimization
9. Customer journey mapping
10. Marketing analytics and attribution
11. Brand building and positioning
12. Partnership marketing opportunities

Include specific tactics and campaigns for {targetAudience}.`,
    variables: ['companyName', 'services', 'targetAudience', 'valuePropositions'],
    outputKey: 'chapter11',
    estimatedPages: 18
  },

  {
    id: 'chapter12',
    name: 'Customer Success and Retention',
    prompt: `Write Chapter 12: "Customer Success and Retention Mastery" for {companyName}.

Company: {companyName}
Benefits: {benefits}
Industry: {industryPositioning}

Create a customer-centric 12-15 page chapter including:
1. Building a customer success framework
2. Onboarding excellence strategies
3. Proactive support and engagement
4. Customer health scoring systems
5. Upselling and cross-selling techniques
6. Churn reduction strategies
7. Customer feedback loops
8. Community building tactics
9. Loyalty program design
10. Customer advocacy programs
11. Service recovery best practices
12. Lifetime value optimization

Focus on creating exceptional customer experiences in {industryPositioning}.`,
    variables: ['companyName', 'benefits', 'industryPositioning'],
    outputKey: 'chapter12',
    estimatedPages: 15
  },

  {
    id: 'chapter13',
    name: 'Scaling and Growth',
    prompt: `Write Chapter 13: "Scaling Your Business for Sustainable Growth" for {companyName}.

Company: {companyName}
Industry: {industryPositioning}
Features: {features}

Develop a growth-focused 15-18 page chapter covering:
1. Growth readiness assessment
2. Scalable systems and processes
3. Geographic expansion strategies
4. Product/service line extensions
5. M&A and partnership opportunities
6. Operational scaling challenges
7. Technology infrastructure scaling
8. Team scaling and organization design
9. Financial management during growth
10. Quality maintenance at scale
11. Culture preservation strategies
12. International expansion considerations

Provide frameworks for sustainable, profitable growth.`,
    variables: ['companyName', 'industryPositioning', 'features'],
    outputKey: 'chapter13',
    estimatedPages: 18
  },

  {
    id: 'chapter14',
    name: 'Innovation and Future Trends',
    prompt: `Write Chapter 14: "Innovation and Preparing for the Future" for {companyName}.

Company: {companyName}
Industry: {industryPositioning}
Value Props: {valuePropositions}

Create a forward-looking 12-15 page chapter including:
1. Emerging trends in {industryPositioning}
2. Disruptive technologies on the horizon
3. Innovation methodology and frameworks
4. Building an innovation culture
5. R&D investment strategies
6. Startup collaboration models
7. Future customer expectations
8. Regulatory changes anticipated
9. Sustainability imperatives
10. Workforce of the future
11. Business model innovation
12. Scenario planning techniques

Help readers prepare for and shape the future of {industryPositioning}.`,
    variables: ['companyName', 'industryPositioning', 'valuePropositions'],
    outputKey: 'chapter14',
    estimatedPages: 15
  },

  {
    id: 'conclusion',
    name: 'Conclusion and Action Plan',
    prompt: `Write a powerful conclusion and action plan for {companyName}'s lead magnet ebook.

Company: {companyName}
Services: {services}
Benefits: {benefits}
Target: {targetAudience}
Contact: {contactInfo}

Create an actionable 8-10 page conclusion that:
1. Summarizes key insights from each chapter
2. Provides a 30-60-90 day action plan
3. Includes priority setting framework
4. Offers quick win opportunities
5. Presents long-term strategic roadmap
6. Includes success metrics checklist
7. Provides resource planning template
8. Addresses common objections
9. Offers next steps with {companyName}
10. Includes compelling call-to-action
11. Provides contact information and consultation offer
12. Ends with inspiring vision for success

Make it motivating and actionable, driving readers to engage with {companyName}.`,
    variables: ['companyName', 'services', 'benefits', 'targetAudience', 'contactInfo'],
    outputKey: 'conclusion',
    estimatedPages: 10
  },

  {
    id: 'resources',
    name: 'Resources and Tools Appendix',
    prompt: `Create a comprehensive Resources and Tools Appendix for {companyName}'s ebook.

Company: {companyName}
Industry: {industryPositioning}
Services: {services}

Develop a valuable 10-12 page resource section including:
1. Industry glossary and definitions
2. Recommended reading list
3. Useful websites and online resources
4. Professional associations and networks
5. Conferences and events calendar
6. Software and tool recommendations
7. Template and checklist library
8. Certification and training programs
9. Regulatory resources and compliance guides
10. Vendor evaluation templates
11. ROI calculators and financial models
12. Contact information for {companyName} services

Make this a go-to reference section readers will return to repeatedly.`,
    variables: ['companyName', 'industryPositioning', 'services'],
    outputKey: 'resources',
    estimatedPages: 12
  }
]

// Function to get prompts based on tier
export function getPromptsForTier(tier: 'starter' | 'professional'): BookPrompt[] {
  if (tier === 'starter') {
    // For 100-page book, use first 8-10 chapters
    return BOOK_GENERATION_PROMPTS.slice(0, 10)
  } else {
    // For 250-page book, use all chapters
    return BOOK_GENERATION_PROMPTS
  }
}

// Function to prepare variables from company data
export function prepareVariables(companyData: any): Record<string, string> {
  return {
    companyName: companyData.companyName || 'Company',
    description: companyData.description || 'Professional services and solutions',
    tagline: companyData.tagline || '',
    targetAudience: companyData.targetAudience || 'businesses',
    industryPositioning: companyData.industryPositioning || 'business services',
    valuePropositions: Array.isArray(companyData.valuePropositions)
      ? companyData.valuePropositions.join(', ')
      : 'quality service, expertise, results',
    services: Array.isArray(companyData.services)
      ? companyData.services.join(', ')
      : 'consulting, implementation, support',
    products: Array.isArray(companyData.products)
      ? companyData.products.join(', ')
      : 'solutions and tools',
    features: Array.isArray(companyData.features)
      ? companyData.features.join(', ')
      : 'advanced features and capabilities',
    benefits: Array.isArray(companyData.benefits)
      ? companyData.benefits.join(', ')
      : 'improved efficiency, cost savings, growth',
    contactInfo: JSON.stringify(companyData.contactInfo || {})
  }
}

// Function to substitute variables in prompt
export function substituteVariables(prompt: string, variables: Record<string, string>): string {
  let result = prompt
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`{${key}}`, 'g'), value)
  }
  return result
}