export interface ChannelStrategy {
    name: string;
    timeline: string;
    cost: string;
    roi: string;
    details: string;
  }
  
  export interface MarketingStrategy {
    productName: string;
    productDescription: string;
    currentStatus: {
      conversionRate: string;
      freeToPaidRate: string;
      ltv: string;
    };
    campaign: {
      budget: string;
      duration: string;
    };
    channels: ChannelStrategy[];
    summary: {
      totalCost: string;
      expectedTimeline: string;
      expectedVisitors: string;
      expectedPayingUsers: string;
      expectedRevenue: string;
    };
  }
  
  export function parseStrategyContent(content: string): Partial<MarketingStrategy> {
    const lines = content.split('\n');
    const strategy: Partial<MarketingStrategy> = {
      productName: '',
      productDescription: '',
      currentStatus: {
        conversionRate: '',
        freeToPaidRate: '',
        ltv: '',
      },
      campaign: {
        budget: '',
        duration: '',
      },
      channels: [],
      summary: {
        totalCost: '',
        expectedTimeline: '',
        expectedVisitors: '',
        expectedPayingUsers: '',
        expectedRevenue: '',
      },
    };
  
    let currentSection = '';
  
    for (const line of lines) {
      if (line.toLowerCase().includes('about')) {
        currentSection = 'about';
        continue;
      } else if (line.toLowerCase().includes('current status')) {
        currentSection = 'currentStatus';
        continue;
      } else if (line.toLowerCase().includes('marketing campaign')) {
        currentSection = 'campaign';
        continue;
      } else if (line.toLowerCase().includes('channel strategy overview')) {
        currentSection = 'channels';
        continue;
      } else if (line.toLowerCase().includes('summary')) {
        currentSection = 'summary';
        continue;
      }
  
      switch (currentSection) {
        case 'about':
          if (!strategy.productName) {
            strategy.productName = line.trim();
          } else if (!strategy.productDescription) {
            strategy.productDescription = line.trim();
          }
          break;
        case 'currentStatus':
          if (line.includes('conversion rate')) {
            strategy.currentStatus!.conversionRate = line.split(':')[1].trim();
          } else if (line.includes('free-to-paid')) {
            strategy.currentStatus!.freeToPaidRate = line.split(':')[1].trim();
          } else if (line.includes('LTV')) {
            strategy.currentStatus!.ltv = line.split(':')[1].trim();
          }
          break;
        case 'campaign':
          if (line.includes('budget')) {
            strategy.campaign!.budget = line.split(':')[1].trim();
          } else if (line.includes('duration')) {
            strategy.campaign!.duration = line.split(':')[1].trim();
          }
          break;
        case 'channels':
          // Simplified channel parsing
          if (line.includes('Expected timeline')) {
            const channel: ChannelStrategy = {
              name: line.split(':')[0].trim(),
              timeline: line.split(':')[1].trim(),
              cost: '',
              roi: '',
              details: '',
            };
            strategy.channels!.push(channel);
          }
          break;
        case 'summary':
          if (line.includes('Total cost')) {
            strategy.summary!.totalCost = line.split(':')[1].trim();
          } else if (line.includes('Expected timeline')) {
            strategy.summary!.expectedTimeline = line.split(':')[1].trim();
          } else if (line.includes('Expected website visitors')) {
            strategy.summary!.expectedVisitors = line.split(':')[1].trim();
          } else if (line.includes('Expected paying users')) {
            strategy.summary!.expectedPayingUsers = line.split(':')[1].trim();
          } else if (line.includes('Expected revenue')) {
            strategy.summary!.expectedRevenue = line.split(':')[1].trim();
          }
          break;
      }
    }
  
    return strategy;
  }
  
  