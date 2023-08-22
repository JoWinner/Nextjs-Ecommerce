import prismadb from "@/lib/prismadb";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.CUSTOMER_WEBHOOK_SECRET || "";

const storeId = process.env.STORE_ID || "";



async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses,  username } = evt.data ;

    const email = email_addresses[0]?.email_address || '';


    // Customizing the create object
    const createData = {
      externalId: id as string,
      userName: username as string,
      email: email,
      storeId: storeId,
    };

    // Customizing the update object
    const updateData = {
      userName: username as string,
      email: email,

     

    };

    await prismadb.customer.upsert({
      where: { externalId: id as string },
      create: createData,
      update: updateData,
    });
  }
}

type EventType = "user.created" | "user.updated" | "*";

type Event = {
  data: {
    id: string;
    email_addresses: { email_address: string }[]; // Define the type here as an array of objects
    username: string;
    // ... other properties
  };
  object: "event";
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
