// Resource: https://docs.uploadthing.com/nextjs/appdir#create-a-nextjs-api-route-using-the-filerouter
// Copy paste (be careful with imports)

import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
}

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});