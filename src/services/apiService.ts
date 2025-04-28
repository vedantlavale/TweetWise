// Mock API service - would be replaced with actual Gemini API calls later

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type TweetStyle = 'professional' | 'casual' | 'funny' | 'inspirational' | 'provocative';

/**
 * Mock function to enhance a tweet with a specific style
 */
export async function enhanceTweet(tweet: string, style: TweetStyle): Promise<string> {
  // Simulate API delay
  await delay(1500);
  
  // Mock responses for different styles
  const responses: Record<TweetStyle, string> = {
    professional: `I'm excited to share that our team has successfully implemented the new feature that will significantly improve user experience. Looking forward to your feedback! #Innovation #UserExperience`,
    
    casual: `Just finished working on that cool new feature we talked about! Can't wait for y'all to try it out and let me know what you think! 😊 #NewStuff`,
    
    funny: `Spent 5 hours debugging what turned out to be a missing semicolon. Coffee consumption: dangerous levels. Sanity: questionable. But hey, the feature works now! 😂 #DeveloperLife #SendHelp`,
    
    inspirational: `Every line of code represents a choice. Today, we chose to make our users' lives better. Small improvements compound into extraordinary results. What will you improve today? #GrowthMindset #Innovation`,
    
    provocative: `Hot take: Most "revolutionary" apps are just basic features with fancy marketing. Our new update actually delivers on its promises. Try it if you're tired of the hype. #RealTalk #NoFilter`
  };
  
  return responses[style];
}

type DebateFormat = 'formal' | 'casual' | 'academic' | 'humorous';

interface DebateResult {
  pro: string;
  con: string;
}

/**
 * Mock function to generate debate arguments
 */
export async function generateDebate(topic: string, format: DebateFormat): Promise<DebateResult> {
  // Simulate API delay
  await delay(2000);
  
  // Example debate on "Why cats are better than dogs" in different formats
  const catsDogsTopic = "cats are better than dogs";
  const isCatsTopic = topic.toLowerCase().includes("cats") && topic.toLowerCase().includes("dogs");
  
  if (isCatsTopic) {
    return {
      pro: `Cats are independent and low-maintenance pets that are perfect for busy lifestyles. They are clean animals that groom themselves, use litter boxes, and don't require walks. Cats are quiet, space-efficient, and typically live longer than dogs. Their purring has therapeutic benefits and can lower stress and blood pressure in humans. Financially, cats cost significantly less than dogs over their lifetime in terms of food, healthcare, and accessories.`,
      
      con: `Dogs offer unmatched loyalty and companionship, forming deep bonds with their owners. They provide security and protection for homes and families. Dogs are highly trainable and can perform various tasks from service work to search and rescue. Their need for walks encourages owners to exercise regularly. Dogs are social animals that help their owners meet new people and build community connections. Studies show dog owners generally have lower blood pressure and reduced risk of heart disease.`
    };
  }
  
  // Generic responses for other topics
  return {
    pro: `There are several compelling arguments supporting this position. First, extensive research has demonstrated significant benefits including improved outcomes, increased efficiency, and greater satisfaction among stakeholders. Historical precedents show similar approaches have succeeded in comparable contexts. From an ethical standpoint, this position aligns with widely accepted principles of fairness and maximizing collective well-being. The economic analysis also indicates long-term sustainability with minimal negative externalities.`,
    
    con: `Despite the apparent benefits, there are strong reasons to oppose this position. Critical analysis reveals several flaws in the underlying assumptions. Implementation would likely create unintended consequences that outweigh the potential benefits. There are significant concerns regarding accessibility, equity, and long-term sustainability. Alternative approaches would achieve similar goals with fewer drawbacks. Historical examples demonstrate the risks of similar strategies. Ethically, this position raises questions about autonomy and distributive justice that cannot be easily dismissed.`
  };
}