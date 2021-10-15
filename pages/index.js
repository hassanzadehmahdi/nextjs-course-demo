import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_DATA = [
//   {
//     id: "m1",
//     title: "first one",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/5/51/Pasargad_Tomb_Cyrus3.jpg",
//     address: "iran",
//   },
//   {
//     id: "m2",
//     title: "second one",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/5/51/Pasargad_Tomb_Cyrus3.jpg",
//     address: "iraq",
//   },
// ];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  // fetch data from backend
  const client = await MongoClient.connect(
    "mongodb+srv://mahdi:mh12345678@cluster0.ezmcf.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
};

// export const getServerSideProps = (context) => {
//   const req = context.req;
//   const res = context.res;
//   // fetch data from backend
//   return { props: { meetups: DUMMY_DATA } };
// };

export default HomePage;
