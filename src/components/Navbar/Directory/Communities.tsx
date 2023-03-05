import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { CommunityState } from "@/src/atoms/communitiesAtom";
import { FaReddit } from "react-icons/fa";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(CommunityState).mySnippets;

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MODERATING
        </Text>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuItem
              key={snippet.communityId}
              icon={<FaReddit />}
              as="a"
              href={`/r/${snippet.communityId}`}
            >
              {`r/${snippet.communityId}`}
            </MenuItem>
          ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
          MY COMMUNITIES
        </Text>

        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
        >
          <Icon fontSize={20} mr={2} as={GrAdd} />
          <Flex align="center">Create Community</Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuItem
            key={snippet.communityId}
            icon={<FaReddit />}
            as="a"
            href={`/r/${snippet.communityId}`}
          >
            {`r/${snippet.communityId}`}
          </MenuItem>
        ))}
      </Box>
    </>
  );
};
export default Communities;
