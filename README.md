This is a spaceX project that would list out all the spacex launch programs.It is based on next.js.

Running locally in development mode
To get started, just clone the repository and run npm install && npm run dev:

git clone https://github.com/Divanshu28/spacex.git
npm install
npm run dev

The project has been deployed on vercel.com with CI/CD pipeline in place.The commits made to GitHub  will automatically issue Deployments for your Personal Account on Vercel. 

The app can be seen at :
spacexlaunch-roan.vercel.app

The app uses server side rendering with next.js and uses getServerSideProps function for supplying props to the home component initially and also for data fetching before rendering the component. The filter values applied by user are stored in cookies so that they can be accessed at the server side and the resulting page is served from server upon refresh and corresponding filters values are chnaged on the client side.

The app is fully optimised and follows the best practices as the same is reflected by the LightHouse score.


![alt text](https://github.com/Divanshu28/spacex/issues/1#issue-759339455)
