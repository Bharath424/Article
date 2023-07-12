const fetchAllArticles = {
  tags: ["Articles"],
  summary: "Get all Articles",
  description: `API to fetch all articles and following paramters 
  1. Article Name
  2. Search Key`,
  produces: ["application/json"],
  parameters: [
    {
      name: "articleName",
      in: "query",
      description:
        "This parameter allows you to specify your search keywords to find the news articles you are looking for. The keywords will be used to return the most relevant articles. It is possible to use logical operators with keywords",
      required: true,
      type: "string",
      example: "google",
    },
    {
      name: "searchKey",
      in: "query",
      description: "his parameter allows you to choose in which attributes the keywords are searched. The attributes that can be set are title, description and content.",
      required: false,
      type: "string",
      example: "Android",
    },
    {
      name: "lang",
      in: "query",
      description: "parmater which tells us in which language the article has to be",
      required: false,
      type: "string",
      example: "en",
    },
  ],
  responses: {
    "200": {
      description: "success response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              code: 200,
              articles: [
                {
                  title: "Democrats call on DOJ to investigate tax sites for sharing financial information with Meta",
                  description:
                    "A group of Democratic senators is urging federal law enforcement officials to investigate and prosecute some of the most popular online tax filing companies for allegedly sharing millions of taxpayers’ financial data with Meta and Google.",
                  content:
                    "A group of Democratic senators is urging federal law enforcement officials to investigate and prosecute some of the most popular online tax filing companies for allegedly sharing millions of taxpayers’ financial data with Meta and Google.\nOn Tuesday,... [1349 chars]",
                  url: "https://www.theverge.com/2023/7/12/23791496/meta-google-tax-filing-warren-sanders-pixel",
                  image:
                    "https://cdn.vox-cdn.com/thumbor/7nAd_lsCbEYHollAHW02MNWnNOs=/0x0:4000x2667/1200x628/filters:focal(2000x1334:2001x1335)/cdn.vox-cdn.com/uploads/chorus_asset/file/24782734/1258663294.jpg",
                  publishedAt: "2023-07-12T09:00:00Z",
                  source: {
                    name: "The Verge",
                    url: "https://www.theverge.com",
                  },
                },
              ],
            },
          },
        },
      },
    },
    "400": {
      description: "error response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              code: 400,
              message: "ArticleName can not be empty",
            },
          },
        },
      },
    },
  },
};

export default fetchAllArticles;
