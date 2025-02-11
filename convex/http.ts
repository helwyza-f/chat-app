import { WebhookEvent } from "@clerk/nextjs/server";
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { internal } from "./_generated/api";

const validatePayload = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();

  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };

  const webhook = new Webhook("whsec_5xbcWBNQGlqn3qz22BeZvU5CWjIAu29I");

  try {
    const event = webhook.verify(payload, svixHeaders) as WebhookEvent;
    return event;
  } catch (error) {
    console.error("Clerk webhook request not verified");
    return;
  }
};

const handlerClerkWebhook = httpAction(async (ctx, req) => {
  const event = await validatePayload(req);
  if (!event) {
    return new Response("Couldnt validate clerk payload", {
      status: 400,
    });
  }

  switch (event.type) {
    case "user.created": {
      const user = await ctx.runQuery(internal.user.get, {
        clerkId: event.data.id,
      });
      if (user) {
        console.log(`Updating user ${event.data.id} with ${event.data}`);
      }
    }
    case "user.updated": {
      console.log(`Updating user ${event.data.id} with ${event.data}`);

      await ctx.runMutation(internal.user.create, {
        username: `${event.data.first_name} ${event.data.last_name}`,
        imageUrl: event.data.image_url,
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
      });

      break;
    }
    default: {
      console.log("Clerk webhook event not supported", event.type);
    }
  }
  return new Response("Webhook received", {
    status: 200,
  });
});

const http = httpRouter();

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handlerClerkWebhook,
});

export default http;
