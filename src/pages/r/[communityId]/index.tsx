import { Community, CommunityState } from "@/src/atoms/communitiesAtom";
import About from "@/src/components/Community/About";
import CreatePostLink from "@/src/components/Community/CreatePostLink";
import Header from "@/src/components/Community/Header";
import NotFound from "@/src/components/Community/NotFound";
import PageContent from "@/src/components/Layout/PageContent";
import Posts from "@/src/components/Posts/Posts";
import { firestore } from "@/src/firebase/clientApp";
import { Divider } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";

type communityPageProps = {
  communityData: Community;
};

const communityPage: React.FC<communityPageProps> = ({ communityData }) => {
  console.log("here is data", communityData);
  const setCommunityStateValue = useSetRecoilState(CommunityState);

  if (!communityData) {
    return <NotFound />;
  }

  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currenntCommunity: communityData,
    }));
  }, [communityData]);

  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>

        <>
          <About communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get community data and pass it to the router
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );

    const commmunityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: commmunityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: commmunityDoc.id, ...commmunityDoc.data })
            )
          : "",
      },
    };
  } catch (error) {
    // could add an error page here if you wanted to:
    console.log("getServerSideProps error", error);
  }
}

export default communityPage;
