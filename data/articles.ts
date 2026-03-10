import { Article, Category, Decade } from '../types';

const generateArticles = (): Article[] => {
  const decades: Decade[] = [1960, 1980, 2000, 2020];
  const categories = [Category.Tech, Category.Science, Category.Politics];
  const articles: Article[] = [];

  let idCounter = 1;

  decades.forEach((decade) => {
    categories.forEach((category) => {
      for (let i = 1; i <= 5; i++) {
        let title = `Article ${i} in ${category} (${decade})`;
        let content = `This is a detailed article about ${category} events that transpired during the ${decade}s. `;
        let preview = `A brief look into the major events of ${category} in the ${decade}s...`;

        // Specific mock data for realism
        if (decade === 1960 && category === Category.Tech && i === 1) {
          title = "The Birth of ARPANET";
          preview = "How the precursor to the modern internet was established in the late 60s.";
          content = "In the late 1960s, the Advanced Research Projects Agency Network (ARPANET) became the first wide-area packet-switched network with distributed control and one of the first networks to implement the TCP/IP protocol suite. Both technologies became the technical foundation of the Internet. The ARPANET was established by the Advanced Research Projects Agency (ARPA) of the United States Department of Defense.";
        }
        if (decade === 1960 && category === Category.Politics && i === 1) {
          title = "The Civil Rights Act of 1964";
          preview = "A landmark civil rights and labor law in the United States.";
          content = "The Civil Rights Act of 1964 is a landmark civil rights and labor law in the United States that outlaws discrimination based on race, color, religion, sex, or national origin. It prohibits unequal application of voter registration requirements, and racial segregation in schools, employment, and public accommodations. Initially, powers given to enforce the act were weak, but these were supplemented during later years.";
        }
        if (decade === 1980 && category === Category.Tech && i === 1) {
            title = "The Rise of the Personal Computer";
            preview = "The 1980s saw the explosion of home computing with Apple and IBM.";
            content = "The 1980s were a pivotal decade for personal computing. IBM released the IBM PC in 1981, setting a standard for hardware that would dominate the industry. Meanwhile, Apple launched the Macintosh in 1984, introducing the graphical user interface (GUI) to the masses with its famous '1984' Super Bowl commercial. These events marked the transition of computers from hobbyist kits to essential household appliances.";
        }
        
        // Fill generic content for the rest to simulate length
        if (content.length < 200) {
            content += "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ".repeat(3);
        }

        articles.push({
          id: `art-${idCounter++}`,
          decade,
          category,
          title,
          preview,
          content,
          imageUrl: `https://picsum.photos/seed/${decade}${category}${i}/400/200`
        });
      }
    });
  });

  return articles;
};

export const articles = generateArticles();
