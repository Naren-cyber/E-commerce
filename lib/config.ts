const config = {
  jsonDataApi:
    "https://my-json-server.typicode.com/Naren-cyber/e-commerce",
  sortOptions: [
    {
      label: "Relevance",
      value: undefined,
    },
    {
      label: "Price descending",
      value: "price-desc",
    },
    {
      label: "Price ascending",
      value: "price-asc",
    },
  ],
} as const;

export default config;
