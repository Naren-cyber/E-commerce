# E-Commerce App Demo

## Directory Structure

 - app
   - (main)
     - layout.tsx - Common layout file for /, /products and /products/[id] pages, which provides the header and footer for the website.
     - page.tsx - provides / page
     - products
       - loading.tsx - provides loading skeleton for /products page
       - page.tsx - provides /products page
       - [id]
         - layout.tsx - provides layout for products/[id] page
         - loading.tsx - provides loading skeleton for products/[id] page
         - page.tsx - provides products/[id] page
   - fonts - provides local fonts
   - placeholder.svg/route.ts - provides /placeholder.svg?height=<HEIGHT>&width=<WIDTH>&text=<TEXT> api to generate dynamic placeholder api
 - components - contains all the components used in the project
   - ui - contains all shadcn components
 - hooks - provides custom hooks
 - lib
   - server - provides products & banners api and server-functions
   - config.ts - provides project related config
   - server-utils.ts - provides helper functions for server related logic
   - types.ts - provides types
   - utils.ts - provides utility function which can be used in both server and client logic
 - stores - provides redux stores to handle global state of the project