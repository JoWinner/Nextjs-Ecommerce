This is a [Next.js](https://nextjs.org/) using, NextJS 13 with typescript

## Project Apps
This is a full-stack commerce application with both frontend and backend intact.
Consisting of 2 app altogether, has the backend(Admin Dashboard) app and the frontend(Store app)


## Libraries
We are using [Clerk](https://clerk.com/) for authentication which makes everything easy taking care of everything authentication including the user data for easy management.

[Prisma](https://prisma.io/) for backend and database management. Prisma has a toolkit that simplifies database access and management. It provides a set of tools that make working with databases more efficient, intuitive, and developer-friendly. A few of their CLI command would be use to setup everything.

[PlanetScale] offers a database-as-a-service (DBaaS) solution that aims to simplify the deployment, scaling, and management of databases, particularly in distributed or cloud-native environments.

[Stripe](https://stripe.com/) is used to facilitate payment for our application. In our case only the testing environment was used which still replicates the live payments.


## Getting Started
First, install all the dependencies for every app:
Do this for both the admin and the store apps.
- run `npm install`


## Setting Up Admin Dashboard
- Rename `env.local` file to `.env` in both `/ecommerce-admin` and `/ecommerce-store` folders
- Authenticate Admin
Visit [Clerk](https://clerk.com/), create a new project and navigate to "API Keys" in your new project. Now select "Next.js" and copy the variables
 **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  XXXXXXXXXXXXXXXXXXXXXXX**
 **CLERK_SECRET_KEY = XXXXXXXXXXXXXXXX**
Replace the keys inside the `.env` file of the project.

Maintain these keys, they facilitate the sign-up and sign-in for the app easily
**NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in**
**NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up**
**NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/**
**NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/**

- Cloudinary
Create a [Cloudinary](https://console.cloudinary.com/) account and copy the "Cloud Name" and replace in the `.env`
**NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="XXXXXXX"**(in the quotes)


## Setup Database
We setup database for [Prisma] in the admin app. Get an account on [PlanetScale] and create your project.
After the projects initialization, click "Ready to connect to your database?"
Setup a new password and click "Create password".

Now in the new modal window, find "Connect with" and select [Prisma], copy the `env` variable below and replace it inside `.env` in the admin app
 
**DATABASE_URL='mysql://xxxxxx:xxxxxx@aws.connect.psdb.cloud/nextjs-commerce-ddatabse?sslaccept=strict'**

Database is now perfect, we can now use Prisma to manage and access the database.

## Working with Prisma CLI
In the command terminal generate the models that are currently created, modifications can be made to fit anyways.
- run `npx prisma generate`(This generates all the node modules for the Prisma client to access and safely use it in the project)
  
- run `npx prisma db push` (This syncs the PlanetScale database with the Prisma Schema, then pushes the model tables for the database )
  
- run `npx prisma studio` (This opens graphical user interface (GUI) tool provided by Prisma that allows you to interact with your database schema and data, you can see all the visual representation of the schema and relationships between tables)
*Run them every time you make changes to the schema at `/prisma/schema.prisma`*

Checkout [Prisma] docs for [more](https://www.prisma.io/docs)


## Run Admin Dashboard
- run `npm run dev`
- First signup/signin with clerk 
- Now create a new store
**You can create multiple stores at the admin dashboard for various frontend stores, every store created has its API for easy connection to your preferred frontend app. Just a matter of making the right replacements**
At the dashboard I recommend creating `Billboards` before anything, then `Categories`

## Frontend Store
Make sure you have installed all packages - with `npm install`

- Add the same `.env` file with the same variables from the admin app
- Add a new variable to the `.env` file; 
**NEXT_PUBLIC_API_URL = http://localhost:3000/api/xxxxx-xxxx-xxxx-xxxxx-xxxxxxxx**
For every store created, a new `storeId` is also generated for that particular store's api. 

With the admin dashboard running, Goto "Settings" page and copy the api url to replace in the `.env` file the api url "**http://localhost:3000/api/b8b8d0008-8f43-42fd-a1cxx-450d37d7cfdd**"

- Copy `STORE_ID` from the "Settings" page in the `.env` at **STORE_ID=b8b8d0008-8f43-42fd-a1cxx-450d37d7cfdd**

- Using [Clerk], I recommend you create a new app/project for the frontend store only, for the customers
- Copy the keys for the Clerk frontend store authentication;
 **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  XXXXXXXXXXXXXXXXXXXXXXX**
 **CLERK_SECRET_KEY = XXXXXXXXXXXXXXXX**

## Sync Clerk to Backend Database
Before syncing lets make sure [Prisma] is present and the database schema is set at the frontend store app.
- run `npx prisma generate`
- run `npx prisma db push`
- run `npx prisma studio` 
*Run them every time you make changes to the schema at `/prisma/schema.prisma`*
Its better to have the same schema content at both the admin app and the frontend store app and generate/push on each side whenever you make changes

We can sync the users/customer authenticated at the frontend store to the database of our backend with [Clerk] "Webhooks". Visit [clerk](https://clerk.com/), navigate to "Webhooks", at "Endpoints" tab click on "Add Endpoint". 

This must be the endpoint of the store url, in development its probably `http://localhost:300` but in the case of clerk, we can't use due to security reasons. Therefore install [Ngrok](https://ngrok.com) globally for local development and configure `ngrok` authtoken  globally, follow ngrok docs for more instructions

- Open `.env` in the admin app and replace **FRONTEND_STORE_URL=http://localhost:3001** variable with your frontend store url if its not the same already

Now let's run the store app to see how well we're doing, enter `npm run dev`. Keep the admin side app running before you run the frontend app.

- Run `ngrok http 3001` in a new terminal, "3001" is the port number at which the frontend store app is running, make changes for a different port number
ngrok generates a url which can be visited globally, having "https" for security
Copy the url with "https" in the terminal.
Generated url look like this: ``Forwarding  https://6ab1-110-73-241-18.ngrok-free.app -> http://localhost:3001``

- Add the url generated by ngrok as the endpoint at clerk "Webhooks"
The end point must look like this: `https://the-storeurl.com/api/webhook/customer`
Replace `https://the-storeurl.com` with your store url or the ngrok `https://6ab1-110-73-241-18.ngrok-free.app`. 
Now it must look like this `https://6ab1-110-73-241-18.ngrok-free.app/api/webhook/customer`

Clerk webhook can simply add the new users to the backend database for management.

## Run Frontend
- Add at least 1 product at the admin dashboard to prevent unexpected errors at the frontend store
Keep the admin side app and frontend app running, ngrok must also be running in the terminal.

- At store signin/signup with clerk( Clerk will add your info to the database)

After fresh signup/signin, notice an error at the frontend store app, goto "Billboard" page at the admin dashboard click the 3 horizontal dots on any of the billboards you have added and next click "Copy Id". Paste this copied id in the `.env` file of the store app at; **Home_Billboard= xxxxx-xxxxx-xxxx-xxxxx-xxxxxxx**

Everything should be perfect here.

## Add Stripe Payment
To add [Stripe] payment and test locally you need Stripe CLI. Create an account at [stripe](http://stripe.com) and install Stripe CLI on your local machine for development testing.
On test mode, click on "Developers" on dashboard, navigate to the "Webhooks" tab and add "Local listeners" by clicking "add local listener". 

In your admin app terminal run `stripe login` confirm code to login, after successful login run `stripe listen --forward-to localhost:3000/api/webhook`, "3000" for the port number where the admin app is running and `api/webhook` id the directory for the hook.

If everything is successful and they are still running, test payment through checkout and verify that the made processed perfectly. 

## For Deployment and After Deployment
After deployment replace all localhost urls(http://localhost:3000 and http://localhost:3001) with the actual site url of the application, be it admin dashboard or the frontend store. 
Do same for the Webhooks on the libraries visited( Clerk, Stripe,...etc)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
