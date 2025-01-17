export interface AnalysisResult {
    onPageSEO: {
      titleTag: {
        score: number;
        suggestions: string;
      };
      metaDescription: {
        score: number;
        suggestions: string;
      };
      headings: {
        score: number;
        suggestions: string;
      };
    };
    technicalSEO: {
      https: boolean;
      mobileResponsive: boolean;
      canonicalUrl: string;
      robotsTxt: boolean;
    };
    imageOptimization: {
      totalImages: number;
      imagesWithAltText: number;
      lazyLoadedImages: number;
      suggestions: string;
    };
    contentAnalysis: {
      wordCount: number;
      qualitySuggestions: string;
    };
    structuredData: {
      implemented: boolean;
      recommendations: string;
    };
    competitiveEdge: {
      comparison: string;
      uniqueFeatures: string;
    };
    overallQuality: {
      highPriority: string[];
      mediumPriority: string[];
      lowPriority: string[];
    };
  }
  
  